import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import QuestionBox from "../../owner/apply_form/components/QuestionBox";
import { GET, PUT } from "../../common/api/axios";

const ApplyEdit = () => {
  const navigate = useNavigate();
  const { formId } = useParams(); // 수정할 폼의 ID
  const [formTitle, setFormTitle] = useState(""); // 폼 제목
  const [formDescription, setFormDescription] = useState(""); // 폼 설명
  const [formContent, setFormContent] = useState([]); // 폼의 질문 데이터
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [popupMessage, setPopupMessage] = useState(""); // 팝업 메시지 상태
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 여부

  // 서버에서 폼 데이터 불러오기
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await GET(`form/${formId}`); // 조회 API 요청
        if (response.isSuccess) {
          const formData = response.result;
          setFormTitle(formData.title); // 제목 설정
          setFormDescription(formData.description); // 설명 설정
          setFormContent(
            formData.questionList.map((item) => ({
              id: item.questionId.toString(), // 고유 ID로 questionId 사용
              number: item.number,
              question: item.question,
              type: item.type.toLowerCase(), // 타입을 소문자로 변환
              options: item.list || [], // 옵션 리스트
            }))
          );
        } else {
          console.error("폼 조회 실패:", response.message);
          setPopupMessage("폼 데이터를 불러올 수 없습니다.");
          setShowPopup(true);
        }
      } catch (error) {
        console.error("API 호출 에러:", error.message);
        setPopupMessage("서버와의 연결에 실패했습니다.");
        setShowPopup(true);
      }
    };

    if (formId) fetchForm(); // formId가 있을 때만 호출
  }, [formId]); // formId가 변경될 때마다 조회

  // 폼 저장
  const saveForm = async () => {
    if (!formTitle.trim()) {
      setPopupMessage("폼 제목을 입력해주세요.");
      setShowPopup(true);
      return;
    }

    if (formContent.length === 0) {
      setPopupMessage("폼에 최소 한 개의 질문을 추가해주세요.");
      setShowPopup(true);
      return;
    }

    for (const question of formContent) {
      if (!question.question.trim()) {
        setPopupMessage("모든 질문에 제목을 입력해주세요.");
        setShowPopup(true);
        return;
      }
    }

    try {
      const formData = {
        title: formTitle,
        description: formDescription,
        questionList: formContent.map((item, index) => ({
          number: index + 1,
          question: item.question,
          type: item.type.toUpperCase(),
          list: item.options || [],
        })),
      };

      const response = await PUT(`form/${formId}`, formData); // PUT 요청
      if (response.isSuccess) {
        navigate("/apply-manage"); // 저장 후 관리 페이지로 이동
      } else {
        setPopupMessage(response.message || "폼 저장에 실패했습니다.");
        setShowPopup(true);
      }
    } catch (error) {
      console.error("API 호출 에러:", error.message);
      setPopupMessage("폼 저장 중 오류가 발생했습니다.");
      setShowPopup(true);
    }
  };

  // 팝업 닫기
  const closePopup = () => {
    setShowPopup(false);
  };

  // 새로운 질문 추가
  const addQuestion = (type) => {
    setFormContent((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type,
        question: "",
        options: type === "multiple_choice" || type === "checkbox" ? [""] : [],
      },
    ]);
  };

  // 항목 이동
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
              value={formTitle} // 조회된 제목
              onChange={(e) => setFormTitle(e.target.value)} // 수정 가능
            />

            <DescriptionInput
              type="text"
              placeholder="운영진이 확인하는 지원폼의 한 줄 메모를 입력해주세요"
              value={formDescription} // 조회된 설명
              onChange={(e) => setFormDescription(e.target.value)} // 수정 가능
            />
          </HeaderLeft>
          <SaveButton onClick={saveForm}>저장하기</SaveButton>
        </Header>
        <MainContent>
          <LeftContent>
            <QuestionList>
              {formContent.map((item, index) => (
                <ItemContainer key={item.id}>
                  <MoveButtons>
                    <ArrowButton
                      onClick={() => moveItemUp(index)}
                      disabled={index === 0}
                    >
                      ▲
                    </ArrowButton>
                    <ArrowButton
                      onClick={() => moveItemDown(index)}
                      disabled={index === formContent.length - 1}
                    >
                      ▼
                    </ArrowButton>
                  </MoveButtons>
                  <ContentContainer>
                    <QuestionBox
                      questionData={item}
                      updateQuestion={updateQuestion}
                      deleteQuestion={deleteItem}
                    />
                  </ContentContainer>
                </ItemContainer>
              ))}
            </QuestionList>
          </LeftContent>
          <RightPanel>
            <ActionButton onClick={() => addQuestion("radio")}>
              질문 추가
            </ActionButton>
          </RightPanel>
        </MainContent>
      </Container>

      {showPopup && (
        <PopupOverlay onClick={closePopup}>
          <Popup>
            <PopupMessage>{popupMessage}</PopupMessage>
            <ClosePopupButton onClick={closePopup}>확인</ClosePopupButton>
          </Popup>
        </PopupOverlay>
      )}
    </Page>
  );
};

export default ApplyEdit;

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

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 팝업 컨테이너
const Popup = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

// 팝업 메시지
const PopupMessage = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

// 닫기 버튼
const ClosePopupButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  display: block;
  margin: 0 auto;

  &:hover {
    background: #0056b3;
  }
`;
