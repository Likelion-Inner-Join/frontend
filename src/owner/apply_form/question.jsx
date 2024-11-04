import React, { useState } from "react";

const Question = ({ question }) => {
  const [title, setTitle] = useState(question.title);
  const [subtitle, setSubtitle] = useState(question.subtitle);
  const [options, setOptions] = useState(question.options || []);

  const addOption = () => {
    const newOption = { uuid: generateUUID(), text: "" };
    setOptions([...options, newOption]);
  };

  const generateUUID = () => {
    return "xxxx-xxxx-xxxx".replace(/[x]/g, () => {
      return ((Math.random() * 16) | 0).toString(16);
    });
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "15px",
        margin: "10px 0",
        borderRadius: "8px",
        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
      }}
    >
      <input
        type="text"
        placeholder="질문 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <input
        type="text"
        placeholder="질문 설명"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      {question.questionType === "checkbox" ||
      question.questionType === "radio" ? (
        <>
          <h4>옵션들</h4>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="옵션"
                value={option.text}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index].text = e.target.value;
                  setOptions(newOptions);
                }}
                style={{
                  width: "90%",
                  padding: "10px",
                  marginBottom: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
          ))}
          <button
            onClick={addOption}
            style={{
              backgroundColor: "#B10D15",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
            }}
          >
            옵션 추가
          </button>
        </>
      ) : null}
    </div>
  );
};

export default Question;
