type RecruitmentStatusType =
  | { status: "모집중"; dDay: string }
  | { status: "모집마감" };

type ClubData = {
  id: string;
  image: string;
  recruitmentStatus: RecruitmentStatusType;
  category: string;
  title: string;
  tags: string[];
};

const mockClubData: ClubData = {
  id: "1",
  image: "https://via.placeholder.com/150",
  category: "스포츠",
  title: "축구 동아리",
  recruitmentStatus: { status: "모집중", dDay: "D-3" },
  tags: ["운동", "축구", "팀워크"],
};

type RecruitmentPostingListData = {
  title: string;
  recruitmentStatus: "open" | "closed";
  startDate: string;
  endDate: string;
  postDate: string;
  content: string;
  images: string[];
};

const mockRecruitmentPostingListData: RecruitmentPostingListData[] = [
  {
    title: "🦁 멋쟁이사자처럼 서강대학교에서 12기 아기사자를 모집합니다!🦁",
    recruitmentStatus: "open",
    startDate: "2024-12-01",
    endDate: "2024-12-21",
    postDate: "2024-02-28",
    content: `
      🦁 멋쟁이사자처럼 서강대학교에서 12기 아기사자를 모집합니다!🦁

      안녕하세요, 멋쟁이사자처럼 서강대학교입니다.
      멋쟁이사자처럼 서강대학교의 12기 아기사자 모집이 시작되었습니다!

      멋쟁이사자처럼은 전국 최대 규모의 IT 창업 동아리로, 
      웹 개발을 통해 자신만의 아이디어를 실현시키는 것을 목표로 합니다. 
      코딩이 처음이라도, 열정과 아이디어만 있다면 누구나 지원하실 수 있습니다. 
      멋쟁이사자처럼 서강대학교에서 여러분의 아이디어를 실현하세요!

      ✅ 서류 모집 기간: 24.02.19 11:00 ~ 24.03.08. 23:59  
      ✨ 모집 분야: 프론트엔드 / 백엔드  
      ✨ 활동 기간: 2024년 3월 ~ 2024년 12월  

      ✨ 지원 대상:  
        - 창업, 웹 개발에 관심이 있는 서강대학교 학생  
          (2024년도 기준 재학생 및 휴학생, 자대 편입생, 졸업 유예생)  
        - 평소 구현해 보고 싶은 자신만의 아이디어가 있으신 분  
        - 열정을 가지고 “함께 성장” 하는 데 관심이 있으신 분  
        - 1학기 중 매주 화요일, 금요일 오프라인 정규 세션에 필수로 참여할 수 있으신 분  
        - 멋쟁이사자처럼의 주요 행사인 아이디어톤, 해커톤, 데모데이에 참석할 수 있으신 분  
        - 책임감 있게 활동 기간 동안 활동 가능하신 분  

      ✨ 문의사항  
        Instagram: @likelion_sg  

      12기 모집에 대한 자세한 내용은 멋쟁이사자처럼 서강대학교 인스타그램과 공식 웹사이트를 참고해 주세요! 감사합니다.

      🔗 공식 인스타그램: @likelion_sg  
      🔗 공식 웹사이트: https://www.likelionsg.site
    `,
    images: [
      "https://via.placeholder.com/280",
      "https://via.placeholder.com/280",
      "https://via.placeholder.com/280",
      "https://via.placeholder.com/280",
      "https://via.placeholder.com/280",
      "https://via.placeholder.com/280",
      "https://via.placeholder.com/280",
      "https://via.placeholder.com/280",
    ],
  },
  {
    title: "🦁멋쟁이 사자처럼 서강대학교 11기 리크루팅🦁",
    recruitmentStatus: "closed",
    startDate: "2024-02-19",
    endDate: "2024-03-03",
    postDate: "2024-02-28",
    content: `
      🦁멋쟁이 사자처럼 서강대학교 11기 리크루팅🦁
      
      안녕하세요 저희는 IT 기반의 창업 동아리 멋쟁이사자처럼 서강대학교입니다!
      
      멋쟁이사자처럼 대학은 전국 최대 규모의 IT 동아리로, 그 중에서 저희는 서강대학교 대학으로 등록되어 있습니다. 멋쟁이사자차럼에서는 IT 교육을 통한 해커톤 등의 실전 프로젝트로, 여러분의 꿈을 실현시키는 데 있어 코딩이라는 도구를 제공합니다.
      
      멋쟁이 사자처럼 서강대학교가 오늘 2월 20일부로 리크루팅 모집을 시작했습니다.
      
      이번 연도로 11기를 맞은 서강 멋사에서는 프론트엔드, 백엔드로 나누어 아이디어를 현실로 구현하고자 하는 여러분들과 함께 1년 간 동행할 예정입니다.
      
      멋쟁이사자차럼 서강대학교는 아이디어를 현실로 구현하고자 하는 모든 사람들을 환영합니다!
      
      뜨거운 관심 부탁드립니다🔥
      
      ✔모집 분야 : 프론트엔드 / 백엔드 (커리큘럼 게시물 참고)
      
      ✔모집 기간 : 23.02.20 11:00 ~ 23.03.09 11:59
      
      ✔서강멋사 공식인스타그램 : @likelion_sg
    `,
    images: ["https://via.placeholder.com/280"],
  },
];

export type { RecruitmentStatusType, ClubData, RecruitmentPostingListData };
export { mockClubData, mockRecruitmentPostingListData };
