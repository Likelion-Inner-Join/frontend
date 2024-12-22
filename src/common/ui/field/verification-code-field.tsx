import styled from "styled-components";
import { FieldBase } from "./field-base";

type VerificationCodeFieldProps = {
  label: string;
  value: string | number;
  helpText?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
};

export const VerificationCodeField = ({
  label,
  value,
  helpText,
  onChange,
  error,
}: VerificationCodeFieldProps) => {
  return (
    <FieldBase label={label} helpText={helpText} errorMessage={error}>
      <StyledTextField
        type="text"
        value={value}
        onChange={onChange}
        $isError={!!error}
        placeholder=" "
      />
    </FieldBase>
  );
};

const StyledTextField = styled.input<{
  $isError: boolean;
}>`
  width: calc(100% - 20px);
  padding: 20px 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  font-size: 16px;
  border: 1px solid ${(props) => (props.$isError ? "red" : "#ddd")};
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.color.primary};
  }
`;
