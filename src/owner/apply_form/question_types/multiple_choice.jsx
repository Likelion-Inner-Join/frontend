import React, { useState } from "react";
import styled from "styled-components";

const MultipleChoice = () => {
  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  return (
    <QuestionContainer>
      <Input placeholder="객관식 질문 입력" />
      <OptionContainer>
        {options.map((option, index) => (
          <Option key={index}>
            <OptionInput
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`옵션 ${index + 1}`} // 옵션 번호를 placeholder로 표시
            />
            {options.length > 1 && (
              <RemoveButton onClick={() => removeOption(index)}>×</RemoveButton>
            )}
          </Option>
        ))}
        <AddOptionButton onClick={addOption}>옵션 추가</AddOptionButton>
      </OptionContainer>
    </QuestionContainer>
  );
};

export default MultipleChoice;

const QuestionContainer = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 90%;
  font-family: inherit;
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  &::placeholder {
    font-family: inherit;
  }
`;
const OptionContainer = styled.div`
  margin-top: 10px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const OptionInput = styled.input`
  width: 80%;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const RemoveButton = styled.button`
  background: none;
  color: #888;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: 5px;
  padding: 0;
  &:hover {
    color: #555;
  }
`;

const AddOptionButton = styled.button`
  background-color: #5bc0de;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;
  &:hover {
    background-color: #31b0d5;
  }
`;
