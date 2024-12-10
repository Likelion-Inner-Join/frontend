import { useEffect, useState } from "react";
import styled from "styled-components";

export const BasicInfoSection = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    profileImage: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const fakeData = {
        name: "홍길동",
        email: "hong@example.com",
        profileImage: "",
        password: "********",
      };
      setUserInfo(fakeData);
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUserInfo({
      name: "홍길동",
      email: "hong@example.com",
      profileImage: "",
      password: "********",
    });
  };

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>기본 정보</SectionTitle>
        {!isEditing ? (
          <EditButton onClick={() => setIsEditing(true)}>수정하기</EditButton>
        ) : (
          <ButtonGroup>
            <SaveButton onClick={handleSave}>저장</SaveButton>
            <CancelButton onClick={handleCancel}>취소</CancelButton>
          </ButtonGroup>
        )}
      </SectionHeader>
      <InfoTable>
        <tbody>
          <Tr>
            <Th>이름</Th>
            {isEditing ? (
              <Input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
              />
            ) : (
              <Td>{userInfo.name}</Td>
            )}
          </Tr>
          <Tr>
            <Th>이메일</Th>
            {isEditing ? (
              <Input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
              />
            ) : (
              <Td>{userInfo.email}</Td>
            )}
          </Tr>
          <Tr>
            <Th>비밀번호</Th>
            {isEditing ? (
              <Input
                type="password"
                name="password"
                value={userInfo.password}
                onChange={handleInputChange}
              />
            ) : (
              <Td>{userInfo.password}</Td>
            )}
          </Tr>
          <Tr>
            <Th>프로필 사진</Th>
            <Td>
              {userInfo.profileImage ? (
                <ProfileImage>
                  <img src={userInfo.profileImage} alt="Profile" />
                </ProfileImage>
              ) : (
                <DefaultProfileIcon>사진 없음</DefaultProfileIcon>
              )}
            </Td>
          </Tr>
        </tbody>
      </InfoTable>
    </Section>
  );
};

const Section = styled.div`
  max-width: 912px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  padding-left: 16px;
`;

const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const Tr = styled.tr`
  & > th,
  & > td {
    padding-bottom: 54px;
  }
`;

const Th = styled.th`
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  color: #424242;
  padding: 8px 16px;
  width: 120px;
  vertical-align: top;
`;

const Td = styled.td`
  padding: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #000000;
`;

const Input = styled.input`
  min-width: 300px;
  height: 32px;
  padding: 20px;
  font-size: 16px;
  line-height: 1.5;
  border: 1px solid #ddd;
  border-radius: 20px;
  box-sizing: border-box;
  outline: none;

  &:hover,
  &:focus {
    border-color: #cc141d;
  }
`;

const ProfileImage = styled.div`
  img {
    width: 100px;
    height: 100px;
    border: 1px solid #424242;
    border-radius: 60px;
  }
`;

const DefaultProfileIcon = styled.div`
  font-size: 16px;
  color: #888;
`;

const EditButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.color.primary};
  cursor: pointer;

  padding: 12px 32px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.primary};
  background: none;

  &:hover {
    background-color: ${(props) => props.theme.color.primary};
    color: #fff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const SaveButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.color.primary};
  cursor: pointer;

  padding: 12px 32px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.primary};
  background: none;

  &:hover {
    background-color: ${(props) => props.theme.color.primary};
    color: #fff;
  }
`;

const CancelButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;

  padding: 12px 32px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.secondary};
  background-color: ${(props) => props.theme.color.secondary};

  &:hover {
    background-color: ${(props) => props.theme.color.secondaryHover};
    color: #fff;
  }
`;
