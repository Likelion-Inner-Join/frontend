import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InterviewerList from "../components/InterviewerList";
import InformationBox from "../components/InformationBox";
import ResultTable from "../components/ResultTable";
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
      <Container>
        <Title>
          <h1>트라이파시 12기 단장단 / 기획단 모집합니다 ! ✨</h1>
          <p>2021년 3월 8일 마감</p>
        </Title>
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
            <EmailButton onClick={() => navigate("/email-write")}>
              이메일로 알리기
            </EmailButton>
          ) : (
            <FixButton onClick={() => navigate("/doc-eval")}>
              수정하기
            </FixButton>
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

const Caption = styled.div`
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

  margin-left: ${({ isShared }) => {
    if (isShared) return "30px";
    return "0px";
  }};

  background-color: ${({ isShared }) => {
    if (isShared) return "#ddd";
    return "#b10d15";
  }};

  &:hover {
    cursor: ${({ isShared }) => {
      if (!isShared) return "pointer";
    }};
  }
`;

const FixButton = styled.div`
  width: 120px;
  padding: 12px 30px;
  border-radius: 30px;
  border: 1px solid #b10d15;
  background-color: #fff;
  text-align: center;
  color: #b10d15;

  &:hover {
    cursor: pointer;
  }
`;

const EmailButton = styled.div`
  width: 150px;
  padding: 12px 30px;
  border-radius: 30px;
  border: 1px solid #b10d15;
  background-color: #fff;
  font-size: 14px;
  text-align: center;
  color: #b10d15;

  &:hover {
    cursor: pointer;
  }
`;

const Style = styled.div`
  margin-top: 56px;
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
