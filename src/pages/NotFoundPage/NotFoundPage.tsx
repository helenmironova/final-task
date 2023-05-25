import { NavLink } from "react-router-dom";
import "./notFoundPage.css";
import Button from "@mui/material/Button";
import Header from "../../components/Header/Header";

const NotFoundPage = () => {
  return (
    <div className="notFoundPage__wrapper">
      <Header />
      <div className="notFoundPage">
        <div className="notFoundPage__container">
          <h1>404</h1>
          <div className="notFoundPage__text">Page Not Found</div>
          <NavLink to="/search">
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
    </div>
  );
};

export default NotFoundPage;
