import { styled } from "styled-components";
import { ClubData, mockClubData } from "./type";

export const ClubContent = ({ clubId }: { clubId: string }) => {
  const getClubData = (clubId: string): ClubData | null => {
    return mockClubData;
  };
  const club = getClubData(clubId);
  if (!club) {
    return <div>해당 정보를 찾을 수 없습니다.</div>;
  }

  const { image, category, recruitmentStatus, title, tags } = club;

  return (
    <ClubWrapper>
      <ProfileContainer>
        <ProfileImage>
          <img src={image} alt="Profile" />
        </ProfileImage>
        <RecruitmentStatus>{recruitmentStatus.status}</RecruitmentStatus>
      </ProfileContainer>

      <Category>{category}</Category>
      <Title>{title}</Title>

      <Tags>
        {tags.map((tag, index) => (
          <Tag key={index}>#{tag}</Tag>
        ))}
      </Tags>
    </ClubWrapper>
  );
};

const ClubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 60px;
  background-color: white;
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileImage = styled.div`
  img {
    width: 128px;
    height: 128px;
    border: 1px solid #efefef;
    border-radius: 50%;
  }
`;

const RecruitmentStatus = styled.div`
  position: absolute;
  bottom: -8px;
  background-color: #fff;
  border: 1px solid #efefef;
  border-radius: 20px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 500;
  color: #b10d15;
  white-space: nowrap;
`;

const Category = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #000;
  margin-bottom: 4px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #000;
  margin-bottom: 16px;
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
