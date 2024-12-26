// export interface ApplicantType {
//   applicationId: number; // 지원서 ID
//   formId: number; // 양식 ID
//   formTitle: string; // 양식 제목
//   formDescription: string; // 양식 설명
//   clubId: number; // 동아리 ID
//   clubName: string; // 동아리 이름
//   postId: number; // 게시글 ID
//   postTitle: string; // 게시글 제목
//   applicantId: number; // 지원자 ID
//   name: string; // 이름
//   email: string; // 이메일
//   phoneNum: string; // 전화번호
//   school: string; // 학교
//   major: string; // 전공
//   studentNumber: string; // 학번
//   positionName: string;
//   formResult: string; // 서류 결과
//   formScore: number; // 서류 점수
//   meetingResult: string; // 면접 결과
//   meetingScore: number; // 면접 점수
//   meetingStartTime: string; // 면접 시작 시간 (ISO 8601 형식)
//   meetingEndTime: string; // 면접 종료 시간 (ISO 8601 형식)
//   answers: {
//     questionId: number; // 질문 ID
//     question: string; // 질문 내용
//     answer: string; // 답변 내용
//     score: number; // 점수
//     questionType: string; // 질문 유형
//   }[]; // 답변 목록
// }

export interface ApplicantType {
  applicationId: number;
  recruitingId: number;
  positionName: string;
  recruitmentStatus: string;
  formId: number;
  formTitle: string;
  formDescription: string;
  clubId: number;
  clubName: string;
  postId: number;
  postTitle: string;
  applicantId: number;
  name: string;
  email: string;
  phoneNum: string;
  school: string;
  major: string;
  studentNumber: string;
  formResult: string;
  formScore: number;
  meetingResult: string;
  meetingScore: number;
  meetingStartTime: string; // ISO 형식의 날짜
  meetingEndTime: string; // ISO 형식의 날짜
  answers: {
    questionId: number; // 질문 ID
    question: string; // 질문 내용
    answer: string; // 답변 내용
    score: number; // 점수
    questionType: string; // 질문 유형
  }[]; // 질문 답변 배열
}

export interface QuestionType {
  questionId: number;
  number: number;
  question: string;
  type: string;
  list?: string[];
}

export interface AnswerType {
  questionId: number;
  question: string;
  answer: string;
  score: number;
  questionType: string;
}

export interface PostInfoType {
  postId: number;
  clubId: number;
  clubName: string;
  title: string;
  content: string;
  createdAt: string;
  startTime: string;
  endTime: string;
  recruitmentCount: number;
  recruitmentStatus: string;
  recruitmentType: string;
  image: {
    imageId: number;
    imageUrl: string;
  }[];
  recruitingList: {
    recruitingId: number;
    formId: number;
    jobTitle: string;
  }[];
}

export interface MeetingTimesType {
  recruitingId: number;
  jobTitle: string;
  reservationStartTime: string;
  reservationEndTime: string;
  meetingTimes: {
    meetingTimeId: number;
    allowedNum: number;
    reservedNum: number;
    applicantList: {
      applicantId: number;
      name: string;
      studentNumber: string;
    }[];
    meetingStartTime: string;
    meetingEndTime: string;
  }[];
}
