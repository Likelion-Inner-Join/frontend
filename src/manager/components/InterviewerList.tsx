import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import DocView from "./DocView";

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

interface Position {
  id: string;
  name: string;
}

interface ApplicantListProps {
  data1: Applicant[];
  data2: Position[];
  isEmail: boolean;
}

const stateList = ["전체", "합격", "불합격", "미평가"];

const InterviewerList = ({ data1, data2, isEmail }: ApplicantListProps) => {
  const [selectedState, setSelectedState] = useState("전체");
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant>();
  const [searchParams] = useSearchParams();
  const currApplyID = searchParams.get("apply");
  const navigate = useNavigate();

  const filteredApplicants = data1
    .filter((applicant) => {
      const matchState =
        selectedState === "전체" ||
        (selectedState === "합격" &&
          applicant.formResult === "pass" &&
          applicant.meetingResult === "pass") ||
        (selectedState === "불합격" &&
          (applicant.formResult === "fail" ||
            applicant.meetingResult === "fail")) ||
        (selectedState === "미평가" &&
          applicant.formResult === "pass" &&
          applicant.meetingResult === "null");

      const matchPosition =
        selectedPositions.length === 0 ||
        selectedPositions.includes(applicant.position);

      return matchState && matchPosition;
    })
    .sort((a, b) => {
      if (a.formResult === "fail" && b.formResult !== "fail") return 1;
      if (a.formResult !== "fail" && b.formResult === "fail") return -1;
      return 0;
    });

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

  const openDocument = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setIsDocumentOpen(true);
    navigate(`?apply=${applicant.applicationId}`);
  };

  const parseDateTime = (dateTimeStr: string) => {
    const [datePart, timePart] = dateTimeStr.split(" ");
    const [year, month, day] = datePart.split("-");
    const [hour, minute, second] = timePart.split(":");

    return {
      year,
      month: parseInt(month, 10),
      day: parseInt(day, 10),
      hour,
      minute,
      second,
    };
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

  const getIconByState = (state: string) => {
    switch (state) {
      case "passpass":
        return "/images/manager/pass.svg";
      case "failfail":
        return "/images/manager/fail.svg";
      case "failnull":
        return "/images/manager/fail.svg";
      case "passfail":
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
              <img src="/images/manager/mail.svg" alt="이메일 아이콘" />
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
                  {index < stateList.length - 1 && <div>|</div>}
                </StateItem>
              ))}
            </StateContainer>
          </State>
          <Position>
            <h2>전형</h2>
            <PositionContainer>
              <PositionItem key="전체">
                <input
                  type="checkbox"
                  checked={selectedPositions.length === 0}
                  onChange={() => handlePositionChange("전체")}
                />
                <p>전체</p>
              </PositionItem>
              {data2.map((pos, index) => (
                <PositionItem key={pos.id}>
                  <p>|</p>
                  <input
                    type="checkbox"
                    checked={selectedPositions.includes(pos.name)}
                    onChange={() => handlePositionChange(pos.name)}
                  />
                  <p>{pos.name}</p>
                </PositionItem>
              ))}
            </PositionContainer>
          </Position>
        </Filter>
        <Applicant>
          {filteredApplicants.map((applicant: Applicant) => (
            <ApplicantItem
              key={applicant.applicationId}
              onClick={() => openDocument(applicant)}
              formResult={applicant.formResult}
            >
              <div>
                <OrderItem></OrderItem>
                <img
                  src={getIconByState(
                    applicant.formResult + applicant.meetingResult
                  )}
                  alt={`${applicant.formResult} 아이콘`}
                />
                <ApplicantName>{applicant.name}</ApplicantName>
                <ApplicantInfo>{applicant.position}</ApplicantInfo>
              </div>
              <div>
                {(() => {
                  const meetTime = parseDateTime(applicant.meetingStartTime);
                  return (
                    <MeetingSchedule>
                      <MeetingDate>
                        {`${meetTime.year}년 ${meetTime.month}월 ${meetTime.day}일`}
                      </MeetingDate>
                      <MeetingTime>
                        {`${meetTime.hour}:${meetTime.minute}`}
                      </MeetingTime>
                    </MeetingSchedule>
                  );
                })()}
                {isEmail ? (
                  <AddButton>
                    <img
                      src="/images/manager/directionBt.svg"
                      alt="수신자 추가 버튼"
                    />
                  </AddButton>
                ) : (
                  <DocButton>
                    <img
                      src="/images/manager/directionBt.svg"
                      alt="서류 보기 버튼"
                    />
                  </DocButton>
                )}
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
  padding: 8px 12px;
  border-radius: 20px;
  border-radius: 20px;
  border: 1px solid #88181c;
  background: #fff;
  cursor: pointer;

  &:hover {
    background: #fff3f3;
  }

  p {
    color: #88181c;
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
  flex-direction: column;
  width: 320px;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px 18px;
  padding-right: 40px;
  margin-bottom: 28px;
  flex-shrink: 0;
  gap: 12px;
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
  gap: 12px;
  align-items: center;
  margin-left: 32px;
`;

const StateItem = styled.div<{ state: string; selected: string }>`
  display: flex;
  gap: 12px;
  color: #767676;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.24px;

  p {
    color: ${({ state, selected }) => {
      if (state === selected) return "#88181C";
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
  align-items: center;
  margin-left: 32px;
`;

const PositionItem = styled.div`
  display: flex;

  input {
    margin-right: 3px;
  }

  p {
    color: #767676;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.24px;
    margin-right: 12px;
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
  cursor: pointer;
  opacity: ${({ formResult }) => {
    if (formResult === "fail") return "0.3";
    return "1";
  }};

  div {
    display: flex;
    align-items: center;
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
  transition: transform 0.3s ease; 
  
  ${ApplicantItem}:hover & {
    transform: translateX(5px);
`;

const MeetingDate = styled.div``;

const MeetingTime = styled.div`
  align-self: flex-end;
`;

const AddButton = styled.div`
  margin-left: 5px;
`;
