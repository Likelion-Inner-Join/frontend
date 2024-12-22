import { useState } from "react";
import styled from "styled-components";
import { CalendarHeader } from "./application-calendar-header";
import { TApplicationData } from "../../pages";

const generateCalendar = (year: number, month: number) => {
  const startDay = new Date(year, month, 1);
  const endDay = new Date(year, month + 1, 0);

  const daysInMonth = [];
  let currentDate = new Date(startDay);

  while (currentDate.getDay() !== 0) {
    currentDate.setDate(currentDate.getDate() - 1);
    daysInMonth.unshift(new Date(currentDate));
  }

  currentDate = new Date(startDay);

  while (currentDate <= endDay) {
    daysInMonth.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  while (daysInMonth.length % 7 !== 0) {
    currentDate.setDate(currentDate.getDate() + 1);
    daysInMonth.push(new Date(currentDate));
  }

  return daysInMonth;
};

export const ApplicationCalendar = ({
  applications,
}: {
  applications: TApplicationData[];
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState("전체");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDays = generateCalendar(year, month);

  const getEventsForDate = (date: Date, activeFilter: string) => {
    const startEvents = applications.filter(
      (application) =>
        new Date(application.startTime).toDateString() === date.toDateString()
    );

    const endEvents = applications.filter(
      (application) =>
        new Date(application.endTime).toDateString() === date.toDateString()
    );

    if (activeFilter === "시작") {
      return { startEvents, endEvents: [] };
    }
    if (activeFilter === "마감") {
      return { startEvents: [], endEvents };
    }
    return { startEvents, endEvents };
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <CalendarWrapper>
      <CalendarHeader
        currentDate={currentDate}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      <Grid>
        {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
          <HeaderCell key={idx}>{day}</HeaderCell>
        ))}
        {calendarDays.map((date, idx) => {
          const { startEvents, endEvents } = getEventsForDate(
            date,
            activeFilter
          );

          return (
            <DayCell key={idx}>
              {date.getMonth() === month && (
                <>
                  <DateLabel
                    isToday={
                      date.toLocaleDateString() ===
                      new Date().toLocaleDateString()
                    }
                  >
                    {date.getDate()}
                  </DateLabel>
                  <EventsWrapper>
                    {startEvents.map((event, idx) => (
                      <EventBadge key={`start-${idx}`}>
                        <Badge type="시작">시작</Badge>
                        <span>{event.clubName}</span>
                      </EventBadge>
                    ))}

                    {endEvents.map((event, idx) => (
                      <EventBadge key={`end-${idx}`}>
                        <Badge type="마감">마감</Badge>
                        <span>{event.clubName}</span>
                      </EventBadge>
                    ))}
                  </EventsWrapper>
                </>
              )}
            </DayCell>
          );
        })}
      </Grid>
    </CalendarWrapper>
  );
};

const CalendarWrapper = styled.div`
  margin: 0 auto;
`;

const Grid = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const HeaderCell = styled.div`
  text-align: center;
  font-weight: bold;
  padding: 10px 0;
`;

const DayCell = styled.div`
  min-width: 150px;
  min-height: 150px;
  padding: 5px;
  position: relative;
  background-color: #fff;
  outline: 1px solid #ddd;
`;

const DateLabel = styled.div<{ isToday: boolean }>`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  width: fit-content;
  border-radius: 30px;
  padding: 8px;
  color: ${({ isToday }) => (isToday ? "#b10d15" : "#000")};
  background: ${({ isToday }) => (isToday ? "#fff3f3" : "#fff")};
`;

const EventsWrapper = styled.div`
  margin-top: 5px;
`;

const EventBadge = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  span {
    margin: 4px 0;
    font-size: 14px;
    font-weight: 500;
  }
`;

const Badge = styled.div<{ type: string }>`
  padding: 6px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  margin-right: 6px;
  min-width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  background-color: ${({ type }) =>
    type === "마감" ? "#FFFAF3" : type === "시작" ? "#F3FFF5" : "transparent"};

  color: ${({ type }) =>
    type === "마감" ? "#C04D01" : type === "시작" ? "#259919" : "black"};
`;
