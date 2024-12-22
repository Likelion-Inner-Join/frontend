import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../common/ui";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ApplicantPage } from "../page";
import { QNAField } from "../components/application-form";
import { GET, POST } from "../../common/api/axios";

export type TQuestion = {
  questionId: string;
  number: string;
  question: string;
  type: string;
  list: string[];
};

type TApplicationFormData = {
  id: string;
  title: string;
  description: string;
  questionList: TQuestion[];
};

type TAnswer = {
  questionId: string;
  answer: string;
};

export const ApplicationFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formId = location.state?.formId;
  const jobTitle = location.state?.jobTitle;
  const recruitingId = location.state?.recruitingId;

  const [data, setData] = useState<TApplicationFormData>();
  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState<TAnswer[]>([]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true);
        const response = await GET(`form/${formId}`);
        if (response.isSuccess) {
          setData(response.result);
        } else {
          throw new Error(response.message || "Failed to fetch posts");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [formId]);

  if (!data) {
    return <div>로딩 중..</div>;
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.questionId === questionId
      );

      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { questionId, answer: value };
        return updatedAnswers;
      }

      return [...prevAnswers, { questionId, answer: value }];
    });
  };
  console.log(answers);

  const handleSubmit = async () => {
    try {
      const response = await POST("application", {
        recruitingId: recruitingId,
        applicantId: "1" /*FIXME: */,
        answers: answers,
      });
      if (response.isSuccess) {
        alert("성공적으로 제출했어요.");
        navigate("/my/application-manage");
      } else {
        console.log(response.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ApplicantPage style={{ backgroundColor: "#f9f9f9" }}>
      <FormContainer>
        <Header>
          <Title>
            <div className="main-title">{data.title}</div>
            <div className="sub-title">{jobTitle} 전형</div>
          </Title>

          <Button
            label="제출하기"
            type="submit"
            onClick={handleSubmit}
            size="large"
          />
        </Header>
        {loading ? (
          <div>로딩 중..</div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {data.questionList.map((questionItem, index) => (
              <QNAField
                key={index}
                questionItem={questionItem}
                onChange={(value: string) =>
                  handleAnswerChange(questionItem.questionId, value)
                }
              />
            ))}
          </form>
        )}
      </FormContainer>
    </ApplicantPage>
  );
};

const FormContainer = styled.div`
  width: 1380px;
  margin: 0 auto;
  padding-bottom: 60px;

  @media (max-width: 768px) {
    width: unset;
  }
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
