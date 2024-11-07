import React from "react";
import styled from "styled-components";

const ImageUpload = () => (
  <QuestionContainer>
    <DescriptionInput placeholder="파일 업로드 질문 설명을 입력하세요" />
    <Input type="file" />
  </QuestionContainer>
);

export default ImageUpload;

const QuestionContainer = styled.div`
  margin-bottom: 15px;
`;

const DescriptionInput = styled.input`
  width: 90%;
  font-family: inherit;
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  &::placeholder {
    font-family: inherit;
    color: #999;
  }
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
