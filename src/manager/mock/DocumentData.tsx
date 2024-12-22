// interface Document {
//   title: string;
//   description: string;
//   questionList: Question[];
// }

// interface Question {
//   questionid: number;
//   number: number;
//   question: string;
//   type: string;
//   list?: string[];
// }

// interface Answers {
//   answers: Answer[];
// }

// interface Answer {
//   questionId: number;
//   answer: string;
//   score: number;
// }

export const documentData = {
  isSuccess: true,
  code: 0,
  message: "string",
  result: {
    id: 0,
    title: "지원서 제목",
    description: "지원서 설명",
    questionList: [
      {
        questionId: 111,
        number: 0,
        question: "자기소개를 작성해주세요 (500자 내외)",
        type: "TEXT",
        list: ["string"],
      },
      {
        questionId: 112,
        number: 1,
        question: "희망하는 직무를 선택해주세요",
        type: "DROPDOWN",
        list: ["프론트엔드", "백엔드", "디자인"],
      },
      {
        questionId: 113,
        number: 2,
        question: "먹고 싶은 음식을 선택해주세요",
        type: "CHECKBOX",
        list: ["짬뽕", "탕수육", "짜장면"],
      },
    ],
  },
};

export const documentDetailData = {
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
    name: "김서악",
    email: "seoa@sogang.ac.kr",
    phoneNum: "010-0000-0000",
    school: "서강대학교",
    major: "컴퓨터공학",
    studentNumber: "20211511",
    formResult: "PASS",
    formScore: 60,
    meetingResult: "PENDING",
    meetingScore: 0,
    meetingStartTime: "2024-12-22T06:31:31.294Z",
    meetingEndTime: "2024-12-22T06:31:31.294Z",
    answers: [
      {
        questionId: 111,
        question: "자기소개를 작성해주세요 (500자 내외)",
        answer:
          "안녕하세요. 저는 멋쟁이사자처럼 프론트엔드 직무에 지원한 김서아입니당..",
        score: 10,
        questionType: "TEXT",
      },
      {
        questionId: 112,
        question: "희망하는 직무를 선택해주세요",
        answer: "백엔드",
        score: 20,
        questionType: "DROPDOWN",
      },
      {
        questionId: 113,
        question: "먹고 싶은 음식을 선택해주세요",
        answer: "짬뽕",
        score: 30,
        questionType: "CHECKBOX",
      },
    ],
  },
};

// export const documentDetailData = {
//   isSuccess: true,
//   code: 0,
//   message: "string",
//   result: {
//     applicationId: 1,
//     formId: 0,
//     formTitle: "string",
//     formDescription: "string",
//     clubId: 0,
//     clubName: "string",
//     postId: 0,
//     postTitle: "string",
//     applicantId: 101,
//     name: "김서아",
//     email: "ga@domain.com",
//     phoneNum: "01012340001",
//     school: "서강대학교",
//     major: "컴퓨터공학",
//     studentNumber: "20211501",
//     position: "단장단",
//     formResult: "PASS",
//     formScore: 60,
//     meetingResult: "FAIL",
//     meetingScore: 85,
//     meetingStartTime: "2024-01-01T12:00:00.000Z",
//     meetingEndTime: "2024-01-01T12:30:00.000Z",
//     answers: [
//       {
//         questionId: 111,
//         question: "자기소개를 작성해주세요 (500자 내외)",
//         answer:
//           "안녕하세요. 저는 멋쟁이사자처럼 프론트엔드 직무에 지원한 김서아입니당..",
//         score: 10,
//         questionType: "TEXT",
//       },
//       {
//         questionId: 112,
//         question: "희망하는 직무를 선택해주세요",
//         answer: "백엔드",
//         score: 20,
//         questionType: "DROPDOWN",
//       },
//       {
//         questionId: 113,
//         question: "먹고 싶은 음식을 선택해주세요",
//         answer: "짬뽕",
//         score: 30,
//         questionType: "CHECKBOX",
//       },
//     ],
//   },
// };

/*
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
*/

/*
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
*/

export const meetingTimeData1 = {
  isSuccess: true,
  code: 200,
  message: "요청에 성공했습니다.",
  result: {
    recruitingId: 1,
    meetingTimes: [
      {
        meetingTimeId: 3,
        allowedNum: 3,
        reservedNum: 2,
        applicantList: [
          {
            applicantId: 1,
            name: "John Doe",
            studentNumber: "20241234",
          },
          {
            applicantId: 2,
            name: "Jane Smith",
            studentNumber: "20251234",
          },
        ],
        meetingStartTime: "2024-11-25T10:00:00",
        meetingEndTime: "2024-11-25T12:00:00",
      },
      {
        meetingTimeId: 4,
        allowedNum: 2,
        reservedNum: 1,
        applicantList: [
          {
            applicantId: 1,
            name: "John Doe",
            studentNumber: "20241234",
          },
        ],
        meetingStartTime: "2024-11-26T13:00:00",
        meetingEndTime: "2024-11-26T15:00:00",
      },
    ],
  },
};

export const meetingTimeData2 = {
  isSuccess: true,
  code: 200,
  message: "요청에 성공했습니다.",
  result: {
    recruitingId: 2,
    meetingTimes: [
      {
        meetingTimeId: 3,
        allowedNum: 3,
        reservedNum: 2,
        applicantList: [
          {
            applicantId: 1,
            name: "김서아",
            studentNumber: "20211234",
          },
          {
            applicantId: 2,
            name: "박정주",
            studentNumber: "20221234",
          },
        ],
        meetingStartTime: "2024-11-25T10:00:00",
        meetingEndTime: "2024-11-25T12:00:00",
      },
      {
        meetingTimeId: 4,
        allowedNum: 2,
        reservedNum: 1,
        applicantList: [
          {
            applicantId: 1,
            name: "이세림",
            studentNumber: "20231234",
          },
        ],
        meetingStartTime: "2024-11-26T13:00:00",
        meetingEndTime: "2024-11-26T15:00:00",
      },
    ],
  },
};
