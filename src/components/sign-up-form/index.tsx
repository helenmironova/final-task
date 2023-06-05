import React, { useState, FormEvent } from "react";
import classes from "./sign-up-form.module.css";

import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../contexts/auth-context";

import FormInput from "../form-input";
import Button from "../button";

interface SignUpFormProps {
  setRegistered: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ setRegistered }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("passwords do not match");
      return;
    }
    try {
      await createUser(email, password);
      navigate("/main");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("Cannot create user, email already is in use");
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
          error={error}
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
          error={error}
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
          error={error}
        />
        {error && <span className={classes.error}>{error}</span>}
        <div className={classes.buttonsAndText_container}>
          <Button type="submit" placeholder="Sign Up" variant="fill" />
          <span>
            Already have an account?{" "}
            <a onClick={() => setRegistered(true)}>Login</a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
