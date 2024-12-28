import { ApplicantPage } from "../page";
import { BasicInfoSection, SchoolInfoSection } from "../components";
import { useEffect, useState } from "react";
import { GET } from "../../common/api/axios";
import { Loading } from "../../common/ui";

export type TApplicationInfoData = {
  name: string;
  email: string;
  school: string;
  major: string;
  studentNumber: string;
};

export const MyPage = () => {
  const [data, setData] = useState<TApplicationInfoData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await GET("user");
        if (response.isSuccess) {
          setData(response.result);
        } else {
          throw new Error(response.message || "Failed to fetch posts");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <ApplicantPage>
      {loading && <Loading />}
      <BasicInfoSection name={data.name} email={data.email} />
      <div
        style={{
          height: "1px",
          backgroundColor: "#e0e0e0",
          margin: "20px auto",
          width: "912px",
        }}
      />
      <SchoolInfoSection
        school={data.school}
        major={data.major}
        studentNumber={data.studentNumber}
      />
    </ApplicantPage>
  );
};
