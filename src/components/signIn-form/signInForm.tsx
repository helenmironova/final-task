import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import classes from "./signInForm.module.css";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";

import FormInput from "../form-input/form-input";
import Button from "../button/button";
import Navigation from "../nav-bar/navigation";

interface FormFields {
  email: string;
  password: string;
}

const defaultFormFields: FormFields = {
  email: "",
  password: "",
};

const SignInForm: React.FC = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { email, password } = formFields;

  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    setCurrentUser(user);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      const user = response?.user;
      console.log("user", user);
      setCurrentUser(user);
      navigate("/main");
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
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
        <div className={classes.buttons_container}>
          <Button type="submit" placeholder="Login" styles="signIn" />
          <Button
            type="button"
            onClick={signInWithGoogle}
            placeholder="Sign In With Google"
            styles="signInWithGoogle"
          />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
