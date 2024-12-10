import { useState } from "react";
import { Form, TFormFieldProps } from "../../common/ui";
import {
  validateClubCategoty,
  validateClubName,
  validateEmail,
  validatePassword,
} from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { POST } from "../../common/api/axios";

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
    label: "학교",
    value: "",
    type: "text",
    section: "동아리 정보",
  },
  {
    label: "아이디",
    value: "",
    type: "text",
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
    label: "비밀번호",
    value: "",
    type: "password",
    validate: validatePassword,
    section: "관리자 정보",
  },
];

export const ManagerSignupForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string | number>>({
    동아리명: "",
    "동아리 분류": "",
    학교: "",
    아이디: "",
    이메일: "",
    비밀번호: "",
  });

  const handleFormSubmit = async (values: Record<string, string | number>) => {
    const isStep1 = step === 1;
    if (isStep1) {
      setFormData((prevData) => ({ ...prevData, ...values }));
      setStep(2);
    } else {
      const completeData = { ...formData, ...values };

      try {
        const response = await POST("club/signup", {
          name: completeData["이름"],
          id: completeData["아이디"],
          password: completeData["비밀번호"],
          email: completeData["이메일"],
          school: completeData["학교"],
          category:
            completeData["동아리 분류"] /* FIXME: 동아리 분류 어떻게 할 건지 */,
        });
        if (response.isSuccess) {
          alert("회원가입 성공");
          navigate("/login");
        } else {
          console.log(
            response.errorMessage
          ); /* FIXME: FormError로 표시할지, alert 만들지? */
        }
      } catch (error) {
        console.log(error);
      }

      navigate("/login");
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
