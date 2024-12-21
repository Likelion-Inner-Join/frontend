import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import DocView from "./DocView";
import { ApplicantType } from "../global/types";

interface Position {
  recruitingId: number;
  formId: number;
  jobTitle: string;
}
interface ApplicantListProps {
  data1: ApplicantType[];
  data2: Position[];
  isEmail: boolean;
}

const stateList = ["전체", "합격", "불합격", "미평가"];

const InterviewerList = ({ data1, data2, isEmail }: ApplicantListProps) => {
  const [selectedState, setSelectedState] = useState("전체");
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantType>();
  const [searchParams] = useSearchParams();
  const [filteredApplicants, setFilteredApplicants] = useState<ApplicantType[]>(
    []
  );

  const currApplyID = searchParams.get("apply");
  const navigate = useNavigate();

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

  function parseISODateTime(isoString: string) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return { year, month, day, hours, minutes };
  }

  const handleMeetingDateChange = (applicationId: number, value: string) => {
    setFilteredApplicants((prev) =>
      prev.map((applicant) =>
        applicant.applicationId === applicationId
          ? {
              ...applicant,
              meetingStartTime: `${value} ${
                applicant.meetingStartTime.split(" ")[1]
              }`,
            }
          : applicant
      )
    );
  };

  const handleMeetingTimeChange = (applicationId: number, value: string) => {
    setFilteredApplicants((prev) =>
      prev.map((applicant) =>
        applicant.applicationId === applicationId
          ? {
              ...applicant,
              meetingStartTime: `${
                applicant.meetingStartTime.split(" ")[0]
              } ${value}`,
            }
          : applicant
      )
    );
  };

  useEffect(() => {
    if (currApplyID) {
      const selectedApplicant = data1.find(
        (applicant) => String(applicant.applicationId) === currApplyID
      );
      setSelectedApplicant(selectedApplicant);
      setIsDocumentOpen(true);
    } else setIsDocumentOpen(false);
  }, [currApplyID]);

  useEffect(() => {
    const meetFilteredApplicants = data1
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
  }, [data1, selectedState, selectedPositions]);

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
    <Wrapper>
      <Container>
        <Title>
          <h1>면접자 리스트</h1>
          {isEmail ? (
            <div></div>
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
                  <MeetingDate
                    type="date"
                    // value={applicant.meetingStartTime.split(" ")[0]}
                    value={`${
                      parseISODateTime(applicant.meetingStartTime).year
                    }-${String(
                      parseISODateTime(applicant.meetingStartTime).month
                    ).padStart(2, "0")}-${String(
                      parseISODateTime(applicant.meetingStartTime).day
                    ).padStart(2, "0")}`}
                    onChange={(e) =>
                      handleMeetingDateChange(
                        applicant.applicationId,
                        e.target.value
                      )
                    }
                  />
                  <MeetingTime
                    type="time"
                    value={`${String(
                      parseISODateTime(applicant.meetingStartTime).hours
                    ).padStart(2, "0")}:${String(
                      parseISODateTime(applicant.meetingStartTime).minutes
                    ).padStart(2, "0")}`}
                    onChange={(e) =>
                      handleMeetingTimeChange(
                        applicant.applicationId,
                        e.target.value
                      )
                    }
                  />
                </MeetingSchedule>
              </div>
            </ApplicantItem>
          ))}
        </Applicant>
      </Container>
      {isDocumentOpen && <DocView applicant={selectedApplicant} />}
    </Wrapper>
  );
};

export default InterviewerList;

const Wrapper = styled.div`
  display: flex;
  width: 400px;
  height: 100vh;
  padding: 0px 8px 5px 0px;
  gap: 20px;
  flex-shrink: 0;
  background-color: #fcfafa;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fcfafa;
  margin-left: 30px;
`;

const Title = styled.div`
  display: flex;
  height: 108px;
  padding: 40px 58px 16px 18px;
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
    if (formResult === "fail") return "0.3";
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

const ApplicantPosition = styled.div`
  color: #555;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.28px;
  transition: transform 0.3s ease; 
  
  ${ApplicantItem}:hover & {
    transform: translateX(5px); 
`;

const DocButton = styled.div`
  margin-left: 5px;
  transition: transform 0.3s ease;

  ${ApplicantItem}:hover & {
    transform: translateX(5px);
  }
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

const AddButton = styled.div`
  margin-left: 5px;
`;
