import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ApplicantList from "../components/ApplicantList";
import InterviewerList from "../components/InterviewerList";
import MyButton from "../components/MyButton";
import { applicantData } from "../mock/applicantData";
import { positionData } from "../mock/positionData";
import { PromotionData } from "../mock/PromotionDetail";
import { useNavigate } from "react-router-dom";

interface PromotionImage {
  imageId: number;
  imageUrl: string;
}

interface PromotionInfo {
  postId: number;
  clubId: number;
  title: string;
  createdAt: string;
  startTime: string;
  endTime: string;
  body: string;
  status: string;
  type: string;
  field: string;
  fieldType: string;
  image: PromotionImage[];
}

const SendEmail = () => {
  const [isSended, setIsSended] = useState(true);
  const [redirectPage, setRedirectPage] = useState("");
  const [promotionInfo, setPromotionInfo] = useState<PromotionInfo>();
  const navigate = useNavigate();

  useEffect(() => {
    setPromotionInfo(PromotionData[0].result);
  }, []);

  useEffect(() => {
    if (promotionInfo?.status === "OPEN") setRedirectPage("/meet-table");
    else if (promotionInfo?.status === "INTERVIEW") setRedirectPage("/result");
    else if (promotionInfo?.status === "FORM_REVIEW")
      setRedirectPage("/meet-table");
    else if (promotionInfo?.status === "INTERVIEW_REVIEW")
      setRedirectPage("/final-result");
    else if (promotionInfo?.status === "CLOSED")
      setRedirectPage("/post-manage");
  }, [promotionInfo]);

  return (
    <Wrapper>
      {promotionInfo?.status === "OPEN" ||
      promotionInfo?.status === "INTERVIEW" ? (
        <ApplicantList
          data1={applicantData}
          data2={positionData}
          isEmail={true}
        />
      ) : (
        <InterviewerList
          data1={applicantData}
          data2={positionData}
          isEmail={true}
        />
      )}
      <Container>
        <img src="/images/manager/success.svg" />
        {isSended ? (
          <Caption>메일을 성공적으로 전송하였습니다 🙌 </Caption>
        ) : (
          <Caption>메일을 전송하고 있습니다</Caption>
        )}
        {promotionInfo?.status === "CLOSED" ? (
          <MyButton
            content="평가종료"
            buttonType="RED"
            onClick={() => navigate("/post-manage")}
          />
        ) : (
          <MyButton
            content="돌아가기"
            buttonType="RED"
            onClick={() => navigate(redirectPage)}
          />
        )}
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
