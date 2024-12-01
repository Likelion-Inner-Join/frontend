import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PostContext } from "../post_context/post_context";

const PostWrite = () => {
  const navigate = useNavigate();
  const { addPost } = useContext(PostContext);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [period, setPeriod] = useState("AM");
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isOpenRecruitment, setIsOpenRecruitment] = useState(false); // 상시모집 상태

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isOpenRecruitment && (!deadline || !hour || !minute)) {
      setPopupMessage(
        "마감일과 마감 시간을 입력하거나 상시모집을 선택해주세요."
      );
      setShowPopup(true);
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      date: new Date().toLocaleDateString(),
      deadline: isOpenRecruitment
        ? "상시모집"
        : `${deadline} ${period} ${hour}:${minute}`,
      description,
      images,
      isOpenRecruitment,
    };

    addPost(newPost);
    navigate("/post-manage");
  };

  const handleDateChange = (e) => {
    if (isOpenRecruitment) return; // 상시모집인 경우 변경 무시
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
        <Title>새로운 홍보글 작성</Title>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Label>
          제목 <CharCount>({title.length} / 60)</CharCount>
        </Label>
        <InputField
          type="text"
          placeholder="홍보글 제목을 입력하세요"
          value={title}
          onChange={(e) => {
            if (e.target.value.length <= 60) {
              setTitle(e.target.value);
            }
          }}
          required
        />
        <DateTimeWrapper>
          <div>
            <Label>마감일</Label>
            <InputField
              type="date"
              value={isOpenRecruitment ? "" : deadline}
              onChange={handleDateChange}
              disabled={isOpenRecruitment} // 상시모집일 경우 비활성화
              required={!isOpenRecruitment} // 상시모집이 아닌 경우 필수 입력
            />
          </div>
          <div>
            <Label>마감 시간</Label>
            <TimeSelectWrapper>
              <Select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                disabled={isOpenRecruitment} // 상시모집일 경우 비활성화
              >
                <option value="AM">오전</option>
                <option value="PM">오후</option>
              </Select>
              <Select
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                disabled={isOpenRecruitment} // 상시모집일 경우 비활성화
              >
                {hourOptions.map((h) => (
                  <option key={h} value={h.toString().padStart(2, "0")}>
                    {h.toString().padStart(2, "0")}
                  </option>
                ))}
              </Select>
              <Select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                disabled={isOpenRecruitment} // 상시모집일 경우 비활성화
              >
                {minuteOptions.map((m) => (
                  <option key={m} value={m.toString().padStart(2, "0")}>
                    {m.toString().padStart(2, "0")}
                  </option>
                ))}
              </Select>
            </TimeSelectWrapper>
          </div>
          <OpenRecruitmentButton
            type="button"
            onClick={() => setIsOpenRecruitment((prev) => !prev)}
            active={isOpenRecruitment}
          >
            상시모집
          </OpenRecruitmentButton>
        </DateTimeWrapper>
        <Label>
          본문 <CharCount>({description.length} / 3500)</CharCount>
        </Label>
        <TextArea
          placeholder="홍보글 내용을 입력하세요"
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= 3500) {
              setDescription(e.target.value);
            }
          }}
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
            {images.map((image, index) => (
              <ImagePreview
                key={index}
                style={{
                  backgroundImage: `url(${URL.createObjectURL(image)})`,
                }}
              />
            ))}
          </ImagePreviewContainer>
        </ImageUploadWrapper>
        <ButtonContainer>
          <ListButton type="submit">작성 완료</ListButton>
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

export default PostWrite;

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
  font-family: inherit; /* 다른 글씨체와 통일 */
`;

const CharCount = styled.span`
  font-size: 12px;
  color: #888;
  margin-left: 8px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  height: 250px;
  font-family: inherit; /* 다른 글씨체와 통일 */
  resize: none; /* 크기 조절 비활성화 */
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

const DateTimeWrapper = styled.div`
  display: flex;
  gap: 30px; /* 마감일과 마감 시간 간격을 조금 띄움 */
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
  height: 42px; /* 마감일 선택 박스와 동일한 높이 */
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

/* 팝업창 관련 스타일 */
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

const OpenRecruitmentButton = styled.button`
  margin-left: 15px;
  background-color: ${(props) => (props.active ? "#B10D15" : "#F0F0F0")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: 1px solid #ddd;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#9C0C13" : "#E0E0E0")};
  }
`;
