import { useState } from "react";
import styled from "styled-components";

export type TCategory = {
  id: string;
  label: string;
};

type TCategoryFilterProps = {
  categories: TCategory[];
  onChange: (selectedFilters: string[]) => void;
};

export const CategoryFilter = ({
  categories,
  onChange,
}: TCategoryFilterProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["ALL"]);

  const toggleFilter = (id: string) => {
    let updatedFilters;

    if (id === "ALL") {
      updatedFilters = selectedFilters.includes("ALL") ? [] : ["ALL"];
    } else {
      updatedFilters = selectedFilters.includes(id)
        ? selectedFilters.filter((filter) => filter !== id)
        : [...selectedFilters.filter((filter) => filter !== "ALL"), id];
    }

    setSelectedFilters(updatedFilters);
    onChange(updatedFilters);
  };

  return (
    <FilterContainer>
      <div style={{ alignSelf: "left" }}>
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
  height: 100vh;
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
