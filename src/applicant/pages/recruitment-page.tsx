import { useParams } from "react-router-dom";
import { ApplicantPage } from "../page";
import { ClubContent, RecruitmentPostingList } from "../components";
import { useEffect, useState } from "react";
import { GET } from "../../common/api/axios";
import { Loading } from "../../common/ui";

export type TRecruitmentData = {
  clubName: string;
  title: string;
  content: string;
  categoryName: string;
  image: [{ imageId: string; imageUrl: string }] | null;
  recruitingList: [
    {
      recruitingId: string;
      formId: string;
      jobTitle: string;
    }
  ];
  recruitmentStatus:
    | "OPEN"
    | "FORM_REVIEWED"
    | "TIME_SET"
    | "INTERVIEWED"
    | "CLOSED";
  endTime: string;
  createdAt: string;
  postId: string;
};

export const RecruitmentPage = () => {
  const { postId } = useParams<Record<string, string>>();

  const [content, setContent] = useState<TRecruitmentData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await GET(`posts/${postId}`);
        if (response.isSuccess) {
          setContent(response.result);
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
  }, [postId]);

  if (!content) {
    return <Loading />;
  }

  return (
    <ApplicantPage>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <ClubContent content={content} />
          <RecruitmentPostingList content={content} />
        </div>
      )}
    </ApplicantPage>
  );
};
