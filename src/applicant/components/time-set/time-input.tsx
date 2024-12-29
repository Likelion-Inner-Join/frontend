import { useState } from "react";
import styled from "styled-components";
import { POST } from "../../../common/api/axios";
import { TMeetingTime } from "../../pages";
import { formatKRDate } from "../../utils";

export const TimeInput = ({
  groupedByDate,
}: {
  groupedByDate: Record<string, TMeetingTime[]>;
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const handleFormSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      setErrorMessage("날짜와 시간을 모두 선택하세요.");
      return;
    }

    try {
      const response = await POST("application/interview-time", {
        applicantId: "", // FIXME:
        meetingTimeId: selectedTime,
      });
      if (response.isSuccess) {
        alert("성공적으로 면접 시간이 선택되었어요.");
      } else {
        console.log(response.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
        <Title>면접 시간 입력하기</Title>
        {errorMessage && <Message>{errorMessage}</Message>}
      </div>
      <FormContainer>
        <SelectWrapper>
          <Select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="" disabled>
              날짜를 선택하세요
            </option>
            {Object.keys(groupedByDate).map((date) => (
              <option key={date} value={date}>
                {formatKRDate(date)}
              </option>
            ))}
          </Select>
          <Arrow />
        </SelectWrapper>

        {selectedDate && (
          <SelectWrapper>
            <Select
              value={selectedTime ?? ""}
              onChange={(e) => setSelectedTime(Number(e.target.value))}
            >
              <option value="" disabled>
                시간을 선택하세요
              </option>
              {groupedByDate[selectedDate]?.map((time) => (
                <option key={time.meetingTimeId} value={time.meetingTimeId}>
                  {new Date(time.meetingStartTime).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </option>
              ))}
            </Select>
            <Arrow />
          </SelectWrapper>
        )}

        <Button onClick={handleFormSubmit}>적용하기</Button>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  line-height: 130%;
  margin: 0px;
  padding-left: 6px;
`;

const Message = styled.span`
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
  color: #cc141d;
`;

const FormContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  min-width: 250px;
`;

const Select = styled.select`
  padding: 12px;
  font-size: 16px;
  font-weight: 700;
  border: 1px solid #ccc;
  border-radius: 12px;
  appearance: none;
  background: transparent;
  width: 100%;
  outline: none;
  &:focus {
    border-color: #c82333;
  }
`;

const Arrow = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #000;
`;

const Button = styled.button`
  margin-left: 40px;
  padding: 12px 32px;
  background-color: #dc3545;
  color: white;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  border: none;
  border-radius: 30px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;
