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

const CheckBoxForm = ({ quest }: FormProps) => {
  return (
    <div>
      {quest?.list?.map((item: string, index: number) => (
        <ContentBox key={index}>
          <CheckBox>
            <img
              src={
                answerData.answers.some(
                  (answerItem) =>
                    answerItem.questionId === quest.questionid &&
                    answerItem.answer === item
                )
                  ? "/images/manager/checked.svg"
                  : "/images/manager/unchecked.svg"
              }
              alt={item}
              style={{ width: "100%", height: "100%" }}
            />
          </CheckBox>
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

const CheckBox = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
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

export default CheckBoxForm;
