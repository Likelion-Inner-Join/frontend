import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Checkbox = ({ questionData, updateQuestion }) => {
  const [options, setOptions] = useState(questionData.options || [""]); // 항목 상태
  const [question, setQuestion] = useState(questionData.question || ""); // 질문 내용 상태
  const [description, setDescription] = useState(
    questionData.description || ""
  ); // 질문 설명 상태

  useEffect(() => {
    // questionData 변경 시 상태 동기화
    setOptions(questionData.options || [""]);
    setQuestion(questionData.question || "");
    setDescription(questionData.description || "");
  }, [questionData]);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
    updateQuestion(questionData.id, { question: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    updateQuestion(questionData.id, { description: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
    updateQuestion(questionData.id, { options: updatedOptions });
  };

  const addOption = () => {
    const updatedOptions = [...options, ""];
    setOptions(updatedOptions);
    updateQuestion(questionData.id, { options: updatedOptions });
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    updateQuestion(questionData.id, { options: updatedOptions });
  };

  return (
    <Container>
      <InputField
        type="text"
        placeholder="질문 입력*"
        isQuestionInput
        value={question}
        onChange={handleInputChange}
      />
      <InputField
        type="text"
        placeholder="설명 입력"
        value={description}
        onChange={handleDescriptionChange}
      />
      {options.map((option, index) => (
        <OptionContainer key={index}>
          <CheckboxIcon type="checkbox" />
          <OptionInput
            type="text"
            placeholder={`항목${index + 1} 입력`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
          {options.length > 1 && (
            <RemoveButton onClick={() => removeOption(index)}>
              삭제
            </RemoveButton>
          )}
        </OptionContainer>
      ))}
      <AddOptionButton onClick={addOption}>항목 추가</AddOptionButton>
    </Container>
  );
};

export default Checkbox;

// 스타일 컴포넌트
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

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CheckboxIcon = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const OptionInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const RemoveButton = styled.button`
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
  padding: 10px;
  font-size: 16px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;
