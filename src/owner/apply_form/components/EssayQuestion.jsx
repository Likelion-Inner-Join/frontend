import React, { useState, useEffect } from "react";
import styled from "styled-components";

const EssayQuestion = ({ questionData, updateQuestion }) => {
  const [question, setQuestion] = useState(questionData.question || ""); // 질문 내용 상태
  const [description, setDescription] = useState(
    questionData.description || ""
  ); // 질문 설명 상태

  // questionData 변경 시 상태 동기화
  useEffect(() => {
    setQuestion(questionData.question || "");
    setDescription(questionData.description || "");
  }, [questionData]);

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    setQuestion(value);
    updateQuestion(questionData.id, { question: value });
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    updateQuestion(questionData.id, { description: value });
  };

  return (
    <QuestionContainer>
      <Body>
        <Input
          placeholder="질문 입력*"
          value={question}
          onChange={handleQuestionChange}
        />

        <Input
          placeholder="설명 입력"
          value={description}
          onChange={handleDescriptionChange}
        />
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
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;
