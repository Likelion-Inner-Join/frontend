import React, { useState } from "react";
import styled from "styled-components";

const MultipleChoice = ({ questionData, updateQuestion }) => {
  const [options, setOptions] = useState(questionData.options || [""]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    updateQuestion(questionData.id, { options: newOptions });
  };

  const handleQuestionChange = (field, value) => {
    updateQuestion(questionData.id, { [field]: value });
  };

  const addOption = () => {
    if (options.length < 10) {
      const newOptions = [...options, ""];
      setOptions(newOptions);
      updateQuestion(questionData.id, { options: newOptions });
    }
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="질문 입력*"
        isQuestionInput
        value={questionData.question || ""}
        onChange={(e) => handleQuestionChange("question", e.target.value)}
      />
      <Input
        type="text"
        placeholder="설명 입력"
        value={questionData.description || ""}
        onChange={(e) => handleQuestionChange("description", e.target.value)}
      />
      {options.map((option, index) => (
        <Option key={index}>
          <RadioCircle />
          <OptionInput
            type="text"
            placeholder={`항목${index + 1} 입력`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        </Option>
      ))}
      <AddOptionButton onClick={addOption}>항목 추가</AddOptionButton>
    </Container>
  );
};

export default MultipleChoice;

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: ${(props) => (props.isQuestionInput ? "18px" : "16px")};
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const RadioCircle = styled.div`
  width: 16px;
  height: 16px;
  border: 1px solid #ddd;
  border-radius: 50%;
  margin-right: 10px;
`;

const OptionInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const AddOptionButton = styled.button`
  display: block;
  margin-top: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;
