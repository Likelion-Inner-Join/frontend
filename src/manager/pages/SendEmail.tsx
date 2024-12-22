import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ApplicantList from "../components/ApplicantList";
import InterviewerList from "../components/InterviewerList";
import MyButton from "../components/MyButton";
import { applicantData } from "../mock/applicantData";
import { positionData } from "../mock/positionData";
import { PromotionData } from "../mock/PromotionDetail";
import { useNavigate } from "react-router-dom";
import { ApplicantType, PostInfoType } from "../global/types";
import { GET } from "../../common/api/axios";

const SendEmail = () => {
  const [applicantList, setApplicantList] = useState<ApplicantType[]>([]);
  const [isSended, setIsSended] = useState(true);
  const [redirectPage, setRedirectPage] = useState("");
  const [postInfo, setPostInfo] = useState<PostInfoType>();
  const navigate = useNavigate();

  const getApplicantList = async () => {
    try {
      //const res = await GET(`posts/${postId}/application`);
      const res = await GET(`posts/1/application`);
      //const res = applicantData;

      if (res.isSuccess) {
        setApplicantList(res.result.applicationList);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPostDetails = async () => {
    try {
      //const res = await GET(`posts/${postId}`);
      const res = await GET(`posts/1`);
      //const res = PromotionData;

      if (res.isSuccess) {
        setPostInfo(res.result);
        console.log(res);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApplicantList();
    getPostDetails();
  }, []);

  useEffect(() => {
    if (postInfo?.recruitmentStatus === "OPEN") setRedirectPage("/doc-eval");
    else if (postInfo?.recruitmentStatus === "FORM_REVIEWED")
      setRedirectPage("/meet-table");
    else if (postInfo?.recruitmentStatus === "TIME_SET")
      setRedirectPage("/meet-table");
    else if (postInfo?.recruitmentStatus === "INTERVIEWED")
      setRedirectPage("/meet-eval");
    else if (postInfo?.recruitmentStatus === "CLOSED")
      setRedirectPage("/post-manage");
  }, [postInfo]);

  return (
    <Wrapper>
      {postInfo?.recruitmentStatus === "OPEN" ||
      postInfo?.recruitmentStatus === "FORM_REVIEWED" ? (
        <ApplicantList
          data1={applicantList}
          data2={postInfo?.recruitingList || []}
          isEmail={true}
        />
      ) : (
        <InterviewerList
          data1={applicantList}
          data2={postInfo?.recruitingList || []}
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
        {postInfo?.recruitmentStatus === "CLOSED" ? (
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
