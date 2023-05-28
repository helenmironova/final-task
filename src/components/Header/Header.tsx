import "./header.css";
import Button from "@mui/material/Button";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAuth, logout } from "../../features/auth/authSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);
  return (
    <div className="header">
      <div className="header__email">{authState.email}</div>

      <Button
        onClick={() => dispatch(logout())}
        className="btn__logout"
        sx={{
          borderRadius: "24px",
          width: "158px",
          height: "48px",
          textTransform: "capitalize",
        }}
        variant="text"
      >
        Log Out
      </Button>
    </div>
  );
};

export default Header;
