import React from "react";
import styled from "styled-components";

interface ButtonProps {
  content: string;
  buttonType: string;
  onClick: () => void;
}

const MyButton = ({ content, buttonType, onClick }: ButtonProps) => {
  return (
    <Wrapper content={content} buttonType={buttonType} onClick={onClick}>
      {content}
    </Wrapper>
  );
};

export default MyButton;

const Wrapper = styled.button<ButtonProps>`
  text-align: center;
  padding: 12px 30px;
  border-radius: 30px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.32px;
  border: 1px solid;
  transition: background-color 0.3s ease-in-out;

  background-color: ${({ buttonType }) => {
    if (buttonType === "RED") return "#CC141D";
    if (buttonType === "WHITE") return "#fff";
  }};
  color: ${({ buttonType }) => {
    if (buttonType === "RED") return "#fff";
    if (buttonType === "WHITE") return "#CC141D";
  }};
  border-color: ${({ buttonType }) => {
    if (buttonType === "RED") return "#fff";
    if (buttonType === "WHITE") return "#CC141D";
  }};

  &:hover {
    cursor: pointer;
    background-color: ${({ buttonType }) => {
      if (buttonType === "RED") return "#b10d15";
      if (buttonType === "WHITE") return "#f9f9f9";
    }};
    color: ${({ buttonType }) => {
      if (buttonType === "RED") return "#fff";
      if (buttonType === "WHITE") return "#CC141D";
    }};
    border-color: ${({ buttonType }) => {
      if (buttonType === "RED") return "#fff";
      if (buttonType === "WHITE") return "#b10d15";
    }};
  }

  &:active {
    cursor: pointer;
    background-color: ${({ buttonType }) => {
      if (buttonType === "RED") return "#000";
      if (buttonType === "WHITE") return "#F0F0F0";
    }};
    color: ${({ buttonType }) => {
      if (buttonType === "RED") return "#fff";
      if (buttonType === "WHITE") return "#222";
    }};
    border-color: ${({ buttonType }) => {
      if (buttonType === "RED") return "#000";
      if (buttonType === "WHITE") return "#000";
    }};
  }
`;
