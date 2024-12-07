import React, { useEffect, useState } from "react";
import { applicantData } from "../mock/applicantData";
import { positionData } from "../mock/positionData";
import { PromotionData } from "../mock/PromotionDetail";
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

interface Applicant {
  applicationId: number;
  userId: number;
  name: string;
  email: string;
  phoneNum: string;
  school: string;
  major: string;
  position: string;
  studentNumber: string;
  formResult: string;
  meetingResult: string;
  formScore: number;
  meetingScore: number;
  meetingStartTime: string;
  meetingEndTime: string;
}

interface PromotionImage {
  imageId: number;
  imageUrl: string;
}

interface PromotionInfo {
  postId: number;
  clubId: number;
  title: string;
  createdAt: string;
  startTime: string;
  endTime: string;
  body: string;
  status: string;
  type: string;
  field: string;
  fieldType: string;
  image: PromotionImage[];
}

interface TimeGroup {
  [time: string]: Applicant[];
}

interface MeetingScheduleData {
  date: string;
  times: TimeGroup;
}

const MeetArrange = () => {
  const getMeetingTimeData = (data: Applicant[]): MeetingScheduleData[] => {
    const groupedData = data.reduce<Record<string, Applicant[]>>(
      (acc, applicant) => {
        const date = applicant.meetingStartTime.split(" ")[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(applicant);
        return acc;
      },
      {}
    );

    const sortedData = Object.entries(groupedData).map(([date, applicants]) => {
      const timeGroups = applicants
        .sort(
          (a, b) =>
            new Date(a.meetingStartTime).getTime() -
            new Date(b.meetingStartTime).getTime()
        )
        .reduce<TimeGroup>((acc, applicant) => {
          const time = applicant.meetingStartTime.split(" ")[1];
          if (!acc[time]) acc[time] = [];
          acc[time].push(applicant);
          return acc;
        }, {});

      return {
        date,
        times: timeGroups,
      };
    });

    return sortedData;
  };

  const navigate = useNavigate();
  const sortedMeetingTimes = getMeetingTimeData(applicantData);
  const positionOptions = ["전체", "단장단", "기획단"];
  const [newMeetingIsOpen, setNewMeetingIsOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string>("전체");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<string>("--");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("--");
  const [promotionInfo, setPromotionInfo] = useState<PromotionInfo>();

  useEffect(() => {
    setPromotionInfo(PromotionData[0].result);
  }, []);

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPosition(event.target.value);
  };

  const handleStartTimeChange = (time: string) => {
    setSelectedStartTime(time);
  };

  const handleEndTimeChange = (time: string) => {
    setSelectedEndTime(time);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <Wrapper>
      {promotionInfo?.status === "OPEN" ? (
        <ApplicantList
          data1={applicantData}
          data2={positionData}
          isEmail={false}
        />
      ) : (
        <InterviewerList
          data1={applicantData}
          data2={positionData}
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
          {promotionInfo?.status === "OPEN" ? (
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
                        <input />
                        <p>명</p>
                      </MeetingSettingInfo>
                    </MeetingSettingInfoBox>
                    <MeetingSettingInfoBox>
                      <p>전형</p>
                      <select
                        value={selectedPosition}
                        onChange={handleDropdownChange}
                      >
                        {positionOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
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
                        <input />
                        <p>분</p>
                      </MeetingSettingInfo>
                    </MeetingSettingInfoBox>
                    <MeetingSettingInfoBox>
                      <p>쉬는 시간</p>
                      <MeetingSettingInfo>
                        <input />
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
                  <MakeButton>면접시간 생성</MakeButton>
                </MeetSettingButtons>
              </MeetSettingBox>
            ) : (
              <div></div>
            )}
            <MeetTables>
              {sortedMeetingTimes.map((meeting) => (
                <Table key={meeting.date}>
                  <TableTitle>
                    <TableDate>
                      {meeting.date.split("-")[0]}년{" "}
                      {parseInt(meeting.date.split("-")[1])}월{" "}
                      {parseInt(meeting.date.split("-")[2])}일
                    </TableDate>
                    <img
                      src="/images/manager/plus.svg"
                      alt="면접시간 수정하기"
                    />
                  </TableTitle>
                  <TableTimeContainer>
                    {Object.entries(meeting.times).map(
                      ([time, interviewers]) => (
                        <TableTimeBox key={time}>
                          <TableTime>
                            <p>{time}</p>
                          </TableTime>
                          <InterviewerBox>
                            {interviewers.map((interviewer) => (
                              <Interviewer key={interviewer.applicationId}>
                                {interviewer.name}{" "}
                                <p>{interviewer.studentNumber}</p>
                              </Interviewer>
                            ))}
                          </InterviewerBox>
                        </TableTimeBox>
                      )
                    )}
                  </TableTimeContainer>
                </Table>
              ))}
            </MeetTables>
          </MeetTablesContainer>
        </TableConatiner>
        <RestConainer>
          <p>미배치 인원</p>
        </RestConainer>
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

  p {
    color: #000;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
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
  width: 450px;
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
    width: 40px;
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
  width: 100px;
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

const RestConainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
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
