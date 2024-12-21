import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { documentDetailData } from "../mock/DocumentData";
import { QuestionType, AnswerType } from "../global/types";

interface FormProps {
  quest?: QuestionType;
}

const TextForm = ({ quest }: FormProps) => {
  const [answerList, setAnswerList] = useState<AnswerType[]>();

  useEffect(() => {
    getApplicantDetails();
  }, []);

  const getApplicantDetails = async () => {
    try {
      //const res = await GET(`application/${application_id}`); API
      const res = documentDetailData;

      if (res.isSuccess) {
        setAnswerList(res.result.answers);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const answerItem = answerList?.find(
    (answer) => answer.questionId === quest?.questionId
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
