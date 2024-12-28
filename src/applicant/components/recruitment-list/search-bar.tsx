import { useState } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

export const SearchBar = ({
  onSearch,
}: {
  onSearch: (term: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="동아리 이름으로 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchButton onClick={handleSearch}>
        <FiSearch />
      </SearchButton>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 50px;
  padding: 8px 16px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 8px;
  border-radius: 24px;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #888;

  &:hover {
    color: #333;
  }
`;
