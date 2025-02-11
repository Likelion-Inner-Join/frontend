import React from "react";
import styled from "styled-components";
import { ApplicantType } from "../global/types";
import { breakpoints } from "../../common/ui/breakpoints";

interface ResultTableProps {
  restList: ApplicantType[];
  passList: ApplicantType[];
  failList: ApplicantType[];
  isColor: boolean;
}

const ResultTable = ({
  restList,
  passList,
  failList,
  isColor,
}: ResultTableProps) => {
  return (
    <Wrapper>
      {restList.length > 0 && (
        <div>
          <TableTitle state="PENDING" isColor={isColor}>
            미평가
          </TableTitle>
          <TableContainer>
            {restList?.map((applicant, index) => (
              <TableItem
                key={applicant.applicationId}
                loc={index}
                length={restList.length}
              >
                {applicant.name} <br />
                {applicant.studentNumber}
              </TableItem>
            ))}
          </TableContainer>
        </div>
      )}
      <div>
        <TableTitle state="PASS" isColor={isColor}>
          합격
        </TableTitle>
        <TableContainer>
          {passList?.map((applicant, index) => (
            <TableItem
              key={applicant.applicationId}
              loc={index}
              length={passList.length}
            >
              {applicant.name} <br />
              {applicant.studentNumber}
            </TableItem>
          ))}
        </TableContainer>
      </div>
      <div>
        <TableTitle state="FAIL" isColor={isColor}>
          불합격
        </TableTitle>
        <TableContainer>
          {failList?.map((applicant, index) => (
            <TableItem
              key={applicant.applicationId}
              loc={index}
              length={failList.length}
            >
              {applicant.name} <br />
              {applicant.studentNumber}
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

  @media (max-width: ${breakpoints.mobile}) {
    gap: 12px;
  }
`;

const TableTitle = styled.div<{ state: string; isColor: boolean }>`
  text-align: center;
  width: 250px;
  padding: 6px 12px;
  border-radius: 10px 10px 0px 0px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 27px */
  letter-spacing: -0.36px;

  background-color: ${({ state, isColor }) => {
    if (!isColor) return "#F9F9F9";
    if (state === "PASS") return "#F3FFFB";
    if (state === "FAIL") return "#fff3f3;";
    return "#F9F9F9";
  }};

  color: ${({ state, isColor }) => {
    if (!isColor) return "#000";
    if (state === "PASS") return "#188865";
    if (state === "FAIL") return "#B10D15";
    return "#555";
  }};

  border: ${({ state }) => {
    if (state === "PASS") return "1px solid #EBFAF0";
    if (state === "FAIL") return "1px solid #FBEEEE";
    return "1px solid #f0f0f0";
  }};

  border-bottom: none;

  @media (max-width: ${breakpoints.mobile}) {
    width: 110px;
  }
`;

const TableContainer = styled.div`
  display: flex;
  width: 250px;
  padding: 12px 0px;
  padding-left: 16px;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  align-self: stretch;
  flex-wrap: wrap;
  border-radius: 0px 0px 20px 20px;
  border: 1px solid #f0f0f0;
  border-top: none;

  @media (max-width: ${breakpoints.mobile}) {
    width: 110px;
    padding-left: 5px;
  }
`;

const TableItem = styled.div<{ loc: number; length: number }>`
  display: flex;
  padding: 16px 24px;
  align-items: center;
  text-align: center;
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

  @media (max-width: ${breakpoints.mobile}) {
    border: none;
  }
`;
