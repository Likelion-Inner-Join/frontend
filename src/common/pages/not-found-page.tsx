import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router";
import Lottie from "lottie-react";
import animationData from "./404-animation.json";
import { Button } from "../ui";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ height: "50%", width: "50%" }}
      />
      <Description>
        해당 페이지를 찾을 수 없어요. 주소를 다시 확인해 주세요.
      </Description>
      <Button
        label="홈으로 돌아가기"
        size="large"
        onClick={() => {
          navigate(ROUTES.LANDING);
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin: 10px 0 30px 0;
`;
