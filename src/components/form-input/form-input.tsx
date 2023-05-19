import React, { Fragment, ChangeEvent } from "react";

interface FormInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  name: string;
  required: boolean;
  label: string;
  placeholder: string;
}

const FormInput: React.FC<FormInputProps> = ({
  onChange,
  value,
  type,
  name,
  required,
  label,
  placeholder,
}) => {
  return (
    <Fragment>
      <label>{label}</label>
      <input
        type={type}
        onChange={onChange}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
      />
    </Fragment>
  );
};

export default FormInput;
