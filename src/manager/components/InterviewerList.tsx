import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import DocView from "./DocView";
import { ApplicantType, PostInfoType } from "../global/types";
import { PUT, GET } from "../../common/api/axios";
import { applicantData } from "../mock/applicantData";
import { breakpoints } from "../../common/ui/breakpoints";

interface PositionType {
  recruitingId: number;
  formId: number;
  jobTitle: string;
}
interface ApplicantListProps {
  data1: ApplicantType[];
  data2: PositionType[];
  isEmail: boolean;
  isOpen: boolean;
}

const stateList = ["전체", "합격", "불합격", "미평가"];

const InterviewerList = ({
  data1,
  data2,
  isEmail,
  isOpen,
}: ApplicantListProps) => {
  const [selectedState, setSelectedState] = useState("전체");
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantType>();
  const [searchParams] = useSearchParams();
  const [filteredApplicants, setFilteredApplicants] = useState<ApplicantType[]>(
    []
  );
  const [applicantList, setApplicantList] = useState<ApplicantType[]>([]);
  const [postInfo, setPostInfo] = useState<PostInfoType>();
  const currApplyID = searchParams.get("apply");
  const [redirectPage, setRedirectPage] = useState("");
  const navigate = useNavigate();

  const getApplicantList = async () => {
    try {
      //const res = await GET(`posts/${postId}/application`);
      //const res = await GET(`posts/1/application`);
      const res = applicantData;

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
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePositionChange = (positionName: string) => {
    if (positionName === "전체") {
      setSelectedPositions([]);
    } else {
      setSelectedPositions((prev) =>
        prev.includes(positionName)
          ? prev.filter((name) => name !== positionName)
          : [...prev, positionName]
      );
    }
  };

  const openDocument = (applicant: ApplicantType) => {
    setSelectedApplicant(applicant);
    setIsDocumentOpen(true);
    navigate(`?apply=${applicant.applicationId}`);
  };

  const handleMeetingDateChange = async (
    applicationId: number,
    value: string
  ) => {
    setFilteredApplicants((prev) =>
      prev.map((applicant) =>
        applicant.applicationId === applicationId
          ? {
              ...applicant,
              meetingStartTime: applicant.meetingStartTime
                ? `${value}T${applicant.meetingStartTime.split("T")[1]}`
                : `${value}T`,
              meetingEndTime: applicant.meetingEndTime
                ? `${value}T${applicant.meetingEndTime.split("T")[1]}`
                : `${value}T`,
            }
          : applicant
      )
    );

    const updatedApplicant = filteredApplicants.find(
      (applicant) => applicant.applicationId === applicationId
    );

    if (updatedApplicant && updatedApplicant.meetingStartTime) {
      try {
        const res = await PUT(`application/${applicationId}`, {
          formResult: updatedApplicant.formResult,
          meetingResult: updatedApplicant.meetingResult,
          meetingStartTime: updatedApplicant.meetingStartTime
            ? `${value}T${
                updatedApplicant.meetingStartTime.split("T")[1]
              }`.replace(".000Z", "")
            : `${value}T00:00:00`,
          meetingEndTime: updatedApplicant.meetingEndTime
            ? `${value}T${
                updatedApplicant.meetingEndTime.split("T")[1]
              }`.replace(".000Z", "")
            : `${value}T00:00:00`,
        });
        if (res.isSuccess) {
          window.location.reload();
        } else {
          if (res.result === "Unexpected error: 허용 인원을 초과하였습니다.")
            alert("해당 시간대에 배정 가능한 최대 인원을 초과하였습니다");
          else alert("존재하지 않는 면접 시간대입니다");
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleMeetingTimeChange = async (
    applicationId: number,
    value: string
  ) => {
    setFilteredApplicants((prev) =>
      prev.map((applicant) =>
        applicant.applicationId === applicationId
          ? {
              ...applicant,
              meetingStartTime: applicant.meetingStartTime
                ? `${applicant.meetingStartTime.split("T")[0]}T${value}:00.000Z`
                : `T${value}:00`,
              meetingEndTime: applicant.meetingEndTime
                ? `${applicant.meetingEndTime.split("T")[0]}T${value}:00.000Z`
                : `T${value}:00`,
            }
          : applicant
      )
    );

    const updatedApplicant = filteredApplicants.find(
      (applicant) => applicant.applicationId === applicationId
    );

    if (updatedApplicant && updatedApplicant.meetingStartTime) {
      try {
        const res = await PUT(`application/${applicationId}`, {
          formResult: updatedApplicant.formResult,
          meetingResult: updatedApplicant.meetingResult,
          meetingStartTime: updatedApplicant.meetingStartTime
            ? `${updatedApplicant.meetingStartTime.split("T")[0]}T${value}:00`
            : `2025-01-01T${value}:00`,
          meetingEndTime: updatedApplicant.meetingEndTime
            ? `${updatedApplicant.meetingEndTime.split("T")[0]}T${value}:00`
            : `2025-01-01T${value}:00`,
        });

        if (res.isSuccess) {
          window.location.reload();
        } else {
          if (updatedApplicant.meetingStartTime.split("T")[0]) {
            if (res.result === "Unexpected error: 허용 인원을 초과하였습니다.")
              alert("해당 시간대에 배정 가능한 최대 인원을 초과하였습니다");
            else alert("존재하지 않는 면접 시간대입니다");
            console.log(res);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (postInfo?.recruitmentStatus === "OPEN") setRedirectPage("/doc-eval");
    else if (postInfo?.recruitmentStatus === "FORM_REVIEWED")
      setRedirectPage("/result");
    else if (postInfo?.recruitmentStatus === "TIME_SET")
      setRedirectPage("/meet-eval");
    else if (postInfo?.recruitmentStatus === "INTERVIEWED")
      setRedirectPage("/final-result");
    else if (postInfo?.recruitmentStatus === "CLOSED")
      setRedirectPage("/post-manage");
  }, [postInfo]);

  useEffect(() => {
    getApplicantList();
  }, [isDocumentOpen]);

  useEffect(() => {
    getApplicantList();
    getPostDetails();
  }, []);

  useEffect(() => {
    getApplicantList();
    if (currApplyID) {
      const selectedApplicant = applicantList.find(
        (applicant) => String(applicant.applicationId) === currApplyID
      );
      setSelectedApplicant(selectedApplicant);
      setIsDocumentOpen(true);
    } else setIsDocumentOpen(false);
  }, [currApplyID]);

  useEffect(() => {
    const meetFilteredApplicants = applicantList
      .filter((applicant) => {
        const matchState =
          selectedState === "전체" ||
          (selectedState === "합격" &&
            applicant.formResult === "PASS" &&
            applicant.meetingResult === "PASS") ||
          (selectedState === "불합격" &&
            (applicant.formResult === "FAIL" ||
              applicant.meetingResult === "FAIL")) ||
          (selectedState === "미평가" &&
            applicant.formResult === "PASS" &&
            applicant.meetingResult === "PENDING");

        const matchPosition =
          selectedPositions.length === 0 ||
          selectedPositions.includes(applicant.positionName);

        return matchState && matchPosition;
      })
      .sort((a, b) => {
        if (a.formResult === "FAIL" && b.formResult !== "FAIL") return 1;
        if (a.formResult !== "FAIL" && b.formResult === "FAIL") return -1;
        return 0;
      });

    setFilteredApplicants(meetFilteredApplicants);
  }, [applicantList, selectedState, selectedPositions]);

  const getIconByState = (state: string) => {
    switch (state) {
      case "PASSPASS":
        return "/images/manager/pass.svg";
      case "FAILFAIL":
        return "/images/manager/fail.svg";
      case "FAILPENDING":
        return "/images/manager/fail.svg";
      case "PASSFAIL":
        return "/images/manager/fail.svg";
      default:
        return "/images/manager/neutral.svg";
    }
  };

  return (
    <Wrapper isOpen={isOpen}>
      <Container>
        <Title>
          <h1>면접자 리스트</h1>
          {isEmail ? (
            <EmailButton onClick={() => navigate(redirectPage)}>
              <p>돌아가기</p>
            </EmailButton>
          ) : (
            <EmailButton onClick={() => navigate("/email-write")}>
              <p>이메일 보내기</p>
            </EmailButton>
          )}
        </Title>
        <Filter>
          <State>
            <h2>상태</h2>
            <StateContainer>
              {stateList.map((state, index) => (
                <StateItem
                  key={state}
                  onClick={() => setSelectedState(state)}
                  state={state}
                  selected={selectedState}
                >
                  <p>{state}</p>
                  {index < stateList.length - 1 && <Seperator />}
                </StateItem>
              ))}
            </StateContainer>
          </State>
          <Position>
            <h2>전형</h2>
            <PositionContainer>
              <PositionItem
                key="전체"
                selected={selectedPositions.length === 0}
              >
                <input
                  type="checkbox"
                  checked={selectedPositions.length === 0}
                  onChange={() => handlePositionChange("전체")}
                />
                <p>전체</p>
                {data2.length > 1 && <Seperator />}
              </PositionItem>
              {data2.map((pos, index) => (
                <PositionItem
                  key={pos.recruitingId}
                  selected={selectedPositions.includes(pos.jobTitle)}
                >
                  <input
                    type="checkbox"
                    checked={selectedPositions.includes(pos.jobTitle)}
                    onChange={() => handlePositionChange(pos.jobTitle)}
                  />
                  <p>{pos.jobTitle}</p>
                  {index < data2.length - 1 && <Seperator />}
                </PositionItem>
              ))}
            </PositionContainer>
          </Position>
        </Filter>
        <Applicant>
          {filteredApplicants.map((applicant: ApplicantType) => (
            <ApplicantItem
              key={applicant.applicationId}
              formResult={applicant.formResult}
            >
              <div onClick={() => openDocument(applicant)}>
                <OrderItem></OrderItem>
                <img
                  src={getIconByState(
                    applicant.formResult + applicant.meetingResult
                  )}
                  alt={`${applicant.formResult} 아이콘`}
                />
                <ApplicantName>{applicant.name}</ApplicantName>
                <ApplicantInfo>{applicant.positionName}</ApplicantInfo>
              </div>
              <div>
                <MeetingSchedule>
                  {applicant.formResult === "PASS" && (
                    <MeetingDate
                      disabled={
                        postInfo?.recruitmentStatus === "INTERVIEWED" ||
                        postInfo?.recruitmentStatus === "CLOSED"
                      }
                      type="date"
                      value={
                        applicant.meetingStartTime
                          ? applicant.meetingStartTime.split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        handleMeetingDateChange(
                          applicant.applicationId,
                          e.target.value
                        )
                      }
                    />
                  )}
                  {applicant.formResult === "PASS" && (
                    <MeetingTime
                      disabled={
                        postInfo?.recruitmentStatus === "INTERVIEWED" ||
                        postInfo?.recruitmentStatus === "CLOSED"
                      }
                      type="time"
                      value={
                        applicant.meetingStartTime
                          ? applicant.meetingStartTime
                              .split("T")[1]
                              .split(":")
                              .slice(0, 2)
                              .join(":")
                          : ""
                      }
                      onChange={(e) =>
                        handleMeetingTimeChange(
                          applicant.applicationId,
                          e.target.value
                        )
                      }
                    />
                  )}
                </MeetingSchedule>
              </div>
            </ApplicantItem>
          ))}
        </Applicant>
      </Container>
      {isDocumentOpen && <DocView applicant={selectedApplicant} type="MEET" />}
    </Wrapper>
  );
};

export default InterviewerList;

const Wrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  width: 400px;
  height: 100%;
  padding: 0px 8px 5px 0px;
  gap: 20px;
  flex-shrink: 0;
  background-color: #fcfafa;

  @media (max-width: ${breakpoints.mobile}) {
    display: ${({ isOpen }) => {
      if (isOpen) return "flex";
      return "none";
    }};
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 30px;
  margin-top: 50px;
`;

const Title = styled.div`
  display: flex;
  padding: 0px 58px 16px 18px;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
  flex-shrink: 0;
  margin-bottom: 8px;

  h1 {
    margin-bottom: 6px;
    color: #000000;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    letter-spacing: -0.56px;
  }
`;

const EmailButton = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 6px 8px;
  border-radius: 20px;
  border-radius: 24px;
  border: 1px solid #cc141d;
  cursor: pointer;

  &:hover {
    background: #fff3f3;
  }

  p {
    color: #cc141d;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
  }
`;

const Filter = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px 18px;
  padding-right: 40px;
  margin-bottom: 28px;
  flex-shrink: 0;
  gap: 9px;
`;

const Seperator = styled.div`
  width: 1px;
  height: 16px;
  background-color: #ddd;
  margin: 0px 12px;
`;

const State = styled.div`
  display: flex;
  align-items: center;
  color: #000000;
  font-family: Pretendard;

  h2 {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.28px;
  }
`;

const StateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 32px;
`;

const StateItem = styled.div<{ state: string; selected: string }>`
  display: flex;
  color: #767676;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.24px;
  margin-bottom: 3px;

  p {
    color: ${({ state, selected }) => {
      if (state === selected) return "#cc141d";
      return "#767676";
    }};
    cursor: pointer;
  }
`;

const Position = styled.div`
  display: flex;
  align-items: center;
  color: #000000;
  font-family: Pretendard;

  h2 {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.28px;
  }
`;

const PositionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 32px;
`;

const PositionItem = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 3px;

  input {
    margin-right: 3px;
    width: 15px;
    height: 15px;
    accent-color: #cc141d;
  }

  p {
    color: ${({ selected }) => {
      if (selected) return "#cc141d;";
      return "#767676";
    }};
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.24px;
  }
`;

const Applicant = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const OrderItem = styled.div`
  width: 11px;
`;

const ApplicantItem = styled.div<{ formResult: string }>`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 12px;
  border-bottom: 1px solid #eaeaea;
  color: #000000;
  font-family: Pretendard;
  opacity: ${({ formResult }) => {
    if (formResult === "FAIL") return "0.3";
    return "1";
  }};

  div {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const ApplicantName = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.32px;
  margin: 0px 16px;
  }
`;

const ApplicantInfo = styled.div`
  color: #555;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.28px;
`;

const MeetingSchedule = styled.div`
  display: flex;
  flex-direction: column;
  color: #555;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  letter-spacing: -0.28px;
`;

const MeetingDate = styled.input`
  border: 1px solid #fcfafa;
  border-radius: 4px;
  padding: 2px 2.5px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  width: 115px;
  background-color: #fcfafa;
  &:hover {
    border-color: #88181c;
  }
`;

const MeetingTime = styled.input`
  border: 1px solid #fcfafa;
  border-radius: 4px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  padding: 2px 2.5px;
  background-color: #fcfafa;
  &:hover {
    border-color: #88181c;
  }
`;
