import { useState } from "react";
import styled from "styled-components";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { TApplicationData } from "../../pages/application-manage-page";
import {
  FORM_RESULT,
  MEETING_RESULT,
  RECRUITMENT_STATUS,
} from "../../constants";
import { formatDotDate } from "../../utils";

type ApplicationSectionProps = {
  title: string;
  applications: TApplicationData[];
  showDetails?: boolean;
};

export const ApplicationSection = ({
  title,
  applications,
  showDetails = false,
}: ApplicationSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SectionWrapper>
      <SectionHeader onClick={() => setIsOpen(!isOpen)}>
        <Title>{title}</Title>
        <ToggleButton>
          {isOpen ? <MdExpandLess size={32} /> : <MdExpandMore size={32} />}
        </ToggleButton>
      </SectionHeader>
      {isOpen && (
        <Table>
          <TableHead>
            <tr>
              <th>단체명</th>
              <th>모집기간</th>
              <th>전형명</th>
              <th>평가</th>
            </tr>
          </TableHead>
          <TableBody>
            {applications.map((row, index) => (
              <>
                <tr key={index}>
                  <td>{row.clubName}</td>
                  <td>
                    {formatDotDate(row.startTime)} -{" "}
                    {formatDotDate(row.endTime)}
                  </td>
                  <td>{row.positionName}</td>
                  <td>{RECRUITMENT_STATUS[row.recruitmentStatus]}</td>
                </tr>
                {showDetails && (
                  <tr key={`${index}-details`}>
                    <td
                      colSpan={2}
                      style={{
                        backgroundColor: "#fcfbfb",
                        position: "relative",
                        opacity: row.formResult ? "100%" : "30%",
                      }}
                    >
                      <>
                        <span
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            color: "#333",
                          }}
                        >
                          1차 서류평가 결과
                        </span>{" "}
                        <Badge
                          status={row.formResult}
                          style={{
                            opacity: row.formResult ? "100%" : "30%",
                          }}
                        >
                          {FORM_RESULT[row.formResult] || "없음"}
                        </Badge>
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "0",
                            transform: "translateY(-50%)",
                            height: "32px",
                            width: "1px",
                            backgroundColor: "#ddd",
                          }}
                        ></div>
                      </>
                    </td>
                    <td colSpan={2} style={{ backgroundColor: "#fcfbfb" }}>
                      <>
                        <span
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            color: "#333",
                            opacity: row.meetingResult ? "100%" : "30%",
                          }}
                        >
                          2차 면접평가 결과
                        </span>{" "}
                        <Badge
                          status={row.meetingResult}
                          style={{
                            opacity: row.meetingResult ? "100%" : "30%",
                          }}
                        >
                          {MEETING_RESULT[row.meetingResult] || "없음"}
                        </Badge>
                      </>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      )}
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #000;
`;

const ToggleButton = styled.div`
  display: flex;
  align-items: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  th {
    padding: 8px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #000;
  }
`;

const TableBody = styled.tbody`
  td {
    width: 25%;
    height: 32px;
    padding: 24px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: #222;

    &:last-child {
      cursor: pointer;
    }
  }
`;

type BadgeProps = {
  status: "PENDING" | "PASS" | "FAIL" | null;
};

const Badge = styled.span<BadgeProps>`
  margin-left: 20px;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 20px;
  color: ${(props) =>
    props.status === "PENDING"
      ? "#333"
      : props.status === "PASS"
      ? "#258818"
      : props.status === "FAIL"
      ? "#b10d15"
      : "#333"};
  background-color: ${(props) =>
    props.status === "PENDING"
      ? "#f0f0f0"
      : props.status === "PASS"
      ? "#edfcf0"
      : props.status === "FAIL"
      ? "#ffeded"
      : "#f0f0f0"};
`;
