import { useNavigate } from "react-router-dom";
import { Form, TFormFieldProps } from "../../common/ui";
import {
  validateEmail,
  validatePassword,
  validateStudentId,
  validateName,
  validateSchoolName,
  validateMajor,
} from "../utils/utils";
import { POST } from "../../common/api/axios";
import { useState } from "react";
import { VerificationForm } from "./verification-form";

export const ApplicantSignupForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string | number>>({
    이름: "",
    비밀번호: "",
    학교: "",
    이메일: "",
    학과: "",
    학번: "",
  });

  const fields: TFormFieldProps[] = [
    {
      label: "이름",
      value: formData["이름"],
      type: "text",
      validate: validateName,
      section: "개인 정보",
    },
    {
      label: "비밀번호",
      value: formData["비밀번호"],
      type: "password",
      validate: validatePassword,
      section: "개인 정보",
    },
    {
      label: "학교",
      value: formData["학교"],
      type: "text",
      validate: validateSchoolName,
      helpText: "정확한 학교명을 입력해주세요. (서강대X, 서강대학교O)",
      section: "학교 인증 정보",
    },
    {
      label: "이메일",
      value: formData["이메일"],
      type: "email",
      validate: validateEmail,
      section: "학교 인증 정보",
    },
    {
      label: "인증 코드",
      value: formData["인증 코드"],
      type: "verificationCode",
      section: "학교 인증 정보",
      helpText: "학교 이메일로 입력해주세요.",
    },
    {
      label: "학과",
      value: formData["학과"],
      type: "text",
      validate: validateMajor,
      section: "학교 정보",
    },
    {
      label: "학번",
      value: formData["학번"],
      type: "text",
      validate: validateStudentId,
      section: "학교 정보",
    },
  ];

  const handleFormSubmit = async (values: Record<string, string | number>) => {
    if (step < 3) {
      setFormData((prevData) => ({ ...prevData, ...values }));
      setStep(step + 1);
    } else {
      const completeData = { ...formData, ...values };

      try {
        const response = await POST("user/signup", {
          studentNumber: completeData["학번"],
          email: completeData["이메일"],
          name: completeData["이름"],
          password: completeData["비밀번호"],
          school: completeData["학교"],
          major: completeData["학과"],
        });
        if (response.isSuccess) {
          alert("회원가입 성공");
          navigate("/login");
        } else {
          console.log(response.errorMessage);
        }
      } catch (error) {
        console.log(error);
      }
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
          title="지원자 회원가입"
          fields={fields}
          section="개인 정보"
          onSubmit={handleFormSubmit}
          submitLabel="다음"
          additionalLink={{
            label: "로그인",
            href: "/login",
          }}
        />
      ) : step === 2 ? (
        <VerificationForm
          title="지원자 회원가입"
          fields={fields.filter((field) => field.section === "학교 인증 정보")}
          section="학교 인증 정보"
          onSubmit={handleFormSubmit}
          submitLabel="다음"
          additionalLink={{
            label: "돌아가기",
            onClick: handleBack,
          }}
        />
      ) : (
        <Form
          title="지원자 회원가입"
          fields={fields}
          section="학교 정보"
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
