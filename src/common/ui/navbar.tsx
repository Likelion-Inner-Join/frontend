import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { useAuth } from "../../auth/context/auth-context";
import profileImage from "../../assets/user-profile.svg";
import logoImg from "../../assets/logo.svg";
import { breakpoints } from "./breakpoints";

export const Navbar = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();

  const currentPath = window.location.pathname;
  const isActive = (path: string) => currentPath === path;

  const storedAuthState = sessionStorage.getItem("authState");
  const parsedAuthState = storedAuthState ? JSON.parse(storedAuthState) : null;
  const isClubManager = parsedAuthState?.role === "club";

  return (
    <Container>
      <Left>
        <Logo
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logoImg} alt="이너조인" />
          InnerJoin
        </Logo>
        {!isClubManager ? (
          <div />
        ) : (
          <NavLinks>
            <NavLink
              selected={isActive("/")}
              onClick={() => {
                navigate("/");
              }}
            >
              카테고리
            </NavLink>
            <NavLink
              selected={isActive("/my/application-manage")}
              onClick={() => {
                navigate("/my/application-manage");
              }}
            >
              지원 관리하기
            </NavLink>
          </NavLinks>
        )}
      </Left>

      <Right>
        {!authState.isAuthenticated ? (
          <ProfileWrapper
            onClick={() => {
              if (isClubManager) navigate("/owner/info");
              else navigate("/my/info");
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

  @media (max-width: ${breakpoints.mobile}) {
    padding: 4px 10px;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.span`
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: 28px;
  font-weight: 700;
  cursor: pointer;
  color: #3e3e3e;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 20px;
    gap: 10px;
  }
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

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;
