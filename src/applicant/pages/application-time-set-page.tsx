import _ from "lodash";
import { useEffect, useState } from "react";
import { TimeHeader, TimeSetCard, TimeInput } from "../components/time-set";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { GET } from "../../common/api/axios";
import { Loading } from "../../common/ui";

type TApplicant = {
  applicantId: number;
  name: string;
  studentNumber: string;
};

export type TMeetingTime = {
  meetingTimeId: number;
  allowedNum: number;
  reservedNum: number;
  applicantList: TApplicant[];
  meetingStartTime: string;
  meetingEndTime: string;
};

type TMeetingTimes = {
  recruitingId: string;
  jobTitle: string;
  reservationStartTime: string;
  reservationEndTime: string;
  meetingTimes: TMeetingTime[];
};

export const ApplicationTimeSetPage = () => {
  const { recruitingId } = useParams<Record<string, string>>();
  const [data, setData] = useState<TMeetingTimes>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await GET(`posts/interview-times/${recruitingId}`);
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
  }, [recruitingId]);

  if (!data) {
    return <Loading />;
  }

  const groupedByDate = _.groupBy(
    data.meetingTimes,
    (meeting: { meetingStartTime: string | number | Date }) =>
      new Date(meeting.meetingStartTime).toISOString().split("T")[0]
  );

  return (
    <Container>
      <TimeHeader
        clubName="멋쟁이사자처럼" // FIXME:
        jobTitle={data.jobTitle}
        reservationStartDate={data.reservationStartTime}
        reservationEndDate={data.reservationEndTime}
      />
      <TimeSetCard groupedByDate={groupedByDate} jobTitle={data.jobTitle} />
      <TimeInput groupedByDate={groupedByDate} />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 60px;
  margin-left: 20px;
  padding: 20px;
`;
