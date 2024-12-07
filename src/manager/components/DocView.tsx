import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { documentData } from "../mock/DocumentData";
import TextForm from "./TextForm";
import DropDownForm from "./DropDownForm";
import CheckBoxForm from "./CheckBoxForm";
import { answerData } from "../mock/DocumentData";
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

interface Question {
  questionid: number;
  number: number;
  question: string;
  type: string;
  list?: string[];
}

interface DocViewProps {
  applicant?: Applicant;
}

const DocView = ({ applicant }: DocViewProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [questionList, setQuestionList] = useState<Question[]>();
  const [formResult, setFormResult] = useState(applicant?.formResult || "null");
  const [currentScore, setCurrentScore] = useState(answerData);
  const [totalScore, setTotalScore] = useState(applicant?.formScore);

  const closeDocument = () => {
    searchParams.delete("apply");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (documentData.length > 0) {
      setQuestionList(documentData[0].questionList);
    }

    console.log(questionList);
  }, []);

  const renderQuestionAnswer = (question: Question) => {
    switch (question.type) {
      case "text":
        return <TextForm quest={question} />;
      case "dropdown":
        return <DropDownForm quest={question} />;
      case "checkbox":
        return <CheckBoxForm quest={question} />;
      default:
        return <div>알 수 없는 질문 유형</div>;
    }
  };

  const handleFormResultChange = (newResult: string) => {
    setFormResult(newResult);
  };

  const calculateTotalScore = (
    scores: { questionId: number; score: number }[]
  ) => {
    return scores.reduce((sum, ans) => sum + ans.score, 0);
  };

  const getScoreByQuestionId = (questionId: number) => {
    const answer = currentScore.answers.find(
      (ans) => ans.questionId === questionId
    );
    return answer?.score || 0;
  };

  const handleScoreChange = (questionId: number, newScore: number) => {
    setCurrentScore((prevState) => {
      const updatedScores = prevState.answers.map((ans) =>
        ans.questionId === questionId ? { ...ans, score: newScore } : ans
      );
      const newTotalScore = calculateTotalScore(updatedScores); // 총점 계산
      setTotalScore(newTotalScore); // 총점 상태 업데이트
      return { ...prevState, answers: updatedScores };
    });
  };

  return (
    <Wrapper>
      <DocumentPopUp>
        <CloseButton>
          <img
            src="/images/manager/cancel.svg"
            alt="닫기"
            onClick={() => closeDocument()}
          />
        </CloseButton>
        <TitleContainer>
          <Title>{applicant?.name}님의 지원서</Title>
          <ApplicantInfo>
            {applicant?.school} &nbsp; | &nbsp;{applicant?.major} &nbsp;| &nbsp;
            {applicant?.studentNumber} &nbsp;| &nbsp; {applicant?.phoneNum}{" "}
            &nbsp; | &nbsp;
            {applicant?.email}
          </ApplicantInfo>
        </TitleContainer>
        <ResultContainer>
          <p>합불 결과</p>
          <ResultTab>
            <Result onClick={() => handleFormResultChange("null")}>
              <CheckBox selected={formResult === "null"} />
              <p>미평가</p>
            </Result>
            <Result onClick={() => handleFormResultChange("pass")}>
              <CheckBox selected={formResult === "pass"} />
              <p>합격</p>
            </Result>
            <Result onClick={() => handleFormResultChange("fail")}>
              <CheckBox selected={formResult === "fail"} />
              <p>불합격</p>
            </Result>
          </ResultTab>
        </ResultContainer>
        <ScoreContainer>
          <p>지원서 채점</p>
          <TotalScore>
            총점 <p>{totalScore}</p>점
          </TotalScore>
        </ScoreContainer>
        <ContentContainer>
          {questionList?.map((quest, questionid) => (
            <Content>
              <Question key={questionid}>
                {quest.number}. &nbsp;{quest.question}
              </Question>
              <Answer>{renderQuestionAnswer(quest)}</Answer>
              <Score>
                <p>채점</p>
                <input
                  type="number"
                  defaultValue={getScoreByQuestionId(quest.questionid)}
                  onChange={(e) =>
                    handleScoreChange(
                      quest.questionid,
                      parseInt(e.target.value, 10) || 0
                    )
                  }
                />
                <p>점</p>
              </Score>
            </Content>
          ))}
        </ContentContainer>
      </DocumentPopUp>
    </Wrapper>
  );
};

export default DocView;

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  left: 400px;
  justify-content: center;
  align-items: flex-end;
  width: calc(100% - 400px);
  height: 100vh;
  background: rgba(68, 68, 68, 0.4);
  z-index: 1;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  margin-right: 10px;
  cursor: pointer;
  transition: transform 0.1s ease;

  :hover& {
    transform: scale(1.05);
  }
`;

const DocumentPopUp = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 90%;
  align-items: flex-start;
  padding: 20px 10px 20px 30px;
  border-radius: 8px 8px 0px 0px;
  background: #fcfafa;
`;

const TitleContainer = styled.div`
  display: flex;
  padding: 0px 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.56px;
`;

const ResultContainer = styled.div`
  display: flex;
  margin-right: 10px;
  padding: 0px 8px;
  padding-bottom: 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-bottom: solid 1px #ddd;

  p {
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.4px;
  }
`;

const ResultTab = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const CheckBox = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 100px;

  border: ${({ selected }) => {
    if (selected) return "9px solid #CC141D";
    return "1px solid #ddd";
  }};

  padding: ${({ selected }) => {
    if (selected) return "3px";
    return "11px";
  }};

  cursor: pointer;
`;

const Result = styled.div`
  display: flex;
  padding: 4px 0px;
  align-items: center;
  gap: 8px;

  p {
    color: var #222;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 24px */
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  margin-right: 10px;
  padding: 0px 8px;
  padding-top: 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  p {
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.4px;
  }
`;

const TotalScore = styled.div`
  display: flex;
  align-items: center;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.32px;

  p {
    margin-left: 6px;
    margin-right: 3px;
    color: #606060;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.4px;
  }
`;

const ApplicantInfo = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  gap: 16px;
  align-self: stretch;
  flex-wrap: wrap;
  color: #424242;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.32px;
`;

const ContentContainer = styled.div`
  display: flex;
  margin-top: 15px;
  padding-right: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Content = styled.div`
  display: flex;
  padding: 20px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  border-radius: 14px;
  background: #fff;
`;

const Question = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  color: #222;
  padding-bottom: 12px;
  border-bottom: 1px solid #eaeaea;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

const Answer = styled.div`
  display: flex;
  gap: 16px;
  padding-top: 0px;
`;

const Score = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;

  p {
    color: #000;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 16.8px */
  }

  input {
    margin-left: 20px;
    margin-right: 5px;
    padding-left: 5px;
    display: flex;
    width: 50px;
    height: 25px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 8px;
    background: #f0f0f0;

    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
  }
`;
