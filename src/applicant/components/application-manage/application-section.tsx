import { useState } from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

export type TableData = {
  unitName: string;
  applicationPeriod: string;
  position: string;
  evaluation: string;
  details?: {
    firstResult: "pending" | "pass" | "fail" | null;
    secondResult: "pending" | "pass" | "fail" | null;
  };
};

type ApplicationSectionProps = {
  title: string;
  data: TableData[];
  rowCheck?: boolean;
};

export const ApplicationSection = ({
  title,
  data,
  rowCheck = false,
}: ApplicationSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [checkedRows, setCheckedRows] = useState<Record<number, boolean>>({});

  const toggleFavorite = (index: number) => {
    setFavorites((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleCheck = (index: number) => {
    setCheckedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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
              {rowCheck && <th></th>}
              <th>단체명</th>
              <th>모집기간</th>
              <th>전형명</th>
              <th>평가</th>
              <th></th>
            </tr>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <>
                <tr key={index}>
                  {rowCheck && (
                    <td onClick={() => toggleCheck(index)}>
                      <CheckIcon selected={checkedRows[index]}>✓</CheckIcon>
                    </td>
                  )}
                  <td>{row.unitName}</td>
                  <td>{row.applicationPeriod}</td>
                  <td>{row.position}</td>
                  <td>{row.evaluation}</td>
                  <td onClick={() => toggleFavorite(index)}>
                    {favorites[index] ? (
                      <FaHeart size={20} color="#CC141D" />
                    ) : (
                      <FaRegHeart size={20} color="gray" />
                    )}
                  </td>
                </tr>
                {row.details && (
                  <tr key={`${index}-details`}>
                    <td
                      colSpan={rowCheck ? 3 : 2}
                      style={{
                        backgroundColor: "#fcfbfb",
                        position: "relative",
                        opacity: row.details?.firstResult ? "100%" : "30%",
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
                          status={row.details?.firstResult}
                          style={{
                            opacity: row.details?.firstResult ? "100%" : "30%",
                          }}
                        >
                          {row.details?.firstResult === "pending"
                            ? "검토 중"
                            : row.details?.firstResult === "pass"
                            ? "합격"
                            : row.details?.firstResult === "fail"
                            ? "불합격"
                            : "없음"}
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
                    <td colSpan={3} style={{ backgroundColor: "#fcfbfb" }}>
                      <>
                        <span
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            color: "#333",
                            opacity: row.details?.secondResult ? "100%" : "30%",
                          }}
                        >
                          2차 면접평가 결과
                        </span>{" "}
                        <Badge
                          status={row.details?.secondResult}
                          style={{
                            opacity: row.details?.secondResult ? "100%" : "30%",
                          }}
                        >
                          {row.details?.secondResult === "pending"
                            ? "검토 중"
                            : row.details?.secondResult === "pass"
                            ? "합격"
                            : row.details?.secondResult === "fail"
                            ? "불합격"
                            : "없음"}
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

const CheckIcon = styled.div<{ selected?: boolean }>`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ selected }) => (selected ? "#CC141D" : "#DDDDDD")};
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
`;

type BadgeProps = {
  status: "pending" | "pass" | "fail" | null;
};

const Badge = styled.span<BadgeProps>`
  margin-left: 20px;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 20px;
  color: ${(props) =>
    props.status === "pending"
      ? "#333"
      : props.status === "pass"
      ? "#258818"
      : props.status === "fail"
      ? "#b10d15"
      : "#333"};
  background-color: ${(props) =>
    props.status === "pending"
      ? "#f0f0f0"
      : props.status === "pass"
      ? "#edfcf0"
      : props.status === "fail"
      ? "#ffeded"
      : "#f0f0f0"};
`;
