import { useEffect, useState } from "react";
import { Form, Loading, TFormFieldProps } from "../../common/ui";
import {
  validateClubCategoty,
  validateClubName,
  validateEmail,
  validateId,
  validatePassword,
  validateSchoolName,
} from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { GET, POST } from "../../common/api/axios";
import { VerificationForm } from "./verification-form";

type TCategoryData = {
  categoryId: string;
  categoryName: string;
};

type TOption = {
  label: string;
  value: string | number;
};

const mapCategoriesToOptions = (categories: TCategoryData[]): TOption[] => {
  return categories.map((category) => ({
    label: category.categoryName,
    value: category.categoryId,
  }));
};

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

  const [category, setCategory] = useState<TCategoryData[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await GET("club/category");
        if (response.isSuccess) {
          setCategory(response.result);
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
  }, []);

  if (loading || !category) {
    return <Loading />;
  }

  const fields: TFormFieldProps[] = [
    {
      label: "동아리명",
      value: formData["동아리명"],
      type: "text",
      validate: validateClubName,
      section: "동아리 정보",
    },
    {
      label: "동아리 분류",
      value: formData["동아리 분류"],
      type: "select",
      validate: validateClubCategoty,
      options: mapCategoriesToOptions(category),
      section: "동아리 정보",
    },
    {
      label: "아이디",
      value: formData["아이디"],
      type: "text",
      validate: validateId,
      section: "관리자 정보",
    },
    {
      label: "비밀번호",
      value: formData["비밀번호"],
      type: "password",
      validate: validatePassword,
      section: "관리자 정보",
    },
    {
      label: "학교",
      value: formData["학교"],
      type: "text",
      validate: validateSchoolName,
      section: "학교 인증 정보",
      helpText: "정확한 학교명을 입력해주세요. (서강대X, 서강대학교O)",
    },
    {
      label: "이메일",
      value: formData["이메일"],
      type: "email",
      validate: validateEmail,
      section: "학교 인증 정보",
      helpText: "학교 이메일로 입력해주세요.",
    },
    {
      label: "인증 코드",
      value: formData["인증 코드"],
      type: "verificationCode",
      section: "학교 인증 정보",
      helpText: "학교 이메일로 입력해주세요.",
    },
  ];

  const handleFormSubmit = async (values: Record<string, string | number>) => {
    if (step < 3) {
      setFormData((prevData) => ({ ...prevData, ...values }));
      setStep(step + 1);
    } else {
      const completeData = { ...formData, ...values };

      try {
        const response = await POST("club/signup", {
          name: completeData["동아리명"],
          loginId: completeData["아이디"],
          password: completeData["비밀번호"],
          email: completeData["이메일"],
          school: completeData["학교"],
          categoryId: completeData["동아리 분류"],
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
          title="관리자 회원가입"
          fields={fields}
          section="동아리 정보"
          onSubmit={handleFormSubmit}
          submitLabel="다음"
          additionalLink={{
            label: "로그인",
            href: "/login",
          }}
        />
      ) : step === 2 ? (
        <VerificationForm
          title="관리자 회원가입"
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
