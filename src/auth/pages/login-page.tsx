import { useState } from "react";
import { styled } from "styled-components";
import { ApplicantLoginForm, ManagerLoginForm } from "../components";
import { Tab } from "../../common/ui";
import { useAuth } from "../context/auth-context";

export const LoginPage = () => {
  const { authState } = useAuth();

  console.log(authState);

  const [activeTab, setActiveTab] = useState<string>("manager");

  const tabs = [
    { label: "관리자", value: "manager" },
    { label: "지원자", value: "applicant" },
  ];

  return (
    <Container>
      <div className="tab-container">
        <Tab tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      </div>
      <div className="form-container">
        {activeTab === "manager" && <ManagerLoginForm />}
        {activeTab === "applicant" && <ApplicantLoginForm />}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
  overflow-y: auto;
  padding-top: 5%;

  .tab-container {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 10;
    width: 100%;
    padding: 10px 0;
  }

  .form-container {
    flex-grow: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`;
