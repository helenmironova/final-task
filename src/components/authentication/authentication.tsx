import classes from "./authentication.module.css";
import { useState } from "react";

import SignInForm from "../signIn-form/signInForm";
import SignUpForm from "../signUp-form/signUpForm";

const Authentication: React.FC = () => {
  const [registered, setRegistered] = useState(true);

  const formDisplayHandler = () => {
    setRegistered((prevState) => !prevState);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {registered && <SignInForm />}
        {!registered && <SignUpForm />}
        {registered && (
          <p>
            Don't have an account? <a onClick={formDisplayHandler}>Sign Up</a>
          </p>
        )}
        {!registered && (
          <p>
            Already have an account? <a onClick={formDisplayHandler}>Login</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Authentication;
