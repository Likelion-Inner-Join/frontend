import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../../common/ui";
import { PositionModal } from "./position-modal";
import { TRecruitmentData } from "../../pages";
import { calculateDday, formatDate, formatSlashDate } from "../../utils";

export const RecruitmentPostingList = ({
  content,
}: {
  content: TRecruitmentData;
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => setIsModalOpen(false);

  if (!content) {
    return <div>없어요.</div>;
  }

  return (
    <ClubListWrapper>
      <ClubCard>
        <ContentWrapper>
          <CenteredHeader>
            <Title>{content.title}</Title>
            <RecruitmentStatus>
              {content.recruitmentStatus === "OPEN" ? (
                <>
                  <span
                    style={{
                      color: "#b10d15",
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    {`${calculateDday(content.endTime)}`}
                  </span>
                  <span>
                    {`${formatDate(
                      content.endTime,
                      "yyyy년 MM월 dd일 (요일)"
                    )} 마감`}
                  </span>
                </>
              ) : (
                <span>마감되었어요👏</span>
              )}
            </RecruitmentStatus>
          </CenteredHeader>
          <PostDate>{formatSlashDate(content.createdAt)} 작성</PostDate>
          <Content
            dangerouslySetInnerHTML={{
              __html: content.content.replace(/\n/g, "<br />"),
            }}
          ></Content>
        </ContentWrapper>
        <ImageScroller>
          {content.image &&
            content.image.length > 0 &&
            content.image.map((image) => (
              <Image
                key={image.imageId}
                src={image.imageUrl}
                alt="이미지가 없어요."
              />
            ))}
        </ImageScroller>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            label="지원하기"
            size="large"
            onClick={() => {
              if (!content.recruitingList) {
                navigate(`/application/${content.postId}`);
              } else {
                setIsModalOpen(true);
              }
            }}
            disabled={content.recruitmentStatus !== "OPEN"}
          />
        </div>
        {isModalOpen && (
          <PositionModal
            closeModal={closeModal}
            recruitingList={content.recruitingList}
            onSelect={(selectedRecruiting) => {
              closeModal();
              navigate(`/application/${content.postId}`, {
                state: selectedRecruiting,
              });
            }}
          />
        )}
      </ClubCard>
    </ClubListWrapper>
  );
};

const ClubListWrapper = styled.div`
  height: 100vh;
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
  width: 1000px;
  @media (max-width: 768px) {
    width: unset;
  }
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
