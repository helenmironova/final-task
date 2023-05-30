import React, { Fragment, ChangeEvent } from "react";
import classes from "./form-input.module.css";

interface FormInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  label?: string;
  styles?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  styles = "searchField",
  required = "false",
  ...rest
}) => {
  return (
    <Fragment>
      <label>{label}</label>
      <input className={classes[styles]} {...rest} />
    </Fragment>
  );
};

export default FormInput;
