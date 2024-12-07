import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PromotionData } from "../mock/PromotionDetail";

interface PromotionImage {
  imageId: number;
  imageUrl: string;
}

interface PromotionInfo {
  postId: number;
  clubId: number;
  title: string;
  createdAt: string;
  startTime: string;
  endTime: string;
  body: string;
  status: string;
  type: string;
  field: string;
  fieldType: string;
  image: PromotionImage[];
}

const EvaluationHeader = () => {
  const [promotionInfo, setPromotionInfo] = useState<PromotionInfo>();
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const Stages = [
    "",
    "서류 평가",
    "결과 공지",
    "면접시간 설정",
    "면접 평가",
    "최종결과 공지",
  ];
  const maxStage = promotionInfo?.type === "FORM" ? 2 : Stages.length - 1;
  const filteredStages = Stages.slice(0, maxStage + 1);

  useEffect(() => {
    setPromotionInfo(PromotionData[0].result);
  }, []);

  function parseISODateTime(isoString: string) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return { year, month, day, hours, minutes };
  }

  function findCurrentStatus(status: string) {
    if (status === "OPEN") return 1;
    else if (status === "FORM_REVIEW") return 2;
    else if (status === "INTERVIEW") return 3;
    else if (status === "INTERVIEW_REVIEW") return 4;
    else if (status === "CLOSED") return 5;
  }

  return (
    <Wrapper>
      <ProgressBar
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered ? (
          <Stage hovered={isHovered}>
            {filteredStages.map((stageName, index) => {
              if (index === 0) return null;
              const isCurrent =
                findCurrentStatus(promotionInfo?.status || "") === index;
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
              {findCurrentStatus(promotionInfo?.status || "OPEN")}
            </StageNumber>
            <StageName current={false} hovered={isHovered}>
              {Stages[findCurrentStatus(promotionInfo?.status || "OPEN") || 0]}
            </StageName>
          </Stage>
        )}
      </ProgressBar>
      <Title>
        <h1>{promotionInfo?.title}</h1>
        <p>
          {parseISODateTime(String(promotionInfo?.endTime)).year}년{" "}
          {parseISODateTime(String(promotionInfo?.endTime)).month}월{" "}
          {parseISODateTime(String(promotionInfo?.endTime)).day}일 마감
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
