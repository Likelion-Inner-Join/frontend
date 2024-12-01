import React from "react";
import styled from "styled-components";

const Checkbox = ({ questionData, updateQuestion }) => {
  const handleInputChange = (e) => {
    updateQuestion(questionData.id, { question: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    updateQuestion(questionData.id, { description: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[index] = value;
    updateQuestion(questionData.id, { options: updatedOptions });
  };

  const addOption = () => {
    const updatedOptions = [...questionData.options, ""];
    updateQuestion(questionData.id, { options: updatedOptions });
  };

  const removeOption = (index) => {
    const updatedOptions = questionData.options.filter((_, i) => i !== index);
    updateQuestion(questionData.id, { options: updatedOptions });
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
      {questionData.options.map((option, index) => (
        <OptionContainer key={index}>
          <OptionInput
            type="text"
            placeholder={`항목${index + 1} 입력`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
          {questionData.options.length > 1 && (
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

const OptionInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const RemoveButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  background-color: #b10d15;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #9c0c13;
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
