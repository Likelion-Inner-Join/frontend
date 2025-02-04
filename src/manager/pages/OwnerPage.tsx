import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Navbar } from "../../common/ui";
import MyButton from "../components/MyButton";
import { ClubInfoType } from "../global/types";
import axios from "axios";
import { GET, PUT } from "../../common/api/axios";

const OwnerPage = () => {
  const [clubInfo, setClubInfo] = useState<ClubInfoType>({
    name: "",
    categoryId: 0, // 기본값 제공
    categoryName: "",
    clubId: 0,
    email: "",
    id: "",
    imageUrl: "",
    school: "",
  });
  const [ownerInfoFix, setOwnerInfoFix] = useState(false);
  const [clubInfoFix, setClubInfoFix] = useState(false);
  const [newPassword, setNewPassword] = useState("password");
  const [rePassword, setRePassword] = useState("");
  //   const [newClubName, setNewClubName] = useState("password");
  //   const [newClubEmail, setNewClubEmail] = useState("password");
  //   const [newClubSchool, setNewClubSchool] = useState("password");
  //   const [newClubImage, setNewClubImage] = useState("password");
  const [image, setImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null); // Ref 생성

  const apiMultipart = axios.create({
    baseURL: "https://innerjoin.duckdns.org/",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const handleOwnerInfoFixButton = () => {
    setOwnerInfoFix(true);
    setNewPassword("");
    setRePassword("");
    if (!ownerInfoFix) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleClubInfoFixButton = () => {
    setClubInfoFix(true);
  };

  const getClubID = async () => {
    try {
      const res = await GET(`posts/my-posts`);

      if (res.isSuccess) {
        getClubInfo(1);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getClubInfo = async (clubId: number) => {
    try {
      const res = await GET(`club/${clubId}`);

      if (res.isSuccess) {
        setClubInfo(res.result);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== rePassword) {
      alert("새로 입력한 비밀번호가 일치하지 않습니다");
      setNewPassword("password");
      setOwnerInfoFix(false);
      return;
    }

    try {
      const res = await PUT(`club/${clubInfo?.clubId}`, {
        data: {
          name: clubInfo?.name,
          school: clubInfo?.school,
          email: clubInfo?.email,
          loginId: clubInfo?.id,
          password: newPassword,
          categoryId: clubInfo?.categoryId,
        },
        image: clubInfo?.imageUrl,
      });
      if (res.isSuccess) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClubInfoChange = async () => {
    const formData = new FormData();

    // JSON 데이터를 구성
    const data = {
      name: clubInfo?.name || "",
      school: clubInfo?.school || "",
      email: clubInfo?.email || "",
      loginId: clubInfo?.id || "",
      password: "test",
      categoryId: clubInfo?.categoryId ?? 0,
    };

    formData.append("data", JSON.stringify(data));

    if (image) {
      formData.append("image", image);
    }

    console.log("FormData 내용:");
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    try {
      //   const res = await axios.put(`/club/${clubInfo?.clubId}`, formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   });

      const res = await apiMultipart.put(`/club/${clubInfo?.clubId}`, formData);

      //   const res = await PUT(`club/${clubInfo?.clubId}`, {
      //     data: {
      //       name: clubInfo?.name,
      //       school: clubInfo?.school,
      //       email: clubInfo?.email,
      //       loginId: clubInfo?.id,
      //       password: "test",
      //       categoryId: clubInfo?.categoryId,
      //     },
      //     image: image,
      //   });

      //   console.log({
      //     data: {
      //       name: clubInfo?.name,
      //       school: clubInfo?.school,
      //       email: clubInfo?.email,
      //       loginId: clubInfo?.id,
      //       password: "test",
      //       categoryId: clubInfo?.categoryId,
      //     },
      //     image: image,
      //   });
      if (res.status === 200 || res.status === 201) {
        alert("동아리 정보가 성공적으로 수정되었습니다.");
        setClubInfoFix(false);
      } else {
        console.error(res.data);
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    getClubID();
  }, []);

  return (
    <Wrapper>
      <Navbar />
      <InfoWrapper>
        <InfoContainer>
          <OwnerContainer>
            <TitleBox>
              <p>관리자 정보</p>
              {ownerInfoFix ? (
                <div />
              ) : (
                <MyButton
                  content="수정하기"
                  buttonType="WHITE"
                  onClick={handleOwnerInfoFixButton}
                />
              )}
            </TitleBox>
            <ContentBox>
              <Content>
                <Caption>아이디</Caption>
                <p>{clubInfo?.id}</p>
              </Content>
              <Content>
                <Caption>비밀번호</Caption>
                <PassWord>
                  <input
                    ref={inputRef} // Ref 연결
                    type="password"
                    disabled={!ownerInfoFix}
                    defaultValue={"password"}
                    value={newPassword}
                    placeholder="새 비밀번호를 입력하세요"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {ownerInfoFix ? (
                    <input
                      type="password"
                      disabled={!ownerInfoFix}
                      value={rePassword}
                      placeholder="한 번 더 입력하세요"
                      onChange={(e) => setRePassword(e.target.value)}
                    />
                  ) : (
                    <div />
                  )}
                </PassWord>
                {ownerInfoFix ? (
                  <SaveButton
                    onClick={() => {
                      handlePasswordChange();
                    }}
                  >
                    저장
                  </SaveButton>
                ) : (
                  <div />
                )}
                {ownerInfoFix ? (
                  <CancelButton
                    onClick={() => {
                      setNewPassword("password");
                      setOwnerInfoFix(false);
                    }}
                  >
                    취소
                  </CancelButton>
                ) : (
                  <div />
                )}
              </Content>
            </ContentBox>
          </OwnerContainer>
          <ClubContainer>
            <TitleBox>
              <p>동아리 정보</p>
              {clubInfoFix ? (
                <MyButton
                  content="저장하기"
                  buttonType="WHITE"
                  onClick={handleClubInfoChange}
                />
              ) : (
                <MyButton
                  content="수정하기"
                  buttonType="WHITE"
                  onClick={handleClubInfoFixButton}
                />
              )}
            </TitleBox>
            <ContentBox>
              <Content>
                <Content>
                  <Caption>동아리명</Caption>
                  <StyledInput
                    disabled={!clubInfoFix}
                    value={clubInfo?.name}
                    onChange={(e) =>
                      setClubInfo({
                        ...clubInfo,
                        name: e.target.value,
                      })
                    }
                  />
                </Content>
              </Content>
              <Content>
                <Caption>동아리 이메일</Caption>
                <StyledInput
                  disabled={!clubInfoFix}
                  value={clubInfo?.email || ""}
                  onChange={(e) =>
                    setClubInfo({
                      ...clubInfo,
                      email: e.target.value,
                    })
                  }
                />
              </Content>
              <Content>
                <Caption>학교</Caption>
                <StyledInput
                  disabled={!clubInfoFix}
                  value={clubInfo?.school || ""}
                  onChange={(e) =>
                    setClubInfo({
                      ...clubInfo,
                      school: e.target.value,
                    })
                  }
                />
              </Content>
              <Content>
                <Caption>분과</Caption>
                <p>{clubInfo?.categoryName}</p>
              </Content>
              <Content>
                <Caption>프로필사진</Caption>
                {clubInfoFix && (
                  <input type="file" onChange={handleImageChange} />
                )}
                <img src={clubInfo?.imageUrl} alt="동아리 프로필 사진" />
              </Content>
            </ContentBox>
          </ClubContainer>{" "}
        </InfoContainer>
      </InfoWrapper>
    </Wrapper>
  );
};

export default OwnerPage;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  background-color: #fff;
  overflow-y: auto;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 90px;
  margin-bottom: 90px;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 55%;
  flex-direction: column;
  align-self: center;
  align-items: flex-start;
  gap: 80px;
`;

const OwnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 45px;
  align-self: stretch;
`;

const ClubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 45px;
  align-self: stretch;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  p {
    color: #000;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 28.8px */
    letter-spacing: -0.48px;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 50px;
`;

const Content = styled.div`
  display: flex;
  justify-content: flex-start;

  p {
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -0.32px;
  }

  img {
    width: 90px;
    height: 90px;
    border-radius: 100px;
    background: url(<path-to-image>) lightgray 6.152px 20.876px / 87.444%
      60.207% no-repeat;
  }
}
`;

const StyledInput = styled.input<{ disabled: boolean }>`
  display: flex;
  flex: wrap;
  padding: 5px 5px;
  border-radius: 10px;
  background-color: ${(props) => (props.disabled ? "#fff" : "#fcfbfb")};
  border: ${(props) =>
    props.disabled ? " solid 1px #fff" : " solid 1px #ddd"};
  font-family: Pretendard;
  font-size: 14px;
  color: #000;

  &:focus {
    padding: 5px 5px;
    border: solid 1px #424242;
    background-color: #fcfbfb;
  }
`;

const Caption = styled.div`
  margin-right: 100px;
  color: var(--Achromatic-gray08, #424242);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 19.2px */
  letter-spacing: -0.32px;
`;

const HashTagBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex: wrap;
  gap: 24px;
  align-self: stretch;

  p {
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 19.2px */
    letter-spacing: -0.32px;
  }
`;

const PassWord = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    display: flex;
    flex: wrap;
    padding: 5px 0px;
    border-radius: 10px;
    font-family: Pretendard;
    font-size: 14px;
    background-color: #fff;
    color: #000;

    &:focus {
      padding: 5px 5px;
      border: solid 1px #424242;
      background-color: #fcfbfb;
    }
  }
`;

const SaveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  margin-left: 30px;
  height: 30px;
  border: solid 1px #cc141d;
  border-radius: 30px;
  background-color: #fff;
  cursor: pointer;

  color: #cc141d;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 120%; /* 19.2px */
  letter-spacing: -0.32px;
`;

const CancelButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  margin-left: 10px;
  height: 30px;
  border: solid 1px #424242;
  border-radius: 30px;
  background-color: #fff;
  cursor: pointer;

  color: #424242;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 120%; /* 19.2px */
  letter-spacing: -0.32px;
`;
