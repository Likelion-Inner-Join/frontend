import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";
import ShortAnswer from "./question_types/short_answer";
import Paragraph from "./question_types/paragraph";
import MultipleChoice from "./question_types/multiple_choice";
import ImageUpload from "./question_types/image_upload";

const DraggableQuestion = ({
  id,
  index,
  moveQuestion,
  questionType,
  questionNumber,
  deleteQuestion,
}) => {
  const ref = React.useRef(null);
  const [showModal, setShowModal] = useState(false);

  const [, drop] = useDrop({
    accept: "QUESTION",
    hover(item) {
      if (item.index !== index) {
        moveQuestion(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "QUESTION",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const confirmDelete = () => {
    deleteQuestion(index);
    closeModal();
  };

  return (
    <QuestionContainer ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <QuestionNumber>{`Q${questionNumber}`}</QuestionNumber>
      <DragHandle>☰</DragHandle>
      <DeleteButton onClick={openModal}>삭제</DeleteButton>
      {questionType === "short" && <ShortAnswer />}
      {questionType === "paragraph" && <Paragraph />}
      {questionType === "multiple" && <MultipleChoice />}
      {questionType === "image" && <ImageUpload />}

      {showModal && (
        <ModalOverlay>
          <Modal>
            <ModalText>정말 질문을 삭제하시겠습니까?</ModalText>
            <ButtonContainer>
              <ModalButton onClick={confirmDelete}>예</ModalButton>
              <ModalButton onClick={closeModal}>아니요</ModalButton>
            </ButtonContainer>
          </Modal>
        </ModalOverlay>
      )}
    </QuestionContainer>
  );
};

export default DraggableQuestion;

const QuestionContainer = styled.div`
  position: relative;
  margin-bottom: 40px;
  padding: 20px 10px 10px 70px; /* 왼쪽 패딩을 유지하여 번호와 내용이 겹치지 않도록 설정 */
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
`;

const QuestionNumber = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #333;
  position: absolute;
  top: 5px;
  left: 10px; /* 질문 번호를 왼쪽 상단에 고정 */
`;

const DragHandle = styled.div`
  position: absolute;
  top: 25px; /* 질문 번호 아래로 위치 */
  left: 10px; /* 질문 번호와 같은 왼쪽 위치 */
  cursor: move;
  font-size: 20px;
  color: #888;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 5px 8px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #c9302c;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  width: 300px;
`;

const ModalText = styled.p`
  font-size: 16px;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;

const ModalButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #b10d15;
  color: white;
  &:hover {
    background-color: #8a0b12;
  }
`;
