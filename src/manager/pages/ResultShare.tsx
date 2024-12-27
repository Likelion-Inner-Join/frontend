import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ApplicantList from "../components/ApplicantList";
import InformationBox from "../components/InformationBox";
import ResultTable from "../components/ResultTable";
import EvaluationHeader from "../components/EvaluationHeader";
import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../common/ui";
import { ApplicantType, PostInfoType } from "../global/types";
import { GET, PATCH } from "../../common/api/axios";

const ResultShare = () => {
  const [applicantList, setApplicantList] = useState<ApplicantType[]>([]);
  const [restList, setRestList] = useState<ApplicantType[]>([]);
  const [passList, setPassList] = useState<ApplicantType[]>([]);
  const [failList, setFailList] = useState<ApplicantType[]>([]);
  const [isShared, setIsShared] = useState(false);
  const [postInfo, setPostInfo] = useState<PostInfoType>();
  const [resultType, setResultType] = useState<String>("");
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();

  const getApplicantList = async () => {
    try {
      const res = await GET(`posts/1/application`);

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
      const res = await GET(`posts/1`);

      if (res.isSuccess) {
        setPostInfo(res.result);
        if (res.result.recruitmentStatus === "OPEN") setIsShared(false);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateRecruitStatus = async (status: string) => {
    if (isShared) return;
    if (restList.length !== 0) {
      alert("평가가 완료되지 않은 지원자가 있습니다.");
      return;
    }

    try {
      const res = await PATCH(`posts/1`, { recruitmentStatus: status });

      if (res.isSuccess) {
        setIsShared(!isShared);
        getApplicantList();
        getPostDetails();
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
    if (postInfo?.recruitmentType === "FORM_ONLY") setResultType("최종");
    if (postInfo?.recruitmentType === "FORM_AND_MEETING") setResultType("서류");

    if (postInfo?.recruitmentStatus !== "OPEN") setIsShared(true);
  }, [postInfo]);

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
          <EvaluationHeader status="FORM_REVIEWED" />
          {isShared && (
            <Buttons>
              {postInfo?.recruitmentType === "FORM_ONLY" ? (
                <MyButton
                  content="평가 종료"
                  buttonType="RED"
                  onClick={() => navigate("/post-manage")}
                />
              ) : (
                <MyButton
                  content="다음 단계"
                  buttonType="RED"
                  onClick={() => navigate("/meet-table")}
                />
              )}
            </Buttons>
          )}
          {isShared ? (
            <Caption>{resultType} 결과가 지원자에게 공유되었습니다!</Caption>
          ) : (
            <Caption>{resultType} 결과를 지원자에게 공유하시겠습니까?</Caption>
          )}
          <ButtonBox>
            <ShareButton
              onClick={() => updateRecruitStatus("FORM_REVIEWED")}
              isShared={isShared}
            >
              공유하기
            </ShareButton>
            {isShared ? (
              <MyButton
                content="이메일로 알리기"
                buttonType="WHITE"
                onClick={() => navigate("/email-write")}
              />
            ) : (
              <MyButton
                content="수정하기"
                buttonType="WHITE"
                onClick={() => navigate("/doc-eval")}
              />
            )}
          </ButtonBox>
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
            isColor={false}
          />
        </Container>
      </EvaluateWrapper>
    </Wrapper>
  );
};

export default ResultShare;

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
  padding: 0px 5%;
  overflow-y: auto;
  background-color: #fff;
`;

const Caption = styled.div`
  margin-top: 50px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 42px;
  font-style: normal;
  font-weight: 600;
  line-height: 170%; /* 71.4px */
  letter-spacing: -0.84px;
`;

const Buttons = styled.div`
  display: flex;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 24px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 25px;
  margin-bottom: 105px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`;

const ShareButton = styled.div<{ isShared: boolean }>`
  width: 120px;
  padding: 12px 30px;
  border-radius: 30px;
  text-align: center;
  color: #fff;
  transition: background-color 0.3s ease-in-out;

  margin-left: ${({ isShared }) => {
    if (isShared) return "44px";
    return "0px";
  }};

  background-color: ${({ isShared }) => {
    if (isShared) return "#C0C0C0";
    return "#CC141D";
  }};

  &:hover {
    cursor: ${({ isShared }) => {
      if (!isShared) return "pointer";
    }};
    background-color: ${({ isShared }) => {
      if (!isShared) return "#B10D15";
    }};
  }

  &:active {
    background-color: ${({ isShared }) => {
      if (!isShared) return "#000";
    }};
  }
`;

const Style = styled.div`
  margin-top: 30px;
`;