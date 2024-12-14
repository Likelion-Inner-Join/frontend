import { useParams } from "react-router-dom";
import { ApplicantPage } from "../page";
import { ClubContent, RecruitmentPostingList } from "../components";

export const RecruitmentPage = () => {
  const { clubId } = useParams<Record<string, string>>();

  return (
    <ApplicantPage>
      {clubId && (
        <div>
          <ClubContent clubId={clubId} />
          <RecruitmentPostingList clubId={clubId} />
        </div>
      )}
    </ApplicantPage>
  );
};
