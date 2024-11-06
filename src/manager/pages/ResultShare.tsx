import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ApplicantList from "../components/ApplicantList";
import InformationBox from "../components/InformationBox";
import ResultTable from "../components/ResultTable";

interface Applicant {
  id: string;
  name: string;
  firstState: string;
  secondState: string;
  position: string;
}

const applicantData = [
  {
    id: "20211511",
    name: "김서아",
    firstState: "pass",
    secondState: "null",
    position: "단장단",
  },
  {
    id: "20211512",
    name: "나서아",
    firstState: "pass",
    secondState: "null",
    position: "단장단",
  },
  {
    id: "20211513",
    name: "다서아",
    firstState: "fail",
    secondState: "null",
    position: "단장단",
  },
  {
    id: "20211514",
    name: "라서아",
    firstState: "fail",
    secondState: "null",
    position: "단장단",
  },
  {
    id: "20211515",
    name: "마서아",
    firstState: "fail",
    secondState: "null",
    position: "단장단",
  },
  {
    id: "20211516",
    name: "바서아",
    firstState: "pass",
    secondState: "null",
    position: "단장단",
  },
  {
    id: "20211517",
    name: "사서아",
    firstState: "fail",
    secondState: "null",
    position: "단장단",
  },
  {
    id: "20211518",
    name: "아서아",
    firstState: "pass",
    secondState: "null",
    position: "단장단",
  },
  {
    id: "20211519",
    name: "자서아",
    firstState: "pass",
    secondState: "null",
    position: "단장단",
  },
  {
    id: "20211520",
    name: "차서아",
    firstState: "pass",
    secondState: "null",
    position: "단장단",
  },
  {
    id: "20211521",
    name: "카서아",
    firstState: "pass",
    secondState: "null",
    position: "단장단",
  },
  {
    id: "20211522",
    name: "타서아",
    firstState: "pass",
    secondState: "null",
    position: "단장단",
  },
  {
    id: "20211523",
    name: "파서아",
    firstState: "pass",
    secondState: "null",
    position: "단장단",
  },
  {
    id: "20211524",
    name: "하서아",
    firstState: "pass",
    secondState: "null",
    position: "단장단",
  },
  {
    id: "20211525",
    name: "김어아",
    firstState: "pass",
    secondState: "null",
    position: "단장단",
  },
  {
    id: "20211526",
    name: "나어아",
    firstState: "pass",
    secondState: "null",
    position: "단장단",
  },
];

const positionData = [
  {
    id: "1",
    name: "전체",
  },
  {
    id: "2",
    name: "단장단",
  },
  {
    id: "3",
    name: "기획단",
  },
];

const ResultShare = () => {
  const [restList, setRestList] = useState<Applicant[]>([]);
  const [passList, setPassList] = useState<Applicant[]>([]);
  const [failList, setFailList] = useState<Applicant[]>([]);

  const [isShared, setIsShared] = useState(false);

  const shareButtonClick = () => {
    if (!isShared) setIsShared(!isShared);
  };

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
            <EmailButton>이메일로 알리기</EmailButton>
          ) : (
            <FixButton>수정하기</FixButton>
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
        <NextButton>다음 단계</NextButton>
      </Container>
    </Wrapper>
  );
};

export default ResultShare;

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
