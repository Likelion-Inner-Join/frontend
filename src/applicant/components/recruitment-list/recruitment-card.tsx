import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TPostCardProps } from "../../pages";
import { RECRUITMENT_TYPE } from "../../constants";
import { calculateDday } from "../../utils";

export const RecruitmentCard = ({ post }: { post: TPostCardProps }) => {
  const navigate = useNavigate();

  return (
    <CardContainer
      onClick={() => {
        navigate(`/recruitment/${post.postId}`);
      }}
    >
      <ImageWrapper>
        <CardImage src={post.image[0].imageUrl} alt="Card Image" />
      </ImageWrapper>
      <CardContent>
        <CategoryTags>
          <Category>{post.categoryName}</Category>
          <Evaluation>{RECRUITMENT_TYPE[post.recruitmentType]}</Evaluation>
        </CategoryTags>

        <Title>
          [{post.clubName}] {post.title}
        </Title>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {post.recruitmentStatus === "OPEN" ? (
            <RecruitmentStatus>
              {`${calculateDday(post.endTime)}`}
            </RecruitmentStatus>
          ) : (
            <div
              style={{ fontSize: "20px", fontWeight: 500, color: "#606060" }}
            >
              모집마감
            </div>
          )}
        </div>
      </CardContent>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  min-width: 390px;
  min-height: 360px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s ease;

  &:hover {
    cursor: pointer;
    color: #d32f2f;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CategoryTags = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const Category = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #767676;
`;

const Evaluation = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  border-radius: 20px;
  padding: 8px;
  background-color: #f9f9f9;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 25px;
`;

const RecruitmentStatus = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #cc141d;
  margin-bottom: 8px;
`;
