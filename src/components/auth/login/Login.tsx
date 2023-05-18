import { TextField, Button, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./Login.css";
const Login = () => {
  return (
    <>
      <div className="login">
        <Typography variant="h4">Login</Typography>
        <TextField
          required
          id="outlined-required"
          label="Email"
          defaultValue="Enter your email"
          fullWidth={true}
        ></TextField>
        <TextField
          required
          id="outlined-required"
          label="Password"
          defaultValue="Enter your password"
          fullWidth={true}
        ></TextField>
        <Button fullWidth={true} sx={{ backgroundColor: "#D8E7FF" }}>
          Login
        </Button>
        <Typography variant="subtitle2">
          Don’t have an account?{" "}
          <Link
            href="#"
            underline="hover"
            sx={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
            component={RouterLink}
            to="/signup"
          >
            {"Sign up"}
          </Link>
        </Typography>
      </div>
    </>
  );
};

export default Login;
