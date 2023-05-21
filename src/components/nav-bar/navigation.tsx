import classes from "./navigation.module.css";

import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";

import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div className={classes.navigation_container}>
      <div>{currentUser?.email}</div>
      {currentUser ? (
        <div onClick={signOutHandler} className={classes.logOut}>
          Log out
        </div>
      ) : (
        <div>Sign In</div>
      )}
    </div>
  );
};

export default Navigation;
