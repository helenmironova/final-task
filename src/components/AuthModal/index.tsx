import React, { useCallback, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { createAccount, loginEmailPassword } from "../../utils/auth";
import ModalButton from "../ModalButton";
import ModalTextInput from "../ModalTextInput";
import { FirebaseError } from "firebase/app";

const AuthModal = (): JSX.Element => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const togglePage = useCallback(() => {
    setIsLoginPage(!isLoginPage);
  }, [isLoginPage]);

  const [formError, setFormError] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const resetForm = useCallback(() => {
    setFormError("");
    setEmail("");
    setPassword("");
    if (!isLoginPage) {
      setPasswordRepeat("");
    }
  }, [isLoginPage]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    try {
      if (isLoginPage) {
        await loginEmailPassword(email, password);
      } else {
        await createAccount(email, password, passwordRepeat);
      }
      setFormError("");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setFormError(
          "Login failed! Please,  check you password and email and try again"
        );
      } else if (error instanceof Error) {
        setFormError(error.message);
      } else {
        // Handle other types of errors
        setFormError("An unknown error occurred.");
      }
    }
  };

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      if (name === "email") {
        setEmail(value);
      } else if (name === "password") {
        setPassword(value);
      } else if (name === "repeat-password") {
        setPasswordRepeat(value);
      }
    },
    []
  );
  const isButtonDisabled =
    email.trim() === "" ||
    password.trim() === "" ||
    (!isLoginPage && passwordRepeat.trim() === "");

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#FFF",
          padding: "25px 31px",
          width: "456px",
          borderRadius: "12px",
          boxSizing: "border-box",
        }}
      >
        <Typography component="h1" fontSize={18} fontWeight={700}>
          {isLoginPage ? "Login" : "Sign up"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate width={"100%"}>
          <ModalTextInput
            inputName={"email"}
            inputType={"email"}
            labelText="Email"
            placeholderText="Enter your email"
            formError={formError}
            onChange={handleInputChange}
            value={email}
          ></ModalTextInput>
          <ModalTextInput
            inputName="password"
            inputType={"password"}
            labelText="Password"
            placeholderText="Enter your password"
            formError={formError}
            onChange={handleInputChange}
            value={password}
          ></ModalTextInput>
          {!isLoginPage && (
            <ModalTextInput
              inputName="repeat-password"
              inputType={"password"}
              labelText="Repeat Password"
              placeholderText="Enter your password again"
              formError={formError}
              onChange={handleInputChange}
              value={passwordRepeat}
            ></ModalTextInput>
          )}
          <ModalButton isDisabled={isButtonDisabled}>
            {isLoginPage ? "Login" : "Create Account"}
          </ModalButton>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" fontSize="12">
              {isLoginPage
                ? "Don’t have an account? "
                : "Already have an account? "}
            </Typography>
            <Button
              onClick={() => {
                togglePage();
                resetForm();
              }}
              sx={{
                fontSize: "12px",
                textTransform: "capitalize",
                color: "#000",
                ":hover": {
                  background: "none",
                },
                padding: "0 0 0 2px",
                display: "flex",
                justifyContent: "flex-start",
                ":focus": {
                  outline: "none",
                },
              }}
              variant="text"
            >
              {isLoginPage ? "Sign up" : "Login"}
            </Button>
          </Container>
          {formError && (
            <Typography
              color="#EC3030"
              variant="caption"
              fontWeight={600}
              fontSize={12}
            >
              {formError}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default AuthModal;
