import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

import "./mainPage.css";

const MainPage = () => {
  return (
    <div className="mainPage">
      <div className="mainPage__container">
        <h1>Q-1 Search</h1>
        <p className="mainPage__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt u
        </p>
        <NavLink to="/auth">
          <Button
            className="btn__mainPage"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "24px",
              width: "150px",
              height: "48px",
              color: "#175BC0",
              textTransform:"capitalize"
            }}
            variant="contained"
          >
            Login
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default MainPage;
