import styled from "styled-components";

type TButtonProps = {
  label: string;
  onClick?: () => void;
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
      ? "12px 32px"
      : size === "full"
      ? "16px 24px"
      : "10px 12px"};
  background-color: ${({ $variant, theme, disabled }) => {
    if (disabled) {
      return "#c0c0c0";
    }
    switch ($variant) {
      case "primary":
        return theme.color.primary;
      case "secondary":
        return theme.color.secondary;
      default:
        return "red";
    }
  }};
  color: #fff;
  border: none;
  border-radius: ${({ size }) => (size === "large" ? "30px" : "8px")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: ${({ size }) =>
    size === "small"
      ? "12px"
      : size === "large"
      ? "16px"
      : size === "full"
      ? "18px"
      : "16px"};
  font-weight: 600;
  transition: background-color 0.3s ease;
  width: ${({ size }) => (size === "full" ? "100%" : "auto")};
  line-height: 24px;

  &:hover {
    background-color: ${({ $variant, theme, disabled }) => {
      if (disabled) {
        return "#c0c0c0";
      }
      switch ($variant) {
        case "primary":
          return theme.color.primaryHover;
        case "secondary":
          return theme.color.secondaryHover;
        default:
          return "darked";
      }
    }};
  }
`;
