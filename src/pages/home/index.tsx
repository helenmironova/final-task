import React from "react";
import classes from "./home.module.css";
import { Link } from "react-router-dom";

import Button from "../../components/button";

const Home: React.FC = () => {
  return (
    <main className={classes.container}>
      <div className={classes.content}>
        <h1 className={classes.heading}>{"Q1 - Search"}</h1>
        <p className={classes.text}>
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
          }
        </p>
        <Link to="auth">
          <Button placeholder="Sign In" type="button" variant="text" />
        </Link>
      </div>
    </main>
  );
};

export default Home;
