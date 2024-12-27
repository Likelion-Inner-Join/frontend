import React, { useEffect, useState } from "react";
import InterviewerList from "../components/InterviewerList";
import ApplicantList from "../components/ApplicantList";
import MyButton from "../components/MyButton";
import EvaluationHeader from "../components/EvaluationHeader";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../common/ui";
import { ApplicantType, PostInfoType, MeetingTimesType } from "../global/types";
import { GET, POST, PATCH } from "../../common/api/axios";

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

type Meeting = {
  meetingTimeId: number;
  allowedNum: number;
  reservedNum: number;
  applicantList: {
    applicantId: number;
    name: string;
    studentNumber: string;
  }[];
  meetingStartTime: string;
  meetingEndTime: string;
};

type Meeting_Applicant = {
  applicantId: number;
  name: string;
  studentNumber: string;
};

const MeetArrange = () => {
  const navigate = useNavigate();
  const [applicantList, setApplicantList] = useState<ApplicantType[]>([]);
  const [newMeetingIsOpen, setNewMeetingIsOpen] = useState(false);
  const [postInfo, setPostInfo] = useState<PostInfoType>();
  const [groupedMeetings, setGroupedMeetings] = useState<GroupedMeetings>({});
  const [Meetings, setMeetings] = useState<MeetingTimesType[]>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [maxParticipants, setMaxParticipants] = useState(2);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [interviewDuration, setInterviewDuration] = useState(20);
  const [breakTime, setBreakTime] = useState(10);
  const [reservationStartTime, setReservationStartTime] = useState("");
  const [reservationEndTime, setReservationEndTime] = useState("");
  const [showNavbar, setShowNavbar] = useState(false);

  const getApplicantList = async () => {
    try {
      const res = await GET(`posts/1/application`);

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
      const res = await GET(`posts/1`);

      if (res.isSuccess) {
        setPostInfo(res.result);
        setSelectedPosition(res.result.recruitingList[0].jobTitle);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMeetingTimes = async (recruitingId: number) => {
    try {
      const res = await GET(`posts/interview-times/${recruitingId}`);

      if (res?.isSuccess) {
        if (res.result.reservationStartTime)
          setReservationStartTime(res.result.reservationStartTime);
        if (res.result.reservationEndTime)
          setReservationEndTime(res.result.reservationEndTime);
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
    setMeetings(meetingData);

    const result: GroupedMeetings = {};

    meetingData.forEach((data, index) => {
      const jobTitle = postInfo?.recruitingList[index].jobTitle;

      data?.meetingTimes.forEach((meeting: Meeting) => {
        const date = meeting.meetingStartTime.split("T")[0];

        if (!result[date]) result[date] = [];

        result[date].push({
          meetingStartTime: meeting.meetingStartTime,
          meetingEndTime: meeting.meetingEndTime,
          jobTitle,
          applicants: meeting.applicantList.map(
            (applicant: Meeting_Applicant) => ({
              id: applicant.applicantId,
              name: applicant.name,
              studentNumber: applicant.studentNumber,
            })
          ),
        });
      });
    });

    const sortedDates = Object.keys(result).sort((a, b) => {
      const aDate = new Date(a);
      const bDate = new Date(b);
      return aDate.getTime() - bDate.getTime();
    });

    const sortedResult: GroupedMeetings = {};
    sortedDates.forEach((date) => {
      sortedResult[date] = result[date].sort((a, b) => {
        const aStart = new Date(a.meetingStartTime).getTime();
        const bStart = new Date(b.meetingStartTime).getTime();
        return aStart - bStart;
      });
    });

    setGroupedMeetings(sortedResult);
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

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

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
        meetingStartTime: formatDate(currentTime),
        meetingEndTime: formatDate(nextMeetingEnd),
      });
      currentTime = new Date(nextMeetingEnd.getTime() + breakTime * 60000);
    }

    return meetingTimes;
  };

  const createMeetingData = () => {
    const meetingTimes = generateMeetingTimes();

    const newMeetingData = {
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

    const existingData = Meetings?.find(
      (item) => item.recruitingId === newMeetingData.recruitingId
    );

    const combinedMeetingTimes = existingData
      ? [
          ...existingData.meetingTimes,
          ...newMeetingData.meetingTimes.filter(
            (newTime) =>
              !existingData.meetingTimes.some(
                (existingTime) =>
                  existingTime.meetingStartTime === newTime.meetingStartTime
              )
          ),
        ]
      : newMeetingData.meetingTimes;

    return {
      ...newMeetingData,
      meetingTimes: combinedMeetingTimes,
    };
  };

  const handleCreateMeetingTimes = async () => {
    if (maxParticipants < 1) {
      alert("타임 당 최대 인원은 1명 이상으로 설정되어야 합니다.");
      return;
    }
    if (!selectedStartTime || !selectedEndTime) {
      alert("면접 총시간이 설정되어야 합니다.");
      return;
    }
    if (selectedStartTime >= selectedEndTime) {
      alert("면접 총시간을 다시 확인해주세요.");
      return;
    }
    if (interviewDuration < 0 || breakTime < 0) {
      alert("면접 시간은 0분 이상으로 설정되어야 합니다.");
      return;
    }

    try {
      const newMeetingData = createMeetingData();
      const res = await POST("posts/interview-times", newMeetingData);

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

  const handleDeleteMeetingTimes = async (date: string) => {
    try {
      if (!Meetings) {
        console.error("Meetings 데이터가 없습니다.");
        return;
      }

      const updatedMeetings = Meetings?.map((meeting) => {
        const filteredMeetingTimes = meeting.meetingTimes.filter(
          (meetingTime) =>
            !meetingTime.meetingStartTime.startsWith(date) &&
            !meetingTime.meetingEndTime.startsWith(date)
        );

        return {
          ...meeting,
          meetingTimes: filteredMeetingTimes,
        };
      });

      setMeetings(updatedMeetings);

      const postData = updatedMeetings?.map((meeting) => ({
        recruitingId: meeting.recruitingId,
        meetingTimes: meeting.meetingTimes,
        reservationStartTime: meeting.reservationStartTime,
        reservationEndTime: meeting.reservationEndTime,
      }));

      if (!postData) {
        console.error("postData가 유효하지 않습니다.");
        return;
      }

      const res = await Promise.all(
        postData.map((item) => POST("posts/interview-times", item))
      );

      const hasError = res.some((response) => !response.isSuccess);
      if (!hasError) {
        alert("면접 일정을 삭제하였습니다.");
        fetchAllMeetings();
      } else {
        const errorMessages = res
          .filter((response) => !response.isSuccess)
          .map((response) => response.message || "Unknown error");
        console.error("Error:", errorMessages.join(", "));
        alert("면접 일정 삭제를 실패하였습니다.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("면접 일정 삭제 중 오류가 발생했습니다.");
    }
  };

  const updateRecruitStatus = async (status: string) => {
    try {
      const res = await PATCH(`posts/1`, { recruitmentStatus: status });
      console.log({ recruitmentStatus: status });
      if (res.isSuccess) {
        console.log(res);
        alert("면접 시간이 공개되었습니다.");
        getPostDetails();
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMeetOpenButton = () => {
    if (
      postInfo?.recruitmentStatus === "TIME_SET" ||
      postInfo?.recruitmentStatus === "INTERVIEWED" ||
      postInfo?.recruitmentStatus === "CLOSED"
    ) {
      alert("이미 면접 시간이 지원자에게 공개되었습니다.");
      return;
    }

    updateRecruitStatus("TIME_SET");
  };

  const handleReservationStartTime = (value: string, type: string) => {
    let newTime;

    if (type === "DATE") {
      if (reservationStartTime) {
        newTime = `${value}T${reservationStartTime.split("T")[1]}`;
        setReservationStartTime(newTime);
      } else {
        newTime = `${value}T00:00:00.000Z`;
        setReservationStartTime(newTime);
      }
    } else if (type === "TIME") {
      if (reservationStartTime) {
        newTime = `${reservationStartTime.split("T")[0]}T${value}:00.000Z`;
        setReservationStartTime(newTime);
      } else {
        const today = new Date();
        newTime = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(
          2,
          "0"
        )}T${value}:00.000Z`;
        setReservationStartTime(newTime);
      }
    }

    if (newTime) postReservationTimes(newTime, reservationEndTime);
  };

  const handleReservationEndTime = (value: string, type: string) => {
    let newTime;

    if (type === "DATE") {
      if (reservationEndTime) {
        newTime = `${value}T${reservationEndTime.split("T")[1]}`;
        setReservationEndTime(newTime);
      } else {
        newTime = `${value}T00:00:00.000Z`;
        setReservationEndTime(newTime);
      }
    } else if (type === "TIME") {
      if (reservationEndTime) {
        newTime = `${reservationEndTime.split("T")[0]}T${value}:00.000Z`;
        setReservationEndTime(newTime);
      } else {
        const today = new Date();
        newTime = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(
          2,
          "0"
        )}T${value}:00.000Z`;
        setReservationEndTime(newTime);
      }
    }

    if (newTime) postReservationTimes(reservationStartTime, newTime);
  };

  const createPostReservationTimeData = (
    reservationStartTime: string,
    reservationEndTime: string
  ) => {
    if (!Meetings) {
      console.error("Meetings state is undefined.");
      return [];
    }

    const postData = Meetings.map((meeting) => ({
      recruitingId: meeting.recruitingId,
      meetingTimes: meeting.meetingTimes.map((time) => ({
        allowedNum: time.allowedNum,
        meetingStartTime: time.meetingStartTime,
        meetingEndTime: time.meetingEndTime,
      })),
      reservationStartTime,
      reservationEndTime,
    }));

    return postData;
  };

  const postReservationTimes = async (
    reservationStartTime: string,
    reservationEndTime: string
  ) => {
    try {
      if (
        reservationStartTime &&
        reservationEndTime &&
        reservationStartTime >= reservationEndTime
      ) {
        alert("시작 기간과 종료 기간을 다시 확인해주세요!");
        fetchAllMeetings();
        return;
      }

      const data = createPostReservationTimeData(
        reservationStartTime,
        reservationEndTime
      );

      const responses = await Promise.all(
        data.map((item) => POST("posts/interview-times", item))
      );

      const hasError = responses.some((res) => !res.isSuccess);
      if (!hasError) {
        alert("예약 기간 변경 성공");
      } else {
        const errorMessages = responses
          .filter((res) => !res.isSuccess)
          .map((res) => res.message || "Unknown error");
        console.error("Error:", errorMessages.join(", "));
        alert(`예약 시간 변경 실패: ${errorMessages.join(", ")}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("예약 시간 변경 중 오류가 발생했습니다.");
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

  const handleMouseMove = (event: MouseEvent) => {
    if (event.clientX < 400 && event.clientY < 30) {
      setShowNavbar(true);
    } else if (event.clientX > 400 && event.clientY < 100) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Wrapper>
      <NavbarWrapper show={showNavbar}>
        {" "}
        <Navbar />
      </NavbarWrapper>
      <EvaluateWrapper show={showNavbar}>
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
            <EvaluationHeader status="TIME_SET" />
          </HeaderWrapper>
          <MeetTitle>
            <MeetCaptionContainer
              color={
                postInfo?.recruitmentStatus === "OPEN" ||
                postInfo?.recruitmentStatus === "FORM_REVIEWED"
              }
            >
              <MeetCaption>면접시간 설정</MeetCaption>
              <p>면접 시간대는 공개 이후 수정이 불가합니다.</p>
            </MeetCaptionContainer>
            <Buttons>
              <MeetingSendButton
                isOpen={
                  postInfo?.recruitmentStatus !== "OPEN" &&
                  postInfo?.recruitmentStatus !== "FORM_REVIEWED"
                }
                onClick={handleMeetOpenButton}
              >
                {postInfo?.recruitmentStatus === "OPEN" ||
                postInfo?.recruitmentStatus === "FORM_REVIEWED" ? (
                  <img src="/images/manager/check.svg" alt="면접 시간 공개" />
                ) : (
                  <img
                    src="/images/manager/check_gray.svg"
                    alt="면접 시간 공개 완료"
                  />
                )}
                면접시간 공개
              </MeetingSendButton>
              <MyButton
                content="다음 단계"
                buttonType="RED"
                onClick={() =>
                  postInfo?.recruitmentStatus === "OPEN" ||
                  postInfo?.recruitmentStatus === "FORM_REVIEWED"
                    ? alert("면접 시간을 먼저 공개해주세요.")
                    : navigate("/meet-eval")
                }
              />
            </Buttons>
          </MeetTitle>
          <MeetPeriodContainer>
            <MeetPeriod>
              <Info src="/images/manager/quest.svg" alt="입니다~" />
              <p>시작</p>
              <Period>
                <input
                  type="date"
                  value={
                    reservationStartTime
                      ? reservationStartTime.split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    handleReservationStartTime(e.target.value, "DATE")
                  }
                />
                <input
                  type="time"
                  value={
                    reservationStartTime
                      ? reservationStartTime
                          .split("T")[1]
                          .split(":")
                          .slice(0, 2)
                          .join(":")
                      : ""
                  }
                  onChange={(e) =>
                    handleReservationStartTime(e.target.value, "TIME")
                  }
                />
              </Period>
            </MeetPeriod>
            <MeetPeriod>
              <p>종료</p>
              <Period>
                {" "}
                <input
                  type="date"
                  value={
                    reservationEndTime ? reservationEndTime.split("T")[0] : ""
                  }
                  onChange={(e) =>
                    handleReservationEndTime(e.target.value, "DATE")
                  }
                />
                <input
                  type="time"
                  value={
                    reservationEndTime
                      ? reservationEndTime
                          .split("T")[1]
                          .split(":")
                          .slice(0, 2)
                          .join(":")
                      : ""
                  }
                  onChange={(e) =>
                    handleReservationEndTime(e.target.value, "TIME")
                  }
                />
              </Period>
            </MeetPeriod>
          </MeetPeriodContainer>
          <TableConatiner>
            <TableButtonBox isOpen={newMeetingIsOpen}>
              <img
                src="/images/manager/add.svg"
                alt="면접시간 추가하기"
                onClick={() => {
                  if (
                    postInfo?.recruitmentStatus === "OPEN" ||
                    postInfo?.recruitmentStatus === "FORM_REVIEWED"
                  ) {
                    setNewMeetingIsOpen(!newMeetingIsOpen);
                  } else {
                    alert("면접 시간을 공개한 이후에는 수정할 수 없습니다.");
                  }
                }}
              />
            </TableButtonBox>
            <MeetTablesContainer>
              {newMeetingIsOpen ? (
                <MeetSettingBox>
                  <MeetSettingDetailBox>
                    <MeetSettingDetail>
                      <MeetingSettingInfoBox>
                        <p>면접 일자</p>
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
                        <p>타임 당 최대 인원</p>
                        <MeetingSettingInfo>
                          <input
                            type="number"
                            value={maxParticipants}
                            onChange={(e) =>
                              handleMaxParticipantsChange(
                                Number(e.target.value)
                              )
                            }
                          />
                          <p>명</p>
                        </MeetingSettingInfo>
                      </MeetingSettingInfoBox>
                      <MeetingSettingInfoBox>
                        <p>면접 전형</p>
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
                          onChange={(e) =>
                            handleStartTimeChange(e.target.value)
                          }
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
                            defaultValue={20}
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
                            defaultValue={10}
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
                        src="/images/manager/trash.svg"
                        alt="면접시간 수정하기"
                        onClick={() => {
                          if (
                            postInfo?.recruitmentStatus === "OPEN" ||
                            postInfo?.recruitmentStatus === "FORM_INTERVIEW"
                          ) {
                            handleDeleteMeetingTimes(date);
                          } else {
                            alert(
                              "면접 시간을 공개한 이후에는 수정할 수 없습니다."
                            );
                          }
                        }}
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
            {postInfo?.recruitmentStatus === "OPEN" ||
            postInfo?.recruitmentStatus === "FORM_REVIEWED" ? (
              <h1>면접 시간 전송 이후 적용됩니다</h1>
            ) : (
              <RestApplicantsBox>
                {applicantList
                  .filter(
                    (applicant) =>
                      !applicant.meetingStartTime &&
                      applicant.formResult === "PASS"
                  )
                  .map((applicant, index) => (
                    <RestApplicant key={index}>
                      {applicant.name}
                      <p>{applicant.studentNumber}</p>
                      <p>{applicant.positionName}</p>
                    </RestApplicant>
                  ))}
              </RestApplicantsBox>
            )}
          </RestContainer>
        </Container>
      </EvaluateWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  background-color: #fff;
`;

const NavbarWrapper = styled.div<{ show: boolean }>`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({ show }) => (show ? "60px" : "0px")};
  overflow: hidden;
  transition: height 0.3s ease-in-out;
`;

const EvaluateWrapper = styled.div<{ show: boolean }>`
  display: flex;
  width: 100vw;
  height: ${({ show }) => (show ? "calc(100vh - 60px)" : "100vh")};
  transition: height 0.3s ease-in-out;
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
`;

const MeetCaptionContainer = styled.div<{ color: boolean }>`
  display: flex;
  width: 500px;
  align-items: center;
  gap: 11px;

  p {
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 12px */
    color: ${({ color }) => (color ? "#cc141d" : "#424242")};
  }
`;

const MeetCaption = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 26px */
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 24px;
  margin-bottom: 15px;
`;

const MeetingSendButton = styled.div<{ isOpen: boolean }>`
  display: inline-flex;
  gap: 10px;
  text-align: center;
  padding: 12px 16px;
  border-radius: 30px;
  background-color: #fff;

  color: ${({ isOpen }) => (isOpen ? "#606060" : "#cc141d")};
  border: ${({ isOpen }) =>
    isOpen ? "1px solid #606060;" : "1px solid #cc141d;"};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: #f9f9f9;
  }

  &:active {
    cursor: pointer;
    background-color: #f0f0f0;
    color: #000;
    border-color: #000;
  }
`;

const Info = styled.img`
  background-color: black;
  display: flex;
  width: 15px;
  margin-right: 5px;
`;

const MeetPeriodContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 60px;
`;

const MeetPeriod = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-right: 24px;
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%; /* 23.4px */
  }
`;

const Period = styled.div`
  display: flex;
  gap: 10px;

  input {
    border: 1px solid #fcfafa;
    border-radius: 4px;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    color: #424242;
    background-color: #fcfafa;

    &:hover {
      cursor: pointer;
    }
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
  padding: 5px 10px;
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
  height: 550px;
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

  h1 {
    color: #606060;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
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
  width: 150px;
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
    margin-left: 70px;
    border: solid 1px #606060;
  }
`;

const CustomDateInput = React.forwardRef((props: any, ref: any) => (
  <CustomInput {...props} ref={ref} />
));

export default MeetArrange;
