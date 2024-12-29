import styled from "styled-components";
import { formatKRDate } from "../../utils";

export const TimeSetCard = ({
  groupedByDate,
  jobTitle,
}: {
  groupedByDate: any;
  jobTitle: string;
}) => {
  return (
    <Container>
      <Header>
        <Title>현재 상황</Title>
        {/* <NavButtons>
          <NavButton>&lt;</NavButton>
          <NavButton>&gt;</NavButton>
        </NavButtons> */}
      </Header>
      <CardContainer>
        {Object.keys(groupedByDate).map((date) => (
          <DateCard key={date}>
            <DateTitle>{formatKRDate(date)}</DateTitle>
            <TimeList>
              {groupedByDate[date].map((time: any, index: number) => (
                <TimeItem key={time.meetingTimeId} index={index}>
                  <TimeInfo>
                    <Time>
                      {new Date(time.meetingStartTime).toLocaleTimeString(
                        "ko-KR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }
                      )}
                    </Time>
                    <Department>{jobTitle}</Department>
                  </TimeInfo>
                  <StatusContainer>
                    {Array.from({ length: time.allowedNum }).map((_, index) => (
                      <StatusItem key={index} index={index}>
                        {index < time.reservedNum ? "선택되었습니다" : ""}
                      </StatusItem>
                    ))}
                  </StatusContainer>
                </TimeItem>
              ))}
            </TimeList>
          </DateCard>
        ))}
      </CardContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  line-height: 130%;
  margin-right: 8px;
  padding: 6px 12px;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: left;
`;

const DateCard = styled.div`
  min-width: 540px;
  max-width: 540px;
  flex: 1;
  border: 1px solid #c0c0c0;
  border-radius: 18px;
  padding: 6px 12px;
  background-color: #fff;
`;

const DateTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  padding: 6px 12px;
`;

const TimeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 6px 12px;
`;

const TimeItem = styled.div<{ index: number }>`
  display: flex;
  align-items: center;
  border-top: ${(props) => (props.index !== 0 ? "1px solid #ddd" : "none")};
  padding: 6px 12px;
  padding-top: ${(props) => (props.index !== 0 ? "15px" : "0px")};
`;

const TimeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
`;

const Time = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const Department = styled.span`
  font-size: 12px;
  color: #6c757d;
  text-align: center;
`;

const StatusContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: space-between;
`;

const StatusItem = styled.div<{ index: number }>`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  border-left: ${(props) => (props.index !== 0 ? "1px solid #f0f0f0" : "none")};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const NavButtons = styled.div`
//   display: flex;
//   gap: 6px;
// `;

// const NavButton = styled.button`
//   width: 36px;
//   height: 36px;
//   border-radius: 18px;
//   border: 1px solid #ddd;
//   background-color: white;
//   cursor: pointer;

//   &:hover {
//     background-color: #e9ecef;
//   }
// `;
