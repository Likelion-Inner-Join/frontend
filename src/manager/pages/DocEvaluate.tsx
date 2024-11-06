import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ApplicantList from "../components/ApplicantList";
import InformationBox from "../components/InformationBox";
import ResultTable from "../components/ResultTable";
import { applicantData } from "../mock/applicantData";
import { positionData } from "../mock/positionData";

interface Applicant {
  id: string;
  name: string;
  firstState: string;
  secondState: string;
  position: string;
}

const DocEvaluate = () => {
  const [restList, setRestList] = useState<Applicant[]>([]);
  const [passList, setPassList] = useState<Applicant[]>([]);
  const [failList, setFailList] = useState<Applicant[]>([]);

  useEffect(() => {
    setPassList(
      applicantData.filter((applicant) => applicant.firstState === "pass")
    );
    setFailList(
      applicantData.filter((applicant) => applicant.firstState === "fail")
    );
    setRestList(
      applicantData.filter((applicant) => applicant.firstState === "null")
    );
  }, [applicantData]);

  return (
    <Wrapper>
      <ApplicantList data1={applicantData} data2={positionData} />
      <Container>
        <Title>
          <h1>트라이파시 12기 단장단 / 기획단 모집합니다 ! ✨</h1>
          <p>2021년 3월 8일 마감</p>
        </Title>
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
        />
        <NextButton>다음 단계</NextButton>
      </Container>
    </Wrapper>
  );
};

export default DocEvaluate;

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
  padding: 0px 10%;
  padding-top: 60px;
  overflow-y: auto;
  background-color: #fff;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 47px;

  h1 {
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.32px;
  }
  p {
    color: #767676;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
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
  margin-top: 80px;
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
