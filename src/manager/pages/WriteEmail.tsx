import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ApplicantList from "../components/ApplicantList";
import InterviewerList from "../components/InterviewerList";
import MyButton from "../components/MyButton";
import { applicantData } from "../mock/applicantData";
import { positionData } from "../mock/positionData";
import { PromotionData } from "../mock/PromotionDetail";
import { useNavigate } from "react-router-dom";
interface Applicant {
  applicationId: number;
  userId: number;
  name: string;
  email: string;
  phoneNum: string;
  school: string;
  major: string;
  position: string;
  studentNumber: string;
  formResult: string;
  meetingResult: string;
  formScore: number;
  meetingScore: number;
  meetingStartTime: string;
  meetingEndTime: string;
}

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

const WriteEmail = () => {
  const [passList, setPassList] = useState<Applicant[]>([]);
  const [failList, setFailList] = useState<Applicant[]>([]);
  const [receiverList, setReceiverList] = useState<Applicant[]>([]);
  const [selectedTab, setSelectedTab] = useState("");
  const [promotionInfo, setPromotionInfo] = useState<PromotionInfo>();
  const navigate = useNavigate();

  useEffect(() => {
    setPromotionInfo(PromotionData[0].result);
  }, []);

  const selectBtnClick = (selected: string) => {
    setSelectedTab(selected);
    if (selected === "전체") {
      setReceiverList(applicantData);
    } else if (selected === "합격자") {
      setReceiverList(passList);
    } else if (selected === "불합격자") {
      setReceiverList(failList);
    }
  };

  function parseISODateTime(isoString: string) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return { year, month, day, hours, minutes };
  }

  const addReceiver = (id: number) => {};

  const removeReceiver = (id: number) => {
    setReceiverList((prevList) =>
      prevList.filter((receiver) => receiver.applicationId !== id)
    );
  };

  useEffect(() => {
    if (
      promotionInfo?.status === "OPEN" ||
      promotionInfo?.status === "INTERVIEW"
    ) {
      setPassList(
        applicantData.filter((applicant) => applicant.formResult === "pass")
      );
      setFailList(
        applicantData.filter((applicant) => applicant.formResult === "fail")
      );
    } else {
      setPassList(
        applicantData.filter(
          (applicant) =>
            applicant.formResult === "pass" &&
            applicant.meetingResult === "pass"
        )
      );
      setFailList(
        applicantData.filter(
          (applicant) =>
            applicant.formResult === "fail" ||
            applicant.meetingResult === "fail"
        )
      );
    }
  }, []);

  useEffect(() => {
    if (receiverList === applicantData) setSelectedTab("전체");
    else if (receiverList === passList) setSelectedTab("합격자");
    else if (receiverList === failList) setSelectedTab("불합격자");
    else setSelectedTab("");
  }, [receiverList]);

  return (
    <Wrapper>
      {promotionInfo?.status === "OPEN" ||
      promotionInfo?.status === "INTERVIEW" ? (
        <ApplicantList
          data1={applicantData}
          data2={positionData}
          isEmail={true}
        />
      ) : (
        <InterviewerList
          data1={applicantData}
          data2={positionData}
          isEmail={true}
        />
      )}
      <Container>
        <Title>
          <h1>{promotionInfo?.title}</h1>
          <p>
            {parseISODateTime(String(promotionInfo?.endTime)).year}년{" "}
            {parseISODateTime(String(promotionInfo?.endTime)).month}월{" "}
            {parseISODateTime(String(promotionInfo?.endTime)).day}일 마감
          </p>
        </Title>
        <Caption>
          <h1>이메일 보내기</h1>
          <Buttons>
            <MyButton
              content="전송하기"
              buttonType="RED"
              onClick={() => navigate("/email-send")}
            />
          </Buttons>
        </Caption>
        <Sender>
          <EmailCaption>관리자 메일 주소</EmailCaption>
          <Input>
            <input></input>
          </Input>
        </Sender>
        <Receiver>
          <EmailCaption>받는 사람</EmailCaption>
          <ReceiverContainer>
            <SelectTab>
              <SelectButton
                selected={selectedTab === "전체"}
                onClick={() => selectBtnClick("전체")}
              >
                전체 선택
              </SelectButton>
              <SelectButton
                selected={selectedTab === "합격자"}
                onClick={() => selectBtnClick("합격자")}
              >
                합격자 선택
              </SelectButton>
              <SelectButton
                selected={selectedTab === "불합격자"}
                onClick={() => selectBtnClick("불합격자")}
              >
                불합격자 선택
              </SelectButton>
            </SelectTab>
            <ReceiverBox>
              {receiverList.map((receiver, index) => (
                <ReceiverItem key={receiver.applicationId}>
                  {receiver.name}
                  <p>{receiver.studentNumber}</p>
                  <img
                    src="/images/manager/cancel.svg"
                    alt="삭제"
                    onClick={() => removeReceiver(receiver.applicationId)}
                  />
                </ReceiverItem>
              ))}
            </ReceiverBox>
          </ReceiverContainer>
        </Receiver>
        <EmailTitle>
          <EmailCaption>제목</EmailCaption>{" "}
          <Input>
            <input></input>
          </Input>
        </EmailTitle>
        <Body>
          <textarea placeholder="메일 내용을 입력하세요" />
        </Body>
      </Container>
    </Wrapper>
  );
};

export default WriteEmail;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: flex-start;
  gap: 100px;
  background-color: #fff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100vh;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 50px;

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

const Caption = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  h1 {
    color: #000;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 36px */
    letter-spacing: -0.48px;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 24px;
`;

const Sender = styled.div`
  display: flex;
  justyfy-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Receiver = styled.div`
  display: flex;
  justyfy-content: flex-start;
  width: 100%;
  margin-bottom: 10px;
`;

const EmailTitle = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
`;

const EmailCaption = styled.div`
  width: 150px;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`;

const Input = styled.div`
  display: flex;
  width: 100%;
  height: 44px;
  align-items: center;
  padding: 0px 10px;
  border-radius: 4px;
  border: 1px solid #ddd;

  input {
    width: 100%;
    font-family: Pretendard;
    color: #222;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
  }
`;

const ReceiverContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const SelectTab = styled.div`
  display: flex;
  margin-bottom: 5px;
  gap: 10px;
`;

const SelectButton = styled.div<{ selected: boolean }>`
  display: flex;
  padding: 6px 16px;
  align-items: center;
  gap: 6px;
  border-radius: 30px;
  background: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  cursor: pointer;

  color: ${({ selected }) => {
    if (selected) return "#CC141D";
    return "#767676";
  }};

  border: ${({ selected }) => {
    if (selected) return "1px solid #CC141D";
    return "1px solid #ddd;";
  }};
`;

const ReceiverBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 44px;
  height: auto
  align-items: center;
  padding: 5px 5px;
  gap: 5px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const ReceiverItem = styled.div`
  display: flex;
  text-align: center;
  align-self: center;
  algin-items: center;
  padding: 0px 6px;
  gap: 6px;
  border-radius: 30px;
  background: #f9f9f9;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  white-space: nowrap;

  p {
    color: #424242;
  }

  img {
    width: 12px;
    cursor: pointer;
  }
`;

const Body = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  margin-bottom: 20px;
  padding: 5px;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #ddd;

  textarea {
    width: 100%;
    height: 100%;
    border: none;
    resize: none;
    font-family: Pretendard;
    color: #222;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #767676;
    }
  }
`;
