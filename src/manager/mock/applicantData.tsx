interface Applicant {
  applicationId: number;
  userId: number;
  name: string;
  email: string;
  phoneNum: string;
  school: string;
  major: string;
  position: string;
  studentNumber: string;
  formResult: string;
  meetingResult: string;
  formScore: number;
  meetingScore: number;
  meetingStartTime: string;
  meetingEndTime: string;
}

export const applicantData: Applicant[] = [
  {
    applicationId: 1,
    userId: 101,
    name: "김서아",
    email: "ga@domain.com",
    phoneNum: "01012340001",
    school: "서강대학교",
    major: "컴퓨터공학",
    position: "단장단",
    studentNumber: "20211501",
    formResult: "pass",
    meetingResult: "fail",
    formScore: 95,
    meetingScore: 85,
    meetingStartTime: "2024-01-01 12:00:00",
    meetingEndTime: "2024-01-01 12:30:00",
  },
  {
    applicationId: 2,
    userId: 102,
    name: "나서아",
    email: "na@domain.com",
    phoneNum: "01012340002",
    school: "서강대학교",
    major: "심리학",
    position: "기획단",
    studentNumber: "20211502",
    formResult: "fail",
    meetingResult: "null",
    formScore: 88,
    meetingScore: 90,
    meetingStartTime: "2024-01-02 13:00:00",
    meetingEndTime: "2024-01-02 13:30:00",
  },
  {
    applicationId: 3,
    userId: 103,
    name: "다서아",
    email: "da@domain.com",
    phoneNum: "01012340003",
    school: "서강대학교",
    major: "경영학",
    position: "단장단",
    studentNumber: "20211503",
    formResult: "pass",
    meetingResult: "pass",
    formScore: 92,
    meetingScore: 88,
    meetingStartTime: "2024-01-03 14:00:00",
    meetingEndTime: "2024-01-03 14:30:00",
  },
  {
    applicationId: 4,
    userId: 104,
    name: "라서아",
    email: "ra@domain.com",
    phoneNum: "01012340004",
    school: "서강대학교",
    major: "수학",
    position: "기획단",
    studentNumber: "20211504",
    formResult: "pass",
    meetingResult: "pass",
    formScore: 85,
    meetingScore: 70,
    meetingStartTime: "2024-01-04 15:00:00",
    meetingEndTime: "2024-01-04 15:30:00",
  },
  {
    applicationId: 5,
    userId: 105,
    name: "마서아",
    email: "ma@domain.com",
    phoneNum: "01012340005",
    school: "서강대학교",
    major: "유럽문화학",
    position: "단장단",
    studentNumber: "20211505",
    formResult: "fail",
    meetingResult: "fail",
    formScore: 75,
    meetingScore: 85,
    meetingStartTime: "2024-01-05 16:00:00",
    meetingEndTime: "2024-01-05 16:30:00",
  },
  {
    applicationId: 6,
    userId: 106,
    name: "바서아",
    email: "ba@domain.com",
    phoneNum: "01012340006",
    school: "서강대학교",
    major: "영문학",
    position: "기획단",
    studentNumber: "20211506",
    formResult: "pass",
    meetingResult: "pass",
    formScore: 80,
    meetingScore: 75,
    meetingStartTime: "2024-01-06 17:00:00",
    meetingEndTime: "2024-01-06 17:30:00",
  },
  {
    applicationId: 7,
    userId: 107,
    name: "사서아",
    email: "sa@domain.com",
    phoneNum: "01012340007",
    school: "서강대학교",
    major: "미디어&엔터테인먼트",
    position: "단장단",
    studentNumber: "20211507",
    formResult: "pass",
    meetingResult: "null",
    formScore: 78,
    meetingScore: 80,
    meetingStartTime: "2024-01-07 18:00:00",
    meetingEndTime: "2024-01-07 18:30:00",
  },
  {
    applicationId: 8,
    userId: 108,
    name: "아서아",
    email: "ah@domain.com",
    phoneNum: "01012340008",
    school: "서강대학교",
    major: "기계공학",
    position: "기획단",
    studentNumber: "20211508",
    formResult: "pass",
    meetingResult: "pass",
    formScore: 82,
    meetingScore: 78,
    meetingStartTime: "2024-01-08 19:00:00",
    meetingEndTime: "2024-01-08 19:30:00",
  },
  {
    applicationId: 9,
    userId: 109,
    name: "자서아",
    email: "ja@domain.com",
    phoneNum: "01012340009",
    school: "서강대학교",
    major: "아트&테크놀로지",
    position: "단장단",
    studentNumber: "20211509",
    formResult: "fail",
    meetingResult: "null",
    formScore: 70,
    meetingScore: 75,
    meetingStartTime: "2024-01-09 20:00:00",
    meetingEndTime: "2024-01-09 20:30:00",
  },
  {
    applicationId: 10,
    userId: 110,
    name: "차서아",
    email: "cha@domain.com",
    phoneNum: "01012340010",
    school: "서강대학교",
    major: "물리학",
    position: "기획단",
    studentNumber: "20211510",
    formResult: "pass",
    meetingResult: "fail",
    formScore: 90,
    meetingScore: 85,
    meetingStartTime: "2024-01-10 21:00:00",
    meetingEndTime: "2024-01-10 21:30:00",
  },
];
