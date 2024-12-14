import { useNavigate } from "react-router-dom";
import { POST } from "../../common/api/axios";
import { Form, TFormFieldProps } from "../../common/ui";
import { validatePassword } from "../utils/utils";
import { useAuth } from "../context/auth-context";

const fields: TFormFieldProps[] = [
  {
    label: "아이디",
    value: "",
    type: "text",
  },
  {
    label: "비밀번호",
    value: "",
    type: "password",
    validate: validatePassword,
  },
];

export const ManagerLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleFormSubmit = async (values: Record<string, string | number>) => {
    try {
      const response = await POST("club/login", {
        id: values["아이디"],
        password: values["비밀번호"],
      });
      if (response.isSuccess) {
        alert("로그인 성공");

        login("club", { name: "" });

        navigate("/post-manage");
      } else {
        console.log(response.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      title="관리자 로그인"
      fields={fields}
      onSubmit={handleFormSubmit}
      submitLabel="로그인"
      additionalLink={{ label: "회원가입", href: "/signup" }}
    />
  );
};
