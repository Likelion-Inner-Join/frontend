// import React, { useState } from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

// const Container = styled.div`
//   width: 80%;
//   margin: 0 auto;
//   padding-top: 20px;
//   font-family: Arial, sans-serif;
// `;

// const Header = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px 0;
// `;

// const Title = styled.h1`
//   font-size: 24px;
//   font-weight: bold;
//   margin-bottom: 20px;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

// const InputField = styled.input`
//   padding: 10px;
//   font-size: 16px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   width: 100%;
//   font-family: inherit; /* 다른 글씨체와 통일 */
// `;

// const TextArea = styled.textarea`
//   padding: 10px;
//   font-size: 16px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   width: 100%;
//   height: 150px;
//   font-family: inherit; /* 다른 글씨체와 통일 */
// `;

// const Label = styled.label`
//   font-size: 16px;
//   font-weight: bold;
// `;

// const DateTimeWrapper = styled.div`
//   display: flex;
//   gap: 30px; /* 마감일과 마감 시간 간격을 조금 띄움 */
// `;

// const TimeSelectWrapper = styled.div`
//   display: flex;
//   gap: 10px;
// `;

// const Select = styled.select`
//   padding: 10px;
//   font-size: 16px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   font-family: inherit;
//   height: 42px; /* 마감일 선택 박스와 동일한 높이 */
// `;

// const ImageUploadWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const ImageUploadButton = styled.input`
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
// `;

// const ImagePreviewContainer = styled.div`
//   display: flex;
//   gap: 10px;
//   flex-wrap: wrap;
// `;

// const ImagePreview = styled.div`
//   width: 100px;
//   height: 100px;
//   background-color: #f2f2f2;
//   border-radius: 5px;
//   background-size: cover;
//   background-position: center;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 30px;
// `;

// const ListButton = styled.button`
//   background-color: #b10d15;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   padding: 15px 30px;
//   font-size: 16px;
//   cursor: pointer;

//   &:hover {
//     background-color: #9c0c13;
//   }
// `;

// /* 팝업창 관련 스타일 */
// const Popup = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: white;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   z-index: 1000;
//   width: 300px;
//   text-align: center;
// `;

// const CloseButton = styled.span`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   cursor: pointer;
//   font-size: 18px;
//   font-weight: bold;
// `;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 999;
// `;

// const WritePost = () => {
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [period, setPeriod] = useState("AM"); // 오전/오후 선택
//   const [hour, setHour] = useState("00"); // 시 선택
//   const [minute, setMinute] = useState("00"); // 분 선택
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");

//   // 오전/오후에 따른 시간 필드 동적 변경
//   const handlePeriodChange = (e) => {
//     setPeriod(e.target.value);
//     // '오전' 선택 시 00~11시, '오후' 선택 시 12~23시로 설정
//     if (e.target.value === "AM") {
//       setHour("00");
//     } else {
//       setHour("12");
//     }
//   };

//   // 마감일 선택 시 유효성 검사
//   const handleDateChange = (e) => {
//     const selectedDate = new Date(e.target.value);
//     const currentDate = new Date();

//     // 마감일이 오늘보다 이전인 경우
//     if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
//       setPopupMessage("마감일이 잘못되었습니다.");
//       setShowPopup(true);
//       setDeadline(""); // 선택을 취소하게끔 값 초기화
//     } else {
//       setDeadline(e.target.value); // 유효한 날짜일 경우에만 값 설정
//     }
//   };

//   const handleImageChange = (e) => {
//     if (images.length + e.target.files.length > 9) {
//       setPopupMessage("사진 첨부는 9장까지만 가능합니다.");
//       setShowPopup(true);
//     } else {
//       const newImages = Array.from(e.target.files).slice(0, 9 - images.length);
//       setImages([...images, ...newImages]);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const selectedDate = new Date(deadline);
//     const currentDate = new Date();

//     // 마감일이 오늘보다 이전이면 팝업 표시
//     if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
//       setPopupMessage("마감일이 잘못되었습니다.");
//       setShowPopup(true);
//       return;
//     }

//     // 유효한 마감일이면 제출 로직 실행
//     navigate("/post-manage");
//   };

//   const hourOptions =
//     period === "AM"
//       ? [...Array(12).keys()]
//       : [...Array(12).keys()].map((n) => n + 12);
//   const minuteOptions = [...Array(60).keys()];

//   return (
//     <Container>
//       <Header>
//         <Title>새로운 홍보글 작성</Title>
//       </Header>

//       <Form onSubmit={handleSubmit}>
//         <div>
//           <Label>제목</Label>
//           <InputField
//             type="text"
//             placeholder="홍보글 제목을 입력하세요"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <DateTimeWrapper>
//           <div>
//             <Label>마감일</Label>
//             <InputField
//               type="date"
//               value={deadline}
//               onChange={handleDateChange}
//               required
//             />
//           </div>
//           <div>
//             <Label>마감 시간</Label>
//             <TimeSelectWrapper>
//               <Select value={period} onChange={handlePeriodChange}>
//                 <option value="AM">오전</option>
//                 <option value="PM">오후</option>
//               </Select>
//               <Select value={hour} onChange={(e) => setHour(e.target.value)}>
//                 {hourOptions.map((h) => (
//                   <option key={h} value={h}>
//                     {h.toString().padStart(2, "0")}
//                   </option>
//                 ))}
//               </Select>
//               <Select
//                 value={minute}
//                 onChange={(e) => setMinute(e.target.value)}
//               >
//                 {minuteOptions.map((m) => (
//                   <option key={m} value={m}>
//                     {m.toString().padStart(2, "0")}
//                   </option>
//                 ))}
//               </Select>
//             </TimeSelectWrapper>
//           </div>
//         </DateTimeWrapper>

//         <div>
//           <Label>본문</Label>
//           <TextArea
//             placeholder="홍보글 내용을 입력하세요"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>

//         <ImageUploadWrapper>
//           <Label>사진 첨부 (최대 9장)</Label>
//           <ImageUploadButton
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageChange}
//           />
//           <ImagePreviewContainer>
//             {images.map((image, index) => (
//               <ImagePreview
//                 key={index}
//                 style={{
//                   backgroundImage: `url(${URL.createObjectURL(image)})`,
//                 }}
//               />
//             ))}
//           </ImagePreviewContainer>
//         </ImageUploadWrapper>

//         {/* 수정된 작성 완료 버튼 */}
//         <ButtonContainer>
//           <ListButton type="submit">작성 완료</ListButton>
//         </ButtonContainer>
//       </Form>

//       {showPopup && (
//         <>
//           <Overlay onClick={() => setShowPopup(false)} />
//           <Popup>
//             <CloseButton onClick={() => setShowPopup(false)}>×</CloseButton>
//             {popupMessage}
//           </Popup>
//         </>
//       )}
//     </Container>
//   );
// };

// export default WritePost;

// import React, { useState } from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

// const PostWrite = () => {
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [period, setPeriod] = useState("AM"); // 오전/오후 선택
//   const [hour, setHour] = useState("00"); // 시 선택
//   const [minute, setMinute] = useState("00"); // 분 선택
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");

//   // 오전/오후에 따른 시간 필드 동적 변경
//   const handlePeriodChange = (e) => {
//     setPeriod(e.target.value);
//     // '오전' 선택 시 00~11시, '오후' 선택 시 12~23시로 설정
//     if (e.target.value === "AM") {
//       setHour("00");
//     } else {
//       setHour("12");
//     }
//   };

//   // 마감일 선택 시 유효성 검사
//   const handleDateChange = (e) => {
//     const selectedDate = new Date(e.target.value);
//     const currentDate = new Date();

//     // 마감일이 오늘보다 이전인 경우
//     if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
//       setPopupMessage("마감일이 잘못되었습니다.");
//       setShowPopup(true);
//       setDeadline(""); // 선택을 취소하게끔 값 초기화
//     } else {
//       setDeadline(e.target.value); // 유효한 날짜일 경우에만 값 설정
//     }
//   };

//   const handleImageChange = (e) => {
//     if (images.length + e.target.files.length > 9) {
//       setPopupMessage("사진 첨부는 9장까지만 가능합니다.");
//       setShowPopup(true);
//     } else {
//       const newImages = Array.from(e.target.files).slice(0, 9 - images.length);
//       setImages([...images, ...newImages]);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const selectedDate = new Date(deadline);
//     const currentDate = new Date();

//     // 마감일이 오늘보다 이전이면 팝업 표시
//     if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
//       setPopupMessage("마감일이 잘못되었습니다.");
//       setShowPopup(true);
//       return;
//     }

//     // 유효한 마감일이면 제출 로직 실행
//     navigate("/post-manage");
//   };

//   const hourOptions =
//     period === "AM"
//       ? [...Array(12).keys()]
//       : [...Array(12).keys()].map((n) => n + 12);
//   const minuteOptions = [...Array(60).keys()];

//   return (
//     <Container>
//       <Header>
//         <Title>새로운 홍보글 작성</Title>
//       </Header>

//       <Form onSubmit={handleSubmit}>
//         <div>
//           <Label>제목</Label>
//           <InputField
//             type="text"
//             placeholder="홍보글 제목을 입력하세요"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <DateTimeWrapper>
//           <div>
//             <Label>마감일</Label>
//             <InputField
//               type="date"
//               value={deadline}
//               onChange={handleDateChange}
//               required
//             />
//           </div>
//           <div>
//             <Label>마감 시간</Label>
//             <TimeSelectWrapper>
//               <Select value={period} onChange={handlePeriodChange}>
//                 <option value="AM">오전</option>
//                 <option value="PM">오후</option>
//               </Select>
//               <Select value={hour} onChange={(e) => setHour(e.target.value)}>
//                 {hourOptions.map((h) => (
//                   <option key={h} value={h}>
//                     {h.toString().padStart(2, "0")}
//                   </option>
//                 ))}
//               </Select>
//               <Select
//                 value={minute}
//                 onChange={(e) => setMinute(e.target.value)}
//               >
//                 {minuteOptions.map((m) => (
//                   <option key={m} value={m}>
//                     {m.toString().padStart(2, "0")}
//                   </option>
//                 ))}
//               </Select>
//             </TimeSelectWrapper>
//           </div>
//         </DateTimeWrapper>

//         <div>
//           <Label>본문</Label>
//           <TextArea
//             placeholder="홍보글 내용을 입력하세요"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>

//         <ImageUploadWrapper>
//           <Label>사진 첨부 (최대 9장)</Label>
//           <ImageUploadButton
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageChange}
//           />
//           <ImagePreviewContainer>
//             {images.map((image, index) => (
//               <ImagePreview
//                 key={index}
//                 style={{
//                   backgroundImage: `url(${URL.createObjectURL(image)})`,
//                 }}
//               />
//             ))}
//           </ImagePreviewContainer>
//         </ImageUploadWrapper>

//         {/* 수정된 작성 완료 버튼 */}
//         <ButtonContainer>
//           <ListButton type="submit">작성 완료</ListButton>
//         </ButtonContainer>
//       </Form>

//       {showPopup && (
//         <>
//           <Overlay onClick={() => setShowPopup(false)} />
//           <Popup>
//             <CloseButton onClick={() => setShowPopup(false)}>×</CloseButton>
//             {popupMessage}
//           </Popup>
//         </>
//       )}
//     </Container>
//   );
// };

// export default PostWrite;

// src/owner/post_write/post_write.jsx
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      title,
      date: new Date().toLocaleDateString(),
      deadline: `${deadline} ${period} ${hour}:${minute}`,
      description,
      images,
    };

    addPost(newPost);
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
        <Title>새로운 홍보글 작성</Title>
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
