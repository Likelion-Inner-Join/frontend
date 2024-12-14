import { styled } from "styled-components";
import {
  mockRecruitmentPostingListData,
  RecruitmentPostingListData,
} from "./type";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../../../common/ui";
import { PositionModal } from "./position-modal";

const getClubDataList = (
  clubId: string
): RecruitmentPostingListData[] | null => {
  return mockRecruitmentPostingListData;
};

const formatDate = (date: string, format: string = "yyyy-MM-dd"): string => {
  const d = new Date(date);
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return format
    .replace("yyyy", d.getFullYear().toString())
    .replace("MM", String(d.getMonth() + 1).padStart(2, "0"))
    .replace("dd", String(d.getDate()).padStart(2, "0"))
    .replace("(요일)", `(${days[d.getDay()]})`);
};

const calculateDday = (targetDate: string | Date): string => {
  const today = new Date();
  const target = new Date(targetDate);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const difference = Math.ceil(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return difference > 0
    ? `D-${difference}`
    : difference === 0
    ? "D-Day"
    : `D+${Math.abs(difference)}`;
};

const formatPostDate = (dateString: string): string => {
  return new Date(dateString)
    .toLocaleDateString("ko-KR")
    .replace(/\./g, "/")
    .replace(/ /g, "");
};

export const RecruitmentPostingList = ({ clubId }: { clubId: string }) => {
  const navigate = useNavigate();
  const [positions, setPositions] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const clubList = getClubDataList(clubId);

  useEffect(() => {
    const mockPositions = ["디자이너", "프론트 개발자", "백엔드 개발자"];
    setPositions(mockPositions);
  }, []);

  if (!clubList || clubList.length === 0) {
    return <div>해당 정보를 찾을 수 없습니다.</div>;
  }

  const closeModal = () => setIsModalOpen(false);

  const handlePositionSelect = (position: string) => {
    closeModal();
    navigate(`/application/${clubId}`, { state: { position } });
  };

  return (
    <ClubListWrapper>
      {clubList.map((club, index) => (
        <ClubCard key={index}>
          <ContentWrapper>
            <CenteredHeader>
              <Title>{club.title}</Title>
              <RecruitmentStatus>
                {club.recruitmentStatus === "open" ? (
                  <>
                    <span
                      style={{
                        color: "#b10d15",
                        fontSize: "14px",
                        fontWeight: "700",
                      }}
                    >
                      {`${calculateDday(club.endDate)}`}
                    </span>
                    <span>
                      {`${formatDate(
                        club.endDate,
                        "yyyy년 MM월 dd일 (요일)"
                      )} 마감`}
                    </span>
                  </>
                ) : (
                  <span>마감되었어요👏</span>
                )}
              </RecruitmentStatus>
            </CenteredHeader>
            <PostDate>{formatPostDate(club.postDate)} 작성</PostDate>
            <Content
              dangerouslySetInnerHTML={{
                __html: club.content.replace(/\n/g, "<br />"),
              }}
            ></Content>
          </ContentWrapper>
          <ImageScroller>
            {club.images?.map((image, imgIndex) => (
              <Image
                key={imgIndex}
                src={image}
                alt={`Club-${index}-Image-${imgIndex}`}
              />
            ))}
          </ImageScroller>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              label="지원하기"
              size="large"
              onClick={() => setIsModalOpen(true)}
              disabled={club.recruitmentStatus === "closed"}
            />
          </div>
          {isModalOpen && (
            <PositionModal
              closeModal={closeModal}
              positions={positions}
              onSelect={handlePositionSelect}
            />
          )}
        </ClubCard>
      ))}
    </ClubListWrapper>
  );
};

const ClubListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  background-color: #f9f9f9;
`;

const ClubCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 60px;
  background-color: white;
  border-radius: 36px;
  margin: 0 auto;
  max-width: 1128px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CenteredHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #000;
  margin-bottom: 16px;
`;

const RecruitmentStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  line-height: 21px;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  color: #000;
  background-color: #f9f9f9;
  border-radius: 20px;
  margin-bottom: 8px;
`;

const PostDate = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #767676;
  margin-bottom: 16px;
`;

const Content = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #000;
  line-height: 22.4px;
  margin-bottom: 8px;
`;

const ImageScroller = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  overflow-x: auto;
  padding: 8px 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 6px;
    background: #eaeaea;
  }

  &::-webkit-scrollbar-thumb {
    background: #bdbdbd;
    border-radius: 8px;
  }
`;

const Image = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
  max-width: 100%;
`;
