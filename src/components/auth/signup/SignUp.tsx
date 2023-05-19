import { useEffect, useState } from "react";
import { Button, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { emailFormat, passwordFormat } from "../../../utils/validations";

import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(
    null
  );
  const [isDisabled, setIsDisabled] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    e.target.value.match(emailFormat)
      ? setEmailError(null)
      : setEmailError("Please enter a valid email");
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    e.target.value.match(passwordFormat)
      ? setPasswordError(null)
      : setPasswordError(
          "Must contain at least 6 symbols, uppercase/lowercase characters and numbers"
        );
  };

  const handlePasswordConfirmationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Perform your sign-up logic here
    // You can access the email, password, and passwordConfirmation values

    // Example validation
    if (!email || !password || !passwordConfirmation) {
      // Display an error message or perform appropriate actions
      return;
    }

    if (password !== passwordConfirmation) {
      // Display an error message or perform appropriate actions
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Sign-up successful:", user);
    } catch (error) {
      console.error("Sign-up error:", error);
      setFormError("An error occurred during sign-up.");
    }
  };
  useEffect(() => {
    if (password !== passwordConfirmation) {
      setPasswordMatchError("entered passwords do not match");
    } else {
      setPasswordMatchError(null);
    }
  }, [password, passwordConfirmation]);
  useEffect(() => {
    setIsDisabled(
      !!emailError ||
        !!passwordError ||
        !!passwordMatchError ||
        !email ||
        !password ||
        !passwordConfirmation
    );
  }, [
    emailError,
    passwordError,
    passwordMatchError,
    email,
    password,
    passwordConfirmation,
  ]);
  return (
    <>
      <div className="signup">
        <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
          Sign Up
        </Typography>
        <TextField
          required
          id="signup-email"
          label="Email"
          value={email}
          onChange={onEmailChange}
          fullWidth={true}
          error={!!emailError}
          helperText={emailError}
        ></TextField>
        <TextField
          required
          id="signup-password"
          label="Password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          fullWidth={true}
          error={!!passwordError}
          helperText={passwordError}
        ></TextField>
        <TextField
          required
          id="signup-password-confirmation"
          label="Repeat Password"
          type="password"
          value={passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
          fullWidth={true}
          error={!!passwordMatchError}
          helperText={passwordMatchError}
        ></TextField>
        <Button
          fullWidth={true}
          sx={{ backgroundColor: "#D8E7FF" }}
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          Create Account
        </Button>
        <Typography
          variant="subtitle2"
          sx={{ color: "black", fontSize: "14px" }}
        >
          Already have an account?
          <Link
            href="#"
            underline="hover"
            sx={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
            component={RouterLink}
            to="/login"
          >
            {" Login"}
          </Link>
        </Typography>
        {formError && <Typography>{formError}</Typography>}
      </div>
    </>
  );
};

export default SignUp;
