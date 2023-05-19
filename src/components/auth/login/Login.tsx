import { useEffect, useState } from "react";
import { TextField, Button, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { emailFormat } from "../../../utils/validations";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value.match(emailFormat)) {
      setEmailError(null);
    } else {
      setEmailError("Please enter a valid email");
    }
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value?.length >= 6) {
      setPasswordError(null);
    } else {
      setPasswordError("Password is too short");
    }
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (emailError || passwordError) {
      return;
    }
    try {
      if (email && password) {
        const loggedInUser = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(loggedInUser);
      }
    } catch (error) {
      // Handle authentication errors (e.g., display error message)
      console.log("Authentication error:", error);
    }
  };
  useEffect(() => {
    setIsDisabled(
      !!emailError ||
        !!passwordError ||
        !email ||
        !password ||
        password.length < 6
    );
  }, [emailError, passwordError, email, password]);

  return (
    <>
      <div className="login">
        <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
          Login
        </Typography>
        <TextField
          required
          id="login-email"
          label="Email"
          value={email}
          onChange={onEmailChange}
          fullWidth={true}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          required
          id="login-password"
          label="Password"
          value={password}
          onChange={onPasswordChange}
          fullWidth={true}
          type="password"
          error={!!passwordError}
          helperText={passwordError}
        />
        <Button
          fullWidth={true}
          sx={{ backgroundColor: "#D8E7FF" }}
          onClick={handleLogin}
          disabled={isDisabled}
        >
          Login
        </Button>
        <Typography
          variant="subtitle2"
          sx={{ color: "black", fontSize: "14px" }}
        >
          Don’t have an account?
          <Link
            href="#"
            underline="hover"
            sx={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
            component={RouterLink}
            to="/signup"
          >
            {" Sign up"}
          </Link>
        </Typography>
      </div>
    </>
  );
};
export default Login;
