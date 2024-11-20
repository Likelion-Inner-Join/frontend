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

const DropDownForm = ({ quest }: FormProps) => {
  return (
    <div>
      {quest?.list?.map((item: string, index: number) => (
        <ContentBox>
          <CheckBox
            selected={answerData.answers.some(
              (answerItem) =>
                answerItem.questionId === quest.questionid &&
                answerItem.answer === item
            )}
          />
          <Content>{item}</Content>
        </ContentBox>
      ))}
    </div>
  );
};

const ContentBox = styled.div`
  display: flex;
  padding: 4px 0px;
  align-items: center;
  gap: 8px;
`;

const CheckBox = styled.div<{ selected: boolean }>`
  display: flex;
  width: 24px;
  height: 24px;
  padding: 9px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;

  border: ${({ selected }) => {
    if (selected) return "none";
    return "1px solid #ddd";
  }};

  background-color: ${({ selected }) => {
    if (selected) return "#cc141d";
    return "#fff";
  }};
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

export default DropDownForm;
