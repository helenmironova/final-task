import React, { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { createAccount, loginEmailPassword } from "../../utils/auth";
import ModalButton from "../ModalButton";
import ModalTextInput from "../ModalTextInput";
import { FirebaseError } from "firebase/app";

interface Props {
  onPageChange: () => void;
}

const SignUpModal = ({ onPageChange }: Props) => {
  const [formError, setFormError] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = new FormData(event.currentTarget);
      const email = data.get("email")?.toString();
      const password = data.get("password")?.toString();
      const repeat_password = data.get("repeat-password")?.toString();
      await createAccount(email, password, repeat_password);
      setFormError("");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setFormError("No such email or password");
      } else if (error instanceof Error) {
        setFormError(error.message);
      } else {
        // Handle other types of errors
        setFormError("An unknown error occurred.");
      }
    }
  };

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
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate width={"100%"}>
          <ModalTextInput
            inputName={"email"}
            inputType={"email"}
            labelText="Email"
            placeholderText="Enter your email"
            formError={formError}
          ></ModalTextInput>
          <ModalTextInput
            inputName="password"
            inputType={"password"}
            labelText="Password"
            placeholderText="Enter your password"
            formError={formError}
          ></ModalTextInput>
          <ModalTextInput
            inputName="repeat-password"
            inputType={"password"}
            labelText="Repeat Password"
            placeholderText="Enter your password again"
            formError={formError}
          ></ModalTextInput>
          <ModalButton>Create Account</ModalButton>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" fontSize="12">
              Already have an account?
            </Typography>
            <Button
              onClick={onPageChange}
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
              }}
              variant="text"
            >
              Login
            </Button>
          </Container>
          {formError && (
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                color="#EC3030"
                variant="caption"
                fontWeight={600}
                fontSize={12}
              >
                {formError}
              </Typography>
            </Container>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpModal;
