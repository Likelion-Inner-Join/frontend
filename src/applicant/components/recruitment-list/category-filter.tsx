import { useState } from "react";
import styled from "styled-components";

export type TCategory = {
  id: string;
  label: string;
};

type TCategoryFilterProps = {
  title: string;
  categories: TCategory[];
};

export const CategoryFilter = ({ title, categories }: TCategoryFilterProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (id: string) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((filter) => filter !== id) : [...prev, id]
    );
  };

  return (
    <FilterContainer>
      <div style={{ alignSelf: "left" }}>
        <Title>{title}</Title>
        <FilterList>
          {categories.map((category) => (
            <FilterItem
              key={category.id}
              selected={selectedFilters.includes(category.id)}
              onClick={() => toggleFilter(category.id)}
            >
              <CheckIcon selected={selectedFilters.includes(category.id)}>
                ✓
              </CheckIcon>
              {category.label}
            </FilterItem>
          ))}
        </FilterList>
      </div>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  margin-top: 18%;
  padding: 0 15%;
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 8px;
  margin-bottom: 20px;
`;

const FilterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FilterItem = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  color: ${({ selected }) => (selected ? "#CC141D" : "#424242")};
  font-weight: ${({ selected }) => (selected ? "600" : "500")};
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
