import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "../post_context/post_context";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GET, DELETE } from "../../common/api/axios";
import HeaderBarComponent from "../../manager/HeaderBar";
const PostManage = () => {
  const navigate = useNavigate();
  // const [posts, setPosts] = useState(useContext(PostContext).posts);
  const { posts: contextPosts } = useContext(PostContext); // Access posts from context
  const [posts, setPosts] = useState(contextPosts); // Local state for posts
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const clubName = encodeURIComponent("멋쟁이사자처럼");
        const response = await GET(`posts?clubName=${clubName}`);
        if (response.isSuccess) {
          const postsData = response.result.map((post) => ({
            postId: post.postId,
            title: post.title,
            content: post.content,
            images: post.image.map((img) => img.imageUrl),
            createdAt: post.createdAt,
            startTime: post.startTime,
            endTime: post.endTime,
            recruitmentStatus: post.recruitmentStatus,
            recruitmentType: post.recruitmentType,
          }));
          setPosts(postsData);
        } else {
          console.error("포스트 로드 실패:", response.message);
        }
      } catch (error) {
        console.error("API 호출 에러:", error.message);
      }
    };

    fetchPosts();
  }, []);

  const calculateRemainingDays = (deadline, isOpenRecruitment) => {
    if (isOpenRecruitment) return "상시모집";

    const currentDate = new Date();

    const [datePart, period, timePart] = deadline.split(" "); // "YYYY-MM-DD", "AM/PM", "HH:MM"
    const [year, month, day] = datePart.split("-").map(Number);
    let [hours, minutes] = timePart.split(":").map(Number);

    // 오전/오후에 따라 시간 조정
    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    const deadlineDate = new Date(year, month - 1, day, hours, minutes);

    currentDate.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);

    const timeDifference = deadlineDate - currentDate;
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (dayDifference === 0) return "D-DAY";
    return dayDifference > 0 ? `D-${dayDifference}` : "마감됨";
  };

  const handleEdit = (postId) => {
    navigate(`/post-edit/${postId}`);
  };

  const handleDeleteClick = (postId) => {
    setPostToDelete(postId);
    setShowDeleteModal(true);
  };

  // const confirmDelete = () => {
  //   setPosts(posts.filter((post) => post.id !== postToDelete));
  //   setShowDeleteModal(false);
  //   setPostToDelete(null);
  // };
  const confirmDelete = async () => {
    try {
      const response = await DELETE(`posts/${postToDelete}`); // DELETE API 호출
      if (response.isSuccess) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.postId !== postToDelete)
        );
        setShowDeleteModal(false);
        setPostToDelete(null);
      } else {
        console.error("포스트 삭제 실패:", response.message);
      }
    } catch (error) {
      console.error("API 호출 에러:", error.message);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
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
      {/* <HeaderBar>
        <LogoWrapper>
          <Logo src="/images/manager/logo.svg" alt="Logo" />
        </LogoWrapper>
        <ClubInfo>
          <CircleImage src="/images/manager/mutsa.svg" alt="동아리 이미지" />
          <HeaderClubName>멋쟁이 사자처럼</HeaderClubName>
        </ClubInfo>
      </HeaderBar> */}
      <HeaderBarComponent />
      <Header>
        <ClubLogo src="/images/manager/mutsa.svg" alt="동아리 이미지" />
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

      {/* 전체보기/목록보기 전환 버튼 추가 */}
      <HeaderContainer>
        <PostButtonContainer>
          <PostButton onClick={() => navigate("/post-write")}>
            새로운 홍보글 작성하기
          </PostButton>
        </PostButtonContainer>
        {/* <ViewToggle>
          <ToggleOption
            active={viewMode === "grid"}
            onClick={() => setViewMode("grid")}
          >
            전체보기
          </ToggleOption>
          <ToggleOption
            active={viewMode === "list"}
            onClick={() => setViewMode("list")}
          >
            목록보기
          </ToggleOption>
        </ViewToggle> */}
      </HeaderContainer>

      {viewMode === "grid" ? (
        <PostList>
          {posts.map((post, postIndex) => (
            <PostItem key={post.id}>
              <PostTitle>{post.title}</PostTitle>
              <PostDeadline>
                <PostDeadlineRed>
                  {calculateRemainingDays(
                    post.deadline,
                    post.isOpenRecruitment
                  )}
                </PostDeadlineRed>
                <PostDeadlineBlack>
                  {!post.isOpenRecruitment && ` ${post.deadline}`}
                </PostDeadlineBlack>
              </PostDeadline>

              <PostMeta>
                <span>{post.date}</span>
                <div>
                  <span
                    style={{ marginRight: "15px", cursor: "pointer" }}
                    onClick={() => handleEdit(post.id)}
                  >
                    수정
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteClick(post.id)}
                  >
                    삭제
                  </span>
                </div>
              </PostMeta>
              <PostDescription>{post.description}</PostDescription>
              <ImageContainer>
                {post.images &&
                  post.images.length > 0 &&
                  post.images.map((image, index) =>
                    image instanceof File ? (
                      <ImagePreview
                        key={index}
                        style={{
                          backgroundImage: `url(${URL.createObjectURL(image)})`,
                        }}
                        onClick={() => handleImageClick(postIndex, index)}
                      />
                    ) : null
                  )}
              </ImageContainer>
              <ButtonContainer>
                <ListButton onClick={() => navigate("/doc-eval")}>
                  지원 리스트 확인하기
                </ListButton>
              </ButtonContainer>
            </PostItem>
          ))}
        </PostList>
      ) : (
        <ListView>
          {posts.map((post) => (
            <ListItem key={post.id}>
              <ListImage
                src={
                  post.images[0] instanceof File
                    ? URL.createObjectURL(post.images[0])
                    : require("../../assets/image.png")
                }
                alt="Post Thumbnail"
              />
              <ListContent>
                <ListTitle>{post.title}</ListTitle>
                <ListDescription>
                  {post.description.slice(0, 50)}...
                </ListDescription>
                <ListMeta>
                  <span>{calculateRemainingDays(post.deadline)}</span>
                  <span>{post.date}</span>
                  {/* Place buttons inside ListMeta to align right */}
                  <ButtonWrapper>
                    <EditButton onClick={() => handleEdit(post.id)}>
                      수정
                    </EditButton>
                    <DeleteButton onClick={() => handleDeleteClick(post.id)}>
                      삭제
                    </DeleteButton>
                  </ButtonWrapper>
                </ListMeta>
              </ListContent>
            </ListItem>
          ))}
        </ListView>
      )}

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <ModalOverlay onClick={cancelDelete}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalText>정말로 삭제하시겠습니까?</ModalText>
            <ButtonContainer>
              <ConfirmButton onClick={confirmDelete}>예</ConfirmButton>
              <CancelButton onClick={cancelDelete}>아니요</CancelButton>
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}

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
  padding-top: 92px; /* HeaderBar 높이 + 여백 */
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

const ClubLogo = styled.img`
  width: 128px; /* 로고 크기 */
  height: 128px; /* 로고 크기 */
  border-radius: 50%; /* 원형 로고 */
  object-fit: cover; /* 이미지 비율 유지 */
  margin-bottom: 15px; /* 로고와 제목 사이 간격 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
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
  justify-content: flex-start;
  margin-top: 20px;
  margin-bottom: 20px;
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
  color: #b10d15;
`;

const PostDeadlineBlack = styled.span`
  color: #000;
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

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 40px;
// `;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
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
  overflow-x: auto;
  gap: 10px;
  margin-top: 40px;
  padding-bottom: 20px;
`;

const ImagePreview = styled.div`
  flex: 0 0 auto;
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
`;

const ModalText = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
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
  background: #b10d15;
  border: none;
  font-size: 24px;
  color: white;
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

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 15px;
`;

const ToggleOption = styled.span`
  font-size: 14px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#B10D15" : "#888")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;

const ListView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const ListItem = styled.div`
  display: flex;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; /* 추가된 속성 */
`;

const ListImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  object-fit: cover;
  margin-right: 10px;
`;

const ListContent = styled.div`
  flex: 1;
  padding: 10px;
`;

const ListTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const ListDescription = styled.p`
  font-size: 14px;
  color: #555;
`;

const ListMeta = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
  color: #888;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px; /* Adds space between D-day and date */
`;

const EditButton = styled.button`
  background-color: #b10d15;
  color: white;
  border: none;
  width: 60px;
  height: 30px;
  font-size: 12px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #9c0c13;
  }
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: #b10d15;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #9c0c13;
  }
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #ddd;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #bbb;
  }
`;

const DeleteButton = styled.button`
  background-color: #b10d15;
  color: white;
  border: none;
  width: 60px;
  height: 30px;
  font-size: 12px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #9c0c13;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 5px;
`;
