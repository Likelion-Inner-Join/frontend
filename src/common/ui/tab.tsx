import styled from "styled-components";

type TTabProps = {
  tabs: { label: string; value: string }[];
  activeTab: string;
  onTabClick: (value: string) => void;
};

export const Tab = ({ tabs, activeTab, onTabClick }: TTabProps) => {
  return (
    <TabContainer>
      {tabs.map((tab) => (
        <StyledTab
          key={tab.value}
          $isActive={activeTab === tab.value}
          onClick={() => onTabClick(tab.value)}
        >
          {tab.label}
        </StyledTab>
      ))}
    </TabContainer>
  );
};

const TabContainer = styled.div`
  display: flex;
  justify-content: left;
  gap: 50px;
  padding: 24px;
`;

const StyledTab = styled.button<{ $isActive: boolean }>`
  padding: 10px 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  color: ${({ $isActive: isActive, theme }) =>
    isActive ? theme.color.primary : "#888"};
  position: relative;

  &:after {
    content: "";
    display: block;
    width: 160%;
    height: 2px;
    background-color: ${({ $isActive: isActive, theme }) =>
      isActive ? theme.color.primary : "transparent"};
    position: absolute;
    bottom: -5px;
    left: -30%;
  }

  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`;
