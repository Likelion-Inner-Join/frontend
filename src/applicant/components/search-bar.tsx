import { useState } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // FIXME: 검색 로직 추가 필요
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="검색어를 입력하시오..."
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
