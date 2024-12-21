import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { documentData } from "../mock/DocumentData";
import { documentDetailData } from "../mock/DocumentData";
import TextForm from "./TextForm";
import DropDownForm from "./DropDownForm";
import CheckBoxForm from "./CheckBoxForm";
import { ApplicantType, QuestionType, AnswerType } from "../global/types";
import { GET, PUT, POST } from "../../common/api/axios";

interface DocViewProps {
  applicant?: ApplicantType;
}

const DocView = ({ applicant }: DocViewProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [questionList, setQuestionList] = useState<QuestionType[]>();
  const [answerList, setAnswerList] = useState<AnswerType[]>();
  const [updatedAnswerList, setUpdatedAnswerList] = useState<AnswerType[]>();
  const [formResult, setFormResult] = useState(
    applicant?.formResult || "PENDING"
  );
  const [totalScore, setTotalScore] = useState(0);
  const [meetingScore, setMeetingScore] = useState(0);

  useEffect(() => {
    getFormDetails();
    getApplicantDetails();
  }, []);

  const getFormDetails = async () => {
    try {
      //const res = await GET(`form/${formId}`); API
      const res = documentData;

      if (res.isSuccess) {
        setQuestionList(res.result.questionList);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getApplicantDetails = async () => {
    try {
      //const res = await GET(`application/${applicant?.applicantId}`);
      const res = documentDetailData;

      if (res.isSuccess) {
        setAnswerList(res.result.answers);
        setUpdatedAnswerList(res.result.answers);
        setTotalScore(res.result.formScore);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postFormResult = async () => {
    try {
      // const res = await PUT(`application/${applicant?.applicantId}`, {
      //   formResult: `${formResult}`,
      //   meetingResult: `${applicant?.meetingResult}`,
      //   meetingStartTime: `${applicant?.meetingStartTime}`,
      //   meetingEndTime: `${applicant?.meetingEndTime}`,
      // });
      const res = {
        isSuccess: true,
        code: 0,
        message: "string",
        result: {
          applicationId: 0,
          recruitingId: 0,
          positionName: "string",
          recruitmentStatus: "OPEN",
          formId: 0,
          formTitle: "string",
          formDescription: "string",
          clubId: 0,
          clubName: "string",
          postId: 0,
          postTitle: "string",
          applicantId: 0,
          name: "string",
          email: "string",
          phoneNum: "string",
          school: "string",
          major: "string",
          studentNumber: "string",
          formResult: "PENDING",
          formScore: 0,
          meetingResult: "PENDING",
          meetingScore: 0,
          meetingStartTime: "2024-12-15T18:05:32.415Z",
          meetingEndTime: "2024-12-15T18:05:32.415Z",
          answers: [
            {
              questionId: 0,
              question: "string",
              answer: "string",
              score: 0,
              questionType: "TEXT",
            },
          ],
        },
      };

      if (res.isSuccess) {
        alert("서류 결과 수정 성공");
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postFormScore = async () => {
    try {
      const updatedScore = answerList?.map(({ questionId, score }) => ({
        questionId,
        score,
      }));

      // const res = await POST("application/formscore", {
      //   applicationId: `${applicant?.applicantId}`,
      //   score: updatedScore,
      // });
      const res = {
        isSuccess: true,
        code: 0,
        message: "string",
        result: {
          applicationId: 0,
          recruitingId: 0,
          positionName: "string",
          recruitmentStatus: "OPEN",
          formId: 0,
          formTitle: "string",
          formDescription: "string",
          clubId: 0,
          clubName: "string",
          postId: 0,
          postTitle: "string",
          applicantId: 0,
          name: "string",
          email: "string",
          phoneNum: "string",
          school: "string",
          major: "string",
          studentNumber: "string",
          formResult: "PENDING",
          formScore: 0,
          meetingResult: "PENDING",
          meetingScore: 0,
          meetingStartTime: "2024-12-15T18:05:32.415Z",
          meetingEndTime: "2024-12-15T18:05:32.415Z",
          answers: [
            {
              questionId: 0,
              question: "string",
              answer: "string",
              score: 0,
              questionType: "TEXT",
            },
          ],
        },
      };

      if (res.isSuccess) {
        alert("서류 점수 수정 성공");
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeDocument = () => {
    postFormScore();
    searchParams.delete("apply");
    setSearchParams(searchParams);
  };

  const renderQuestionAnswer = (question: QuestionType) => {
    switch (question.type) {
      case "TEXT":
        return <TextForm quest={question} />;
      case "DROPDOWN":
        return <DropDownForm quest={question} />;
      case "CHECKBOX":
        return <CheckBoxForm quest={question} />;
      default:
        return <div>알 수 없는 질문 유형</div>;
    }
  };

  const handleFormResultChange = (newResult: string) => {
    setFormResult(newResult);
    postFormResult();
  };

  const calculateTotalScore = (
    scores: { questionId: number; score: number }[]
  ) => {
    return scores.reduce((sum, ans) => sum + ans.score, 0);
  };

  const getScoreByQuestionId = (questionId: number) => {
    const answer = answerList?.find((ans) => ans.questionId === questionId);
    return answer?.score || 0;
  };

  const handleScoreChange = (questionId: number, newScore: number) => {
    setUpdatedAnswerList((prevState) => {
      if (!prevState) return [];

      const updatedScores = prevState.map((ans) =>
        ans.questionId === questionId ? { ...ans, score: newScore } : ans
      );

      const newTotalScore = calculateTotalScore(updatedScores);

      setTotalScore(newTotalScore);

      return updatedScores;
    });
  };

  return (
    <Wrapper>
      <DocumentPopUp>
        <CloseButton>
          <img
            src="/images/manager/cancel.svg"
            alt="닫기"
            onClick={() => closeDocument()}
          />
        </CloseButton>
        <TitleContainer>
          <Title>{applicant?.name}님의 지원서</Title>
          <ApplicantInfo>
            {applicant?.school} &nbsp; | &nbsp;{applicant?.major} &nbsp;| &nbsp;
            {applicant?.studentNumber} &nbsp;| &nbsp; {applicant?.phoneNum}{" "}
            &nbsp; | &nbsp;
            {applicant?.email}
          </ApplicantInfo>
        </TitleContainer>
        <ResultContainer>
          <p>합불 결과</p>
          <ResultTab>
            <Result onClick={() => handleFormResultChange("PENDING")}>
              <CheckBox selected={formResult === "PENDING"} />
              <p>미평가</p>
            </Result>
            <Result onClick={() => handleFormResultChange("PASS")}>
              <CheckBox selected={formResult === "PASS"} />
              <p>합격</p>
            </Result>
            <Result onClick={() => handleFormResultChange("FAIL")}>
              <CheckBox selected={formResult === "FAIL"} />
              <p>불합격</p>
            </Result>
          </ResultTab>
        </ResultContainer>
        <ScoreContainer>
          <p>면접 채점</p>
          <TotalScore>
            총점{" "}
            <p>
              {" "}
              <input
                type="number"
                defaultValue={meetingScore}
                onChange={(e) => setMeetingScore(parseInt(e.target.value))}
              />
            </p>
            점
          </TotalScore>
        </ScoreContainer>
        <ScoreContainer>
          <p>지원서 채점</p>
          <TotalScore>
            총점 <p>{totalScore}</p>점
          </TotalScore>
        </ScoreContainer>
        <ContentContainer>
          {questionList?.map((quest, questionid) => (
            <Content>
              <Question key={questionid}>
                {quest.number}. &nbsp;{quest.question}
              </Question>
              <Answer>{renderQuestionAnswer(quest)}</Answer>
              <Score>
                <p>채점</p>
                <input
                  type="number"
                  defaultValue={getScoreByQuestionId(quest.questionId)}
                  onChange={(e) =>
                    handleScoreChange(
                      quest.questionId,
                      parseInt(e.target.value, 10) || 0
                    )
                  }
                />
                <p>점</p>
              </Score>
            </Content>
          ))}
        </ContentContainer>
      </DocumentPopUp>
    </Wrapper>
  );
};

export default DocView;

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  left: 400px;
  justify-content: center;
  align-items: flex-end;
  width: calc(100% - 400px);
  height: 100vh;
  background: rgba(68, 68, 68, 0.4);
  z-index: 1;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  margin-right: 10px;
  cursor: pointer;
  transition: transform 0.1s ease;

  :hover& {
    transform: scale(1.05);
  }
`;

const DocumentPopUp = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 90%;
  align-items: flex-start;
  padding: 20px 10px 20px 30px;
  border-radius: 8px 8px 0px 0px;
  background: #fcfafa;
`;

const TitleContainer = styled.div`
  display: flex;
  padding: 0px 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.56px;
`;

const ResultContainer = styled.div`
  display: flex;
  margin-right: 10px;
  padding: 0px 8px;
  padding-bottom: 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-bottom: solid 1px #ddd;

  p {
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.4px;
  }
`;

const ResultTab = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const CheckBox = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 100px;

  border: ${({ selected }) => {
    if (selected) return "9px solid #CC141D";
    return "1px solid #ddd";
  }};

  padding: ${({ selected }) => {
    if (selected) return "3px";
    return "11px";
  }};

  cursor: pointer;
`;

const Result = styled.div`
  display: flex;
  padding: 4px 0px;
  align-items: center;
  gap: 8px;

  p {
    color: var #222;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 24px */
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  margin-right: 10px;
  padding: 0px 8px;
  padding-top: 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  p {
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.4px;
  }
`;

const TotalScore = styled.div`
  display: flex;
  align-items: center;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.32px;

  p {
    margin-left: 6px;
    margin-right: 3px;
    color: #606060;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.4px;
  }
`;

const ApplicantInfo = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  gap: 16px;
  align-self: stretch;
  flex-wrap: wrap;
  color: #424242;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.32px;
`;

const ContentContainer = styled.div`
  display: flex;
  margin-top: 15px;
  padding-right: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Content = styled.div`
  display: flex;
  padding: 20px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  border-radius: 14px;
  background: #fff;
`;

const Question = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  color: #222;
  padding-bottom: 12px;
  border-bottom: 1px solid #eaeaea;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

const Answer = styled.div`
  display: flex;
  gap: 16px;
  padding-top: 0px;
`;

const Score = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;

  p {
    color: #000;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 16.8px */
  }

  input {
    margin-left: 20px;
    margin-right: 5px;
    padding-left: 5px;
    display: flex;
    width: 50px;
    height: 25px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 8px;
    background: #f0f0f0;

    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
  }
`;
