import classes from "./navigation.module.css";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../contexts/auth-context";

const Navigation = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const signOutHandler = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <header className={classes.navigation_container}>
      <div>{user?.email}</div>
      {user ? (
        <div onClick={signOutHandler} className={classes.logOut}>
          Log out
        </div>
      ) : (
        <div>Sign In</div>
      )}
    </header>
  );
};

export default Navigation;
