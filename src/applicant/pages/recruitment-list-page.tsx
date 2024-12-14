import styled from "styled-components";

import { RecruitmentCard, CategoryFilter, SearchBar } from "../components";
import { ApplicantPage } from "../page";
import { DropdownFilter } from "../components/recruitment-list/dropdown-filter";

export const RecruitmentListPage = () => {
  return (
    <ApplicantPage>
      <Container>
        <LeftSidebar>
          <CategoryFilter
            title="동아리·소모임"
            categories={[
              { id: "all", label: "전체" },
              { id: "volunteer", label: "봉사·사회" },
              { id: "art", label: "예술·공연" },
              { id: "religion", label: "종교" },
              { id: "sports", label: "체육" },
              { id: "friendship", label: "친목" },
              { id: "it", label: "IT" },
              { id: "others", label: "기타" },
            ]}
          />
          <CategoryFilter
            title="학회"
            categories={[
              { id: "all", label: "전체" },
              { id: "business", label: "경영" },
              { id: "engineering", label: "공학" },
              { id: "social-science", label: "사회과학" },
              { id: "humanities", label: "인문학" },
              { id: "languages", label: "언어" },
              { id: "arts", label: "예술" },
              { id: "natural-science", label: "자연과학" },
              { id: "others", label: "기타" },
            ]}
          />
        </LeftSidebar>

        <RightContent>
          <>
            <FilterBar>
              <div style={{ display: "flex", alignItems: "center" }}>
                <DropdownFilter
                  label="모집상태"
                  options={[
                    { id: "all", label: "전체" },
                    { id: "open", label: "모집 중" },
                    { id: "closed", label: "모집 마감" },
                  ]}
                />
                <DropdownFilter
                  label="평가"
                  options={[
                    { id: "all", label: "전체" },
                    { id: "form-only", label: "서류평가만" },
                    { id: "form-and-meeting", label: "서류 및 면접" },
                    { id: "meeting-only", label: "면접만" },
                  ]}
                />
              </div>
              <SearchBar />
            </FilterBar>
            <CardList>
              <RecruitmentCard
                id="1"
                image="https://via.placeholder.com/360x168"
                category="IT분과"
                evaluation="FORM_ONLY"
                title="떠나자! 바다로!"
                recruitmentStatus={{
                  status: "모집중",
                  dDay: "1",
                }}
                tags={["IT", "프론트엔드", "백엔드"]}
              />
              <RecruitmentCard
                id="2"
                image="https://via.placeholder.com/360x168"
                category="디자인분과"
                evaluation="FORM_AND_MEETING"
                title="UX 디자인 워크숍"
                recruitmentStatus={{
                  status: "모집마감",
                }}
                tags={["디자인", "UI/UX", "Figma"]}
              />
              <RecruitmentCard
                id="3"
                image="https://via.placeholder.com/360x168"
                category="창업분과"
                evaluation="MEETING_ONLY"
                title="스타트업 아이디어톤"
                recruitmentStatus={{
                  status: "모집중",
                  dDay: "5",
                }}
                tags={["스타트업", "아이디어", "창업"]}
              />
              <RecruitmentCard
                id="4"
                image="https://via.placeholder.com/360x168"
                category="예술분과"
                evaluation="FORM_ONLY"
                title="아트갤러리 프로젝트"
                recruitmentStatus={{
                  status: "모집마감",
                }}
                tags={["예술", "그림", "문화"]}
              />
              <RecruitmentCard
                id="5"
                image="https://via.placeholder.com/360x168"
                category="문화분과"
                evaluation="FORM_AND_MEETING"
                title="세계 문화 탐방"
                recruitmentStatus={{
                  status: "모집중",
                  dDay: "3",
                }}
                tags={["문화", "여행", "세계"]}
              />
              <RecruitmentCard
                id="1"
                image="https://via.placeholder.com/360x168"
                category="IT분과"
                evaluation="FORM_ONLY"
                title="떠나자! 바다로!"
                recruitmentStatus={{
                  status: "모집중",
                  dDay: "1",
                }}
                tags={["IT", "프론트엔드", "백엔드"]}
              />
              <RecruitmentCard
                id="2"
                image="https://via.placeholder.com/360x168"
                category="디자인분과"
                evaluation="FORM_AND_MEETING"
                title="UX 디자인 워크숍"
                recruitmentStatus={{
                  status: "모집마감",
                }}
                tags={["디자인", "UI/UX", "Figma"]}
              />
              <RecruitmentCard
                id="3"
                image="https://via.placeholder.com/360x168"
                category="창업분과"
                evaluation="MEETING_ONLY"
                title="스타트업 아이디어톤"
                recruitmentStatus={{
                  status: "모집중",
                  dDay: "5",
                }}
                tags={["스타트업", "아이디어", "창업"]}
              />
              <RecruitmentCard
                id="4"
                image="https://via.placeholder.com/360x168"
                category="예술분과"
                evaluation="FORM_ONLY"
                title="아트갤러리 프로젝트"
                recruitmentStatus={{
                  status: "모집마감",
                }}
                tags={["예술", "그림", "문화"]}
              />
              <RecruitmentCard
                id="5"
                image="https://via.placeholder.com/360x168"
                category="문화분과"
                evaluation="FORM_AND_MEETING"
                title="세계 문화 탐방"
                recruitmentStatus={{
                  status: "모집중",
                  dDay: "3",
                }}
                tags={["문화", "여행", "세계"]}
              />
              <RecruitmentCard
                id="3"
                image="https://via.placeholder.com/360x168"
                category="창업분과"
                evaluation="MEETING_ONLY"
                title="스타트업 아이디어톤"
                recruitmentStatus={{
                  status: "모집중",
                  dDay: "5",
                }}
                tags={["스타트업", "아이디어", "창업"]}
              />
              <RecruitmentCard
                id="4"
                image="https://via.placeholder.com/360x168"
                category="예술분과"
                evaluation="FORM_ONLY"
                title="아트갤러리 프로젝트"
                recruitmentStatus={{
                  status: "모집마감",
                }}
                tags={["예술", "그림", "문화"]}
              />
              <RecruitmentCard
                id="5"
                image="https://via.placeholder.com/360x168"
                category="문화분과"
                evaluation="FORM_AND_MEETING"
                title="세계 문화 탐방"
                recruitmentStatus={{
                  status: "모집중",
                  dDay: "3",
                }}
                tags={["문화", "여행", "세계"]}
              />
            </CardList>
          </>
        </RightContent>
      </Container>
    </ApplicantPage>
  );
};

const Container = styled.div`
  display: flex;
`;

const LeftSidebar = styled.div`
  width: 300px;
  border-right: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: calc(100% - 400px);
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin: 2%;
`;

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(390px, 1fr));
  gap: 24px;
  overflow-x: auto;
`;
