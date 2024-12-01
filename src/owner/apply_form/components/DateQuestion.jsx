import React from "react";
import styled from "styled-components";

const DateQuestion = ({ questionData, updateQuestion }) => {
  const handleInputChange = (e) => {
    updateQuestion(questionData.id, { question: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    updateQuestion(questionData.id, { description: e.target.value });
  };

  return (
    <Container>
      <InputField
        type="text"
        placeholder="질문 입력*"
        isQuestionInput
        value={questionData.question}
        onChange={handleInputChange}
      />
      <InputField
        type="text"
        placeholder="설명 입력"
        value={questionData.description}
        onChange={handleDescriptionChange}
      />
      <Placeholder>______년 __월 __일</Placeholder>
    </Container>
  );
};

export default DateQuestion;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputField = styled.input`
  padding: 10px;
  font-size: ${(props) => (props.isQuestionInput ? "18px" : "16px")};
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const Placeholder = styled.div`
  padding: 10px;
  font-size: 16px;
  color: #888;
  border: 1px dashed #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  text-align: center;
`;
