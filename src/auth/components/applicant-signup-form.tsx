import { useNavigate } from "react-router-dom";
import { Form, TFormFieldProps } from "../../common/ui";
import {
  validateEmail,
  validatePassword,
  validateStudentId,
  validateName,
} from "../utils/utils";
import { POST } from "../../common/api/axios";

const fields: TFormFieldProps[] = [
  {
    label: "학번",
    value: "",
    type: "text",
    validate: validateStudentId,
  },
  {
    label: "이메일",
    value: "",
    type: "email",
    validate: validateEmail,
  },
  {
    label: "이름",
    value: "",
    type: "text",
    validate: validateName,
    helpText: "실명을 입력해주세요.",
  },
  {
    label: "비밀번호",
    value: "",
    type: "password",
    validate: validatePassword,
  },
  {
    label: "학교",
    value: "",
    type: "text",
  },
  {
    label: "학과",
    value: "",
    type: "text",
  },
  {
    label: "핸드폰 번호",
    value: "",
    type: "text",
  },
];

export const ApplicantSignupForm = () => {
  const navigate = useNavigate();
  const handleFormSubmit = async (values: Record<string, string | number>) => {
    try {
      const response = await POST("user/signup", {
        studentNumber: values["학번"],
        email: values["이메일"],
        name: values["이름"],
        password: values["비밀번호"],
        school: values["학교"],
        major: values["학과"],
        phoneNum: values["핸드폰 번호"],
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
  };

  return (
    <Form
      title="지원자 회원가입"
      fields={fields}
      onSubmit={handleFormSubmit}
      submitLabel="회원가입"
      additionalLink={{ label: "로그인", href: "/login" }}
    />
  );
};
