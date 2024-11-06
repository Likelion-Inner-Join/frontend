import React, { useState } from "react";
import styled from "styled-components";
import ApplicantList from "../components/ApplicantList";
import { applicantData } from "../mock/applicantData";
import { positionData } from "../mock/positionData";
import { useNavigate } from "react-router-dom";

const SendEmail = () => {
  const [isSended, setIsSended] = useState(true);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ApplicantList data1={applicantData} data2={positionData} />
      <Container>
        <img src="/images/manager/success.svg" />
        {isSended ? (
          <Caption>메일을 성공적으로 전송하였습니다 🙌 </Caption>
        ) : (
          <Caption>메일을 전송하고 있습니다</Caption>
        )}
        <FinishButton onClick={() => navigate("/post-manage")}>
          평가 종료
        </FinishButton>
      </Container>
    </Wrapper>
  );
};

export default SendEmail;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;

  img {
    margin-bottom: 55px;
  }
`;

const Caption = styled.div`
  margin-bottom: 25px;
  color: #000;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 54px */
  letter-spacing: -0.72px;
`;

const FinishButton = styled.div`
  display: flex;
  height: 48px;
  padding: 12px 32px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
  background: #b10d15;
  color: var(--Achromatic-white, #fff);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  cursor: pointer;
`;
