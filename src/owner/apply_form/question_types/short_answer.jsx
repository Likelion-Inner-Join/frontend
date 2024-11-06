import React from "react";
import styled from "styled-components";

const ShortAnswer = () => (
  <QuestionContainer>
    <Input placeholder="단답형 질문 입력" />
  </QuestionContainer>
);

export default ShortAnswer;

const QuestionContainer = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 90%;
  font-family: inherit; /* 글씨체를 상속하여 일관성 유지 */
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  &::placeholder {
    font-family: inherit; /* placeholder에도 동일한 글씨체 적용 */
  }
`;
