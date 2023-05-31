import React from "react";
import { useNavigate } from "react-router-dom";
import { monitorAuthState } from "../utils/auth";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";
import SearchBar from "../components/SearchBar";
import { Stack } from "@mui/material";

const PageSearch = (): JSX.Element => {
  return (
    <Stack width="100%" height="100%">
      <Header />
      <Stack padding="30px 130px" height="100%">
        <SearchBar></SearchBar>
        <SearchResults></SearchResults>
      </Stack>
    </Stack>
  );
};

export default PageSearch;
