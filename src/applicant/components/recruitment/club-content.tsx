import { styled } from "styled-components";
import { RECRUITMENT_STATUS } from "../../constants";
import { TRecruitmentData } from "../../pages";

export const ClubContent = ({ content }: { content: TRecruitmentData }) => {
  return (
    <ClubWrapper>
      <ProfileContainer>
        <ProfileImage>
          <img src={content.image[0].imageUrl} alt="Profile" />
        </ProfileImage>
        <RecruitmentStatus>
          {RECRUITMENT_STATUS[content.recruitmentStatus] || "없음"}
        </RecruitmentStatus>
      </ProfileContainer>
      <Category>{content.categoryName}</Category>
      <Title>{content.title}</Title>
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
