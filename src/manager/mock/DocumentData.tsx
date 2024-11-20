interface Document {
  title: string;
  description: string;
  questionList: Question[];
}

interface Question {
  questionid: number;
  number: number;
  question: string;
  type: string;
  list?: string[];
}

interface Answers {
  answers: Answer[];
}

interface Answer {
  questionId: number;
  answer: string;
  score: number;
}

export const documentData: Document[] = [
  {
    title: "지원서제목",
    description: "지원서설명",
    questionList: [
      {
        questionid: 123,
        number: 1,
        question: "자기소개를 작성해주세요 (500자 내외)",
        type: "text",
      },
      {
        questionid: 124,
        number: 2,
        question: "희망하는 직무를 선택해주세요",
        type: "dropdown",
        list: ["프론트엔드", "백엔드", "디자인"],
      },
      {
        questionid: 125,
        number: 3,
        question: "먹고 싶은 음식을 선택해주세요",
        type: "checkbox",
        list: ["짬뽕", "탕수육", "짜장면"],
      },
    ],
  },
];

export const answerData: Answers = {
  answers: [
    {
      questionId: 123,
      answer:
        "안녕하세요. 저는 멋쟁이사자처럼 프론트엔드 직무에 지원한 김서아입니다. 붙여주세요 제발요. 제가 아니면 안돼요. 너무 하고 싶어요 붙여주세요......",
      score: 10,
    },
    {
      questionId: 124,
      answer: "프론트엔드",
      score: 20,
    },
    {
      questionId: 125,
      answer: "짜장면",
      score: 20,
    },
  ],
};
