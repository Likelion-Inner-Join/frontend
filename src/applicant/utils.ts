export const formatDotDate = (dateString: string): string => {
  return new Date(dateString)
    .toLocaleDateString("ko-KR")
    .replace(/\./g, ".")
    .replace(/.$/, "")
    .replace(/ /g, "");
};

export const calculateDday = (targetDate: string | Date): string => {
  const today = new Date();
  const target = new Date(targetDate);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const difference = Math.ceil(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return difference > 0
    ? `D-${difference}`
    : difference === 0
    ? "D-Day"
    : `D+${Math.abs(difference)}`;
};

export const formatDate = (
  date: string,
  format: string = "yyyy-MM-dd"
): string => {
  const d = new Date(date);
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return format
    .replace("yyyy", d.getFullYear().toString())
    .replace("MM", String(d.getMonth() + 1).padStart(2, "0"))
    .replace("dd", String(d.getDate()).padStart(2, "0"))
    .replace("(요일)", `(${days[d.getDay()]})`);
};

export const formatSlashDate = (dateString: string): string => {
  return new Date(dateString)
    .toLocaleDateString("ko-KR")
    .replace(/\./g, "/")
    .replace(/.$/, "")
    .replace(/ /g, "");
};

export const formatKRDate = (
  date: string,
  format: string = "yyyy년 MM월 dd일"
): string => {
  const d = new Date(date);

  return format
    .replace("yyyy", d.getFullYear().toString())
    .replace("MM", String(d.getMonth() + 1).padStart(2, "0"))
    .replace("dd", String(d.getDate()).padStart(2, "0"));
};
