import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import "./index.css";
import { Link } from "react-router-dom";

const LoginBlock = (): JSX.Element => {
  return (
    <Stack className="login-block__main">
      <h1 className="login-block__title">Q-1 Search</h1>
      <p className="login-block__text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt u
      </p>
      <Link to={"auth"}>
        <Button variant="contained" id="login-block__login-btn">
          Login
        </Button>
      </Link>
    </Stack>
  );
};

export default LoginBlock;
