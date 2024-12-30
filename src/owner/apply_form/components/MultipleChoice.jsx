import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Radio = ({ questionData, updateQuestion }) => {
  const [options, setOptions] = useState(questionData.options || ["", ""]);
  const [question, setQuestion] = useState(questionData.question || ""); // 질문 내용 상태
  const [description, setDescription] = useState(
    questionData.description || ""
  ); // 질문 설명 상태
  const [selectedOptions, setSelectedOptions] = useState([]); // 선택된 항목 상태 (복수 선택 가능)

  // questionData 변경 시 상태 초기화
  useEffect(() => {
    setOptions(questionData.options || ["", ""]);
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

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    updateQuestion(questionData.id, { options: newOptions });
  };

  const handleOptionSelect = (index) => {
    setSelectedOptions(
      (prevSelected) =>
        prevSelected.includes(index)
          ? prevSelected.filter((i) => i !== index) // 선택 취소
          : [...prevSelected, index] // 선택 추가
    );
  };

  const addOption = () => {
    if (options.length < 10) {
      const newOptions = [...options, ""];
      setOptions(newOptions);
      updateQuestion(questionData.id, { options: newOptions });
    }
  };

  const removeOption = (index) => {
    if (options.length > 1) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      updateQuestion(questionData.id, { options: newOptions });

      // 삭제된 옵션이 선택된 상태라면 선택 초기화
      setSelectedOptions((prevSelected) =>
        prevSelected.filter((i) => i !== index)
      );
    }
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="질문 입력*"
        value={question}
        onChange={handleQuestionChange}
      />
      <Input
        type="text"
        placeholder="설명 입력"
        value={description}
        onChange={handleDescriptionChange}
      />
      {options.map((option, index) => (
        <Option key={index}>
          <RadioCircle
            $isSelected={selectedOptions.includes(index)}
            onClick={() => handleOptionSelect(index)}
          />

          <OptionInput
            type="text"
            placeholder={`항목${index + 1} 입력`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
          {options.length > 1 && (
            <DeleteButton onClick={() => removeOption(index)}>
              삭제
            </DeleteButton>
          )}
        </Option>
      ))}
      <AddOptionButton onClick={addOption}>항목 추가</AddOptionButton>
    </Container>
  );
};

export default Radio;

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

const Option = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const RadioCircle = styled.div`
  width: 12px;
  height: 12px;
  border: 1px solid ${(props) => (props.$isSelected ? "#C0C0C0" : "#ddd")};
  background-color: ${(props) => (props.$isSelected ? "#C0C0C0" : "white")};
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;

  &:hover {
    border-color: #c0c0c0;
  }
`;

const OptionInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const DeleteButton = styled.button`
  margin-left: 10px;
  background-color: #ffdddd;
  border: 1px solid #dd3333;
  color: #dd3333;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ffcccc;
  }
`;

const AddOptionButton = styled.button`
  display: block;
  margin-top: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;
