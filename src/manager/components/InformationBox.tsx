import React from "react";
import styled from "styled-components";
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
interface InformationBoxProps {
  restList: Applicant[];
  passList: Applicant[];
  failList: Applicant[];
}

const InformationBox = ({
  restList,
  passList,
  failList,
}: InformationBoxProps) => {
  return (
    <Wrapper>
      <InfoBox>
        <div>
          <h3>전체</h3>
          <Count state="null">
            {passList.length + failList.length + restList.length}
          </Count>
          <h3>명</h3>
        </div>
        |
        <div>
          <h3>합격자</h3>
          <Count state="pass">{passList.length}</Count>
          <h3>명</h3>
        </div>
        |
        <div>
          <h3>불합격자</h3>
          <Count state="fail">{failList.length}</Count>
          <h3>명</h3>
        </div>
      </InfoBox>
    </Wrapper>
  );
};

export default InformationBox;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoBox = styled.div`
  display: flex;
  height: 60px;
  margin-top: 12px;
  padding: 18px 40px;
  align-items: center;
  justify-content: center;
  gap: 36px;
  border-radius: 16px;
  background: #f9f9f9;
  font-family: Pretendard;

  div {
    display: flex;
    align-items: center;
  }

  h3 {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.32px;
  }
`;

const Count = styled.div<{ state: string }>`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.36px;
  margin-left: 35px;
  margin-right: 3px;

  color: ${({ state }) => {
    if (state === "pass") return "#188865";
    if (state === "fail") return "#88181C";
    return "#000";
  }};
`;
