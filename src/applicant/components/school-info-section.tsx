import { useEffect, useState } from "react";
import styled from "styled-components";

export const SchoolInfoSection = () => {
  const [userInfo, setUserInfo] = useState({
    university: "",
    major: "",
    studentId: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const fakeData = {
        university: "서강대학교",
        major: "컴퓨터공학과",
        studentId: "20211234",
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
      university: "서강대학교",
      major: "컴퓨터공학과",
      studentId: "20211234",
    });
  };

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>학교 정보</SectionTitle>
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
            <Th>대학명</Th>
            {isEditing ? (
              <Input
                type="text"
                name="name"
                value={userInfo.university}
                onChange={handleInputChange}
              />
            ) : (
              <Td>{userInfo.university}</Td>
            )}
          </Tr>
          <Tr>
            <Th>학과</Th>
            {isEditing ? (
              <Input
                type="email"
                name="email"
                value={userInfo.major}
                onChange={handleInputChange}
              />
            ) : (
              <Td>{userInfo.major}</Td>
            )}
          </Tr>
          <Tr>
            <Th>학번</Th>
            {isEditing ? (
              <Input
                type="password"
                name="password"
                value={userInfo.studentId}
                onChange={handleInputChange}
              />
            ) : (
              <Td>{userInfo.studentId}</Td>
            )}
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
