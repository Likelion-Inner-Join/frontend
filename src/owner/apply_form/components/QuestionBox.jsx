import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import RequiredToggle from "../RequiredToggle";
import MultipleChoice from "./MultipleChoice";
import Checkbox from "./Checkbox";
import ShortAnswer from "./ShortAnswer";
import EssayQuestion from "./EssayQuestion";
import DateQuestion from "./DateQuestion";
import TimeQuestion from "./TimeQuestion";

const QuestionBox = ({ questionData, updateQuestion, deleteQuestion }) => {
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 삭제 모달 상태
  const dropdownRef = useRef(null);

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTypeDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderQuestionType = () => {
    switch (questionData.type) {
      case "multiple_choice":
        return (
          <MultipleChoice
            questionData={questionData}
            updateQuestion={updateQuestion}
          />
        );
      case "checkbox":
        return (
          <Checkbox
            questionData={questionData}
            updateQuestion={updateQuestion}
          />
        );
      case "short_answer":
        return (
          <ShortAnswer
            questionData={questionData}
            updateQuestion={updateQuestion}
          />
        );
      case "paragraph":
        return (
          <EssayQuestion
            questionData={questionData}
            updateQuestion={updateQuestion}
          />
        );
      case "date":
        return (
          <DateQuestion
            questionData={questionData}
            updateQuestion={updateQuestion}
          />
        );
      case "time":
        return (
          <TimeQuestion
            questionData={questionData}
            updateQuestion={updateQuestion}
          />
        );
      default:
        return null;
    }
  };

  const handleTypeChange = (newType) => {
    const initialData = {
      multiple_choice: { options: [""] },
      checkbox: { options: [""] },
      short_answer: {},
      paragraph: {},
      date: {},
      time: {},
    };
    updateQuestion(questionData.id, {
      type: newType,
      ...initialData[newType],
      question: "", // 새 유형일 경우 질문 초기화
      description: "", // 새 유형일 경우 설명 초기화
    });
    setShowTypeDropdown(false);
  };

  const toggleRequired = () => {
    updateQuestion(questionData.id, { isRequired: !questionData.isRequired });
  };

  return (
    <Container>
      <Header>
        <LeftSection>
          <DropdownContainer ref={dropdownRef}>
            <TypeButton onClick={() => setShowTypeDropdown((prev) => !prev)}>
              {getTypeLabel(questionData.type)}
              <Arrow>&#9662;</Arrow>
            </TypeButton>
            {showTypeDropdown && (
              <Dropdown>
                <DropdownOption
                  onClick={() => handleTypeChange("multiple_choice")}
                >
                  객관식
                </DropdownOption>
                <DropdownOption onClick={() => handleTypeChange("checkbox")}>
                  체크박스
                </DropdownOption>
                <DropdownOption
                  onClick={() => handleTypeChange("short_answer")}
                >
                  단답형
                </DropdownOption>
                <DropdownOption onClick={() => handleTypeChange("paragraph")}>
                  서술형
                </DropdownOption>
                <DropdownOption onClick={() => handleTypeChange("date")}>
                  날짜
                </DropdownOption>
                <DropdownOption onClick={() => handleTypeChange("time")}>
                  시간
                </DropdownOption>
              </Dropdown>
            )}
          </DropdownContainer>
          {/* <RequiredToggle
            isRequired={questionData.isRequired || false}
            onToggle={toggleRequired}
          /> */}
        </LeftSection>
        <DeleteButton onClick={() => setShowDeleteModal(true)}>
          삭제
        </DeleteButton>
      </Header>
      {renderQuestionType()}

      {showDeleteModal && (
        <DeleteModal>
          <ModalContent>
            <ModalMessage>질문을 삭제하시겠습니까?</ModalMessage>
            <ModalActions>
              <ConfirmButton
                onClick={() => {
                  deleteQuestion(questionData.id);
                  setShowDeleteModal(false);
                }}
              >
                예
              </ConfirmButton>
              <CancelButton onClick={() => setShowDeleteModal(false)}>
                아니요
              </CancelButton>
            </ModalActions>
          </ModalContent>
        </DeleteModal>
      )}
    </Container>
  );
};

const getTypeLabel = (type) => {
  switch (type) {
    case "multiple_choice":
      return "객관식";
    case "checkbox":
      return "체크박스";
    case "short_answer":
      return "단답형";
    case "paragraph":
      return "서술형";
    case "date":
      return "날짜";
    case "time":
      return "시간";
    default:
      return "질문 형식";
  }
};

export default QuestionBox;

const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const TypeButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 7px 25px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 20px;
  font-size: 16px;

  &:hover {
    background-color: #eeeeee;
  }
`;

const Arrow = styled.span`
  font-size: 12px;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 150px;
  z-index: 10;
`;

const DropdownOption = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const DeleteButton = styled.button`
  background-color: #ffffff;
  color: #b10d15;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const ModalMessage = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ConfirmButton = styled.button`
  background-color: #b10d15;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #9c0c13;
  }
`;

const CancelButton = styled.button`
  background-color: #ddd;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #bbb;
  }
`;
