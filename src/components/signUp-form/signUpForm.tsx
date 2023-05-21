import React, { useState, ChangeEvent, FormEvent } from "react";
import classes from "./signUp.module.css";

import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import FormInput from "../form-input/form-input";
import Button from "../button/button";

interface FormFields {
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultFormFields: FormFields = {
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm: React.FC = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { email, password, confirmPassword } = formFields;
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const user = response?.user;
      setFormFields(defaultFormFields);
      setCurrentUser(user);
      navigate("/main");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already is in use");
      } else console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      <h1>{"Sign Up"}</h1>
      <form onSubmit={submitHandler} className={classes.form_container}>
        <FormInput
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required={true}
          label="Email"
          placeholder="Enter your email"
          styles="formInput"
        />
        <FormInput
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required={true}
          label="Password"
          placeholder="Enter your password"
          styles="formInput"
        />
        <FormInput
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          required={true}
          label="Confirm Password"
          placeholder="Enter your password again"
          styles="formInput"
        />
        <div className={classes.button_container}>
          <Button type="submit" placeholder="Sign Up" styles="signUp" />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
