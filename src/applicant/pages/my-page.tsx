import { ApplicantPage } from "../page";
import { BasicInfoSection, SchoolInfoSection } from "../components";

export const MyPage = () => {
  return (
    <ApplicantPage>
      <BasicInfoSection />
      <div
        style={{
          height: "1px",
          backgroundColor: "#e0e0e0",
          margin: "20px auto",
          width: "912px",
        }}
      />
      <SchoolInfoSection />
    </ApplicantPage>
  );
};
