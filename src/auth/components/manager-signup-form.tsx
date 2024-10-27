import { useState } from "react";
import { Form, TFormFieldProps } from "../../common/ui";
import {
  validateClubCategoty,
  validateClubName,
  validateEmail,
  validateName,
  validatePassword,
  validateStudentId,
} from "../utils/utils";

const clubCategories = [
  { label: "봉사분과", value: 1 },
  { label: "사회교양분과", value: 2 },
  { label: "연행예술분과", value: 3 },
  { label: "종교분과", value: 4 },
  { label: "체육분과", value: 5 },
  { label: "학술분과", value: 6 },
];

const fields: TFormFieldProps[] = [
  {
    label: "동아리명",
    value: "",
    type: "text",
    validate: validateClubName,
    section: "동아리 정보",
  },
  {
    label: "동아리 분류",
    value: "",
    type: "select",
    validate: validateClubCategoty,
    options: clubCategories,
    section: "동아리 정보",
  },
  {
    label: "학번",
    value: "",
    type: "text",
    validate: validateStudentId,
    section: "관리자 정보",
  },
  {
    label: "이메일",
    value: "",
    type: "email",
    validate: validateEmail,
    section: "관리자 정보",
  },
  {
    label: "이름",
    value: "",
    type: "text",
    validate: validateName,
    section: "관리자 정보",
  },
  {
    label: "비밀번호",
    value: "",
    type: "password",
    validate: validatePassword,
    section: "관리자 정보",
  },
];

export const ManagerSignupForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string | number>>({
    동아리명: "",
    "동아리 분류": "",
    학번: "",
    이메일: "",
    이름: "",
    비밀번호: "",
  });

  const handleFormSubmit = (values: Record<string, string | number>) => {
    const isStep1 = step === 1;
    if (isStep1) {
      setFormData((prevData) => ({ ...prevData, ...values }));
      setStep(2);
    } else {
      const completeData = { ...formData, ...values };
      console.log(completeData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div>
      {step === 1 ? (
        <Form
          title="관리자 회원가입"
          fields={fields}
          section="동아리 정보"
          onSubmit={handleFormSubmit}
          submitLabel="계속"
          additionalLink={{
            label: "로그인",
            href: "/login",
          }}
        />
      ) : (
        <Form
          title="관리자 회원가입"
          fields={fields}
          section="관리자 정보"
          onSubmit={handleFormSubmit}
          submitLabel="회원가입"
          additionalLink={{
            label: "돌아가기",
            onClick: handleBack,
          }}
        />
      )}
    </div>
  );
};