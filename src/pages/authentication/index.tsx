import classes from "./authentication.module.css";
import { useState } from "react";

import SignInForm from "../../components/sign-in-form";
import SignUpForm from "../../components/sign-up-form";

const Authentication: React.FC = () => {
  const [registered, setRegistered] = useState(true);

  return (
    <main className={classes.container}>
      <div className={classes.content}>
        {registered && <SignInForm setRegistered={setRegistered} />}
        {!registered && <SignUpForm setRegistered={setRegistered} />}
      </div>
    </main>
  );
};

export default Authentication;
