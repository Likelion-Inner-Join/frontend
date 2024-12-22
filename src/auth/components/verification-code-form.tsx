import { styled } from "styled-components";
import { VerificationCodeField } from "../../common/ui";
import { MdEmail } from "react-icons/md";
import { POST } from "../../common/api/axios";
import { useState } from "react";

export const VerificationCodeForm = ({
  school,
  email,
}: {
  school: string;
  email: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleSend = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await POST("email/send", {
        email: email,
        univName: school,
      });
      if (response.isSuccess) {
        setIsCodeSent(true);
        alert("성공적으로 이메일을 발송했어요.");
      } else {
        setError(response.errorMessage || "이메일 발송에 실패했어요.");
      }
    } catch (error) {
      setError("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setCodeError("");
    try {
      const response = await POST("email/request", {
        email: email,
        univName: school,
        code: verificationCode,
      });
      if (response.isSuccess) {
        alert("인증에 성공했어요.");
      } else {
        setCodeError(response.errorMessage || "인증 코드를 다시 입력해주세요.");
      }
    } catch (error) {
      setCodeError("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <VerificationContainer>
      <VerificationButton onClick={handleSend} disabled={loading}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <MdEmail />
            인증코드 받기
          </>
        )}
      </VerificationButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {isCodeSent && (
        <VerificationCodeFieldContainer>
          <VerificationCodeField
            label="인증 코드"
            helpText="이메일로 받은 인증 코드를 입력해주세요."
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <VerifyButton onClick={handleVerify} disabled={loading}>
            {loading ? "검증 중..." : "인증하기"}
          </VerifyButton>
          {codeError && <ErrorMessage>{codeError}</ErrorMessage>}
        </VerificationCodeFieldContainer>
      )}
    </VerificationContainer>
  );
};

const VerificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  gap: 20px;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 12px;
`;

const VerificationButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: ${(props) => props.theme.color.primary};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: ${(props) => props.theme.color.primaryHover};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  svg {
    font-size: 20px;
  }
`;

const VerifyButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: ${(props) => props.theme.color.primary};
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.primaryHover};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const VerificationCodeFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  color: red;
  margin-top: -10px;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 3px solid #ccc;
  border-top: 3px solid ${(props) => props.theme.color.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
