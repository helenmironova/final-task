import Button from "@mui/material/Button";
import "./index.css";
import { ReactNode } from "react";
import { Box, Container, Typography } from "@mui/material";

const SearchResults = (): JSX.Element => {
  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Typography>No data to display</Typography>
      <Typography>Please start search to display results</Typography>
    </Box>
  );
};

export default SearchResults;
