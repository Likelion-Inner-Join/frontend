import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { documentData } from "../mock/DocumentData";

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

  const closeDocument = () => {
    searchParams.delete("apply"); // 'tab' 파라미터 삭제
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (documentData.length > 0) {
      setQuestionList(documentData[0].questionList);
    }
  }, []);

  const renderQuestionAnswer = (question: Question) => {
    switch (question.type) {
      case "text":
        return <input type="text" placeholder="답변을 입력하세요" />;
      case "dropdown":
        return (
          <select>
            {question.list?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <div>
            {question.list?.map((item, index) => (
              <label key={index}>
                <input type="checkbox" value={item} /> {item}
              </label>
            ))}
          </div>
        );
      default:
        return <div>알 수 없는 질문 유형</div>;
    }
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
            {applicant?.school} | {applicant?.major} |{" "}
            {applicant?.studentNumber} | {applicant?.phoneNum} |{" "}
            {applicant?.email}
          </ApplicantInfo>
        </TitleContainer>
        <ContentContainer>
          {questionList?.map((quest, questionid) => (
            <Content>
              <Question key={questionid}>
                {quest.number}.{quest.question}
              </Question>
              <Answer>{renderQuestionAnswer(quest)}</Answer>
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
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  align-self: flex-end;
  margin-right: 10px;
  cursor: pointer;
`;

const DocumentPopUp = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 95%;
  align-items: flex-start;
  padding: 20px 10px 20px 30px;
  border-radius: 8px;
  background: #fcfafa;
`;

const TitleContainer = styled.div`
  display: flex;
  padding: 0px 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
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
  margin-top: 30px;
  padding-right: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 34px;
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
