import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GET } from "../../common/api/axios";
import { DELETE } from "../../common/api/axios";
import HeaderBarComponent from "../../manager/HeaderBar";

const ApplyManage = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);

  // 로컬 스토리지에서 데이터 로드
  // API에서 지원폼 데이터 로드
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await GET("form"); // GET 요청
        if (response.isSuccess) {
          setForms(response.result);
        } else {
          console.error("지원폼 로드 실패:", response.message);
        }
      } catch (error) {
        console.error("API 호출 에러:", error.message);
      }
    };

    fetchForms();
  }, []);

  // 폼 삭제
  const deleteForm = async (id) => {
    if (window.confirm("정말로 이 폼을 삭제하시겠습니까?")) {
      try {
        const response = await DELETE(`form/${id}`); // DELETE 요청
        if (response.isSuccess) {
          console.log("폼 삭제 성공:", response.message);
          // 상태 업데이트
          const updatedForms = forms.filter((form) => form.id !== id);
          setForms(updatedForms);
        } else {
          console.error("폼 삭제 실패:", response.message);
        }
      } catch (error) {
        console.error("API 호출 에러:", error.message);
      }
    }
  };

  // 폼 사본 만들기
  const copyForm = (id) => {
    const formToCopy = forms.find((form) => form.id === id);
    if (formToCopy) {
      const copiedForm = {
        ...formToCopy,
        id: Date.now().toString(),
        title: `${formToCopy.title} (사본)`,
      };
      const updatedForms = [copiedForm, ...forms]; // 사본을 맨 위로 추가
      localStorage.setItem("savedForms", JSON.stringify(updatedForms));
      setForms(updatedForms);
    }
  };

  return (
    <Container>
      <HeaderBarComponent />
      <Header>
        <ClubLogo src="/images/manager/mutsa.svg" alt="동아리 이미지" />
        <ClubSubTitle>중앙동아리</ClubSubTitle>
        <ClubName>멋쟁이사자처럼</ClubName>
        <ClubTags>
          <Tag>#IT</Tag>
          <Tag>#프론트엔드</Tag>
          <Tag>#백엔드</Tag>
        </ClubTags>
      </Header>
      <TabMenu>
        <Tab onClick={() => navigate("/post-manage")}>홍보글 작성</Tab>
        <Tab active={true}>지원폼 관리</Tab>
      </TabMenu>
      <ApplyButtonContainer>
        <ApplyButton onClick={() => navigate("/apply-form")}>
          새로운 지원폼 작성하기
        </ApplyButton>
      </ApplyButtonContainer>
      <FormList>
        {forms.map((form) => (
          <FormItem key={form.id}>
            <FormContent onClick={() => navigate(`/apply-edit/${form.id}`)}>
              <FormTitle>{form.title}</FormTitle>
              <FormDescription>{form.description}</FormDescription>
            </FormContent>
            <MoreOptions>
              <OptionButton onClick={() => deleteForm(form.id)}>
                삭제하기
              </OptionButton>
              <OptionButton onClick={() => navigate(`/apply-edit/${form.id}`)}>
                수정하기
              </OptionButton>
              <OptionButton onClick={() => copyForm(form.id)}>
                사본 만들기
              </OptionButton>
            </MoreOptions>
          </FormItem>
        ))}
      </FormList>
    </Container>
  );
};

export default ApplyManage;

// Styled Components
const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 92px; /* HeaderBar 높이 + 여백 */

  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

const ClubLogo = styled.img`
  width: 128px; /* 로고 크기 */
  height: 128px; /* 로고 크기 */
  border-radius: 50%; /* 원형 로고 */
  object-fit: cover; /* 이미지 비율 유지 */
  margin-bottom: 15px; /* 로고와 제목 사이 간격 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
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

const Tab = styled.div.attrs((props) => ({
  className: props.active ? "active-tab" : "",
}))`
  padding: 10px 20px;
  cursor: pointer;
  color: #000;
  border-bottom: 2px solid transparent;

  &.active-tab {
    color: #b10d15;
    border-bottom-color: #b10d15;
    font-weight: bold;
  }

  &:hover {
    background-color: #f8f9fa;
  }
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
`;

const FormContent = styled.div`
  flex: 1;
  cursor: pointer;
`;

const FormTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

const FormDescription = styled.p`
  font-size: 14px;
  color: #555;
`;

const MoreOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OptionButton = styled.button`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;
