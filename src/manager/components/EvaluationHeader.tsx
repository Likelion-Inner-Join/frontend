import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PromotionData } from "../mock/PromotionDetail";
import { PostInfoType } from "../global/types";
import { GET } from "../../common/api/axios";

const EvaluationHeader = () => {
  const [postInfo, setPostInfo] = useState<PostInfoType>();
  const [isHovered, setIsHovered] = useState(false);
  const [stageList, setStageList] = useState<string[]>([]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const STAGES_FORM_ONLY = ["", "서류 평가", "결과 공지"];
  const STAGES_FORM_AND_MEETING = [
    "",
    "서류 평가",
    "결과 공지",
    "면접시간 설정",
    "면접 평가",
    "최종결과 공지",
  ];

  useEffect(() => {
    getPostDetails();
  }, []);

  useEffect(() => {
    if (postInfo?.recruitmentType === "FORM_ONLY") {
      setStageList(STAGES_FORM_ONLY);
    } else {
      setStageList(STAGES_FORM_AND_MEETING);
    }
  }, [postInfo]);

  const getPostDetails = async () => {
    try {
      //const res = await GET(`posts/${postId}`);
      const res = await GET(`posts/1`);
      //const res = PromotionData;

      if (res.isSuccess) {
        setPostInfo(res.result);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function parseISODateTime(isoString: string) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate() - 1;
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return { year, month, day, hours, minutes };
  }

  function findCurrentStatus(status: string) {
    if (postInfo?.recruitmentType === "FORM_ONLY") {
      if (status === "OPEN") return 1;
      else if (status === "FORM_REVIEWED") return 2;
      else if (status === "CLOSED") return 3;
    } else {
      if (status === "OPEN") return 1;
      else if (status === "FORM_REVIEWED") return 2;
      else if (status === "TIME_SET") return 3;
      else if (status === "INTERVIEWED") return 4;
      else if (status === "CLOSED") return 5;
    }
  }

  return (
    <Wrapper>
      <ProgressBar
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered ? (
          <Stage hovered={isHovered}>
            {stageList.map((stageName, index) => {
              if (index === 0) return null;
              const isCurrent =
                findCurrentStatus(postInfo?.recruitmentStatus || "") === index;
              return (
                <React.Fragment key={index}>
                  <StageNumber current={isCurrent}>{index}</StageNumber>
                  <StageName current={isCurrent} hovered={isHovered}>
                    {stageName}
                  </StageName>
                  <div>
                    {isCurrent ? (
                      <img src="/images/manager/loading.svg" />
                    ) : (
                      <p> </p>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </Stage>
        ) : (
          <Stage hovered={isHovered}>
            <StageNumber current={true}>
              {findCurrentStatus(postInfo?.recruitmentStatus || "OPEN")}
            </StageNumber>
            <StageName current={false} hovered={isHovered}>
              {postInfo?.recruitmentType === "FORM_ONLY"
                ? STAGES_FORM_ONLY[
                    findCurrentStatus(postInfo?.recruitmentStatus || "OPEN") ||
                      0
                  ]
                : STAGES_FORM_AND_MEETING[
                    findCurrentStatus(postInfo?.recruitmentStatus || "OPEN") ||
                      0
                  ]}
            </StageName>
          </Stage>
        )}
      </ProgressBar>
      <Title>
        <h1>{postInfo?.title}</h1>
        <p>
          {postInfo?.endTime
            ? `${new Date(postInfo.endTime).getUTCFullYear()}년 
        ${String(new Date(postInfo.endTime).getUTCMonth() + 1).padStart(
          2,
          "0"
        )}월 
        ${String(new Date(postInfo.endTime).getUTCDate()).padStart(
          2,
          "0"
        )}일 마감`
            : "마감일 정보가 없습니다"}
        </p>
      </Title>
    </Wrapper>
  );
};

export default EvaluationHeader;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProgressBar = styled.div`
  diplay: flex;
  padding: 10px 20px;
  margin-bottom: 20px;
  align-self: center;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 0px 0px 25px 25px;
  background-color: #fcfbfb;
`;

const Stage = styled.div<{ hovered: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${({ hovered }) => (hovered ? 0.7 : 1)};
  transition: opacity 0.3s ease-in-out;
`;

const StageNumber = styled.div<{ current: boolean }>`
  display: flex;
  width: 24px;
  height: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 14px;

  background-color: ${({ current }) => {
    if (current) return "#cc141d";
    return " #fcfbfb";
  }};

  border: ${({ current }) => {
    if (current) return "1px solid #cc141d";
    return "1px solid #606060;";
  }};

  color: ${({ current }) => {
    if (current) return "#fff";
    return "#606060;";
  }};

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
`;

const StageName = styled.div<{ current: boolean; hovered: boolean }>`
  color: ${({ current, hovered }) => {
    if (current) return "#CC141D";
    if (hovered) return "#222";
    return "#222";
  }};

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: ${({ hovered }) => {
    if (hovered) return "500";
    return "700";
  }};

  line-height: 150%;
  letter-spacing: -0.32px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  h1 {
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.32px;
  }
  p {
    color: #767676;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
  }
`;
