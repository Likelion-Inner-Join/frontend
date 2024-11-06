// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import styled from "styled-components";
// import { useState } from "react";

// const PostManage = () => {
//   const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

//   const posts = [
//     {
//       id: 1,
//       title: "🦁멋쟁이사자처럼 서강대학교에서 13기 아기사자를 모집합니다!🦁",
//       date: "2024/10/20 작성",
//       deadline: "2024년 10월 27일 (토) 마감",
//       remainingDays: "D-7",
//       description:
//         "안녕하세요, 멋쟁이사자처럼 서강대학교입니다! 13기 아기사자 모집이 시작되었습니다. 창업, 웹 개발에 관심 있는 분은 누구나 지원 가능합니다.",
//     },
//   ];

//   return (
//     <Container>
//       {/* 동아리 소개 헤더 */}
//       <Header>
//         <ClubLogo />
//         <ClubSubTitle>중앙동아리</ClubSubTitle>
//         <ClubName>멋쟁이사자처럼</ClubName>
//         <ClubTags>
//           <Tag>#IT</Tag>
//           <Tag>#프론트엔드</Tag>
//           <Tag>#백엔드</Tag>
//         </ClubTags>
//       </Header>
//       {/* 탭 메뉴 */}
//       <TabMenu>
//         <Tab active={true}>홍보글 작성</Tab>
//         <Tab active={false}>지원폼 관리</Tab>
//       </TabMenu>
//       {/* 새로운 홍보글 작성하기 버튼 */}
//       <PostButtonContainer>
//         <PostButton onClick={() => navigate("/post-write")}>
//           새로운 홍보글 작성하기
//         </PostButton>
//       </PostButtonContainer>
//       {/* 게시글 목록 */}
//       <PostList>
//         {posts.map((post) => (
//           <PostItem key={post.id}>
//             <PostTitle>{post.title}</PostTitle>
//             <PostDeadline>
//               <PostDeadlineRed>{post.remainingDays}</PostDeadlineRed>
//               <PostDeadlineBlack> &nbsp; {post.deadline}</PostDeadlineBlack>
//             </PostDeadline>

//             <PostMeta>
//               <span>{post.date}</span>
//               <div>
//                 <span style={{ marginRight: "15px", cursor: "pointer" }}>
//                   수정
//                 </span>
//                 <span style={{ cursor: "pointer" }}>삭제</span>
//               </div>
//             </PostMeta>

//             <PostDescription>{post.description}</PostDescription>

//             {/* 사진 9개와 지원 리스트 버튼 추가 */}
//             <ImageContainer>
//               <ImageBox>사진 1</ImageBox>
//               <ImageBox>사진 2</ImageBox>
//               <ImageBox>사진 3</ImageBox>
//               <ImageBox>사진 4</ImageBox>
//               <ImageBox>사진 5</ImageBox>
//               <ImageBox>사진 6</ImageBox>
//               <ImageBox>사진 7</ImageBox>
//               <ImageBox>사진 8</ImageBox>
//               <ImageBox>사진 9</ImageBox>
//             </ImageContainer>

//             <ButtonContainer>
//               <ListButton onClick={() => navigate("/check-list")}>
//                 지원 리스트 확인하기
//               </ListButton>
//             </ButtonContainer>
//           </PostItem>
//         ))}
//       </PostList>
//     </Container>
//   );
// };

// export default PostManage;

// src/owner/post_manage/post_manage.jsx

// src/owner/post_manage/post_manage.jsx
import React, { useContext, useState } from "react";
import { PostContext } from "../post_context/post_context";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PostManage = () => {
  const navigate = useNavigate();
  const { posts } = useContext(PostContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const calculateRemainingDays = (deadline) => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    const timeDifference = deadlineDate - currentDate;
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return dayDifference >= 0 ? `D-${dayDifference}` : "마감됨";
  };

  const handleImageClick = (postIndex, imageIndex) => {
    console.log("Image clicked:", postIndex, imageIndex); // 디버그용 로그
    setSelectedPostIndex(postIndex);
    setSelectedImageIndex(imageIndex);
    setSelectedImage(posts[postIndex].images[imageIndex]);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedPostIndex(null);
    setSelectedImageIndex(null);
  };

  const showPreviousImage = () => {
    if (selectedImageIndex > 0) {
      const newIndex = selectedImageIndex - 1;
      setSelectedImageIndex(newIndex);
      setSelectedImage(posts[selectedPostIndex].images[newIndex]);
    }
  };

  const showNextImage = () => {
    if (selectedImageIndex < posts[selectedPostIndex].images.length - 1) {
      const newIndex = selectedImageIndex + 1;
      setSelectedImageIndex(newIndex);
      setSelectedImage(posts[selectedPostIndex].images[newIndex]);
    }
  };

  return (
    <Container>
      <Header>
        <ClubLogo />
        <ClubSubTitle>중앙동아리</ClubSubTitle>
        <ClubName>멋쟁이사자처럼</ClubName>
        <ClubTags>
          <Tag>#IT</Tag>
          <Tag>#프론트엔드</Tag>
          <Tag>#백엔드</Tag>
        </ClubTags>
      </Header>
      <TabMenu>
        <Tab active={true}>홍보글 작성</Tab>
        <Tab active={false} onClick={() => navigate("/apply-manage")}>
          지원폼 관리
        </Tab>
      </TabMenu>
      <PostButtonContainer>
        <PostButton onClick={() => navigate("/post-write")}>
          새로운 홍보글 작성하기
        </PostButton>
      </PostButtonContainer>
      <PostList>
        {posts.map((post, postIndex) => (
          <PostItem key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <PostDeadline>
              <PostDeadlineRed>
                {calculateRemainingDays(post.deadline)}
              </PostDeadlineRed>
              <PostDeadlineBlack> &nbsp; {post.deadline}</PostDeadlineBlack>
            </PostDeadline>
            <PostMeta>
              <span>{post.date}</span>
              <div>
                <span style={{ marginRight: "15px", cursor: "pointer" }}>
                  수정
                </span>
                <span style={{ cursor: "pointer" }}>삭제</span>
              </div>
            </PostMeta>
            <PostDescription>{post.description}</PostDescription>
            <ImageContainer>
              {post.images &&
                post.images.length > 0 &&
                post.images.map((image, index) => (
                  <ImagePreview
                    key={index}
                    style={{
                      backgroundImage: `url(${URL.createObjectURL(image)})`,
                    }}
                    onClick={() => handleImageClick(postIndex, index)} // 수정된 부분
                  />
                ))}
            </ImageContainer>
            <ButtonContainer>
              <ListButton onClick={() => navigate("/check-list")}>
                지원 리스트 확인하기
              </ListButton>
            </ButtonContainer>
          </PostItem>
        ))}
      </PostList>

      {/* 모달 */}
      {selectedImage && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {selectedImageIndex > 0 && (
              <ArrowButton onClick={showPreviousImage}>{"<"}</ArrowButton>
            )}
            <ModalImage
              src={URL.createObjectURL(selectedImage)}
              alt="확대 이미지"
            />
            {selectedImageIndex <
              posts[selectedPostIndex].images.length - 1 && (
              <ArrowButton right onClick={showNextImage}>
                {">"}
              </ArrowButton>
            )}
            <CloseButton onClick={closeModal}>×</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default PostManage;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

const ClubLogo = styled.div`
  width: 128px;
  height: 128px;
  background-color: #ddd; /* 임시 로고 */
  border-radius: 50%;
  margin-bottom: 15px;
`;

const ClubName = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 5px;
`;

const ClubSubTitle = styled.p`
  margin-top: 5px;
  margin-bottom: 0px;
  font-size: 14px;
`;

const ClubTags = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Tag = styled.span`
  background-color: #ffeded;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  border-bottom: 2px solid #f2f2f2;
  width: 100%;
`;

const Tab = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#B10D15" : "#888")};
  border-bottom: ${(props) => (props.active ? "2px solid #B10D15" : "none")};
`;

const PostButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  margin-top: 20px;
  margin-bottom: 20px; /* 게시글과 간격 추가 */
`;

const PostButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 20px;
  color: #888;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #f2f2f2;
  }

  &::before {
    content: "+";
    font-size: 20px;
    margin-right: 10px;
  }
`;

const PostList = styled.div`
  margin-top: 20px;
`;

const PostItem = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const PostTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const PostDeadline = styled.div`
  display: inline-block;
  background-color: #f9f9f9;
  border-radius: 20px;
  padding: 5px 10px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const PostDeadlineRed = styled.span`
  color: #b10d15; /* D-3 부분의 빨간색 */
`;

const PostDeadlineBlack = styled.span`
  color: #000; /* 마감 날짜 부분의 검은색 */
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  color: #888;
`;

const PostDescription = styled.p`
  font-size: 16px;
  text-align: left;
  white-space: pre-line; /* 줄바꿈과 공백을 유지 */
`;

/* 사진과 버튼 관련 스타일 */

const ImageBox = styled.div`
  flex: 0 0 auto; /* 가로로 나란히 배치 */
  width: 280px;
  height: 280px;
  background-color: #ddd; /* 임시 배경, 실제 이미지로 교체 가능 */
  border-radius: 10px;
  text-align: center;
  line-height: 280px; /* 텍스트를 가운데 정렬 */
  font-size: 18px;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const ListButton = styled.button`
  background-color: #b10d15;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px 30px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #9c0c13;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  overflow-x: auto; /* 가로 스크롤 가능하게 설정 */
  gap: 10px; /* 사진 간의 간격을 줄임 */
  margin-top: 40px;
  padding-bottom: 20px;
`;

const ImagePreview = styled.div`
  flex: 0 0 auto; /* 가로 스크롤 시 이미지가 고정된 너비를 가지도록 설정 */
  width: 280px;
  height: 280px;
  background-color: #ddd;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
`;

const ImagePreviewPlaceholder = styled.div`
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  border-radius: 10px;
  color: #888;
  font-size: 12px;
`;

// 모달 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 전체 배경을 살짝 어둡게 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  padding: 20px; /* 사진과 화살표 간의 간격을 확보 */
`;

const ModalImage = styled.img`
  max-width: 80vw;
  max-height: 80vh;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 이미지에 그림자 추가로 사진을 돋보이게 */
`;

const CloseButton = styled.button`
  position: absolute;
  top: -10px; /* 사진 위에서 조금 더 위로 이동 */
  right: -10px; /* 사진 오른쪽에서 조금 더 우측으로 이동 */
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white;

  &:hover {
    color: #bbb;
  }
`;

const ArrowButton = styled.button`
  background: #b10d15; /* 화살표 배경 색상을 #b10d15로 설정 */
  border: none;
  font-size: 24px;
  color: white; /* 화살표 아이콘을 흰색으로 설정 */
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ right }) =>
    right
      ? "right: -60px;"
      : "left: -60px;"} /* 이미지와의 간격을 위해 위치 조정 */

  &:hover {
    background: #8e0a12; /* 호버 시 조금 더 어두운 색으로 변경 */
  }
`;
