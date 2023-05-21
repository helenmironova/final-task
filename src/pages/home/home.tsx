import React from "react";
import classes from "./home.module.css";
import { Link } from "react-router-dom";

import Button from "../../components/button/button";

const Home: React.FC = () => {
  const handleClick = () => {
    console.log("signed");
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h1 className={classes.heading}>{"Q1 - Search"}</h1>
        <h1 className={classes.heading}>{"ბრენჩზე დაიწყე მუშაობა!!!"}</h1>
        <p className={classes.text}>
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
          }
        </p>
        <Link to="auth">
          <Button
            placeholder="Sign In"
            type="button"
            styles="signIn"
            onClick={handleClick}
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
