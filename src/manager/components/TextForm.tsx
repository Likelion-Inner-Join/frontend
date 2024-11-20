import React from "react";
import styled from "styled-components";
import { answerData } from "../mock/DocumentData";

interface FormProps {
  quest?: Question;
}

interface Question {
  questionid: number;
  number: number;
  question: string;
  type: string;
  list?: string[];
}

const TextForm = ({ quest }: FormProps) => {
  const answerItem = answerData.answers.find(
    (answer) => answer.questionId === quest?.questionid
  );

  return (
    <div>
      <ContentBox>
        <Content>{answerItem ? answerItem.answer : "답변이 없습니다."}</Content>
      </ContentBox>
    </div>
  );
};

const ContentBox = styled.div`
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 6px;
  background: #f9f9f9;
`;

const Content = styled.div`
  display: flex;
  padding: 4px 0px;
  align-items: center;
  gap: 8px;
  color: #222;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
`;

export default TextForm;
