import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ApplicantList from "../components/ApplicantList";
import InterviewerList from "../components/InterviewerList";
import MyButton from "../components/MyButton";
import { Navbar } from "../../common/ui";
import { useNavigate } from "react-router-dom";
import { ApplicantType, PostInfoType } from "../global/types";
import { GET } from "../../common/api/axios";

const SendEmail = () => {
  const [applicantList, setApplicantList] = useState<ApplicantType[]>([]);
  const [redirectPage, setRedirectPage] = useState("");
  const [postInfo, setPostInfo] = useState<PostInfoType>();
  const [showNavbar, setShowNavbar] = useState(false);
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
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (event.clientY < 50) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
      <NavbarWrapper show={showNavbar}>
        {" "}
        <Navbar />
      </NavbarWrapper>
      <EvaluateWrapper show={showNavbar}>
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

const NavbarWrapper = styled.div<{ show: boolean }>`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({ show }) => (show ? "60px" : "0px")};
  overflow: hidden;
  transition: height 0.3s ease-in-out;
`;

const EvaluateWrapper = styled.div<{ show: boolean }>`
  display: flex;
  width: 100vw;
  height: ${({ show }) => (show ? "calc(100vh - 60px)" : "100vh")};
  transition: height 0.3s ease-in-out;
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
