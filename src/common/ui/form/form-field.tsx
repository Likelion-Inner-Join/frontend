import { TextField, EmailField, SelectField } from "../field";
import { TFormFieldProps } from "./form";

type TFormFieldComponentProps = {
  field: TFormFieldProps;
  value: string | number;
  handleChange: (label: string, value: string | number) => void;
  error?: string | null;
};

export const FormFieldComponent = ({
  field,
  value,
  handleChange,
  error,
}: TFormFieldComponentProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(field.label, e.target.value);
  };

  return (
    <div>
      {field.type === "text" || field.type === "password" ? (
        <TextField
          label={field.label}
          value={String(value)}
          helpText={field.helpText}
          onChange={onChangeHandler}
          type={field.type}
          error={error}
        />
      ) : field.type === "email" ? (
        <EmailField
          label={field.label}
          value={String(value)}
          helpText={field.helpText}
          onChange={onChangeHandler}
          error={error}
        />
      ) : field.type === "select" && field.options ? (
        <SelectField
          label={field.label}
          value={value}
          helpText={field.helpText}
          options={field.options}
          onChange={(value) =>
            handleChange(field.label, parseInt(value.toString()))
          }
          error={error}
        />
      ) : null}
    </div>
  );
};
