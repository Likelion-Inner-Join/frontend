import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InterviewerList from "../components/InterviewerList";
import InformationBox from "../components/InformationBox";
import ResultTable from "../components/ResultTable";
import EvaluationHeader from "../components/EvaluationHeader";
import MyButton from "../components/MyButton";
import { applicantData } from "../mock/applicantData";
import { positionData } from "../mock/positionData";
import { useNavigate } from "react-router-dom";
import { ApplicantType, PostInfoType } from "../global/types";
import { GET, PATCH } from "../../common/api/axios";

const FinalResultShare = () => {
  const [applicantList, setApplicantList] = useState<ApplicantType[]>([]);
  const [postInfo, setPostInfo] = useState<PostInfoType>();
  const [restList, setRestList] = useState<ApplicantType[]>([]);
  const [passList, setPassList] = useState<ApplicantType[]>([]);
  const [failList, setFailList] = useState<ApplicantType[]>([]);
  const [isShared, setIsShared] = useState(false);
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
      const res = await GET(`posts/1`);

      if (res.isSuccess) {
        setPostInfo(res.result);
        if (
          res.result.recruitmentStatus === "INTERVIEWED" ||
          res.result.recruitmentStatus === "CLOSED"
        )
          setIsShared(true);
        else {
          setIsShared(false);
        }
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateRecruitStatus = async (status: string) => {
    if (status === "INTERVIEWED" && isShared) return;
    if (status === "INTERVIEWED" && restList.length !== 0) {
      alert("평가가 완료되지 않은 지원자가 있습니다.");
      return;
    }

    if (status === "CLOSED" && !isShared) {
      alert("먼저 최종 결과를 공유해주세요.");
      return;
    }

    try {
      const res = await PATCH(`posts/1`, { recruitmentStatus: status });
      console.log({ recruitmentStatus: status });

      if (res.isSuccess) {
        if (status === "INTERVIEWED") setIsShared(!isShared);
        if (status === "CLOSED") navigate("/post-manage");
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
    if (postInfo?.recruitmentStatus === "CLOSED") setIsShared(true);
  }, [postInfo]);

  useEffect(() => {
    setPassList(
      applicantList.filter(
        (applicant) =>
          applicant.formResult === "PASS" && applicant.meetingResult === "PASS"
      )
    );
    setFailList(
      applicantList.filter(
        (applicant) =>
          applicant.formResult === "FAIL" || applicant.meetingResult === "FAIL"
      )
    );
    setRestList(
      applicantList.filter(
        (applicant) =>
          applicant.formResult === "PASS" &&
          applicant.meetingResult === "PENDING"
      )
    );
  }, [applicantList]);

  return (
    <Wrapper>
      <InterviewerList
        data1={applicantList}
        data2={postInfo?.recruitingList || []}
        isEmail={false}
      />
      <Container>
        <EvaluationHeader />
        {isShared && (
          <Buttons>
            <MyButton
              content="평가 종료"
              buttonType="RED"
              onClick={() => updateRecruitStatus("CLOSED")}
            />
          </Buttons>
        )}
        {isShared ? (
          <Caption>최종 결과가 지원자에게 공유되었습니다!</Caption>
        ) : (
          <Caption>최종 결과를 지원자에게 공유하시겠습니까?</Caption>
        )}
        <ButtonBox>
          <ShareButton
            onClick={() => updateRecruitStatus("INTERVIEWED")}
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
              onClick={() => navigate("/meet-eval")}
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
    </Wrapper>
  );
};

export default FinalResultShare;

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
  padding: 0px 5%;
  overflow-y: auto;
  background-color: #fff;
`;

const Caption = styled.div`
  margin-top: 80px;
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
  position: fixed;
  right: 5%;
  top: 15%;
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

const NextButton = styled.div`
  text-align: center;
  width: 120px;
  padding: 12px 30px;
  border-radius: 30px;
  background-color: #b10d15;
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  position: fixed;
  bottom: 30px;
  right: 5%;

  &:hover {
    cursor: pointer;
  }
`;
