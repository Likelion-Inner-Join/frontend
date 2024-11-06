import React, { useState } from "react";
import QuestionTypeSelector from "./question_type_selector";
import ShortAnswer from "./question_types/short_answer";
import Paragraph from "./question_types/paragraph";
import MultipleChoice from "./question_types/multiple_choice";
import ImageUpload from "./question_types/image_upload";
import PreviewModal from "./preview_modal";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableQuestion from "./draggable_question";
import { useNavigate } from "react-router-dom";

const ApplyForm = () => {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showSelector, setShowSelector] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const navigate = useNavigate();

  const addQuestion = (type) => {
    setQuestions([...questions, { type, id: Date.now() }]);
    setShowSelector(false);
  };

  const openPreview = () => setIsPreviewOpen(true);
  const closePreview = () => setIsPreviewOpen(false);

  const moveQuestion = (dragIndex, hoverIndex) => {
    const updatedQuestions = [...questions];
    const [draggedQuestion] = updatedQuestions.splice(dragIndex, 1);
    updatedQuestions.splice(hoverIndex, 0, draggedQuestion);
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSaveForm = () => {
    const savedForms = JSON.parse(localStorage.getItem("savedForms")) || [];
    const newForm = { title, description, questions, id: Date.now() };
    localStorage.setItem(
      "savedForms",
      JSON.stringify([...savedForms, newForm])
    );
    navigate("/apply-manage");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Header>지원서 생성</Header>
        <Content>
          <TitleInput
            type="text"
            placeholder="지원서 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <DescriptionTextarea
            placeholder="여기에 지원서 설명을 입력하세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <QuestionList>
            {questions.map((q, index) => (
              <DraggableQuestion
                key={q.id}
                id={q.id}
                index={index}
                moveQuestion={moveQuestion}
                deleteQuestion={() => deleteQuestion(index)}
                questionType={q.type}
                questionNumber={index + 1}
              />
            ))}
          </QuestionList>
        </Content>
        <AddQuestionContainer
          onMouseEnter={() => setShowSelector(true)}
          onMouseLeave={() => setShowSelector(false)}
        >
          <AddQuestionButton>+ 질문 추가</AddQuestionButton>
          {showSelector && <QuestionTypeSelector addQuestion={addQuestion} />}
        </AddQuestionContainer>
        <ButtonContainer>
          <PreviewButton onClick={openPreview}>지원서 미리 보기</PreviewButton>
          <SubmitButton onClick={handleSaveForm}>생성 완료</SubmitButton>
        </ButtonContainer>
        {isPreviewOpen && (
          <PreviewModal
            title={title}
            description={description}
            questions={questions}
            closePreview={closePreview}
          />
        )}
      </Container>
    </DndProvider>
  );
};

export default ApplyForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1000px;
  margin: auto;
`;

const Header = styled.h1`
  font-size: 32px;
  color: #b10d15;
  margin-bottom: 20px;
`;

const Content = styled.div`
  width: 100%;
  padding-right: 20px;
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 24px;
  color: #b10d15;
  margin-bottom: 10px;
  padding: 8px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  &:focus {
    border-bottom-color: #b10d15;
  }
`;

const DescriptionTextarea = styled.textarea`
  width: 100%;
  font-family: inherit;
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  outline: none;
  &:focus {
    border-color: #b10d15;
  }
  &::placeholder {
    font-family: inherit;
  }
`;

const QuestionList = styled.div`
  margin-top: 40px;
`;

const AddQuestionContainer = styled.div`
  position: relative;
  display: flex;
  align-items: start;
`;

const AddQuestionButton = styled.button`
  background-color: #b10d15;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #a00c14;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  top: 20px; /* 원하는 위치 조정 */
  right: 20px; /* 오른쪽 상단으로 배치 */
  gap: 10px;
  z-index: 1;
`;

const PreviewButton = styled.button`
  background-color: #b10d15;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #a00c14;
  }
`;

const SubmitButton = styled.button`
  background-color: #b10d15; /* 동일한 빨간색으로 설정 */
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #a00c14;
  }
`;
