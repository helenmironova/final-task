import React, { useState, ChangeEvent, FormEvent } from "react";
import classes from "./signUp.module.css";

import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthContext";

import FormInput from "../form-input/form-input";
import Button from "../button/button";

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
    try {
      await createUser(email, password);
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
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
          required={true}
          label="Email"
          placeholder="Enter your email"
          styles="formInput"
        />
        <FormInput
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          value={password}
          required={true}
          label="Password"
          placeholder="Enter your password"
          styles="formInput"
        />
        <FormInput
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
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
