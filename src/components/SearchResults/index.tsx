import Button from "@mui/material/Button";
import "./index.css";
import { ReactNode, useEffect, useMemo } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { searchEntries } from "../../utils/search";
import SearchResultComponent from "../SearchResultComponent";
import { SearchItem } from "../../interfaces/SearchItem";
import { searchItemsState, setSearchItems } from "../../store/searchItemsSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const getTableHeader = () => {
  const headerStr = {
    searchId: "#",
    entry: "Entry",
    entryNames: "Entry Names",
    genes: "Genes",
    organism: "Organism",
    subcellularLocation: "Subcellular Location",
    length: "Length",
  };
  return <SearchResultComponent searchItem={headerStr} key={0} />;
};

const SearchResults = (): JSX.Element => {
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const searchItems = useAppSelector(
    (state: { searchItems: searchItemsState }) => state.searchItems.searchItems
  );
  useEffect(() => {
    const displayResults = () => {
      const entries: SearchItem[] = [];
      const queryParams = new URLSearchParams(search);
      const query = queryParams.get("query");

      if (query) {
        searchEntries(query).then((data) => {
          data.results.forEach((element, index: number) => {
            console.log("element: ", element);
            const searchItem = {
              searchId: index + 1,
              entry: element.primaryAccession,
              entryNames: element.uniProtkbId,
              genes: element.genes[0].geneName.value,
              organism: element.organism.scientificName,
              subcellularLocation:
                element.comments[0]?.subcellularLocations[0].location.value,
              length: element.sequence.length,
            };
            entries.push(searchItem);
          });
          dispatch(setSearchItems(entries));
        });
      }
    };
    displayResults();
  }, [search]);

  const searchItemComponents = searchItems.map((entry) => (
    <SearchResultComponent searchItem={entry} key={entry.searchId + 1} />
  ));

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      {searchItems ? (
        <div style={{ overflow: "auto" }}>
          <table className="search-table">
            <thead>{getTableHeader()}</thead>
            <tbody>{searchItemComponents}</tbody>
          </table>
        </div>
      ) : (
        <>
          <Typography>No data to display</Typography>
          <Typography>Please start search to display results</Typography>
        </>
      )}
    </Box>
  );
};

export default SearchResults;
