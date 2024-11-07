import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ApplyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const savedForms = JSON.parse(localStorage.getItem("savedForms")) || [];
    const foundForm = savedForms.find((form) => form.id === parseInt(id, 10));
    setForm(foundForm);
  }, [id]);

  if (!form) return <p>지원서를 찾을 수 없습니다.</p>;

  return (
    <Container>
      <Header>
        <Title>{form.title}</Title>
        <Description>{form.description}</Description>
      </Header>
      <Questions>
        {form.questions.map((question, index) => (
          <Question key={question.id}>
            <QuestionNumber>Q{index + 1}</QuestionNumber>
            <QuestionContent>
              {question.content || "질문 내용 없음"}
            </QuestionContent>
            <QuestionType>{question.type}</QuestionType>
            {question.type === "multiple" && question.options && (
              <Options>
                {question.options.map((option, idx) => (
                  <Option key={idx}>{option}</Option>
                ))}
              </Options>
            )}
          </Question>
        ))}
      </Questions>
      <BackButton onClick={() => navigate("/apply-manage")}>
        뒤로 가기
      </BackButton>
    </Container>
  );
};

export default ApplyDetail;

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #b10d15;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #555;
`;

const Questions = styled.div`
  margin-top: 20px;
`;

const Question = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const QuestionNumber = styled.span`
  font-weight: bold;
  color: #b10d15;
  margin-right: 10px;
`;

const QuestionContent = styled.p`
  font-size: 16px;
  color: #333;
  margin: 5px 0;
`;

const QuestionType = styled.span`
  font-size: 14px;
  color: #888;
  font-style: italic;
`;

const Options = styled.ul`
  margin-top: 10px;
  padding-left: 20px;
`;

const Option = styled.li`
  font-size: 14px;
  color: #555;
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #b10d15;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #a00c14;
  }
`;
