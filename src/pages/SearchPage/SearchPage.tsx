import TextField from "@mui/material/TextField";
import Header from "../../components/Header/Header";
import "./searchPage.css";
import { Button } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import Placeholder from "../../components/Placeholder/Placeholder";

const SearchPage = () => {
  return (
    <div className="searchPage__wrapper">
      <Header />
      <div className="searchPage">
        <div className="searchPage__container">
          <form action="" className="searchPage__searchfield">
            <TextField
              sx={{ width: "70%", marginTop: "30px" }}
              label="Enter search value"
            />
            <Button
              type="submit"
              sx={{
                width: "20%",
                height: "50px",
                textTransform: "capitalize",
                backgroundColor: "#D8E7FF",
                boxShadow: "none",
                color: "#175BC0",
                borderRadius: "12px",
                margin: "30px 0",
              }}
            >
              Search
            </Button>
            <Button
              sx={{
                height: "50px",
                backgroundColor: "#D8E7FF",
                boxShadow: "none",
                color: "#175BC0",
                borderRadius: "12px",
                margin: "30px 0",
              }}
            >
              <TuneIcon />
            </Button>
          </form>
          <Placeholder />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
