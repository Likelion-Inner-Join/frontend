import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../common/ui";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ApplicantPage } from "../page";
import { QNAField } from "../components/application-form";

export const ApplicationFormPage = () => {
  const { clubId } = useParams<Record<string, string>>();
  const location = useLocation();
  const position = location.state?.position;
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (clubId && position) {
      const fetchedQuestions = [
        {
          type: "checkbox",
          required: true,
          title: "다음 중 관련 기술을 선택하세요.",
          options: ["JavaScript", "React", "Node.js", "CSS"],
        },
        {
          type: "radio",
          required: true,
          title: "다음 중 관련 기술을 선택하세요.",
          options: ["JavaScript", "React", "Node.js", "CSS"],
        },
        {
          type: "shortAnswer",
          required: true,
          title: `${position} 포지션에 지원하는 이유를 작성해주세요.`,
          description: "자유롭게 작성해주세요.",
        },
        {
          type: "longAnswer",
          required: false,
          title: "최근 프로젝트 경험에 대해 설명해주세요.",
          description: "프로젝트와 관련된 경험을 작성해주세요.",
        },
        {
          type: "date",
          required: true,
          title: "언제부터 근무가 가능하신가요?",
        },
        {
          type: "time",
          required: true,
          title: "언제부터 근무가 가능하신가요?",
        },
      ];
      setQuestions(fetchedQuestions);
      setAnswers(new Array(fetchedQuestions.length).fill(""));
    }
  }, [clubId, position]);

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    console.log("제출된 답변:", answers);
    navigate("/my/application-manage");
  };

  return (
    <ApplicantPage style={{ backgroundColor: "#f9f9f9" }}>
      <FormContainer>
        <Header>
          <Title>
            <div className="main-title">
              🦁 멋쟁이사자처럼 서강대학교에서 12기 아기사자를 모집합니다! 🦁
            </div>
            <div className="sub-title">{position} 전형</div>
          </Title>

          <Button
            label="제출하기"
            type="submit"
            onClick={handleSubmit}
            size="large"
          />
        </Header>
        {clubId && position ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {questions.map((question, index) => (
              <QNAField
                key={index}
                {...question}
                onChange={(value: string) => handleAnswerChange(index, value)}
              />
            ))}
          </form>
        ) : (
          <p>해당 정보가 없습니다.</p>
        )}
      </FormContainer>
    </ApplicantPage>
  );
};

const FormContainer = styled.div`
  width: 1380px;
  margin: 0 auto;
  padding-bottom: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 100px 20px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  gap: 30px;

  .main-title {
    font-size: 28px;
    font-weight: 700;
    color: #000;
  }

  .sub-title {
    font-size: 16px;
    font-weight: 500;
    color: #424242;
  }
`;
