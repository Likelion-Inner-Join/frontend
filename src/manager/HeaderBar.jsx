// HeaderBar.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import
import styled from "styled-components";

const HeaderBarComponent = () => {
  const navigate = useNavigate(); // useNavigate hook 사용

  const handleLogoClick = () => {
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <HeaderBar>
      <LogoWrapper onClick={handleLogoClick}>
        <Logo src="/images/manager/logo.svg" alt="Logo" />
      </LogoWrapper>
      <ClubInfo>
        <CircleImage src="/images/manager/mutsa.svg" alt="동아리 이미지" />
        <HeaderClubName>멋쟁이 사자처럼</HeaderClubName>
      </ClubInfo>
    </HeaderBar>
  );
};

export default HeaderBarComponent;

const HeaderBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const ClubInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 200px;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CircleImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
`;

const HeaderClubName = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
  margin-right: 50px;
  color: #333;
  text-align: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer; /* 클릭 가능한 커서 추가 */
`;

const Logo = styled.img`
  height: 40px;
  object-fit: contain;
  margin: 0;
`;
