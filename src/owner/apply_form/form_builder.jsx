import React, { useState } from "react";
import Question from "./question";

const FormBuilder = () => {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (type) => {
    const newQuestion = {
      questionType: type,
      title: "",
      subtitle: "",
      uuid: generateUUID(),
      options: type === "checkbox" || type === "radio" ? [] : undefined,
    };
    setQuestions([...questions, newQuestion]);
  };

  const generateUUID = () => {
    return "xxxx-xxxx-xxxx".replace(/[x]/g, () => {
      return ((Math.random() * 16) | 0).toString(16);
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#F0F0F0",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ color: "#B10D15" }}>폼 만들기</h1>
      <div>
        <button onClick={() => addQuestion("text")}>단답형 질문 추가</button>
        <button onClick={() => addQuestion("checkbox")}>
          체크박스 질문 추가
        </button>
        <button onClick={() => addQuestion("radio")}>
          라디오 버튼 질문 추가
        </button>
      </div>
      {questions.map((question, index) => (
        <Question key={index} question={question} />
      ))}
    </div>
  );
};

export default FormBuilder;
