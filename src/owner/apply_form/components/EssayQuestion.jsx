import React from "react";
import styled from "styled-components";

const EssayQuestion = () => {
  return (
    <QuestionContainer>
      <Body>
        <Input placeholder="질문 입력*" isQuestionInput />

        <Input placeholder="설명 입력" />
        <TextLimit>지원자의 서술형 답변 (2000자 이내)</TextLimit>
      </Body>
    </QuestionContainer>
  );
};

export default EssayQuestion;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const QuestionType = styled.div``;

const TypeButton = styled.button`
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
`;

const RequiredToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const OptionsMenu = styled.div`
  font-size: 20px;
  cursor: pointer;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

const TextLimit = styled.div`
  font-size: 12px;
  color: #888888;
  margin-top: 8px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: ${(props) => (props.isQuestionInput ? "18px" : "16px")};
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;
