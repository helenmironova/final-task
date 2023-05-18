import { useEffect, useState } from "react";
import { TextField, Button, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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

  
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (emailError || passwordError) {
      return;
    }
  };

  useEffect(() => {
    setIsDisabled(!!emailError || !!passwordError);
  }, [emailError, passwordError]);

  return (
    <>
      <div className="login">
        <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
          Login
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Email"
          value={email}
          onChange={onEmailChange}
          fullWidth={true}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          required
          id="outlined-required"
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
