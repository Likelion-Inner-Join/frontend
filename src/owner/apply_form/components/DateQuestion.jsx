import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Date = ({ questionData, updateQuestion }) => {
  const [question, setQuestion] = useState(questionData.question || ""); // 질문 내용 상태
  const [description, setDescription] = useState(
    questionData.description || ""
  ); // 질문 설명 상태
  const [selectedDate, setSelectedDate] = useState(""); // 선택된 날짜 상태

  // questionData 변경 시 상태 초기화
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

  const handleDateChange = (e) => {
    const value = e.target.value;
    setSelectedDate(value);
    updateQuestion(questionData.id, { selectedDate: value });
  };

  return (
    <Container>
      <InputField
        type="text"
        placeholder="질문 입력*"
        value={question}
        onChange={handleQuestionChange}
      />
      <InputField
        type="text"
        placeholder="설명 입력"
        value={description}
        onChange={handleDescriptionChange}
      />
      <DateInput type="date" value={selectedDate} onChange={handleDateChange} />
    </Container>
  );
};

export default Date;

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputField = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const DateInput = styled.input`
  padding: 10px;
  font-size: 16px; /* 다른 입력 필드와 동일한 글씨 크기 */
  font-family: inherit; /* 부모 요소의 글꼴을 상속받도록 설정 */
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  background-color: #f9f9f9;
  color: #555;
  cursor: pointer;

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;
