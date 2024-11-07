import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ApplyManage = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const savedForms = JSON.parse(localStorage.getItem("savedForms")) || [];
    setForms(savedForms);
  }, []);

  const handleEditClick = (id) => {
    navigate(`/apply-edit/${id}`); // Redirect to an edit page, passing the form ID
  };

  return (
    <Container>
      <Header>
        <ClubLogo />
        <ClubSubTitle>중앙동아리</ClubSubTitle>
        <ClubName>멋쟁이사자처럼</ClubName>
        <ClubTags>
          <Tag>#IT</Tag>
          <Tag>#프론트엔드</Tag>
          <Tag>#백엔드</Tag>
        </ClubTags>
      </Header>
      <TabMenu>
        <Tab active={false} onClick={() => navigate("/post-manage")}>
          홍보글 작성
        </Tab>
        <Tab active={true}>지원폼 관리</Tab>
      </TabMenu>
      <ApplyButtonContainer>
        <ApplyButton onClick={() => navigate("/apply-form")}>
          지원서 생성하기
        </ApplyButton>
      </ApplyButtonContainer>
      <FormList>
        {forms.map((form) => (
          <FormItem key={form.id}>
            <EditButton onClick={() => handleEditClick(form.id)}>✏️</EditButton>
            <FormTitle>
              {form.title.length > 15
                ? `${form.title.slice(0, 15)}...`
                : form.title}
            </FormTitle>
            <FormDescription>
              {form.description.slice(0, 50)}...
            </FormDescription>
          </FormItem>
        ))}
      </FormList>
    </Container>
  );
};

export default ApplyManage;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

const ClubLogo = styled.div`
  width: 128px;
  height: 128px;
  background-color: #ddd;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const ClubName = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 5px;
`;

const ClubSubTitle = styled.p`
  margin-top: 5px;
  margin-bottom: 0px;
  font-size: 14px;
`;

const ClubTags = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Tag = styled.span`
  background-color: #ffeded;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  border-bottom: 2px solid #f2f2f2;
  width: 100%;
`;

const Tab = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#B10D15" : "#888")};
  border-bottom: ${(props) => (props.active ? "2px solid #B10D15" : "none")};
`;

const ApplyButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ApplyButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 20px;
  color: #888;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #f2f2f2;
  }

  &::before {
    content: "+";
    font-size: 20px;
    margin-right: 10px;
  }
`;

const FormList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const FormItem = styled.div`
  position: relative;
  width: 250px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const EditButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #b10d15;

  &:hover {
    color: #a00c14;
  }
`;

const FormTitle = styled.h3`
  font-size: 18px;
  color: #b10d15;
  margin-bottom: 10px;
`;

const FormDescription = styled.p`
  font-size: 14px;
  color: #555;
  overflow: hidden;
  text-overflow: ellipsis;
`;
