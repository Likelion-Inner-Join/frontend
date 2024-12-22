export const validateClubName = (value: string | number) => {
  const stringValue = String(value);
  if (!stringValue) return "동아리명을 입력해주세요.";
  return null;
};

export const validateId = (value: string | number) => {
  const stringValue = String(value);
  if (!stringValue) return "아이디를 입력해주세요.";
  return null;
};

export const validateMajor = (value: string | number) => {
  const stringValue = String(value);
  if (!stringValue) return "학과를 입력해주세요.";
  return null;
};

export const validateClubCategoty = (value: string | number) => {
  const stringValue = String(value);
  if (!stringValue) return "동아리 분류를 입력해주세요.";
  return null;
};

export const validateSchoolName = (value: string | number) => {
  const stringValue = String(value).trim();
  const schoolNameRegex = /대학교$/;
  if (!stringValue) return "학교명을 입력해주세요.";
  if (!schoolNameRegex.test(stringValue))
    return "정확한 학교명을 입력해주세요. (서강대X, 서강대학교O)";
  return null;
};

export const validateEmail = (value: string | number) => {
  const stringValue = String(value);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!stringValue) return "이메일을 입력해주세요.";
  if (!emailRegex.test(stringValue))
    return "유효한 이메일 주소를 입력해주세요.";
  return null;
};

export const validatePassword = (value: string | number) => {
  const stringValue = String(value);
  if (!stringValue) return "비밀번호를 입력해주세요.";
  if (stringValue.length < 8) return "비밀번호는 최소 8자 이상이어야 합니다.";
  return null;
};

export const validateStudentId = (value: string | number) => {
  const stringValue = String(value);
  if (!stringValue) return "학번를 입력해주세요.";
  if (stringValue && !/^\d+$/.test(stringValue)) {
    return "유효한 학번을 입력해주세요.";
  }
  if (stringValue.length !== 8) return "8자리 학번을 입력해주세요.";
  return null;
};

export const validateName = (value: string | number) => {
  const stringValue = String(value);
  if (!stringValue) return "이름을 입력해주세요.";
  if (!stringValue || stringValue.trim().length < 2) {
    return "이름은 최소 2글자 이상이어야 합니다.";
  }
  return null;
};

export const validatePhoneNumber = (value: string | number) => {
  const stringValue = String(value).trim();
  const phoneRegex = /^(010|011|016|017|018|019)-?\d{3,4}-?\d{4}$/;

  if (!stringValue) return "핸드폰 번호를 입력해주세요.";
  if (!phoneRegex.test(stringValue))
    return "유효한 핸드폰 번호를 입력해주세요.";

  return null;
};
