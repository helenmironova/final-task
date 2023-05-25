import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./signInForm.module.css";

import FormInput from "../form-input/form-input";
import Button from "../button/button";
import { UserAuth } from "../../contexts/AuthContext";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await signIn(email, password);

      navigate("/main");
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
          setError("Login failed! Please,  check you password and email!");
          break;
        case "auth/user-not-found":
          setError("You are not registered!");
          break;
        default:
          console.log(error);
      }

      console.error(error);
    }
  };

  return (
    <div className={classes.signin_container}>
      <h1>{"Login"}</h1>
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
        {error && <div className={classes.error}>{error}</div>}
        <div className={classes.buttons_container}>
          <Button type="submit" placeholder="Login" styles="signIn" />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
