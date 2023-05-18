import { Button, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./SignUp.css";
const SignUp = () => {
  return (
    <>
      <div className="signup">
        <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
          Sign Up
        </Typography>
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
        <TextField
          required
          id="outlined-required"
          label="Repeat Password"
          defaultValue="Enter your password again"
          fullWidth={true}
        ></TextField>
        <Button fullWidth={true} sx={{ backgroundColor: "#D8E7FF" }}>
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
      </div>
    </>
  );
};

export default SignUp;
