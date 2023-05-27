import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { loginEmailPassword } from "../../utils/auth";
import ModalButton from "../ModalButton";
import ModalTextInput from "../ModalTextInput";

interface Props {
  onPageChange: () => void;
}

const SignUpModal = ({ onPageChange }: Props): JSX.Element => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    if (email && password) {
      loginEmailPassword(email, password);
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
            inputType={"email"}
            labelText="Email"
            placeholderText="Enter your email"
          ></ModalTextInput>
          <ModalTextInput
            inputType={"password"}
            labelText="Password"
            placeholderText="Enter your password"
          ></ModalTextInput>
          <ModalTextInput
            inputType={"password"}
            labelText="Repeat Password"
            placeholderText="Enter your password again"
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
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpModal;
