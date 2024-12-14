import styled from "styled-components";

export type TQNAFieldProps = {
  type: "checkbox" | "radio" | "shortAnswer" | "longAnswer" | "date" | "time";
  required: boolean;
  title: string;
  description?: string;
  options?: string[];
};

export const QNAField = ({
  type,
  required,
  title,
  description,
  options,
}: TQNAFieldProps) => {
  const renderAnswerField = () => {
    switch (type) {
      case "checkbox":
        return (
          <CheckboxWrapper>
            {options?.map((option, index) => (
              <label key={index}>
                <input type="checkbox" name={title} value={option} />
                <span>{option}</span>
              </label>
            ))}
          </CheckboxWrapper>
        );

      case "radio":
        return (
          <RadioWrapper>
            {options?.map((option, index) => (
              <label key={index}>
                <input type="radio" name={title} value={option} />
                <span>{option}</span>
              </label>
            ))}
          </RadioWrapper>
        );

      case "shortAnswer":
        return <ShortAnswerInput type="text" required={required} />;

      case "longAnswer":
        return <LongAnswerTextarea required={required}></LongAnswerTextarea>;

      case "date":
        return <DateInput type="date" required={required} />;

      case "time":
        return <TimeInput type="time" required={required} />;

      default:
        return null;
    }
  };

  return (
    <QNAFieldWrapper>
      <Title>
        <span>
          {title} {required && <span className="required">*</span>}
        </span>
        {description && <div className="description">{description}</div>}
      </Title>
      <div
        style={{
          backgroundColor: "#f9f9f9",
          height: "2px",
          margin: "32px 0px",
        }}
      ></div>
      {renderAnswerField()}
    </QNAFieldWrapper>
  );
};

const QNAFieldWrapper = styled.div`
  width: 1340px;
  margin: 0 auto;
  padding: 50px 40px;
  border-radius: 14px;
  background-color: #fff;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 600;
  color: #222;
  line-height: 21.6px;

  .description {
    margin-top: 22px;
    color: #606060;
    font-size: 16px;
    font-weight: 500;
    line-height: 19.2px;
  }

  .required {
    color: red;
    margin-left: 4px;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  label {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #333;

    input[type="checkbox"] {
      appearance: none;
      margin-right: 8px;
      width: 22px;
      height: 22px;
      border: 1px solid #ddd;
      border-radius: 50%;
      background-color: #ddd;
      color: #fff;
      cursor: pointer;
      position: relative;

      &::before {
        content: "✓";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -40%);
        font-size: 16px;
        pointer-events: none;
      }

      &:checked {
        background-color: #cc141d;
        border-color: #cc141d;
      }
    }

    span {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      color: #222;
    }
  }
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  label {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #333;
    cursor: pointer;

    input[type="radio"] {
      appearance: none;
      margin-right: 8px;
      width: 22px;
      height: 22px;
      border: 2px solid #ddd;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      cursor: pointer;

      &:checked {
        border-color: #cc141d;
        background-color: #cc141d;

        &::before {
          content: "";
          display: block;
          width: 6.5px;
          height: 6.5px;
          background-color: #fff;
          border-radius: 50%;
        }
      }
    }

    span {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      color: #222;
    }
  }
`;

const ShortAnswerInput = styled.input`
  width: 1300px;
  padding: 12px 16px;
  border-radius: 6px;
  background-color: #f9f9f9;
  color: #222;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.2;
  border: none;
  outline: none;
`;

const LongAnswerTextarea = styled.textarea`
  width: 1300px;
  padding: 12px 16px;
  border-radius: 6px;
  background-color: #f9f9f9;
  color: #222;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.2;
  border: none;
  outline: none;
  min-height: 200px;
  resize: vertical;
`;

const DateInput = styled.input`
  padding: 10px 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
`;

const TimeInput = styled.input`
  padding: 10px 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
`;
