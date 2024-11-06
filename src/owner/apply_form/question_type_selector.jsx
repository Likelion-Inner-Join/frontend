import React from "react";
import styled from "styled-components";

const QuestionTypeSelector = ({ addQuestion }) => (
  <SelectorContainer>
    <SelectorItem onClick={() => addQuestion("short")}>단답형</SelectorItem>
    <SelectorItem onClick={() => addQuestion("paragraph")}>장문형</SelectorItem>
    <SelectorItem onClick={() => addQuestion("multiple")}>객관식</SelectorItem>
    <SelectorItem onClick={() => addQuestion("image")}>사진 첨부</SelectorItem>
  </SelectorContainer>
);

export default QuestionTypeSelector;

const SelectorContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 150px;
  border-radius: 4px;
  z-index: 10;
`;

const SelectorItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #b10d15;
    color: white;
  }
`;
