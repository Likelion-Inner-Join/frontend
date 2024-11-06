import React from "react";
import styled from "styled-components";

const ImageUpload = () => (
  <QuestionContainer>
    <Input type="file" />
  </QuestionContainer>
);

export default ImageUpload;

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
