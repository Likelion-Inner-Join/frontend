import { useState } from "react";
import { styled } from "styled-components";
import { FormFieldComponent } from "./form-field";
import { Button } from "../button";
// import { VerificationCodeForm } from "../../../auth/components";

export type TFormFieldProps = {
  label: string;
  value: string | number;
  type: "text" | "email" | "password" | "select" | "verificationCode";
  options?: { label: string; value: string | number }[];
  validate?: (value: string | number) => string | null;
  section?: string;
  helpText?: string;
};

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

export const Form = ({
  title,
  fields,
  section,
  onSubmit,
  submitLabel = "제출",
  additionalLink,
}: TFormProps) => {
  const [formValues, setFormValues] = useState<Record<string, string | number>>(
    fields.reduce((acc, field) => {
      acc[field.label] = field.value ?? "";
      return acc;
    }, {} as Record<string, string | number>)
  );
  const [formErrors, setFormErrors] = useState<Record<string, string | null>>(
    {}
  );
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (label: string, value: string | number) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [label]: value,
    }));

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

  const sectionFields = fields.filter(
    (field) => !section || field.section === section
  );

  console.log(sectionFields);

  return (
    <Container>
      <FormWrapper>
        <FormTitle>{title}</FormTitle>
        <FormBody>
          {sectionFields.map((field) => (
            <FormFieldComponent
              key={field.label}
              field={field}
              value={formValues[field.label]}
              handleChange={handleChange}
              error={touched[field.label] ? formErrors[field.label] : null}
            />
          ))}

          {/* <VerificationCodeForm
            email="wjdtjdud21@sogang.ac.kr"
            school="서강대학교"
          /> */}
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
          />
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
