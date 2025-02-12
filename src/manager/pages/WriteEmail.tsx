import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ApplicantList from "../components/ApplicantList";
import InterviewerList from "../components/InterviewerList";
import MyButton from "../components/MyButton";
import { Navbar } from "../../common/ui";
import { useNavigate } from "react-router-dom";
import { ApplicantType, PostInfoType } from "../global/types";
import { GET, POST } from "../../common/api/axios";
import { applicantData } from "../mock/applicantData";
import { breakpoints } from "../../common/ui/breakpoints";

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
  const [isApplicantListOpen, setIsApplicantListOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedApplicants, setSearchedApplicants] = useState<ApplicantType[]>(
    []
  );
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

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchedApplicants([]);
    } else {
      setSearchedApplicants(
        applicantList.filter(
          (applicant) =>
            applicant.name.includes(searchQuery) ||
            applicant.studentNumber.includes(searchQuery)
        )
      );
    }
  }, [searchQuery, applicantList]);

  const getApplicantList = async () => {
    try {
      //const res = await GET(`posts/${postId}/application`);
      //const res = await GET(`posts/1/application`);
      const res = applicantData;

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

  return (
    <Wrapper onClick={() => setSearchQuery("")}>
      <Navbar />
      <EvaluateWrapper>
        {postInfo?.recruitmentStatus === "OPEN" ||
        postInfo?.recruitmentStatus === "FORM_REVIEWED" ? (
          <ApplicantList
            data1={applicantList}
            data2={postInfo?.recruitingList || []}
            isEmail={true}
            isOpen={isApplicantListOpen}
          />
        ) : (
          <InterviewerList
            data1={applicantList}
            data2={postInfo?.recruitingList || []}
            isEmail={true}
            isOpen={isApplicantListOpen}
          />
        )}
        <Container isOpen={isApplicantListOpen}>
          <EmailContainer>
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
                <input disabled={true} value={"innerjoin@gmail.com"}></input>
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
                    전체
                  </SelectButton>
                  <SelectButton
                    selected={selectedTab === "합격자"}
                    onClick={() => selectBtnClick("합격자")}
                  >
                    합격자
                  </SelectButton>
                  <SelectButton
                    selected={selectedTab === "불합격자"}
                    onClick={() => selectBtnClick("불합격자")}
                  >
                    불합격자
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
                  <input
                    type="text"
                    value={searchQuery}
                    placeholder="이름 또는 학번 검색"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </ReceiverBox>
                {searchedApplicants.length > 0 && (
                  <SearchResult>
                    {searchedApplicants.map((applicant) => (
                      <SearchResultItem
                        key={applicant.applicationId}
                        onClick={() => {
                          if (
                            !receiverList.some(
                              (r) => r.applicationId === applicant.applicationId
                            )
                          ) {
                            setReceiverList([...receiverList, applicant]);
                          }
                          setSearchQuery("");
                        }}
                      >
                        {applicant.name} <p>{applicant.studentNumber}</p>
                      </SearchResultItem>
                    ))}
                  </SearchResult>
                )}
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
          </EmailContainer>
        </Container>
      </EvaluateWrapper>
      {isApplicantListOpen === true ? (
        <CloseApplicantListButton
          onClick={() => setIsApplicantListOpen(!isApplicantListOpen)}
        >
          <img
            src="/images/manager/back.svg"
            alt="지원자 리스트"
            width="20px"
          />
        </CloseApplicantListButton>
      ) : (
        <OpenApplicantListButton
          onClick={() => setIsApplicantListOpen(!isApplicantListOpen)}
        >
          <img src="/images/manager/list.svg" alt="뒤로가기" width="20px" />
        </OpenApplicantListButton>
      )}
    </Wrapper>
  );
};

export default WriteEmail;

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  background-color: #fff;
`;

const EvaluateWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  justify-content: flex-start;

  @media (max-width: ${breakpoints.mobile}) {
    padding-bottom: 110px;
  }
`;

const Container = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0px 5%;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: ${breakpoints.mobile}) {
    display: ${({ isOpen }) => {
      if (isOpen) return "none";
      return "flex";
    }};
  }
`;

const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
  position: relative;
  display: inline-block;
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
  padding: 5px 10px;
  gap: 5px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #ddd;

  input {
    flex: 1;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
  }
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
const SearchResult = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 100;

  display: flex;
  flex-direction: column;
  width: 200px;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #fff;
`;

const SearchResultItem = styled.div`
  display: flex;
  algin-items: center;
  padding: 5px 10px;
  gap: 6px;

  color: #767676;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */

  &:hover {
    color: #000;
    cursor: pointer;
    background-color: #f9f9f9;
  }
`;

const Body = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  margin-bottom: 10px;
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

const OpenApplicantListButton = styled.div`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #cc141d;
  color: white;
  border: none;
  padding: 15px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;

  &:hover {
    background: #cc141d;
  }

  @media (max-width: ${breakpoints.mobile}) {
    display: block;
  }
`;

const CloseApplicantListButton = styled.div`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #fcfafa;
  border: none;
  padding: 15px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;

  &:hover {
    background: #fcfafa;
  }

  @media (max-width: ${breakpoints.mobile}) {
    display: block;
  }
`;
