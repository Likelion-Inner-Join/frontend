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
  meetingStartTime: string;
  meetingEndTime: string;
  answers: {
    questionId: number;
    question: string;
    answer: string;
    score: number;
    questionType: string;
  }[];
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

export interface ClubInfoType {
  categoryId: number;
  categoryName: string;
  clubId: number;
  email: string | null;
  id: string;
  imageUrl: string;
  name: string;
  school: string | null;
}
