import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ApplicantList from "../components/ApplicantList";
import InterviewerList from "../components/InterviewerList";
import MyButton from "../components/MyButton";
import { Navbar } from "../../common/ui";
import { useNavigate } from "react-router-dom";
import { ApplicantType, PostInfoType } from "../global/types";
import { GET } from "../../common/api/axios";
import { breakpoints } from "../../common/ui/breakpoints";

const SendEmail = () => {
  const [applicantList, setApplicantList] = useState<ApplicantType[]>([]);
  const [redirectPage, setRedirectPage] = useState("");
  const [postInfo, setPostInfo] = useState<PostInfoType>();
  const navigate = useNavigate();
  const [isApplicantListOpen, setIsApplicantListOpen] = useState(false);

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
      setRedirectPage("/result");
    else if (postInfo?.recruitmentStatus === "TIME_SET")
      setRedirectPage("/meet-eval");
    else if (postInfo?.recruitmentStatus === "INTERVIEWED")
      setRedirectPage("/final-result");
    else if (postInfo?.recruitmentStatus === "CLOSED")
      setRedirectPage("/post-manage");
  }, [postInfo]);

  return (
    <Wrapper>
      <Navbar />
      <EvaluateWrapper>
        {postInfo?.recruitmentStatus === "OPEN" ||
        postInfo?.recruitmentStatus === "FORM_REVIEWED" ? (
          <ApplicantList
            data1={applicantList}
            data2={postInfo?.recruitingList || []}
            isEmail={true}
            isOpen={isApplicantListOpen}
          />
        ) : (
          <InterviewerList
            data1={applicantList}
            data2={postInfo?.recruitingList || []}
            isEmail={true}
            isOpen={isApplicantListOpen}
          />
        )}
        <Container>
          <img src="/images/manager/success.svg" alt="메일 전송 완료" />
          <Caption>메일을 성공적으로 전송하였습니다 🙌 </Caption>
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
      </EvaluateWrapper>
    </Wrapper>
  );
};

export default SendEmail;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  background-color: #fff;
`;

const EvaluateWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  gap: 25px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 100px;
  }
`;

const Caption = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 54px */
  letter-spacing: -0.72px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 24px;
  }
`;
