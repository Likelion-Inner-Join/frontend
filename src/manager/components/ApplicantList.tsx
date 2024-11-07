import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Applicant {
  id: string;
  name: string;
  firstState: string;
  secondState: string;
  position: string;
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

const ApplicantList = ({ data1, data2, isEmail }: ApplicantListProps) => {
  const [selectedState, setSelectedState] = useState("전체");
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const navigate = useNavigate();

  const filteredApplicants = data1.filter((applicant) => {
    const matchState =
      selectedState === "전체" ||
      (selectedState === "합격" && applicant.firstState === "pass") ||
      (selectedState === "불합격" && applicant.firstState === "fail") ||
      (selectedState === "미평가" && applicant.firstState === "null");

    const matchPosition =
      selectedPositions.length === 0 ||
      selectedPositions.includes(applicant.position);

    return matchState && matchPosition;
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

  const getIconByState = (state: string) => {
    switch (state) {
      case "pass":
        return "/images/manager/pass.svg";
      case "fail":
        return "/images/manager/fail.svg";
      default:
        return "/images/manager/neutral.svg";
    }
  };

  return (
    <Wrapper>
      <Title>
        <h1>지원자 리스트</h1>
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
          <ApplicantItem key={applicant.id}>
            <div>
              <img
                src={getIconByState(applicant.firstState)}
                alt={`${applicant.firstState} 아이콘`}
              />
              <ApplicantName>{applicant.name}</ApplicantName>
              <ApplicantPosition>{applicant.position}</ApplicantPosition>
            </div>
            {isEmail ? (
              <div>
                <AddButton>
                  <img
                    src="/images/manager/directionBt.svg"
                    alt="수신자 추가 버튼"
                  />
                </AddButton>
              </div>
            ) : (
              <DocButton>
                <img
                  src="/images/manager/directionBt.svg"
                  alt="서류 보기 버튼"
                />
              </DocButton>
            )}
          </ApplicantItem>
        ))}
      </Applicant>
    </Wrapper>
  );
};

export default ApplicantList;

const Wrapper = styled.div`
  display: flex;
  width: 450px;
  height: 100vh;
  flex-direction: column;
  background-color: #fcfafa;
`;

const Title = styled.div`
  display: flex;
  width: 320px;
  height: 76px;
  justify-content: space-between;
  align-items: flex-end;
  margin: 16px 65px;
  flex-shrink: 0;

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
  gap: 5px;
  align-items: center;
  padding: 8px 12px;
  border-radius: 20px;
  background: #fff;
  cursor: pointer;

  p {
    color: #88181c;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.32px;
  }
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0px 65px;
  margin-bottom: 32px;
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
  overflow-y: auto;
  overflow-x: hidden;
  justify-content: space-between;
  margin-left: 65px;
  margin-right: 8px;
  margin-bottom: 10px;
  padding-right: 57px;
`;

const ApplicantItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 12px;
  border-bottom: 1px solid #eaeaea;
  color: #000000;
  font-family: Pretendard;
  cursor: pointer;

  div {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;

const ApplicantName = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.32px;
`;

const ApplicantPosition = styled.div`
  color: #555;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.28px;
`;

const DocButton = styled.div``;
const AddButton = styled.div``;
