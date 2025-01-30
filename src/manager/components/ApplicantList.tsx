import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import DocView from "./DocView";
import { GET } from "../../common/api/axios";
import { ApplicantType, PostInfoType } from "../global/types";
import { applicantData } from "../mock/applicantData";

interface PositionType {
  recruitingId: number;
  formId: number;
  jobTitle: string;
}

interface ApplicantListProps {
  data1: ApplicantType[];
  data2: PositionType[];
  isEmail: boolean;
}

const stateList = ["전체", "합격", "불합격", "미평가"];

const ApplicantList = ({ data1, data2, isEmail }: ApplicantListProps) => {
  const [applicantList, setApplicantList] = useState<ApplicantType[]>([]);
  const [selectedState, setSelectedState] = useState("전체");
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantType>();
  const [postInfo, setPostInfo] = useState<PostInfoType>();
  const [redirectPage, setRedirectPage] = useState("");
  const [searchParams] = useSearchParams();
  const currApplyID = searchParams.get("apply");
  const navigate = useNavigate();

  const filteredApplicants = applicantList.filter((applicant) => {
    const matchState =
      selectedState === "전체" ||
      (selectedState === "합격" && applicant.formResult === "PASS") ||
      (selectedState === "불합격" && applicant.formResult === "FAIL") ||
      (selectedState === "미평가" && applicant.formResult === "PENDING");

    const matchPosition =
      selectedPositions.length === 0 ||
      selectedPositions.includes(applicant.positionName);

    return matchState && matchPosition;
  });

  const handlePositionChange = (positionName: string) => {
    if (positionName === "전체") {
      setSelectedPositions([]);
    } else {
      setSelectedPositions((prev) =>
        prev.includes(positionName)
          ? prev.filter((name) => name !== positionName)
          : [...prev, positionName]
      );
    }
  };

  const openDocument = (applicant: ApplicantType) => {
    setSelectedApplicant(applicant);
    setIsDocumentOpen(true);
    navigate(`?apply=${applicant.applicationId}`);
  };

  useEffect(() => {
    getApplicantList();

    if (currApplyID) {
      const selectedApplicant = applicantList.find(
        (applicant) => String(applicant.applicationId) === currApplyID
      );
      setSelectedApplicant(selectedApplicant);
      setIsDocumentOpen(true);
    } else setIsDocumentOpen(false);
  }, [currApplyID]);

  const getIconByState = (state: string) => {
    switch (state) {
      case "PASS":
        return "/images/manager/pass.svg";
      case "FAIL":
        return "/images/manager/fail.svg";
      default:
        return "/images/manager/neutral.svg";
    }
  };

  const getApplicantList = async () => {
    try {
      //const res = await GET(`posts/${postId}/application`);
      //const res = await GET(`posts/1/application`);
      const res = applicantData;

      if (res.isSuccess) {
        const sortedApplicants = sortApplicantsByName(
          res.result.applicationList
        );
        setApplicantList(sortedApplicants);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPostDetails = async () => {
    try {
      const res = await GET(`posts/1`);

      if (res.isSuccess) {
        setPostInfo(res.result);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sortApplicantsByName = (
    applicantList: ApplicantType[],
    ascending: boolean = true
  ): ApplicantType[] => {
    return applicantList.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return ascending ? -1 : 1;
      if (nameA > nameB) return ascending ? 1 : -1;
      return 0;
    });
  };

  useEffect(() => {
    if (postInfo?.recruitmentStatus === "OPEN") setRedirectPage("/doc-eval");
    else if (postInfo?.recruitmentStatus === "FORM_REVIEWED")
      setRedirectPage("/result");
    else if (postInfo?.recruitmentStatus === "TIME_SET")
      setRedirectPage("/meet-eval");
    else if (postInfo?.recruitmentStatus === "INTERVIEWED")
      setRedirectPage("/final-result");
    else if (postInfo?.recruitmentStatus === "CLOSED")
      setRedirectPage("/post-manage");
  }, [postInfo]);

  useEffect(() => {
    getApplicantList();
  }, [isDocumentOpen]);

  useEffect(() => {
    getApplicantList();
    getPostDetails();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Title>
          <h1>지원자 리스트</h1>
          {isEmail ? (
            <EmailButton onClick={() => navigate(redirectPage)}>
              <p>돌아가기</p>
            </EmailButton>
          ) : (
            <EmailButton onClick={() => navigate("/email-write")}>
              <p>이메일 보내기</p>
            </EmailButton>
          )}
        </Title>
        <Filter>
          <State>
            <h2>상태</h2>
            <StateContainer>
              {stateList.map((state, index) => (
                <StateItem
                  key={state}
                  onClick={() => setSelectedState(state)}
                  state={state}
                  selected={selectedState}
                >
                  <p>{state}</p>
                  {index < stateList.length - 1 && <Seperator />}
                </StateItem>
              ))}
            </StateContainer>
          </State>
          <Position>
            <h2>전형</h2>
            <PositionContainer>
              <PositionItem
                key="전체"
                selected={selectedPositions.length === 0}
              >
                <input
                  type="checkbox"
                  checked={selectedPositions.length === 0}
                  onChange={() => handlePositionChange("전체")}
                />
                <p>전체</p>
                {data2.length > 1 && <Seperator />}
              </PositionItem>
              {data2.map((pos, index) => (
                <PositionItem
                  key={pos.formId}
                  selected={selectedPositions.includes(pos.jobTitle)}
                >
                  <input
                    type="checkbox"
                    checked={selectedPositions.includes(pos.jobTitle)}
                    onChange={() => handlePositionChange(pos.jobTitle)}
                  />
                  <p>{pos.jobTitle}</p>
                  {index < data2.length - 1 && <Seperator />}
                </PositionItem>
              ))}
            </PositionContainer>
          </Position>
        </Filter>
        <Applicant>
          {filteredApplicants.map((applicant: ApplicantType) => (
            <ApplicantItem
              key={applicant.applicationId}
              onClick={() => openDocument(applicant)}
            >
              <div>
                <OrderItem></OrderItem>
                <img
                  src={getIconByState(applicant.formResult)}
                  alt={`${applicant.formResult} 아이콘`}
                />
                <ApplicantName>{applicant.name}</ApplicantName>
                <ApplicantInfo>{applicant.studentNumber}</ApplicantInfo>
              </div>
              <div>
                <ApplicantPosition>{applicant.positionName}</ApplicantPosition>
                {isEmail ? (
                  <DocButton>
                    <img
                      src="/images/manager/directionBt.svg"
                      alt="서류 보기 버튼"
                    />
                  </DocButton>
                ) : (
                  <DocButton>
                    <img
                      src="/images/manager/directionBt.svg"
                      alt="서류 보기 버튼"
                    />
                  </DocButton>
                )}
              </div>
            </ApplicantItem>
          ))}
        </Applicant>
      </Container>
      {isDocumentOpen && <DocView applicant={selectedApplicant} type="FORM" />}
    </Wrapper>
  );
};

export default ApplicantList;

const Wrapper = styled.div`
  display: flex;
  width: 400px;
  height: 100%;
  padding: 0px 8px 5px 0px;
  gap: 20px;
  flex-shrink: 0;
  background-color: #fcfafa;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fcfafa;
  margin-left: 30px;
`;

const Title = styled.div`
  display: flex;
  height: 108px;
  padding: 40px 58px 16px 18px;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
  flex-shrink: 0;
  margin-bottom: 8px;

  h1 {
    margin-bottom: 6px;
    color: #000000;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    letter-spacing: -0.56px;
  }
`;

const EmailButton = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 6px 8px;
  border-radius: 20px;
  border-radius: 24px;
  border: 1px solid #cc141d;
  cursor: pointer;

  &:hover {
    background-color: #fff;
  }

  p {
    color: #cc141d;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
  }
`;

const Filter = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px 18px;
  padding-right: 40px;
  margin-bottom: 28px;
  flex-shrink: 0;
  gap: 9px;
`;

const Seperator = styled.div`
  width: 1px;
  height: 16px;
  background-color: #ddd;
  margin: 0px 12px;
`;

const State = styled.div`
  display: flex;
  align-items: center;
  color: #000000;
  font-family: Pretendard;

  h2 {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.28px;
  }
`;

const StateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 32px;
`;

const StateItem = styled.div<{ state: string; selected: string }>`
  display: flex;
  color: #767676;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.24px;
  margin-bottom: 3px;

  p {
    color: ${({ state, selected }) => {
      if (state === selected) return "#cc141d";
      return "#767676";
    }};
    cursor: pointer;
  }
`;

const Position = styled.div`
  display: flex;
  align-items: center;
  color: #000000;
  font-family: Pretendard;

  h2 {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.28px;
  }
`;

const PositionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 32px;
`;

const PositionItem = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 3px;

  input {
    margin-right: 3px;
    width: 15px;
    height: 15px;
    accent-color: #cc141d;
  }

  p {
    color: ${({ selected }) => {
      if (selected) return "#cc141d;";
      return "#767676";
    }};
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.24px;
  }
`;

const Applicant = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const OrderItem = styled.div`
  width: 11px;
`;

const ApplicantItem = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 12px;
  border-bottom: 1px solid #eaeaea;
  color: #000000;
  font-family: Pretendard;
  cursor: pointer;

  div {
    display: flex;
    align-items: center;
  }
`;

const ApplicantName = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.32px;
  margin: 0px 16px;
  }
`;

const ApplicantInfo = styled.div`
  color: #555;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.28px;
`;

const ApplicantPosition = styled.div`
  color: #555;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.28px;
  transition: transform 0.3s ease; 
  
  ${ApplicantItem}:hover & {
    transform: translateX(5px); 
`;

const DocButton = styled.div`
  margin-left: 5px;
  transition: transform 0.3s ease;

  ${ApplicantItem}:hover & {
    transform: translateX(5px);
  }
`;
