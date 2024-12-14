import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type TCardProps = {
  id: string;
  image: string;
  category: string;
  evaluation: "FORM_ONLY" | "FORM_AND_MEETING" | "MEETING_ONLY";
  title: string;
  recruitmentStatus:
    | { status: "모집중"; dDay: string }
    | { status: "모집마감" };
  tags: string[];
};

const getEvaluationText = (evaluation: TCardProps["evaluation"]) => {
  switch (evaluation) {
    case "FORM_ONLY":
      return "서류 평가만";
    case "FORM_AND_MEETING":
      return "서류 및 면접";
    case "MEETING_ONLY":
      return "면접만";
    default:
      return "";
  }
};

export const RecruitmentCard = ({
  id,
  image,
  category,
  evaluation,
  title,
  recruitmentStatus,
  tags,
}: TCardProps) => {
  const navigate = useNavigate();

  return (
    <CardContainer
      onClick={() => {
        navigate(`/recruitment/${id}`);
      }}
    >
      <ImageWrapper>
        <CardImage src={image} alt="Card Image" />
      </ImageWrapper>
      <CardContent>
        <CategoryTags>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Category>{category}</Category>
            <Evaluation>{getEvaluationText(evaluation)}</Evaluation>
          </div>
          <HeartIcon>
            <AiOutlineHeart />
          </HeartIcon>
        </CategoryTags>
        <Title>{title}</Title>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {recruitmentStatus.status === "모집중" ? (
            <RecruitmentStatus>D-{recruitmentStatus.dDay}</RecruitmentStatus>
          ) : (
            <div
              style={{ fontSize: "20px", fontWeight: 500, color: "#606060" }}
            >
              모집마감
            </div>
          )}
          <Tags>
            {tags.map((tag, index) => (
              <Tag key={index}>#{tag}</Tag>
            ))}
          </Tags>
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

const HeartIcon = styled.div`
  font-size: 24px;
  color: #888;
  cursor: pointer;

  &:hover {
    color: #d32f2f;
  }
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CategoryTags = styled.div`
  display: flex;
  justify-content: space-between;
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

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #000;
  background-color: #ffeded;
  border-radius: 20px;
  padding: 8px;
`;
