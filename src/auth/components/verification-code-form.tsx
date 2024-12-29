import { styled } from "styled-components";
import { VerificationCodeField } from "../../common/ui";
import { MdEmail, MdMarkEmailRead } from "react-icons/md";
import { POST } from "../../common/api/axios";
import { useState } from "react";

type VerificationCodeFormProps = {
  email: string;
  school: string;
  onVerifySuccess: (isVerified: boolean) => void;
};

export const VerificationCodeForm = ({
  email,
  school,
  onVerifySuccess,
}: VerificationCodeFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

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
        setIsVerified(true);
        onVerifySuccess(true);
      } else {
        setCodeError(response.errorMessage || "인증 코드를 다시 입력해주세요.");
        setIsVerified(false);
        onVerifySuccess(false);
      }
    } catch (error) {
      setCodeError("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setIsVerified(false);
      onVerifySuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VerificationContainer>
      {!isCodeSent ? (
        <VerificationRow>
          <VerificationButton
            onClick={handleSend}
            disabled={loading || !email || !school}
          >
            <>
              <MdEmail />
              {loading ? <LoadingSpinner /> : "인증코드 받기"}
            </>
          </VerificationButton>
          {error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            <div style={{ color: "#6c757d", fontSize: "12px" }}>
              해당 학교 이메일로
              <br />
              인증 코드가 발송됩니다.
            </div>
          )}
        </VerificationRow>
      ) : (
        <>
          <VerificationRow>
            <VerificationCodeField
              label="인증 코드"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <VerificationButton onClick={handleVerify} disabled={loading}>
              <MdMarkEmailRead />
              {loading ? <LoadingSpinner /> : "인증하기"}
            </VerificationButton>
          </VerificationRow>
          {codeError && <ErrorMessage>{codeError}</ErrorMessage>}
        </>
      )}
    </VerificationContainer>
  );
};

const VerificationContainer = styled.div`
  margin: 30px 0px 10px 0px;
  padding: 5px;
`;

const VerificationRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
`;

const VerificationButton = styled.button`
  padding: 12px 15px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: ${(props) => props.theme.color.primary};
  border: none;
  border-radius: 20px;
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
    font-size: 16px;
  }
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  color: red;
  margin-top: 5px;
  text-align: left;
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
