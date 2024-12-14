import styled from "styled-components";

type TCalendarHeaderProps = {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

export const CalendarHeader = ({
  currentDate,
  onPrev,
  onNext,
  activeFilter,
  onFilterChange,
}: TCalendarHeaderProps) => {
  const month = currentDate.toLocaleString("ko-KR", { month: "long" });
  const year = currentDate.getFullYear();

  const filters = ["전체", "시작", "마감", "1차", "최종", "면접"];

  return (
    <CalendarHeaderWrapper>
      <FilterWrapper>
        {filters.map((filter) => (
          <FilterOption
            key={filter}
            isActive={filter === activeFilter}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </FilterOption>
        ))}
      </FilterWrapper>

      <CurrentMonthWrapper>
        <NavigationButton onClick={onPrev}>&lt;</NavigationButton>
        <MonthDisplay>
          {year}년 {month}
        </MonthDisplay>
        <NavigationButton onClick={onNext}>&gt;</NavigationButton>
      </CurrentMonthWrapper>

      <div />
    </CalendarHeaderWrapper>
  );
};

const CalendarHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 10px 20px;
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 24px;
`;

const FilterOption = styled.span<{ isActive: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${({ isActive }) => (isActive ? "#B10D15" : "#767676")};
  cursor: pointer;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    right: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 1%;
    height: 16px;
    background-color: #ddd;
  }
`;

const CurrentMonthWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const MonthDisplay = styled.span`
  font-size: 28px;
  font-weight: 600;
  margin: 0 30px;
  color: #000;
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  color: #333;
  font-weight: 300;
`;
