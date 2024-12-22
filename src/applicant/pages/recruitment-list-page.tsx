import styled from "styled-components";
import { RecruitmentCard, CategoryFilter, SearchBar } from "../components";
import { ApplicantPage } from "../page";
import { DropdownFilter } from "../components/recruitment-list/dropdown-filter";
import { GET } from "../../common/api/axios";
import { useEffect, useMemo, useState } from "react";

export type TPostCardProps = {
  postId: string;
  image: [{ imageUrl: string }];
  categoryName: string;
  recruitmentType: "FORM_ONLY" | "FORM_AND_MEETING" | "MEETING_ONLY";
  clubName: string;
  title: string;
  recruitmentStatus:
    | "OPEN"
    | "FORM_REVIEWED"
    | "TIME_SET"
    | "INTERVIEWED"
    | "CLOSED";
  endTime: string;
};

type TFilters = {
  category: string[];
  status: string;
  evaluation: string;
};

export const RecruitmentListPage = () => {
  const [posts, setPosts] = useState<TPostCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState<TFilters>({
    category: ["ALL"],
    status: "ALL",
    evaluation: "ALL",
  });

  const handleCategoryChange = (selectedCategories: string[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: selectedCategories,
    }));
  };

  const createFilterHandler = (filterName: keyof TFilters) => {
    return (value: string) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: value,
      }));
    };
  };

  useEffect(() => {
    const fetchPosts = async (searchTerm: string) => {
      try {
        setLoading(true);

        const query = searchTerm
          ? `posts?clubName=${encodeURIComponent(searchTerm)}`
          : `posts`;

        const response = await GET(query);

        if (response.isSuccess) {
          setPosts(response.result);
        } else {
          throw new Error(response.message || "Failed to fetch posts");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts(searchTerm);
  }, [searchTerm]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      return (
        (!filters.category.length ||
          filters.category.includes("ALL") ||
          filters.category.includes(post.categoryName)) &&
        (filters.status === "ALL" ||
          (filters.status === "OPEN" && post.recruitmentStatus === "OPEN") ||
          (filters.status === "CLOSED" && post.recruitmentStatus !== "OPEN")) &&
        (filters.evaluation === "ALL" ||
          filters.evaluation === post.recruitmentType)
      );
    });
  }, [posts, filters]);

  console.log(filteredPosts);

  return (
    <ApplicantPage>
      <Container>
        <LeftSidebar>
          <CategoryFilter
            categories={[
              { id: "ALL", label: "전체" },
              { id: "volunteer", label: "봉사·사회" },
              { id: "art", label: "예술·공연" },
              { id: "religion", label: "종교" },
              { id: "sports", label: "체육" },
              { id: "friendship", label: "친목" },
              { id: "it", label: "IT" },
              { id: "others", label: "기타" },
            ]}
            onChange={handleCategoryChange}
          />
        </LeftSidebar>

        <RightContent>
          <>
            <FilterBar>
              <div style={{ display: "flex", alignItems: "center" }}>
                <DropdownFilter
                  label="모집상태"
                  options={[
                    { id: "ALL", label: "전체" },
                    { id: "OPEN", label: "모집 중" },
                    { id: "CLOSED", label: "모집 마감" },
                  ]}
                  onChange={createFilterHandler("status")}
                />
                <DropdownFilter
                  label="평가"
                  options={[
                    { id: "ALL", label: "전체" },
                    { id: "FORM_ONLY", label: "서류평가만" },
                    { id: "FORM_AND_MEETING", label: "서류 및 면접" },
                    { id: "MEETING_ONLY", label: "면접만" },
                  ]}
                  onChange={createFilterHandler("evaluation")}
                />
              </div>
              <SearchBar onSearch={(term) => setSearchTerm(term)} />
            </FilterBar>
            <CardList>
              {loading ? (
                <p>로딩 중...</p>
              ) : (
                filteredPosts.map((post) => <RecruitmentCard post={post} />)
              )}
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
