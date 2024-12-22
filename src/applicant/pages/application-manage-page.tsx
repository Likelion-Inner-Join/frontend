import { useEffect, useState } from "react";
import { Tab } from "../../common/ui";
import { ApplicantPage } from "../page";
import { ApplicationCalendar, ApplicationSection } from "../components";
import { GET } from "../../common/api/axios";

export type TApplicationData = {
  positionName: string;
  recruitmentStatus:
    | "OPEN"
    | "FORM_REVIEWED"
    | "TIME_SET"
    | "INTERVIEWED"
    | "CLOSED";
  clubName: string;
  startTime: string;
  endTime: string;
  formResult: "PENDING" | "PASS" | "FAIL";
  meetingResult: "PENDING" | "PASS" | "FAIL";
};

export const ApplicationManagePage = () => {
  const [activeTab, setActiveTab] = useState<string>("지원 관리");
  const [applications, setApplications] = useState<TApplicationData[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { label: "지원 관리", value: "지원 관리" },
    { label: "지원 달력", value: "지원 달력" },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await GET("application/list");
        if (response.isSuccess) {
          setApplications(response.result);
        } else {
          throw new Error(response.message || "Failed to fetch posts");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <ApplicantPage>
      <div
        style={{
          margin: "0 auto",
          padding: "120px 0px",
          gap: "60px",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          maxWidth: "1200px",
          minWidth: "800px",
          width: "100%",
        }}
      >
        <Tab
          tabs={tabs}
          activeTab={activeTab}
          onTabClick={(selectedTab) => {
            setActiveTab(selectedTab);
          }}
        />

        {activeTab === "지원 관리" ? (
          <>
            {loading ? (
              <p>로딩 중...</p>
            ) : (
              <ApplicationSection
                title="지원한 단체"
                applications={applications}
                showDetails={true}
              />
            )}
          </>
        ) : (
          <>
            {loading ? (
              <p>로딩 중...</p>
            ) : (
              <>
                <ApplicationCalendar applications={applications} />
                <ApplicationSection
                  title="지원한 단체"
                  applications={applications}
                />
              </>
            )}
          </>
        )}
      </div>
    </ApplicantPage>
  );
};
