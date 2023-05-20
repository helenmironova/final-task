import { NavLink } from "react-router-dom";
import "./notFoundPage.css";
import Button from "@mui/material/Button";

const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      <div className="notFoundPage__container">
        <h1>404</h1>
        <div className="notFoundPage__text">Page Not Found</div>
        <NavLink to="/auth">
          <Button
            className="btn__notFound"
            sx={{
              backgroundColor: "#D8E7FF",
              borderRadius: "24px",
              width: "158px",
              height: "48px",
              color: "#000",
              textTransform: "capitalize",
              fontWeight: "700;",
            }}
            variant="contained"
          >
            Back to Search
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;
