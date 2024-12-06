import React, { useState } from "react";
import styled from "styled-components";

const QuestionTypeToggle = ({ onAddQuestion }) => {
  const [showOptions, setShowOptions] = useState(false);

  // 질문 형식을 클릭하면 추가하고 토글 창 닫기
  const handleAddQuestion = (type) => {
    onAddQuestion(type); // 질문 형식을 부모 컴포넌트에 전달
    setShowOptions(false); // 토글 창 닫기
  };

  return (
    <Container>
      {/* 질문 추가 버튼 */}
      <AddButton onClick={() => setShowOptions((prev) => !prev)}>
        질문 추가
      </AddButton>
      {showOptions && (
        <Options>
          <Option onClick={() => handleAddQuestion("multiple_choice")}>
            객관식
          </Option>
          <Option onClick={() => handleAddQuestion("checkbox")}>
            체크박스
          </Option>
          <Option onClick={() => handleAddQuestion("short_answer")}>
            단답형
          </Option>
          <Option onClick={() => handleAddQuestion("paragraph")}>서술형</Option>
          <Option onClick={() => handleAddQuestion("date")}>날짜</Option>
          <Option onClick={() => handleAddQuestion("time")}>시간</Option>
        </Options>
      )}
    </Container>
  );
};

export default QuestionTypeToggle;

const Container = styled.div`
  position: relative;
`;

const AddButton = styled.button`
  background-color: #b10d15;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #9c0c13;
  }
`;

const Options = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const Option = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;
