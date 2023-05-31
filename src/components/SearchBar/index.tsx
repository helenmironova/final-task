import Button from "@mui/material/Button";
import "./index.css";
import { ReactNode } from "react";
import {
  IconButton,
  OutlinedInput,
  Stack,
  SvgIcon,
  TextField,
} from "@mui/material";
import FiltersIcon from "../../assets/icons/filters.svg";

const SearchBar = (): JSX.Element => {
  return (
    <Stack
      direction="row"
      className="searchbar"
      alignItems="center"
      justifyContent="center"
    >
      <OutlinedInput
        className="searchbar__input"
        placeholder="Enter search value"
      ></OutlinedInput>
      <Button className="searchbar__search">Search</Button>
      <IconButton className="searchbar__filters">
        <img src={FiltersIcon} alt="" />
      </IconButton>
    </Stack>
  );
};

export default SearchBar;
