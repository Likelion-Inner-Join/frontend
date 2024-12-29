import { useState } from "react";
import { styled } from "styled-components";
import { Button, EmailField, TextField } from "../../common/ui";
import { VerificationCodeForm } from "./verification-code-form";

export type TFormFieldProps = {
  label: string;
  value: string | number;
  type: "text" | "email" | "password" | "select" | "verificationCode";
  options?: { label: string; value: string | number }[];
  validate?: (value: string | number) => string | null;
  section?: string;
  helpText?: string;
};

type TFormValues = Record<string, string | number>;

type TAdditionalLink = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type TFormProps = {
  title: string;
  fields: TFormFieldProps[];
  section?: string;
  onSubmit: (values: Record<string, string | number>) => void;
  submitLabel?: string;
  additionalLink?: TAdditionalLink;
};

export const VerificationForm = ({
  title,
  fields,
  section,
  onSubmit,
  submitLabel = "제출",
  additionalLink,
}: TFormProps) => {
  const [formValues, setFormValues] = useState<TFormValues>(
    fields.reduce((acc, field) => ({ ...acc, [field.label]: field.value }), {})
  );
  const [formErrors, setFormErrors] = useState<Record<string, string | null>>(
    {}
  );
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (label: string, value: string | number) => {
    setFormValues((prev) => ({ ...prev, [label]: value }));

    if (!touched[label]) {
      setTouched((prevTouched) => ({
        ...prevTouched,
        [label]: true,
      }));
    }

    const field = fields.find((field) => field.label === label);
    if (field?.validate && touched[label]) {
      const errorMessage = field.validate(value);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [label]: errorMessage ?? null,
      }));
    }
  };

  const handleSubmit = () => {
    const sectionFields = fields.filter(
      (field) => !section || field.section === section
    );

    const errors = sectionFields.reduce((acc, field) => {
      const errorMessage = field.validate?.(formValues[field.label]);
      if (errorMessage) {
        acc[field.label] = errorMessage;
      }
      return acc;
    }, {} as Record<string, string | null>);

    if (Object.values(errors).some((error) => error)) {
      setFormErrors(errors);
      setTouched(
        sectionFields.reduce(
          (acc, field) => ({ ...acc, [field.label]: true }),
          {}
        )
      );
    } else {
      setFormErrors({});
      onSubmit(formValues);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <FormTitle>{title}</FormTitle>
        <FormBody>
          <TextField
            label={fields[0].label}
            value={String(formValues[fields[0].label] || "")}
            helpText={fields[0].helpText}
            onChange={(e) => {
              handleChange(fields[0].label, e.target.value);
            }}
            type="text"
            error={
              touched[fields[0].label] ? formErrors[fields[0].label] : null
            }
          />
          <EmailField
            label={fields[1].label}
            value={String(formValues[fields[1].label] || "")}
            helpText={fields[1].helpText}
            onChange={(e) => {
              handleChange(fields[1].label, e.target.value);
            }}
            error={
              touched[fields[1].label] ? formErrors[fields[1].label] : null
            }
          />
          <VerificationCodeForm
            email={String(formValues["이메일"])}
            school={String(formValues["학교"])}
            onVerifySuccess={(success) => setIsVerified(success)}
          />
        </FormBody>

        <FormFooter>
          {Object.values(formErrors).some((error) => error) && (
            <FormError>입력값을 다시 확인해주세요.</FormError>
          )}
          <Button
            label={submitLabel}
            onClick={handleSubmit}
            size="full"
            variant="primary"
            type="submit"
            disabled={!isVerified}
          />
          {!isVerified && (
            <div
              style={{ color: "#6c757d", fontSize: "14px", marginTop: "10px" }}
            >
              인증을 완료해주세요!
            </div>
          )}
          {additionalLink && (
            <FooterLink
              href={additionalLink.href}
              onClick={additionalLink.onClick}
              as={additionalLink.onClick ? "button" : "a"}
            >
              {additionalLink.label}
            </FooterLink>
          )}
        </FormFooter>
      </FormWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  min-width: 400px;
  border-radius: 8px;
`;

const FormTitle = styled.h1`
  padding: 20px;
  padding-top: 10px;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.color.primary};
`;

const FormBody = styled.div`
  padding: 20px;
`;

const FormFooter = styled.div`
  padding: 20px;
  text-align: center;
`;

const FormError = styled.div`
  color: ${(props) => props.theme.color.primary};
  font-size: 16px;
  text-align: center;
  margin-bottom: 8px;
  padding: 15px;
  background-color: #fddede;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.color.primary};
`;

const FooterLink = styled.a`
  display: inline-block;
  margin-top: 20px;
  font-size: 16px;
  color: ${(props) => props.theme.color.primary};
  text-decoration: underline;
  cursor: pointer;

  background: none;
  border: none;
  padding: 0;
  text-align: center;

  &:hover {
    color: ${(props) => props.theme.color.primaryHover};
  }

  &[as="button"] {
    all: unset;
    cursor: pointer;
  }
`;
