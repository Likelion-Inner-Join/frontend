import React, { useEffect, useState } from "react";
import { applicantData } from "../mock/applicantData";
import { positionData } from "../mock/positionData";
import { PromotionData } from "../mock/PromotionDetail";
import { meetingTimeData1, meetingTimeData2 } from "../mock/DocumentData";
import InterviewerList from "../components/InterviewerList";
import ApplicantList from "../components/ApplicantList";
import MyButton from "../components/MyButton";
import EvaluationHeader from "../components/EvaluationHeader";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { TimePicker } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { Navigate, useNavigate } from "react-router-dom";
import { ApplicantType, PostInfoType, MeetingTimesType } from "../global/types";
import { GET, POST } from "../../common/api/axios";

type GroupedMeetings = {
  [date: string]: {
    meetingStartTime: string;
    meetingEndTime: string;
    jobTitle: string;
    applicants: {
      id: number;
      name: string;
      studentNumber: string;
    }[];
  }[];
};

const MeetArrange = () => {
  const navigate = useNavigate();
  const [applicantList, setApplicantList] = useState<ApplicantType[]>([]);
  const [newMeetingIsOpen, setNewMeetingIsOpen] = useState(false);
  const [postInfo, setPostInfo] = useState<PostInfoType>();
  const [groupedMeetings, setGroupedMeetings] = useState<GroupedMeetings>({});
  const [selectedDate, setSelectedDate] = useState(new Date()); // 날짜
  const [maxParticipants, setMaxParticipants] = useState(0); // 최대 인원
  const [selectedPosition, setSelectedPosition] = useState(""); // 전형
  const [selectedStartTime, setSelectedStartTime] = useState(""); // 총 시간 - 시작
  const [selectedEndTime, setSelectedEndTime] = useState(""); // 총 시간 - 끝
  const [interviewDuration, setInterviewDuration] = useState(0); // 면접 시간
  const [breakTime, setBreakTime] = useState(0); // 쉬는 시간

  const getApplicantList = async () => {
    try {
      //const res = await GET(`posts/${postId}/application`);
      const res = await GET(`posts/1/application`);
      //const res = applicantData;

      if (res.isSuccess) {
        setApplicantList(res.result.applicationList);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPostDetails = async () => {
    try {
      //const res = await GET(`posts/${postId}`);
      const res = await GET(`posts/1`);
      //const res = PromotionData;

      if (res.isSuccess) {
        setPostInfo(res.result);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMeetingTimes = async (recruitingId: number) => {
    try {
      //const res = await GET(`posts/interview-times/${recruitingId}`);
      let res;
      if (recruitingId === 1) res = meetingTimeData1;
      if (recruitingId === 2) res = meetingTimeData2;

      if (res?.isSuccess) {
        return res.result;
      } else {
        console.log(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllMeetings = async () => {
    if (!postInfo?.recruitingList) return;

    const recruitingIds = postInfo?.recruitingList.map(
      (item) => item.recruitingId
    );

    const meetingDataPromises = recruitingIds?.map((id) => getMeetingTimes(id));
    const meetingData = await Promise.all(meetingDataPromises);

    const result: GroupedMeetings = {};

    meetingData.forEach((data, index) => {
      const jobTitle = postInfo?.recruitingList[index].jobTitle;

      data?.meetingTimes.forEach((meeting) => {
        const date = meeting.meetingStartTime.split("T")[0]; // Extract date (YYYY-MM-DD)
        if (!result[date]) result[date] = [];

        result[date].push({
          meetingStartTime: meeting.meetingStartTime,
          meetingEndTime: meeting.meetingEndTime,
          jobTitle,
          applicants: meeting.applicantList.map((applicant) => ({
            id: applicant.applicantId,
            name: applicant.name,
            studentNumber: applicant.studentNumber,
          })),
        });
      });
    });

    setGroupedMeetings(result);
    console.log(result);
  };

  useEffect(() => {
    getApplicantList();
    getPostDetails();
  }, []);

  useEffect(() => {
    fetchAllMeetings();
  }, [postInfo]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };
  const handleMaxParticipantsChange = (count: number) =>
    setMaxParticipants(count);
  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPosition(event.target.value);
  };
  const handleStartTimeChange = (time: string) => setSelectedStartTime(time);
  const handleEndTimeChange = (time: string) => setSelectedEndTime(time);
  const handleInterviewDurationChange = (min: number) =>
    setInterviewDuration(min);
  const handleBreakTimeChange = (min: number) => setBreakTime(min);

  const generateMeetingTimes = () => {
    const startTime = new Date(
      `${selectedDate.toISOString().split("T")[0]}T${selectedStartTime}`
    );
    const endTime = new Date(
      `${selectedDate.toISOString().split("T")[0]}T${selectedEndTime}`
    );

    const meetingTimes = [];
    let currentTime = startTime;

    while (currentTime < endTime) {
      const nextMeetingEnd = new Date(
        currentTime.getTime() + interviewDuration * 60000
      );

      if (nextMeetingEnd > endTime) break;

      meetingTimes.push({
        meetingStartTime: currentTime.toISOString(),
        meetingEndTime: nextMeetingEnd.toISOString(),
      });

      currentTime = new Date(nextMeetingEnd.getTime() + breakTime * 60000);
    }

    return meetingTimes;
  };

  const createMeetingData = () => {
    const meetingTimes = generateMeetingTimes();
    const meetingData = {
      recruitingId:
        postInfo?.recruitingList.find(
          (item) => item.jobTitle === selectedPosition
        )?.recruitingId || 0,
      meetingTimes: meetingTimes.map((time) => ({
        allowedNum: maxParticipants,
        meetingStartTime: time.meetingStartTime.replace(".000Z", ""),
        meetingEndTime: time.meetingEndTime.replace(".000Z", ""),
      })),
    };
    return meetingData;
  };

  const handleCreateMeetingTimes = async () => {
    try {
      const newMeetingData = createMeetingData();
      //const res = await POST("posts/interview-times", newMeetingData);
      const res = {
        isSuccess: true,
        code: 0,
        message: "string",
        result: "string",
      };
      console.log(newMeetingData);

      if (res.isSuccess) {
        alert("면접 시간 생성 성공");
        setNewMeetingIsOpen(false);
        fetchAllMeetings();
      } else {
        console.error("Error:", res.message);
        alert(`면접 시간 생성 실패: ${res.message}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("면접 시간 생성 중 오류가 발생했습니다.");
    }
  };

  function parseISODateTime(isoString: string) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return { year, month, day, hours, minutes };
  }

  return (
    <Wrapper>
      {postInfo?.recruitmentStatus === "OPEN" ? (
        <ApplicantList
          data1={applicantList}
          data2={postInfo?.recruitingList || []}
          isEmail={false}
        />
      ) : (
        <InterviewerList
          data1={applicantList}
          data2={postInfo?.recruitingList || []}
          isEmail={false}
        />
      )}
      <Container>
        <HeaderWrapper>
          {" "}
          <EvaluationHeader />
        </HeaderWrapper>
        <MeetTitle>
          <MeetCaptionContainer>
            <MeetCaption>면접시간 설정</MeetCaption>
            <p>해당 범위는 발송 이후 수정이 불가합니다.</p>
          </MeetCaptionContainer>
          {postInfo?.recruitmentStatus === "OPEN" ? (
            <MyButton
              content="다음 단계"
              buttonType="RED"
              onClick={() => navigate("/result")}
            />
          ) : (
            <MyButton
              content="다음 단계"
              buttonType="RED"
              onClick={() => navigate("/meet-eval")}
            />
          )}
        </MeetTitle>
        <MeetPeriodContainer>
          <MeetPeriod>
            <p>시작</p>
          </MeetPeriod>
          <MeetPeriod>
            <p>종료</p>
          </MeetPeriod>
        </MeetPeriodContainer>
        <TableConatiner>
          <TableButtonBox isOpen={newMeetingIsOpen}>
            <img
              src="/images/manager/add.svg"
              alt="면접시간 추가하기"
              onClick={() => setNewMeetingIsOpen(!newMeetingIsOpen)}
            />
          </TableButtonBox>
          <MeetTablesContainer>
            {newMeetingIsOpen ? (
              <MeetSettingBox>
                <MeetSettingDetailBox>
                  <MeetSettingDetail>
                    <MeetingSettingInfoBox>
                      <p>날짜</p>
                      <DatePicker
                        locale={ko}
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy년 MM월 dd일"
                        placeholderText="생성할 면접 날짜"
                        customInput={<CustomDateInput />}
                      />
                    </MeetingSettingInfoBox>
                    <MeetingSettingInfoBox>
                      <p>최대 인원</p>
                      <MeetingSettingInfo>
                        <input
                          type="number"
                          onChange={(e) =>
                            handleMaxParticipantsChange(Number(e.target.value))
                          }
                        />
                        <p>명</p>
                      </MeetingSettingInfo>
                    </MeetingSettingInfoBox>
                    <MeetingSettingInfoBox>
                      <p>전형</p>
                      <select
                        value={selectedPosition}
                        onChange={handleDropdownChange}
                      >
                        {postInfo?.recruitingList.map((option, index) => (
                          <option key={index} value={option.jobTitle}>
                            {option.jobTitle}
                          </option>
                        ))}
                      </select>
                    </MeetingSettingInfoBox>
                  </MeetSettingDetail>
                  <GrayLine />
                  <MeetSettingDetail>
                    {" "}
                    <MeetingSettingInfoBox>
                      <p>총 시간</p>
                      <MeetingTime
                        type="time"
                        value={selectedStartTime}
                        onChange={(e) => handleStartTimeChange(e.target.value)}
                      />
                      <MeetingTime
                        type="time"
                        value={selectedEndTime}
                        onChange={(e) => handleEndTimeChange(e.target.value)}
                      />
                    </MeetingSettingInfoBox>
                    <MeetingSettingInfoBox>
                      <p>면접 시간</p>
                      <MeetingSettingInfo>
                        <input
                          type="number"
                          onChange={(e) =>
                            handleInterviewDurationChange(
                              Number(e.target.value)
                            )
                          }
                        />
                        <p>분</p>
                      </MeetingSettingInfo>
                    </MeetingSettingInfoBox>
                    <MeetingSettingInfoBox>
                      <p>쉬는 시간</p>
                      <MeetingSettingInfo>
                        <input
                          type="number"
                          onChange={(e) =>
                            handleBreakTimeChange(Number(e.target.value))
                          }
                        />
                        <p>분</p>
                      </MeetingSettingInfo>
                    </MeetingSettingInfoBox>
                  </MeetSettingDetail>
                </MeetSettingDetailBox>
                <MeetSettingButtons>
                  <CancelButton
                    onClick={() => setNewMeetingIsOpen(!newMeetingIsOpen)}
                  >
                    취소
                  </CancelButton>
                  <MakeButton onClick={handleCreateMeetingTimes}>
                    면접시간 생성
                  </MakeButton>
                </MeetSettingButtons>
              </MeetSettingBox>
            ) : (
              <div></div>
            )}
            <MeetTables>
              {Object.entries(groupedMeetings).map(([date, meetings]) => (
                <Table key={date}>
                  <TableTitle>
                    <TableDate>{`${date.split("-")[0]}년 ${
                      date.split("-")[1]
                    }월 ${date.split("-")[2]}일`}</TableDate>
                    <img
                      src="/images/manager/plus.svg"
                      alt="면접시간 수정하기"
                    />
                  </TableTitle>
                  <TableTimeContainer>
                    {meetings.map((meeting, index) => (
                      <TableTimeBox key={index}>
                        <TableTime>
                          <p>{`${String(
                            parseISODateTime(meeting.meetingStartTime).hours
                          ).padStart(2, "0")}:${String(
                            parseISODateTime(meeting.meetingStartTime).minutes
                          ).padStart(2, "0")}`}</p>
                          {meeting.jobTitle}
                        </TableTime>
                        <InterviewerBox>
                          {meeting.applicants.map((applicant) => (
                            <Interviewer key={applicant.id}>
                              {applicant.name}
                              <p>{applicant.studentNumber}</p>
                            </Interviewer>
                          ))}
                        </InterviewerBox>
                      </TableTimeBox>
                    ))}
                  </TableTimeContainer>
                </Table>
              ))}
            </MeetTables>
          </MeetTablesContainer>
        </TableConatiner>
        <RestContainer>
          <p>미배치 인원</p>
          <RestApplicantsBox>
            {applicantList
              .filter((applicant) => applicant.meetingStartTime === "")
              .map((applicant, index) => (
                <RestApplicant key={index}>
                  {applicant.name}
                  <p>{applicant.studentNumber}</p>
                  <p>{applicant.positionName}</p>
                </RestApplicant>
              ))}
          </RestApplicantsBox>
        </RestContainer>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding-left: 5%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
`;

const HeaderWrapper = styled.div`
  padding-right: 7.6%;
`;

const MeetTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-right: 7.7%;
  margin-bottom: 10px;
`;

const MeetCaptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

const MeetCaption = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 26px */
`;

const MeetPeriodContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 60px;
`;

const MeetPeriod = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10%;
  gap: 24px;

  p {
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%; /* 23.4px */
  }
`;

const TableConatiner = styled.div`
  display: inline-flex;
  width: 100%;
  flex-direction: column;
  margin-top: 40px;
`;

const TableButtonBox = styled.div<{ isOpen: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 10px;

  img {
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    transform: ${({ isOpen }) => (isOpen ? "rotate(45deg)" : "rotate(0deg)")};
  }
`;

const MeetTablesContainer = styled.div`
  display: flex;
`;

const MeetTables = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  align-items: flex-start;
  padding-bottom: 10px;
  padding-right: 10px;
  gap: 15px;
`;

const Table = styled.div`
  display: flex;
  padding: 6px 12px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 18px;
  border: 1px solid #c0c0c0;
`;

const TableTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  padding: 20px 0px;

  img {
    width: 30px;
    height: 30px;
    cursor: pointer;
    border-radius: 100%;

    &:hover {
      transition: 0.5s ease;
      background-color: #dddddd;
    }
  }
`;

const TableDate = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 24px */
`;

const TableTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TableTimeBox = styled.div`
  display: flex;
  min-width: 300px;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
  border-bottom: 1px solid #ddd;
`;

const TableTime = styled.div`
  display: flex;
  padding: 0px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  align-self: stretch;
  color: #424242;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;

  p {
    color: #000;
    font-size: 18px;
    line-height: 120%; /* 21.6px */
  }
`;

const InterviewerBox = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
`;

const Interviewer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90px;
  padding: 12px 6px;
  justify-content: center;
  gap: 3px;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */

  p {
    color: #606060;
  }
`;

const MeetSettingBox = styled.div`
  display: flex;
  width: 480px;
  padding: 36px 24px;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  border-radius: 18px;
  border: 1px solid #ddd;
  margin-right: 15px;
`;

const MeetSettingDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  align-self: stretch;
`;

const MeetSettingDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
  align-self: stretch;
`;

const MeetSettingButtons = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const MeetingSettingInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  p {
    color: #000;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 27px */
    letter-spacing: -0.36px;
  }

  select {
    display: flex;
    height: 40px;
    padding: 6px 4px;
    align-items: center;
    gap: 4px;
    border-radius: 6px;
    background: #f9f9f9;
    color: #222;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 22.4px */
    border: solid 1px #f9f9f9;

    &:focus {
      outline: none;
      border: solid 1px #606060;
    }
  }

  input {
    border: solid 1px #f9f9f9;
    &:focus {
      border: solid 1px #606060;
    }
  }
`;

const MeetingSettingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  input {
    width: 55px;
    padding: 6px 8px;
    border-radius: 6px;
    background: #f9f9f9;
    color: #424242;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 22.4px */
  }

  p {
    color: #222;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 16.8px */
  }
`;

const GrayLine = styled.div`
  height: 1px;
  align-self: stretch;
  background-color: #f0f0f0;
`;

const MeetingTime = styled.input`
  width: 105px;
  border: 1px solid #fcfafa;
  border-radius: 4px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  padding: 2px 2.5px;
  background-color: #fcfafa;

  &:hover {
    cursor: pointer;
  }
`;

const CancelButton = styled.div`
  display: flex;
  padding: 12px 32px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
  border: 1px solid #606060;
  background: #fff;
  color: #606060;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  cursor: pointer;
`;

const MakeButton = styled.div`
  display: flex;
  padding: 12px 32px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
  border: 1px solid #cc141d;
  background: #fff;
  color: #cc141d;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  cursor: pointer;
`;

const RestContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 30px;
  gap: 15px;

  p {
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 26px */
  }
`;

const RestApplicantsBox = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  gap: 12px;
  flex-wrap: wrap;

  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */

  p {
    color: #606060;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }
`;

const RestApplicant = styled.div`
  display: flex;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 6px;
  border: 1px solid var(--Achromatic-gray02, #f0f0f0);
`;

const CustomInput = styled.input`
  width: 200px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background-color: #f9f9f9;

  color: #424242;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 22.4px */

  &:focus {
    margin-left: 33px;
    border: solid 1px #606060;
  }
`;

const CustomDateInput = React.forwardRef((props: any, ref: any) => (
  <CustomInput {...props} ref={ref} />
));

export default MeetArrange;
