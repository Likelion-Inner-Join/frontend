import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InterviewerList from "../components/InterviewerList";
import InformationBox from "../components/InformationBox";
import ResultTable from "../components/ResultTable";
import EvaluationHeader from "../components/EvaluationHeader";
import MyButton from "../components/MyButton";
import { applicantData } from "../mock/applicantData";
import { positionData } from "../mock/positionData";
import { PromotionData } from "../mock/PromotionDetail";
import { useNavigate } from "react-router-dom";
interface Applicant {
  applicationId: number;
  userId: number;
  name: string;
  email: string;
  phoneNum: string;
  school: string;
  major: string;
  position: string;
  studentNumber: string;
  formResult: string;
  meetingResult: string;
  formScore: number;
  meetingScore: number;
  meetingStartTime: string;
  meetingEndTime: string;
}

const FinalResultShare = () => {
  const [restList, setRestList] = useState<Applicant[]>([]);
  const [passList, setPassList] = useState<Applicant[]>([]);
  const [failList, setFailList] = useState<Applicant[]>([]);
  const [isShared, setIsShared] = useState(false);
  const navigate = useNavigate();

  const shareButtonClick = () => {
    if (!isShared) setIsShared(!isShared);
  };

  useEffect(() => {
    setPassList(
      applicantData.filter(
        (applicant) =>
          applicant.formResult === "pass" && applicant.meetingResult === "pass"
      )
    );
    setFailList(
      applicantData.filter(
        (applicant) =>
          applicant.formResult === "fail" || applicant.meetingResult === "fail"
      )
    );
    setRestList(
      applicantData.filter(
        (applicant) =>
          applicant.formResult === "pass" && applicant.meetingResult === "null"
      )
    );
  }, [applicantData]);

  return (
    <Wrapper>
      <InterviewerList
        data1={applicantData}
        data2={positionData}
        isEmail={false}
      />
      )
      <Container>
        <EvaluationHeader />
        {isShared ? (
          <Caption>최종 결과가 지원자에게 공유되었습니다!</Caption>
        ) : (
          <Caption>최종 결과를 지원자에게 공유하시겠습니까?</Caption>
        )}
        <ButtonBox>
          <ShareButton onClick={shareButtonClick} isShared={isShared}>
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
        <NextButton onClick={() => navigate("/post-manage")}>
          평가 종료
        </NextButton>
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
