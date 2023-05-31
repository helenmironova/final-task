import Button from "@mui/material/Button";
import "./index.css";
import { ReactNode } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { searchEntries } from "../../utils/search";
import { SearchItem } from "../../interfaces/SearchItem";

const SearchResultComponent = ({
  searchItem,
}: {
  searchItem: SearchItem;
}): JSX.Element => {
  return (
    <tr className="search-result">
      <td className="search-result__id">
        <Typography>{searchItem.searchId}</Typography>
      </td>
      <td className="search-result__entry">
        <Typography>{searchItem.entry}</Typography>
      </td>
      <td className="search-result__entry-names">
        <Typography>{searchItem.entryNames}</Typography>
      </td>
      <td className="search-result__genes">
        <Typography>{searchItem.genes}</Typography>
      </td>
      <td className="search-result__organism">
        <Typography>{searchItem.organism}</Typography>
      </td>
      <td className="search-result__subcellular-location">
        <Typography>{searchItem.subcellularLocation}</Typography>
      </td>
      <td className="search-result__length">
        <Typography>{searchItem.length}</Typography>
      </td>
    </tr>
  );
};

export default SearchResultComponent;
