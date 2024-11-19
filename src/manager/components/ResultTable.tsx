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

interface ResultTableProps {
  restList: Applicant[];
  passList: Applicant[];
  failList: Applicant[];
}

const ResultTable = ({ restList, passList, failList }: ResultTableProps) => {
  return (
    <Wrapper>
      {restList.length > 0 && (
        <div>
          <TableTitle state="null">미평가</TableTitle>
          <TableContainer>
            {restList?.map((applicant, index) => (
              <TableItem
                key={applicant.applicationId}
                loc={index}
                length={restList.length}
              >
                {applicant.name}
              </TableItem>
            ))}
          </TableContainer>
        </div>
      )}
      <div>
        <TableTitle state="pass">합격</TableTitle>
        <TableContainer>
          {passList?.map((applicant, index) => (
            <TableItem
              key={applicant.applicationId}
              loc={index}
              length={passList.length}
            >
              {applicant.name}
            </TableItem>
          ))}
        </TableContainer>
      </div>
      <div>
        <TableTitle state="fail">불합격</TableTitle>
        <TableContainer>
          {failList?.map((applicant, index) => (
            <TableItem
              key={applicant.applicationId}
              loc={index}
              length={failList.length}
            >
              {applicant.name}
            </TableItem>
          ))}
        </TableContainer>
      </div>
    </Wrapper>
  );
};

export default ResultTable;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  font-family: Pretendard;
`;

const TableTitle = styled.div<{ state: string }>`
  text-align: center;
  width: 200px;
  padding: 6px 12px;
  border-radius: 10px 10px 0px 0px;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 27px */
  letter-spacing: -0.36px;

  background-color: ${({ state }) => {
    if (state === "pass") return "#F3FFFB";
    if (state === "fail") return "#fff3f3;";
    return "#F9F9F9";
  }};

  color: ${({ state }) => {
    if (state === "pass") return "#188865";
    if (state === "fail") return "#88181C";
    return "#555";
  }};

  border: ${({ state }) => {
    if (state === "pass") return "1px solid #188865";
    if (state === "fail") return "1px solid #88181C";
    return "1px solid #555";
  }};
`;

const TableContainer = styled.div`
  display: flex;
  width: 200px;
  padding: 12px 0px;
  padding-left: 16px;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  align-self: stretch;
  flex-wrap: wrap;
  border-radius: 0px 0px 20px 20px;
  border: 1px solid #f0f0f0;
`;

const TableItem = styled.div<{ loc: number; length: number }>`
  display: flex;
  padding: 16px 24px;
  align-items: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  letter-spacing: -0.28px;

  border-left: ${({ loc }) => {
    if (loc % 2 === 1) return "1px solid #f0f0f0";
  }};
  border-bottom: ${({ loc, length }) => {
    if (Math.floor(loc / 2) < Math.floor((length - 1) / 2))
      return "1px solid #f0f0f0";
  }};
`;
