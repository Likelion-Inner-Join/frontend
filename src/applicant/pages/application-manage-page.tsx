import { useState } from "react";
import { Tab } from "../../common/ui";
import { ApplicantPage } from "../page";
import {
  ApplicationCalendar,
  ApplicationSection,
  TableData,
} from "../components";

export const ApplicationManagePage = () => {
  const [activeTab, setActiveTab] = useState<string>("지원 관리");

  const tabs = [
    { label: "지원 관리", value: "지원 관리" },
    { label: "지원 달력", value: "지원 달력" },
  ];

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
            <ApplicationSection title="지원한 단체" data={data1} />
            <ApplicationSection title="좋아요한 단체" data={data2} />
          </>
        ) : (
          <>
            <ApplicationCalendar />
            <ApplicationSection
              title="지원한 단체"
              data={data2}
              rowCheck={true}
            />
            <ApplicationSection
              title="좋아요한 단체"
              data={data2}
              rowCheck={true}
            />
          </>
        )}
      </div>
    </ApplicantPage>
  );
};

const data1: TableData[] = [
  {
    unitName: "멋쟁이사자처럼",
    applicationPeriod: "2024.01.03 - 2024.02.12",
    position: "없음",
    evaluation: "2차 면접",
    details: {
      firstResult: "pending",
      secondResult: "pending",
    },
  },
  {
    unitName: "멋쟁이사자처럼",
    applicationPeriod: "2024.01.03 - 2024.02.12",
    position: "프론트엔드",
    evaluation: "1차 평가",
    details: {
      firstResult: "pass",
      secondResult: "fail",
    },
  },
  {
    unitName: "멋쟁이사자처럼",
    applicationPeriod: "2024.01.03 - 2024.02.12",
    position: "프론트엔드",
    evaluation: "1차 평가",
    details: {
      firstResult: "pass",
      secondResult: null,
    },
  },
];

const data2: TableData[] = [
  {
    unitName: "멋쟁이사자처럼",
    applicationPeriod: "2024.01.03 - 2024.02.12",
    position: "없음",
    evaluation: "2차 면접",
  },
  {
    unitName: "멋쟁이사자처럼",
    applicationPeriod: "2024.01.03 - 2024.02.12",
    position: "프론트엔드",
    evaluation: "1차 평가",
  },
  {
    unitName: "멋쟁이사자처럼",
    applicationPeriod: "2024.01.03 - 2024.02.12",
    position: "프론트엔드",
    evaluation: "1차 평가",
  },
];
