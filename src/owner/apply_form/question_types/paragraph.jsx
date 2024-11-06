import React from "react";
import styled from "styled-components";

const Paragraph = () => (
  <QuestionContainer>
    <Textarea placeholder="장문형 질문 입력" />
  </QuestionContainer>
);

export default Paragraph;

const QuestionContainer = styled.div`
  margin-bottom: 15px;
`;

const Textarea = styled.textarea`
  width: 90%;
  font-family: inherit; /* 글씨체를 상속하여 일관성 유지 */
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  outline: none;
  &:focus {
    border-color: #b10d15;
  }
  &::placeholder {
    font-family: inherit; /* placeholder에도 동일한 글씨체 적용 */
  }
`;
