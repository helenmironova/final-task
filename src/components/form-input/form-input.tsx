import React, { Fragment, ChangeEvent } from "react";
import classes from "./form-inpute.module.css"

interface FormInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type: string;
  name: string;
  required: boolean;
  label?: string;
  placeholder: string;
  styles: string;
}

const FormInput: React.FC<FormInputProps> = ({
  onChange,
  value,
  type,
  name,
  required,
  label,
  placeholder,
  styles,
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
        className={classes[styles]}
      />
    </Fragment>
  );
};

export default FormInput;
