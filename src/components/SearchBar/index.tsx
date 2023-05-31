import Button from "@mui/material/Button";
import "./index.css";
import { ReactNode, useState } from "react";
import {
  Box,
  IconButton,
  OutlinedInput,
  Stack,
  SvgIcon,
  TextField,
} from "@mui/material";
import FiltersIcon from "../../assets/icons/filters.svg";
import FiltersModal from "../FiltersModal";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = (): JSX.Element => {
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const handleFiltersClose = () => {
    setFiltersOpen(false);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchWord(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let uri;
    if (searchWord) {
      uri = `/search/?query=${encodeURIComponent(searchWord)}`;
    } else {
      uri = "/search/?query=*";
    }

    navigate(uri);
  };

  return (
    <div className="searchbar">
      <Box component="form" onSubmit={handleSubmit} noValidate width={"100%"}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <OutlinedInput
            className="searchbar__input"
            placeholder="Enter search value"
            value={searchWord}
            onChange={handleSearchChange}
          ></OutlinedInput>
          <Button className="searchbar__search" type="submit">
            Search
          </Button>
          <IconButton className="searchbar__filters">
            <img src={FiltersIcon} alt="" />
          </IconButton>
        </Stack>
      </Box>
      <FiltersModal
        isOpen={filtersOpen}
        onClose={handleFiltersClose}
      ></FiltersModal>
    </div>
  );
};

export default SearchBar;
