import styled from "styled-components";

export const Loading = () => {
  return (
    <Container>
      <LoadingSpinner />
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 3px solid #ccc;
  border-top: 3px solid ${(props) => props.theme.color.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
