import React, { useContext, Fragment } from "react";
import classes from "./notFound.module.css";

import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

import Button from "../../components/button/button";
import Navigation from "../../components/nav-bar/navigation";

const NotFound: React.FC = () => {
  const handleClick = () => {};
  const { currentUser } = useContext(UserContext);
  console.log("currentUser", currentUser);

  return (
    <Fragment>
      <Navigation />
      <div className={classes.container}>
        <div className={classes.content}>
          <h1 className={classes.status}>{"404"}</h1>
          <p className={classes.text}>{"Page not found"}</p>
          <Link to="/">
            <Button
              placeholder="back to search"
              onClick={handleClick}
              styles="goBackButton"
            />
          </Link>
        </div>
      </div>
      <Outlet /> {/* Render nested routes */}
    </Fragment>
  );
};

export default NotFound;
