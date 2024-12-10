import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { useAuth } from "../../auth/context/auth-context";
import profileImage from "../../assets/user-profile.png";
import { useState } from "react";

export const Navbar = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("category");

  return (
    <Container>
      <Left>
        <Logo
          onClick={() => {
            navigate("/");
          }}
        >
          이너조인
        </Logo>
        {/* FIXME: 페이지 변해도 선택된 상태 유지하도록 */}
        <NavLinks>
          <NavLink
            selected={selected === "category"}
            onClick={() => {
              setSelected("category");
              navigate("/");
            }}
          >
            카테고리
          </NavLink>
          <NavLink
            selected={selected === "application-manage"}
            onClick={() => {
              setSelected("application-manage");
              navigate("/my/application-manage");
            }}
          >
            지원 관리하기
          </NavLink>
        </NavLinks>
      </Left>

      <Right>
        {authState.isAuthenticated ? (
          <ProfileWrapper
            onClick={() => {
              navigate("/my/info");
            }}
          >
            <ProfileImage src={profileImage} alt="프로필" />
            <UserName>{authState.user?.name || "유저명"}</UserName>
          </ProfileWrapper>
        ) : (
          <ButtonGroup>
            <Button
              label="로그인"
              onClick={() => {
                navigate("/login");
              }}
            />
            <Button
              label="회원가입"
              variant="secondary"
              onClick={() => {
                navigate("/signup");
              }}
            />
          </ButtonGroup>
        )}
      </Right>
    </Container>
  );
};

const Container = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 40px;
  border-bottom: 1px solid #ccc;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.span`
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => props.theme.color.primary};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 36px;
  margin-left: 60px;
`;

const NavLink = styled.div<{ selected?: boolean }>`
  cursor: pointer;
  font-size: 20px;
  font-weight: ${({ selected }) => (selected ? 600 : 500)};
  color: ${({ selected }) => (selected ? "#000000" : "#424242")};
  &:hover {
    color: #000000;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;
