import React from "react";
import styled from "styled-components";

const PreviewModal = ({ title, description, questions, closePreview }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={closePreview}>닫기</CloseButton>
        <h2>{title}</h2>
        <p>{description}</p>
        {questions.map((q, index) => (
          <QuestionPreview key={index}>
            <strong>{`Q${index + 1}`}</strong>
            {q.type === "short" && <Input placeholder="단답형 질문 입력" />}
            {q.type === "paragraph" && (
              <Textarea placeholder="장문형 질문 입력" />
            )}
            {q.type === "multiple" && (
              <MultipleChoicePreview>
                <Option>옵션 1</Option>
                <Option>옵션 2</Option>
              </MultipleChoicePreview>
            )}
            {q.type === "image" && <Input type="file" />}
          </QuestionPreview>
        ))}
      </ModalContent>
    </ModalOverlay>
  );
};

export default PreviewModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 70%;
  max-width: 800px;
  padding: 20px;
  border-radius: 8px;
  text-align: left;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #d9534f;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #c9302c;
  }
`;

const QuestionPreview = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  margin-top: 5px;
`;

const MultipleChoicePreview = styled.div`
  margin-top: 5px;
`;

const Option = styled.div`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
`;
