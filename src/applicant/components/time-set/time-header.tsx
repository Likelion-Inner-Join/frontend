import styled from "styled-components";
import { formatKRDate } from "../../utils";

export const TimeHeader = ({
  clubName,
  jobTitle,
  reservationStartDate,
  reservationEndDate,
}: {
  clubName: string;
  jobTitle: string;
  reservationStartDate: string;
  reservationEndDate: string;
}) => {
  return (
    <Container>
      <Title>
        {clubName} <span className="position-name">{jobTitle}</span> 면접시간
        선착순으로 확정하기
      </Title>
      <InfoRow>
        <InfoItem>
          <span>시작</span> <Date>{formatKRDate(reservationStartDate)}</Date>
        </InfoItem>
        <InfoItem>
          <span>종료</span> <Date>{formatKRDate(reservationEndDate)}</Date>
        </InfoItem>
      </InfoRow>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #000;
  margin: 0 0 10px 0;
  line-height: 130%;
  font-weight: 700;

  .position-name {
    color: #606060;
    margin-right: 20px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  gap: 60px;
  font-size: 14px;
  margin-top: 5px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
  color: #000;
  font-size: 17px;
  font-weight: 600;
  line-height: 130%;
`;

const Date = styled.span`
  margin-left: 24px;
  color: #424242;

  font-size: 16px;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: 0.08em;
`;
