import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import QuestionBox from "../../owner/apply_form/components/QuestionBox";

const ApplyEdit = () => {
  const navigate = useNavigate();
  const { formId } = useParams(); // 수정 시 사용할 폼 ID
  const [formTitle, setFormTitle] = useState(""); // 폼 제목
  const [formDescription, setFormDescription] = useState(""); // 폼 설명
  const [formContent, setFormContent] = useState([]); // 폼의 질문 및 내용

  // 로컬 스토리지에서 폼 데이터 로드
  useEffect(() => {
    if (formId) {
      const savedForms = JSON.parse(localStorage.getItem("savedForms")) || [];
      const formToEdit = savedForms.find(
        (form) => form.id === formId.toString() // 형변환으로 ID 매칭
      );
      if (formToEdit) {
        setFormTitle(formToEdit.title); // 제목 설정
        setFormDescription(formToEdit.description); // 설명 설정
        setFormContent(formToEdit.content || []); // 질문 및 내용 설정
      } else {
        console.error("해당 ID의 폼 데이터를 찾을 수 없습니다.");
      }
    }
  }, [formId]);

  // 폼 저장
  const saveForm = () => {
    const savedForms = JSON.parse(localStorage.getItem("savedForms")) || [];
    const updatedForm = {
      id: formId, // 기존 ID 유지
      title: formTitle,
      description: formDescription,
      content: formContent,
    };

    // 폼 업데이트
    const updatedForms = savedForms.map((form) =>
      form.id === formId ? updatedForm : form
    );

    localStorage.setItem("savedForms", JSON.stringify(updatedForms)); // 로컬 스토리지에 저장
    navigate("/apply-manage"); // 관리 페이지로 이동
  };

  const addQuestion = (type) => {
    setFormContent((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type,
        question: "",
        description: "",
        options: type === "multiple_choice" || type === "checkbox" ? [""] : [],
      },
    ]);
  };

  // 경계선 추가
  const addBorder = () => {
    setFormContent((prev) => [
      ...prev,
      { id: Date.now().toString(), type: "border" },
    ]);
  };

  // 설명글 추가
  const addDescription = () => {
    setFormContent((prev) => [
      ...prev,
      { id: Date.now().toString(), type: "description", text: "" },
    ]);
  };
  const moveItemUp = (index) => {
    if (index === 0) return; // 첫 번째 항목은 위로 이동 불가
    const updatedContent = [...formContent];
    const [item] = updatedContent.splice(index, 1); // 현재 항목 제거
    updatedContent.splice(index - 1, 0, item); // 한 칸 위로 삽입
    setFormContent(updatedContent);
  };

  const moveItemDown = (index) => {
    if (index === formContent.length - 1) return; // 마지막 항목은 아래로 이동 불가
    const updatedContent = [...formContent];
    const [item] = updatedContent.splice(index, 1); // 현재 항목 제거
    updatedContent.splice(index + 1, 0, item); // 한 칸 아래로 삽입
    setFormContent(updatedContent);
  };

  // 질문 업데이트
  const updateQuestion = (id, updatedData) => {
    setFormContent((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  // 항목 삭제
  const deleteItem = (id) => {
    setFormContent((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Page>
      <Container>
        <Header>
          <HeaderLeft>
            <TitleInput
              type="text"
              placeholder="지원폼 제목을 입력해주세요"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
            <DescriptionInput
              type="text"
              placeholder="운영진이 확인하는 지원폼의 한 줄 메모를 입력해주세요"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
            />
          </HeaderLeft>
          <SaveButton onClick={saveForm}>저장하기</SaveButton>
        </Header>
        <MainContent>
          <LeftContent>
            <QuestionList>
              {formContent.map((item, index) => (
                <ItemContainer key={item.id}>
                  {/* 항목 이동 버튼 */}
                  <MoveButtons>
                    <ArrowButton
                      onClick={() => moveItemUp(index)}
                      disabled={index === 0} // 첫 번째 항목 비활성화
                    >
                      ▲
                    </ArrowButton>
                    <ArrowButton
                      onClick={() => moveItemDown(index)}
                      disabled={index === formContent.length - 1} // 마지막 항목 비활성화
                    >
                      ▼
                    </ArrowButton>
                  </MoveButtons>

                  {/* 항목 컨텐츠 */}
                  <ContentContainer>
                    {/* 경계선 처리 */}
                    {item.type === "border" ? (
                      <BorderContainer>
                        <BorderLine />
                        <DeleteBorderButton onClick={() => deleteItem(item.id)}>
                          X
                        </DeleteBorderButton>
                      </BorderContainer>
                    ) : item.type === "description" ? (
                      /* 설명글 처리 */
                      <DescriptionContainer>
                        <DescriptionHeader>
                          <DescriptionTitle>설명글</DescriptionTitle>
                          <DeleteButton onClick={() => deleteItem(item.id)}>
                            삭제
                          </DeleteButton>
                        </DescriptionHeader>
                        <DescriptionContent>
                          <Input
                            type="text"
                            value={item.text || ""}
                            placeholder="설명글 입력"
                            onChange={(e) =>
                              setFormContent((prev) =>
                                prev.map((q) =>
                                  q.id === item.id
                                    ? { ...q, text: e.target.value }
                                    : q
                                )
                              )
                            }
                          />
                        </DescriptionContent>
                      </DescriptionContainer>
                    ) : (
                      /* 질문 처리 */
                      <QuestionBox
                        questionData={item}
                        updateQuestion={(updatedData) =>
                          setFormContent((prev) =>
                            prev.map((q) =>
                              q.id === item.id ? { ...q, ...updatedData } : q
                            )
                          )
                        }
                        deleteQuestion={(id) =>
                          setFormContent((prev) =>
                            prev.filter((q) => q.id !== id)
                          )
                        }
                      />
                    )}
                  </ContentContainer>
                </ItemContainer>
              ))}
            </QuestionList>
          </LeftContent>
          <RightPanel>
            <ActionButton onClick={() => addQuestion("multiple_choice")}>
              <Icon>?</Icon> 질문 추가
            </ActionButton>
            <ActionButton onClick={addBorder}>
              <Icon>+</Icon> 경계선 추가
            </ActionButton>
            <ActionButton onClick={addDescription}>
              <Icon>≡</Icon> 설명글 추가
            </ActionButton>
          </RightPanel>
        </MainContent>
      </Container>
    </Page>
  );
};

export default ApplyEdit;

// Styled components는 apply-form.jsx와 동일
const Page = styled.div`
  background-color: #fcfafa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TitleInput = styled.input`
  font-size: 33px;
  font-weight: bold;
  color: #000000;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 10px 0;
  &::placeholder {
    color: #000000;
  }
`;

const DescriptionInput = styled.input`
  font-size: 19px;
  color: #666;
  width: 600px;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 10px 0;
  &::placeholder {
    color: #424242;
  }
`;

const SaveButton = styled.button`
  background-color: #b10d15;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #9c0c13;
  }
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const LeftContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BorderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BorderLine = styled.div`
  flex: 1;
  height: 2px;
  background-color: #ddd;
`;

const DeleteBorderButton = styled.button`
  background-color: #ffffff;
  color: #b10d15;
  border: none;
  padding: 10px 0px;
  border-radius: 5px;
  cursor: pointer;
`;

const DescriptionContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  background-color: white;
`;

const DescriptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DescriptionTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const DescriptionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: ${(props) => (props.isQuestionInput ? "18px" : "16px")};
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const DeleteButton = styled.button`
  background-color: #ffffff;
  color: #b10d15;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const RightPanel = styled.div`
  width: 150px;
  height: fit-content; /* 내용에 맞게 높이 자동 조정 */
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #ffffff;

  border-radius: 14px;
  padding: 5px 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto; /* 가운데 정렬 */
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  border: none;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  padding: 10px 20px;
  text-align: left;
  width: 100%;

  &:hover {
    background-color: #f9f9f9;
  }

  & > span {
    font-size: 18px;
    color: #666;
  }
`;

const Icon = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0; /* 아주 옅은 회색 배경 */
  border-radius: 50%;
  font-size: 18px;
  color: #666;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 버튼과 내용 사이 간격 */
  position: relative;
`;

const MoveButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px; /* 위아래 버튼 간 간격 */
  position: absolute;
  left: -40px; /* 버튼을 왼쪽으로 배치 */
`;

const ArrowButton = styled.button`
  background-color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  color: #ccc; /* 옅은 회색 화살표 */

  &:hover {
    background-color: #f9f9f9; /* 조금 더 연한 배경 */
    color: #999; /* hover 시 화살표 색상 변경 */
  }

  &:disabled {
    cursor: not-allowed;
    color: #e0e0e0; /* 비활성화 상태에서 더 연한 회색 */
  }
`;

const ContentContainer = styled.div`
  flex: 1;
`;
