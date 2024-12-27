import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import EvaluationHeader from "../components/EvaluationHeader";
import ApplicantList from "../components/ApplicantList";
import InformationBox from "../components/InformationBox";
import ResultTable from "../components/ResultTable";
import MyButton from "../components/MyButton";
import { applicantData } from "../mock/applicantData";
import { Navbar } from "../../common/ui";
import { GET } from "../../common/api/axios";
import { ApplicantType, PostInfoType } from "../global/types";

const DocEvaluate = () => {
  const [applicantList, setApplicantList] = useState<ApplicantType[]>([]);
  const [restList, setRestList] = useState<ApplicantType[]>([]);
  const [passList, setPassList] = useState<ApplicantType[]>([]);
  const [failList, setFailList] = useState<ApplicantType[]>([]);
  const [postInfo, setPostInfo] = useState<PostInfoType>();
  const [postId, setPostId] = useState<number>();
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();

  const getApplicantList = async () => {
    try {
      //const res = await GET(`posts/${postId}/application`);
      const res = await GET(`posts/1/application`);
      // const res = applicantData;

      if (res.isSuccess) {
        setApplicantList(res.result.applicationList);
        setPostId(res.result.postId);
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
    if (event.clientX < 400 && event.clientY < 30) {
      setShowNavbar(true);
    } else if (event.clientX > 400 && event.clientY < 100) {
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
    setPassList(
      applicantList.filter((applicant) => applicant.formResult === "PASS")
    );
    setFailList(
      applicantList.filter((applicant) => applicant.formResult === "FAIL")
    );
    setRestList(
      applicantList.filter((applicant) => applicant.formResult === "PENDING")
    );
  }, [applicantList]);

  return (
    <Wrapper>
      <NavbarWrapper show={showNavbar}>
        {" "}
        <Navbar />
      </NavbarWrapper>
      <EvaluateWrapper show={showNavbar}>
        <ApplicantList
          data1={applicantList}
          data2={postInfo?.recruitingList || []}
          isEmail={false}
        />
        <Container>
          <EvaluationHeader status="OPEN" />
          <Buttons>
            {/* <EvalButton>
              <img src="/images/manager/check.svg" alt="합불 부여 버튼" />
              합불 부여하기
            </EvalButton> */}
            {postInfo?.recruitmentType === "FORM_ONLY" ? (
              <MyButton
                content="다음 단계"
                buttonType="RED"
                onClick={() => navigate("/result")}
              />
            ) : (
              <MyButton
                content="다음 단계"
                buttonType="RED"
                onClick={() => navigate("/result")}
              />
            )}
          </Buttons>
          <InfoCaption>
            {passList.length + failList.length + restList.length}명 중{" "}
            {passList.length}명이 합격했어요 !
          </InfoCaption>
          <InfoRatio>
            <div>
              <h3>합격률</h3>
              <p>
                {Math.round(
                  (passList.length * 100) /
                    (passList.length + failList.length + restList.length)
                )}
              </p>
              <h3>%</h3>
            </div>
            <div>
              <h3>경쟁률</h3>
              <p>
                {passList.length > 0
                  ? (
                      Math.round(
                        ((passList.length + failList.length + restList.length) /
                          passList.length) *
                          Math.pow(10, 2)
                      ) / Math.pow(10, 2)
                    ).toFixed(2) + ": 1"
                  : "0 : 0"}{" "}
              </p>
            </div>
          </InfoRatio>
          <InformationBox
            restList={restList}
            passList={passList}
            failList={failList}
          />
          <Style></Style>
          <ResultTable
            restList={restList}
            passList={passList}
            failList={failList}
            isColor={true}
          />
        </Container>
      </EvaluateWrapper>
    </Wrapper>
  );
};

export default DocEvaluate;

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
  padding: 0px 5%;
  overflow-y: auto;
  background-color: #fff;
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 24px;
  margin-bottom: 15px;
`;

const EvalButton = styled.div`
  display: inline-flex;
  gap: 10px;
  text-align: center;
  padding: 12px 16px;
  border-radius: 30px;
  background-color: #fff;

  color: #cc141d;
  border: 1px solid #cc141d;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: #f9f9f9;
  }

  &:active {
    cursor: pointer;
    background-color: #f0f0f0;
    color: #000;
    border-color: #000;
  }
`;

const InfoCaption = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 170%; /* 54.4px */
  letter-spacing: -0.64px;
`;

const InfoRatio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;

  div {
    display: flex;
    align-items: center;
  }

  h3 {
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 170%; /* 34px */
    letter-spacing: -0.4px;
    margin: 0px 3px;
  }
  p {
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: 170%; /* 47.6px */
    letter-spacing: -0.56px;
    margin-left: 5px;
  }
`;

const Style = styled.div`
  margin-top: 70px;
`;
