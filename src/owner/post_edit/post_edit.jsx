import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { PostContext } from "../post_context/post_context";

const PostEdit = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { posts, updatePost } = useContext(PostContext);
  const post = posts.find((p) => p.id.toString() === postId);

  const [title, setTitle] = useState(post ? post.title : "");
  const [deadline, setDeadline] = useState(
    post ? post.deadline.split(" ")[0] : ""
  );
  const [period, setPeriod] = useState(
    post ? post.deadline.split(" ")[1] : "AM"
  );
  const [hour, setHour] = useState(
    post ? post.deadline.split(" ")[2].split(":")[0] : "00"
  );
  const [minute, setMinute] = useState(
    post ? post.deadline.split(" ")[2].split(":")[1] : "00"
  );
  const [description, setDescription] = useState(post ? post.description : "");
  const [images, setImages] = useState(post ? post.images : []);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (!post) {
      alert("포스트를 찾을 수 없습니다.");
      navigate("/post-manage");
    }
  }, [post, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
      ...post,
      title,
      deadline: `${deadline} ${period} ${hour}:${minute}`,
      description,
      images,
    };
    updatePost(updatedPost);
    navigate("/post-manage");
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      setPopupMessage("마감일이 잘못되었습니다.");
      setShowPopup(true);
      setDeadline("");
    } else {
      setDeadline(e.target.value);
    }
  };

  const handleImageChange = (e) => {
    if (images.length + e.target.files.length > 9) {
      setPopupMessage("사진 첨부는 9장까지만 가능합니다.");
      setShowPopup(true);
    } else {
      const newImages = Array.from(e.target.files).slice(0, 9 - images.length);
      setImages([...images, ...newImages]);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const hourOptions =
    period === "AM"
      ? [...Array(12).keys()]
      : [...Array(12).keys()].map((n) => n + 12);
  const minuteOptions = [...Array(60).keys()];

  return (
    <Container>
      <Header>
        <Title>홍보글 수정</Title>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Label>제목</Label>
        <InputField
          type="text"
          placeholder="홍보글 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <DateTimeWrapper>
          <div>
            <Label>마감일</Label>
            <InputField
              type="date"
              value={deadline}
              onChange={handleDateChange}
              required
            />
          </div>
          <div>
            <Label>마감 시간</Label>
            <TimeSelectWrapper>
              <Select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="AM">오전</option>
                <option value="PM">오후</option>
              </Select>
              <Select value={hour} onChange={(e) => setHour(e.target.value)}>
                {hourOptions.map((h) => (
                  <option key={h} value={h.toString().padStart(2, "0")}>
                    {h.toString().padStart(2, "0")}
                  </option>
                ))}
              </Select>
              <Select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
              >
                {minuteOptions.map((m) => (
                  <option key={m} value={m.toString().padStart(2, "0")}>
                    {m.toString().padStart(2, "0")}
                  </option>
                ))}
              </Select>
            </TimeSelectWrapper>
          </div>
        </DateTimeWrapper>
        <Label>본문</Label>
        <TextArea
          placeholder="홍보글 내용을 입력하세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <ImageUploadWrapper>
          <Label>사진 첨부 (최대 9장)</Label>
          <ImageUploadButton
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <ImagePreviewContainer>
            {images.map((image, index) =>
              image instanceof File ? ( // image가 File 객체일 때만 처리
                <ImagePreview
                  key={index}
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(image)})`,
                  }}
                />
              ) : null // 유효하지 않은 경우 렌더링하지 않음
            )}
          </ImagePreviewContainer>
        </ImageUploadWrapper>
        <ButtonContainer>
          <ListButton type="submit">수정 완료</ListButton>
        </ButtonContainer>
      </Form>
      {showPopup && (
        <>
          <Overlay onClick={closePopup} />
          <Popup>
            <CloseButton onClick={closePopup}>×</CloseButton>
            {popupMessage}
          </Popup>
        </>
      )}
    </Container>
  );
};

export default PostEdit;

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

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputField = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  font-family: inherit;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  height: 250px;
  font-family: inherit;
  resize: none;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

const DateTimeWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

const TimeSelectWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: inherit;
  height: 42px;
`;

const ImageUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const ImageUploadButton = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
`;

const ImagePreview = styled.div`
  width: 100px;
  height: 100px;
  background-color: #f2f2f2;
  border-radius: 5px;
  background-size: cover;
  background-position: center;
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

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 300px;
  text-align: center;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
