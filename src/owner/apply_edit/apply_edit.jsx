import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ApplyEdit = () => {
  const { id } = useParams(); // URL에서 지원서 ID 가져오기
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const savedForms = JSON.parse(localStorage.getItem("savedForms")) || [];
    // const currentForm = savedForms.find((form) => form.id === parseInt(id));
    const currentForm = savedForms.find((form) => form.id.toString() === id);

    if (currentForm) {
      setForm(currentForm);
      setTitle(currentForm.title);
      setDescription(currentForm.description);
      setQuestions(currentForm.questions);
    } else {
      alert("지원서를 찾을 수 없습니다.");
      navigate("/apply-manage");
    }
  }, [id, navigate]);

  const handleSaveChanges = () => {
    const updatedForms = JSON.parse(localStorage.getItem("savedForms")).map(
      (f) =>
        f.id === parseInt(id) ? { ...f, title, description, questions } : f
    );
    localStorage.setItem("savedForms", JSON.stringify(updatedForms));
    navigate("/apply-manage");
  };

  return (
    <Container>
      <Header>지원서 수정</Header>
      <Content>
        <TitleInput
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DescriptionTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* 질문 리스트 */}
        {questions.map((question, index) => (
          <QuestionContainer key={index}>
            <strong>Q{index + 1}</strong> - {question.type}
            {/* 각 질문 유형에 맞게 렌더링 */}
          </QuestionContainer>
        ))}
        <Button onClick={handleSaveChanges}>저장</Button>
      </Content>
    </Container>
  );
};

export default ApplyEdit;

// 스타일 정의
const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;
const Header = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #b10d15;
  margin-bottom: 20px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleInput = styled.input`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 15px;
`;
const DescriptionTextarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
`;
const QuestionContainer = styled.div`
  margin-bottom: 10px;
`;
const Button = styled.button`
  padding: 10px 20px;
  background-color: #b10d15;
  color: white;
  border: none;
  cursor: pointer;
`;
