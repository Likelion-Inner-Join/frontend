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

const MeetEvaluate = () => {
  const [restList, setRestList] = useState<Applicant[]>([]);
  const [passList, setPassList] = useState<Applicant[]>([]);
  const [failList, setFailList] = useState<Applicant[]>([]);
  const navigate = useNavigate();

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
      <Container>
        <EvaluationHeader />
        <Buttons>
          <EvalButton>
            <img src="/images/manager/check.svg" />
            합불 부여하기
          </EvalButton>
          <MyButton
            content="다음 단계"
            buttonType="RED"
            onClick={() => navigate("/meet-table")}
          />
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
              {Math.round(
                ((passList.length + failList.length + restList.length) /
                  passList.length) *
                  Math.pow(10, 2)
              ) / Math.pow(10, 2)}{" "}
              : 1
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
    </Wrapper>
  );
};

export default MeetEvaluate;

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
