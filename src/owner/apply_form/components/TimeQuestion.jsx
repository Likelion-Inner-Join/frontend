import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Time = ({ questionData, updateQuestion }) => {
  const [question, setQuestion] = useState(questionData.question || ""); // 질문 내용 상태
  const [description, setDescription] = useState(
    questionData.description || ""
  ); // 질문 설명 상태
  const [selectedTime, setSelectedTime] = useState(""); // 선택된 시간 상태

  // questionData 변경 시 상태 초기화
  useEffect(() => {
    setQuestion(questionData.question || "");
    setDescription(questionData.description || "");
    setSelectedTime(questionData.selectedTime || "");
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

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setSelectedTime(value);
    updateQuestion(questionData.id, { selectedTime: value });
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

        <TimeInput
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
        />
      </Body>
    </QuestionContainer>
  );
};

export default Time;

// 스타일 컴포넌트
const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const TimeInput = styled.input`
  padding: 10px;
  font-size: 16px; /* 다른 입력 필드와 동일한 글씨 크기 */
  font-family: inherit; /* 부모 요소의 글꼴 스타일 상속 */
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

const TimeFormat = styled.div`
  font-size: 14px;
  color: #888888;
  margin-top: 8px;
`;
