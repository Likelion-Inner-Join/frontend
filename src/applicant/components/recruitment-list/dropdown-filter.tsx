import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type TOption = {
  id: string;
  label: string;
};

type TDropdownFilterProps = {
  label: string;
  options: TOption[];
};

export const DropdownFilter = ({ label, options }: TDropdownFilterProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("all");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (id: string) => {
    setSelectedOption(id);
    setIsOpen(false);
  };

  const getSelectedLabel = () => {
    return (
      options.find((option) => option.id === selectedOption)?.label || "전체"
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <Label>{label}</Label>
      <SelectedArea onClick={toggleDropdown}>
        <SelectedText>{getSelectedLabel()}</SelectedText>
        <Arrow isOpen={isOpen}>▼</Arrow>
      </SelectedArea>
      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <MenuItem
              key={option.id}
              selected={selectedOption === option.id}
              onClick={() => handleOptionClick(option.id)}
            >
              <CheckIcon selected={selectedOption === option.id}>✓</CheckIcon>
              {option.label}
            </MenuItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  gap: 16px;
  width: 180px;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const SelectedArea = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #d32f2f;
`;

const SelectedText = styled.span`
  margin-right: 8px;
  font-weight: 500;
`;

const Arrow = styled.span<{ isOpen?: boolean }>`
  font-size: 12px;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 40%;
  z-index: 10;
  background: #ffffff;
  border-radius: 12px;
  margin-top: 4px;
  width: 150px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const MenuItem = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  font-size: 14px;
  cursor: pointer;
  color: ${({ selected }) => (selected ? "#CC141D" : "#424242")};
  color: ${({ selected }) => (selected ? "#CC141D" : "#424242")};
  font-weight: ${({ selected }) => (selected ? "600" : "500")};
  &:hover {
    background-color: #f5f5f5;
  }
`;

const CheckIcon = styled.div<{ selected?: boolean }>`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ selected }) => (selected ? "#CC141D" : "#DDDDDD")};
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
`;
