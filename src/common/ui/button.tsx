import styled from "styled-components";

type TButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large" | "full";
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit";
};

export const Button = ({
  label,
  onClick,
  disabled = false,
  size = "medium",
  variant = "primary",
  type = "button",
}: TButtonProps) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      size={size}
      $variant={variant}
      type={type}
    >
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ size: string; $variant: string }>`
  padding: ${({ size }) =>
    size === "small"
      ? "12px 16px"
      : size === "large"
      ? "12px 24px"
      : size === "full"
      ? "16px 24px"
      : "10px 12px"};
  background-color: ${({ $variant: variant, theme }) =>
    variant === "primary"
      ? theme.color.primary
      : variant === "secondary"
      ? theme.color.secondary
      : "red"};
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: ${({ size }) =>
    size === "small"
      ? "12px"
      : size === "large"
      ? "18px"
      : size === "full"
      ? "18px"
      : "16px"};
  font-weight: bold;
  transition: background-color 0.3s ease;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  width: ${({ size }) => (size === "full" ? "100%" : "auto")};

  &:hover {
    background-color: ${({ $variant: variant, theme }) =>
      variant === "primary"
        ? theme.color.primaryHover
        : variant === "secondary"
        ? theme.color.secondaryHover
        : "darkred"};
  }
`;
