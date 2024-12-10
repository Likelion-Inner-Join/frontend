import { useNavigate } from "react-router-dom";
import { Form, TFormFieldProps } from "../../common/ui";
import { validateEmail, validatePassword } from "../utils/utils";
import { POST } from "../../common/api/axios";
import { useAuth } from "../context/auth-context";

const fields: TFormFieldProps[] = [
  {
    label: "이메일",
    value: "",
    type: "text",
    validate: validateEmail,
  },
  {
    label: "비밀번호",
    value: "",
    type: "password",
    validate: validatePassword,
  },
];

export const ApplicantLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleFormSubmit = async (values: Record<string, string | number>) => {
    try {
      const response = await POST("user/login", {
        email: values["이메일"],
        password: values["비밀번호"],
      });
      if (response.isSuccess) {
        alert("로그인 성공");

        login("user", { name: "" });

        navigate("/");
      } else {
        console.log(response.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      title="지원자 로그인"
      fields={fields}
      onSubmit={handleFormSubmit}
      submitLabel="로그인"
      additionalLink={{ label: "회원가입", href: "/signup" }}
    />
  );
};
