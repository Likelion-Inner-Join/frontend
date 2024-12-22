import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { documentDetailData } from "../mock/DocumentData";
import { QuestionType, AnswerType } from "../global/types";

interface FormProps {
  quest?: QuestionType;
  answerList: AnswerType[];
}

const DropDownForm = ({ quest, answerList }: FormProps) => {
  return (
    <div>
      {quest?.list?.map((item: string, index: number) => (
        <ContentBox>
          <CheckBox
            selected={
              !!answerList?.some(
                (ans) =>
                  ans.questionId === quest?.questionId && ans.answer === item
              )
            }
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
  justify-content: center;
  align-items: center;
  gap: 10px;
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
