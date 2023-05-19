import classes from "./navigation.module.css";

import { useContext } from "react";

import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  return (
    <div>
      {currentUser ? (
        <div onClick={signOutHandler}>Sign Out</div>
      ) : (
        <div>Sign In</div>
      )}
    </div>
  );
};

export default Navigation;
