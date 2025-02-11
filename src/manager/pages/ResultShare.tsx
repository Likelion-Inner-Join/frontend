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
import { applicantData } from "../mock/applicantData";
import { breakpoints } from "../../common/ui/breakpoints";

const ResultShare = () => {
  const [applicantList, setApplicantList] = useState<ApplicantType[]>([]);
  const [restList, setRestList] = useState<ApplicantType[]>([]);
  const [passList, setPassList] = useState<ApplicantType[]>([]);
  const [failList, setFailList] = useState<ApplicantType[]>([]);
  const [isShared, setIsShared] = useState(false);
  const [isApplicantListOpen, setIsApplicantListOpen] = useState(false);
  const [postInfo, setPostInfo] = useState<PostInfoType>();
  const [resultType, setResultType] = useState<String>("");
  const navigate = useNavigate();

  const getApplicantList = async () => {
    try {
      //const res = await GET(`posts/1/application`);
      const res = applicantData;

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
      <Navbar />
      <EvaluateWrapper>
        <ApplicantList
          data1={applicantList}
          data2={postInfo?.recruitingList || []}
          isEmail={false}
          isOpen={isApplicantListOpen}
        />
        <Container isOpen={isApplicantListOpen}>
          <EvaluationHeader status="FORM_REVIEWED" />
          {isShared && (
            <Buttons>
              {postInfo?.recruitmentType === "FORM_ONLY" ? (
                <MyButton
                  content="평가 종료"
                  buttonType="RED"
                  onClick={() => {
                    updateRecruitStatus("CLOSED");
                    navigate("/post-manage");
                  }}
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
            <Caption isShared={isShared}>
              {resultType} 결과가 지원자에게 공유되었습니다!
            </Caption>
          ) : (
            <Caption isShared={isShared}>
              {resultType} 결과를 지원자에게 공유하시겠습니까?
            </Caption>
          )}
          <ButtonBox>
            <LeftBox>
              {" "}
              <ShareButton
                onClick={() => updateRecruitStatus("FORM_REVIEWED")}
                isShared={isShared}
              >
                공유하기
              </ShareButton>
            </LeftBox>
            <RightBox>
              {isShared ? (
                <MyButton
                  content="메일 알림"
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
            </RightBox>
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
      {isApplicantListOpen === true ? (
        <CloseApplicantListButton
          onClick={() => setIsApplicantListOpen(!isApplicantListOpen)}
        >
          <img
            src="/images/manager/back.svg"
            alt="지원자 리스트"
            width="20px"
          />
        </CloseApplicantListButton>
      ) : (
        <OpenApplicantListButton
          onClick={() => setIsApplicantListOpen(!isApplicantListOpen)}
        >
          <img src="/images/manager/list.svg" alt="뒤로가기" width="20px" />
        </OpenApplicantListButton>
      )}
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

const EvaluateWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: hidden;

  @media (max-width: ${breakpoints.mobile}) {
    padding-bottom: 100px;
  }
`;

const Container = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0px 5%;
  padding-bottom: 50px;
  overflow-y: auto;

  @media (max-width: ${breakpoints.mobile}) {
    padding-bottom: 50px;
    display: ${({ isOpen }) => {
      if (isOpen) return "none";
      return "flex";
    }};
  }
`;

const Caption = styled.div<{ isShared: boolean }>`
  margin-top: 50px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 42px;
  font-style: normal;
  font-weight: 600;
  line-height: 170%;
  letter-spacing: -0.84px;

  margin-top: ${({ isShared }) => {
    if (isShared) return "30px";
    return "80px";
  }};

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 24px;
  }
`;

const Buttons = styled.div`
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
  line-height: 150%;
  letter-spacing: -0.32px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 60px;
    gap: 18px;
  }
`;

const LeftBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: flex-end;
`;

const RightBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: flex-start;
`;

const ShareButton = styled.div<{ isShared: boolean }>`
  width: 120px;
  padding: 12px 30px;
  border-radius: 30px;
  text-align: center;
  color: #fff;
  transition: background-color 0.3s ease-in-out;

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

const OpenApplicantListButton = styled.div`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #cc141d;
  color: white;
  border: none;
  padding: 15px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;

  &:hover {
    background: #cc141d;
  }

  @media (max-width: ${breakpoints.mobile}) {
    display: block;
  }
`;

const CloseApplicantListButton = styled.div`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #fcfafa;
  border: none;
  padding: 15px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;

  &:hover {
    background: #fcfafa;
  }

  @media (max-width: ${breakpoints.mobile}) {
    display: block;
  }
`;
