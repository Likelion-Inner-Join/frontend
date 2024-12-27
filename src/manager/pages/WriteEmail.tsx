import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ApplicantList from "../components/ApplicantList";
import InterviewerList from "../components/InterviewerList";
import MyButton from "../components/MyButton";
import { Navbar } from "../../common/ui";
import { useNavigate } from "react-router-dom";
import { ApplicantType, PostInfoType } from "../global/types";
import { GET, POST } from "../../common/api/axios";

const WriteEmail = () => {
  const [applicantList, setApplicantList] = useState<ApplicantType[]>([]);
  const [passList, setPassList] = useState<ApplicantType[]>([]);
  const [failList, setFailList] = useState<ApplicantType[]>([]);
  const [receiverList, setReceiverList] = useState<ApplicantType[]>([]);
  const [selectedTab, setSelectedTab] = useState("");
  const [postInfo, setPostInfo] = useState<PostInfoType>();
  const [emailTitle, setEmailTitle] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [receiverIds, setReceiverIds] = useState<number[]>([]);
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      postInfo?.recruitmentStatus === "OPEN" ||
      postInfo?.recruitmentStatus === "INTERVIEW"
    ) {
      setPassList(
        applicantList.filter((applicant) => applicant.formResult === "PASS")
      );
      setFailList(
        applicantList.filter((applicant) => applicant.formResult === "FAIL")
      );
    } else {
      setPassList(
        applicantList.filter(
          (applicant) =>
            applicant.formResult === "PASS" &&
            applicant.meetingResult === "PASS"
        )
      );
      setFailList(
        applicantList.filter(
          (applicant) =>
            applicant.formResult === "FAIL" ||
            applicant.meetingResult === "FAIL"
        )
      );
    }
  }, [applicantList, postInfo]);

  useEffect(() => {
    if (receiverList === applicantList) setSelectedTab("전체");
    else if (receiverList === passList) setSelectedTab("합격자");
    else if (receiverList === failList) setSelectedTab("불합격자");
    else setSelectedTab("");
  }, [receiverList, applicantList, passList, failList]);

  useEffect(() => {
    setReceiverIds(receiverList.map((receiver) => receiver.applicationId));
  }, [receiverList]);

  const getApplicantList = async () => {
    try {
      //const res = await GET(`posts/${postId}/application`);
      const res = await GET(`posts/1/application`);
      //const res = applicantData;

      if (res.isSuccess) {
        setApplicantList(res.result.applicationList);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getApplicantList();
    getPostDetails();
  }, []);

  const handleSendEmail = async () => {
    if (receiverList.length === 0) {
      alert("받는 사람을 선택해주세요.");
      return;
    }
    if (receiverList.length === 0 || !emailTitle || !emailBody) {
      alert("메일 제목과 내용은 필수 항목입니다.");
      return;
    }
    try {
      const res = await POST("application/email", {
        postId: 1,
        applicationIdList: receiverIds,
        title: emailTitle,
        content: emailBody,
      });

      if (res.isSuccess) {
        alert("이메일 전송 성공");
        navigate("/email-send");
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectBtnClick = (selected: string) => {
    setSelectedTab(selected);
    if (selected === "전체") {
      setReceiverList(applicantList);
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

  const removeReceiver = (id: number) => {
    setReceiverList((prevList) =>
      prevList.filter((receiver) => receiver.applicationId !== id)
    );
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (event.clientY < 50) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Wrapper>
      <NavbarWrapper show={showNavbar}>
        {" "}
        <Navbar />
      </NavbarWrapper>
      <EvaluateWrapper show={showNavbar}>
        {postInfo?.recruitmentStatus === "OPEN" ||
        postInfo?.recruitmentStatus === "FORM_REVIEWED" ? (
          <ApplicantList
            data1={applicantList}
            data2={postInfo?.recruitingList || []}
            isEmail={true}
          />
        ) : (
          <InterviewerList
            data1={applicantList}
            data2={postInfo?.recruitingList || []}
            isEmail={true}
          />
        )}
        <Container>
          <Title>
            <h1>{postInfo?.title}</h1>
            <p>
              {parseISODateTime(String(postInfo?.endTime)).year}년{" "}
              {parseISODateTime(String(postInfo?.endTime)).month}월{" "}
              {parseISODateTime(String(postInfo?.endTime)).day}일 마감
            </p>
          </Title>
          <Caption>
            <h1>이메일 보내기</h1>
            <Buttons>
              <MyButton
                content="전송하기"
                buttonType="RED"
                onClick={() => handleSendEmail()}
              />
            </Buttons>
          </Caption>
          <Sender>
            <EmailCaption>보내는 사람</EmailCaption>
            <Input>
              <input disabled={true} value={"innerjoint@gmail.com"}></input>
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
              <input
                value={emailTitle}
                onChange={(e) => setEmailTitle(e.target.value)}
                placeholder="메일 제목을 입력하세요"
              />
            </Input>
          </EmailTitle>
          <Body>
            <textarea
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="메일 내용을 입력하세요"
            />
          </Body>
        </Container>
      </EvaluateWrapper>
    </Wrapper>
  );
};

export default WriteEmail;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  background-color: #fff;
`;

const NavbarWrapper = styled.div<{ show: boolean }>`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({ show }) => (show ? "60px" : "0px")};
  overflow: hidden;
  transition: height 0.3s ease-in-out;
`;

const EvaluateWrapper = styled.div<{ show: boolean }>`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: flex-start;
  gap: 100px;
  height: ${({ show }) => (show ? "calc(100vh - 60px)" : "100vh")};
  transition: height 0.3s ease-in-out;
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
