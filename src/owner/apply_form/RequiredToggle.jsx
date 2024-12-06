import React from "react";
import styled from "styled-components";

const RequiredToggle = ({ isRequired, onToggle }) => {
  return (
    <Container>
      <Label>필수항목*</Label>
      <ToggleSwitch active={isRequired} onClick={onToggle}>
        <Circle active={isRequired} />
      </ToggleSwitch>
    </Container>
  );
};

export default RequiredToggle;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.span`
  font-size: 14px;
  color: #333;
`;

const ToggleSwitch = styled.div`
  width: 40px;
  height: 20px;
  background-color: ${(props) => (props.active ? "#B10D15" : "#c0c0c0;")};
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 2px;
  transition: background-color 0.3s;
`;

const Circle = styled.div`
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  transform: ${(props) =>
    props.active ? "translateX(20px)" : "translateX(0)"};
  transition: transform 0.3s;
`;
