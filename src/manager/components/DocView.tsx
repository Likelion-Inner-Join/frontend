import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import TextForm from "./TextForm";
import DropDownForm from "./DropDownForm";
import CheckBoxForm from "./CheckBoxForm";
import MyButton from "./MyButton";
import {
  ApplicantType,
  QuestionType,
  AnswerType,
  PostInfoType,
} from "../global/types";
import { GET, PUT, POST } from "../../common/api/axios";

interface DocViewProps {
  applicant?: ApplicantType;
  type: string;
}

const DocView = ({ applicant, type }: DocViewProps) => {
  const [searchParams, setSearchParams] = useSearchParams(); // 인자 없이 호출
  const applyId = searchParams.get("apply");
  const [applicantInfo, setApplicantInfo] = useState<ApplicantType>();
  const [postInfo, setPostInfo] = useState<PostInfoType>();
  const [questionList, setQuestionList] = useState<QuestionType[]>();
  const [answerList, setAnswerList] = useState<AnswerType[]>();
  const [updatedAnswerList, setUpdatedAnswerList] = useState<AnswerType[]>();
  const [formResult, setFormResult] = useState(
    applicant?.formResult || "PENDING"
  );
  const [meetResult, setMeetResult] = useState(
    applicant?.meetingResult || "PENDING"
  );
  const [totalScore, setTotalScore] = useState(0);
  const [meetingScore, setMeetingScore] = useState(0);

  useEffect(() => {
    if (applyId) {
      getPostDetails();
      getApplicantDetails(applyId);
    }
  }, [applyId]);

  useEffect(() => {
    if (applyId) {
      getPostDetails();
      getApplicantDetails(applyId);
    }
  }, []);

  const getFormDetails = async (formId: string) => {
    try {
      const res = await GET(`form/${formId}`);
      console.log(res);

      if (res.isSuccess) {
        setQuestionList(res.result.questionList);
        console.log(res);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPostDetails = async () => {
    try {
      const res = await GET(`posts/1`);

      if (res.isSuccess) {
        setPostInfo(res.result);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getApplicantDetails = async (applyId: string) => {
    try {
      const res = await GET(`application/${applyId}`);

      if (res.isSuccess) {
        setApplicantInfo(res.result);
        setMeetingScore(res.result.meetingScore);
        setAnswerList(res.result.answers);
        setUpdatedAnswerList(res.result.answers);
        setTotalScore(res.result.formScore);
        setFormResult(res.result.formResult || "PENDING");
        setMeetResult(res.result.meetingResult || "PENDING");
        getFormDetails(res.result.formId);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postFormResult = async (newResult: string) => {
    try {
      let res;
      if (type === "FORM") {
        if (postInfo?.recruitmentStatus !== "OPEN") return;
        res = await PUT(`application/${applicant?.applicationId}`, {
          formResult: `${newResult}`,
          meetingResult: `${applicant?.meetingResult}`,
          meetingStartTime: applicant?.meetingStartTime ?? null,
          meetingEndTime: applicant?.meetingEndTime ?? null,
        });
      } else if (type === "MEET") {
        if (
          postInfo?.recruitmentStatus === "INTERVIEWED" ||
          postInfo?.recruitmentStatus === "CLOSED"
        )
          return;
        res = await PUT(`application/${applicant?.applicationId}`, {
          formResult: `${applicant?.formResult}`,
          meetingResult: `${newResult}`,
          meetingStartTime: applicant?.meetingStartTime ?? null,
          meetingEndTime: applicant?.meetingEndTime ?? null,
        });
      }

      console.log({
        formResult: `${newResult}`,
        meetingResult: `${applicant?.meetingResult}`,
        meetingStartTime: null,
        meetingEndTime: null,
      });

      if (res.isSuccess) {
        if (type === "FORM") alert("서류 결과 수정 성공");
        if (type === "MEET") alert("면접 결과 수정 성공");
      } else {
        console.log(res);
        alert(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postFormScore = async () => {
    if (postInfo?.recruitmentStatus !== "OPEN") return;
    try {
      const updatedScore = updatedAnswerList?.map(({ questionId, score }) => ({
        questionId,
        score,
      }));

      const res = await POST("application/formscore", {
        applicationId: `${applicant?.applicationId}`,
        score: updatedScore,
      });

      if (res.isSuccess) {
        alert("서류 점수 수정 성공");
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postMeetScore = async () => {
    if (
      postInfo?.recruitmentStatus === "INTERVIEWED" ||
      postInfo?.recruitmentStatus === "CLOSED"
    )
      return;
    try {
      const res = await POST("application/meetingscore", {
        applicationId: `${applicant?.applicationId}`,
        score: meetingScore,
      });
      if (res.isSuccess) {
        alert("면접 점수 수정 성공");
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeDocument = () => {
    searchParams.delete("apply");
    setSearchParams(searchParams);
  };

  const saveDocument = () => {
    if (type === "FORM") {
      postFormResult(formResult);
      postFormScore();
    } else if (type === "MEET") {
      postFormResult(meetResult);
      postMeetScore();
    }
    searchParams.delete("apply");
    setSearchParams(searchParams);
  };

  const renderQuestionAnswer = (question: QuestionType) => {
    const answer = answerList?.find(
      (item) => item.questionId === question.questionId
    )?.answer;

    switch (question.type) {
      case "SHORTANSWER":
      case "LONGANSWER":
        return <TextForm quest={question} answerList={answerList || []} />;
      case "RADIO":
        return <DropDownForm quest={question} answerList={answerList || []} />;
      case "CHECKBOX":
        return <CheckBoxForm quest={question} answerList={answerList || []} />;
      case "DATE":
        return <input type="date" value={answer || "--"} disabled={true} />;
      case "TIME":
        return <input type="time" value={answer || "--"} disabled={true} />;
      default:
        return <div>알 수 없는 질문 유형</div>;
    }
  };

  const handleFormResultChange = (newResult: string) => {
    setFormResult(newResult);
  };

  const handleMeetResultChange = (newResult: string) => {
    setMeetResult(newResult);
  };

  const calculateTotalScore = (
    scores: { questionId: number; score: number }[]
  ) => {
    return scores.reduce((sum, ans) => sum + ans.score, 0);
  };

  const getScoreByQuestionId = (questionId: number) => {
    const answer = updatedAnswerList?.find(
      (ans) => ans.questionId === questionId
    );
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
        <TitleContainer>
          <Title>
            <p>{applicantInfo?.name}님의 지원서 </p>
            <Buttons>
              <MyButton
                content="닫기"
                buttonType="WHITE"
                onClick={closeDocument}
              />
              <MyButton
                content="저장하기"
                buttonType="RED"
                onClick={saveDocument}
              />
            </Buttons>
          </Title>
          <ApplicantInfo>
            {applicantInfo?.school} &nbsp;&nbsp; | &nbsp;&nbsp;
            {applicantInfo?.major} &nbsp;&nbsp;| &nbsp;&nbsp;
            {applicantInfo?.studentNumber} &nbsp;&nbsp;| &nbsp;&nbsp;{" "}
            {applicantInfo?.phoneNum} &nbsp;&nbsp; | &nbsp;&nbsp;
            {applicantInfo?.email}
          </ApplicantInfo>
        </TitleContainer>
        <BodyContainer>
          {type === "FORM" || applicant?.formResult === "FAIL" ? (
            <ResultContainer>
              <p>서류 결과</p>
              <ResultTab>
                <Result
                  onClick={
                    postInfo?.recruitmentStatus !== "OPEN"
                      ? undefined
                      : () => handleFormResultChange("PENDING")
                  }
                >
                  <CheckBox selected={formResult === "PENDING"} />
                  <p>미평가</p>
                </Result>
                <Result
                  onClick={
                    postInfo?.recruitmentStatus !== "OPEN"
                      ? undefined
                      : () => handleFormResultChange("PASS")
                  }
                >
                  <CheckBox selected={formResult === "PASS"} />
                  <p>합격</p>
                </Result>
                <Result
                  onClick={
                    postInfo?.recruitmentStatus !== "OPEN"
                      ? undefined
                      : () => handleFormResultChange("FAIL")
                  }
                >
                  <CheckBox selected={formResult === "FAIL"} />
                  <p>불합격</p>
                </Result>
              </ResultTab>
            </ResultContainer>
          ) : (
            <ResultContainer>
              <p>면접 결과</p>
              <ResultTab>
                <Result
                  onClick={
                    postInfo?.recruitmentStatus === "INTERVIEWED" ||
                    postInfo?.recruitmentStatus === "CLOSED"
                      ? undefined
                      : () => handleMeetResultChange("PENDING")
                  }
                >
                  <CheckBox selected={meetResult === "PENDING"} />
                  <p>미평가</p>
                </Result>
                <Result
                  onClick={
                    postInfo?.recruitmentStatus === "INTERVIEWED" ||
                    postInfo?.recruitmentStatus === "CLOSED"
                      ? undefined
                      : () => handleMeetResultChange("PASS")
                  }
                >
                  <CheckBox selected={meetResult === "PASS"} />
                  <p>합격</p>
                </Result>
                <Result
                  onClick={
                    postInfo?.recruitmentStatus === "INTERVIEWED" ||
                    postInfo?.recruitmentStatus === "CLOSED"
                      ? undefined
                      : () => handleMeetResultChange("FAIL")
                  }
                >
                  <CheckBox selected={meetResult === "FAIL"} />
                  <p>불합격</p>
                </Result>
              </ResultTab>
            </ResultContainer>
          )}
          {type === "MEET" && applicant?.formResult === "PASS" && (
            <ScoreContainer>
              <p>면접 채점</p>
              <TotalScore>
                총점{" "}
                <input
                  type="number"
                  value={meetingScore}
                  onChange={(e) => setMeetingScore(parseInt(e.target.value))}
                  disabled={
                    postInfo?.recruitmentStatus === "INTERVIEWED" ||
                    postInfo?.recruitmentStatus === "CLOSED"
                  }
                />
                점
              </TotalScore>
            </ScoreContainer>
          )}
          <ScoreContainer>
            <p>지원서 채점</p>
            <TotalScore>
              총점 <p>{totalScore || 0}</p>점
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
                    value={getScoreByQuestionId(quest.questionId)}
                    onChange={(e) =>
                      handleScoreChange(
                        quest.questionId,
                        parseInt(e.target.value, 10) || 0
                      )
                    }
                    disabled={postInfo?.recruitmentStatus !== "OPEN"}
                  />
                  <p>점</p>
                </Score>
              </Content>
            ))}
          </ContentContainer>
        </BodyContainer>
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

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 12px;
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
  width: 100%;
  padding: 0px 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;

  p {
    width: 500px;
    color: #000;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.56px;
  }
`;

const BodyContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ResultContainer = styled.div`
  display: flex;
  margin-right: 10px;
  padding: 0px 8px;
  padding-bottom: 20px;
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
  padding-bottom: 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-top: solid 1px #ddd;

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

  input {
    display: flex;
    width: 65px;
    height: 30px;
    margin: 0px 5px;
    padding: 0px 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 8px;
    background: #fff;

    color: #cc141d;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 30px */
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
  padding-right: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
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

  input {
    text-align: center;
    color: #222;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 24px */
  }
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
