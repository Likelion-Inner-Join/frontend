import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ApplicantList from "../components/ApplicantList";
import { applicantData } from "../mock/applicantData";
import { positionData } from "../mock/positionData";
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

const WriteEmail = () => {
  const [passList, setPassList] = useState<Applicant[]>([]);
  const [failList, setFailList] = useState<Applicant[]>([]);
  const [receiverList, setReceiverList] = useState<Applicant[]>([]);
  const [selectedTab, setSelectedTab] = useState("");

  const navigate = useNavigate();

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

  const addReceiver = (id: number) => {};

  const removeReceiver = (id: number) => {
    setReceiverList((prevList) =>
      prevList.filter((receiver) => receiver.applicationId !== id)
    );
  };

  useEffect(() => {
    setPassList(
      applicantData.filter((applicant) => applicant.formResult === "pass")
    );
    setFailList(
      applicantData.filter((applicant) => applicant.formResult === "fail")
    );
  }, []);

  useEffect(() => {
    if (receiverList === applicantData) setSelectedTab("전체");
    else if (receiverList === passList) setSelectedTab("합격자");
    else if (receiverList === failList) setSelectedTab("불합격자");
    else setSelectedTab("");
  }, [receiverList]);

  return (
    <Wrapper>
      <ApplicantList
        data1={applicantData}
        data2={positionData}
        isEmail={true}
      />
      <Container>
        <SendButton onClick={() => navigate("/email-send")}>
          전송하기
        </SendButton>
        <Sender>
          <Caption>관리자 메일 주소</Caption>
          <Input>
            <input></input>
          </Input>
        </Sender>
        <Receiver>
          <Caption>받는 사람</Caption>
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
                  <p>{receiver.name}</p>
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
        <Title>
          <Caption>제목</Caption>{" "}
          <Input>
            <input></input>
          </Input>
        </Title>
        <File>
          <Caption>파일 첨부</Caption>{" "}
          <FileBox>
            <input placeholder="파일 첨부"></input>
          </FileBox>
        </File>
        <Body>
          <input placeholder="메일 내용을 입력하세요"></input>
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
  background-color: #fff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
`;

const SendButton = styled.div`
  align-self: flex-end;
  margin-top: 50px;
  margin-right: 70px;
  margin-bottom: 20px;
  padding: 12px 32px;
  gap: 10px;
  border-radius: 30px;
  background: #b10d15;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 21px */
  letter-spacing: -0.28px;

  &:hover {
    cursor: pointer;
  }
`;

const Sender = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Receiver = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const File = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Caption = styled.div`
  width: 120px;
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
  width: 830px;
  height: 44px;
  align-items: center;

  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #ddd;

  input {
    width: 100%;
  }
`;

const ReceiverContainer = styled.div`
  display: flex;
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
    if (selected) return "#88181C";
    return "#767676";
  }};

  border: ${({ selected }) => {
    if (selected) return "1px solid #88181C";
    return "1px solid #ddd;";
  }};
`;

const ReceiverBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 830px;
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
  color: #767676;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  white-space: nowrap;

  img {
    width: 12px;
    cursor: pointer;
  }
`;

const FileBox = styled.div`
  display: flex;
  width: 830px;
  height: 104px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px dashed #ddd;
`;

const Body = styled.div`
  display: flex;
  width: 954px;
  flex: 1;
  margin-bottom: 20px;
  padding: 5px;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #ddd;

  input {
    width: 100%;

    &::placeholder {
    }
  }
`;
