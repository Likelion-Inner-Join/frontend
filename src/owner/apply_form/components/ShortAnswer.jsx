import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ShortAnswer = ({ questionData, updateQuestion }) => {
  const [question, setQuestion] = useState(questionData.question || ""); // 질문 내용 상태
  const [description, setDescription] = useState(
    questionData.description || ""
  ); // 질문 설명 상태

  // questionData 변경 시 상태 동기화
  useEffect(() => {
    setQuestion(questionData.question || "");
    setDescription(questionData.description || "");
  }, [questionData]);

  const handleQuestionChange = (field, value) => {
    if (field === "question") {
      setQuestion(value);
    } else if (field === "description") {
      setDescription(value);
    }
    updateQuestion(questionData.id, { [field]: value });
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="질문 입력*"
        value={question}
        onChange={(e) => handleQuestionChange("question", e.target.value)}
      />
      <Input
        type="text"
        placeholder="설명 입력"
        value={description}
        onChange={(e) => handleQuestionChange("description", e.target.value)}
      />
      <Placeholder>지원자의 단답형 답변 (200자 이내)</Placeholder>
    </Container>
  );
};

export default ShortAnswer;

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const Placeholder = styled.div`
  font-size: 12px;
  color: #888888;
  margin-top: 8px;
`;
