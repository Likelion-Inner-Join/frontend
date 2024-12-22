import styled from "styled-components";
import { VerificationCodeForm } from "../components";

export const VerificationPage = () => {
  return (
    <Container>
      <div className="form-container">
        <VerificationCodeForm email="" school="" />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
  overflow-y: auto;
  padding-top: 5%;

  .form-container {
    flex-grow: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`;
