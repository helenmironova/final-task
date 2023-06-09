import "./index.css";
import { useEffect, useRef, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { searchEntries } from "../../utils/search";
import SearchResultComponent from "../SearchResultComponent";
import { SearchItem } from "../../interfaces/SearchItem";
import {
  searchItemsState,
  addSearchItems,
  selectMemoizedQuantity,
} from "../../store/searchItemsSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const getTableHeader = (): JSX.Element => {
  const headerStr = {
    searchId: "#",
    entry: "Entry",
    entryNames: "Entry Names",
    genes: "Genes",
    organism: "Organism",
    subcellularLocation: "Subcellular Location",
    length: "Length",
  };
  return (
    <SearchResultComponent searchItem={headerStr} key={0} isTHeader={true} />
  );
};

const SearchResults = (): JSX.Element => {
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const searchItems = useAppSelector(
    (state: { searchItems: searchItemsState }) => state.searchItems.searchItems
  );

  const searchItemsNumber = useAppSelector(
    (state: { searchItems: searchItemsState }) => state.searchItems.quantity
  );
  const [req, setReq] = useState("");
  const [nextReq, setNextReq] = useState("");
  const [newEntries, setNewEntries] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get("query");

    if (query) {
      setReq(
        `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,cc_subcellular_location&query=${query}`
      );
    }
  }, [search]);

  useEffect(() => {
    const entries: SearchItem[] = [];
    if (req) {
      searchEntries(req).then(({ link, data }) => {
        if (link) {
          const indexOfGreaterThan = link.indexOf(">");

          const extractedLink = link.substring(1, indexOfGreaterThan);

          setNextReq(extractedLink);
        }
        if (data && data.results) {
          data.results.forEach((element, index: number) => {
            const searchItem = {
              searchId: searchItemsNumber + index + 1,
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
          if (entries) {
            setNewEntries(entries);
          } else {
            setNewEntries([]);
          }
        }
      });
    }
  }, [dispatch, req]);

  const searchItemComponents = searchItems.map((entry) => (
    <SearchResultComponent
      isTHeader={false}
      searchItem={entry}
      key={searchItemsNumber + entry.searchId + 1}
    />
  ));

  // Infinite scroll with IntersectionObserver
  const observerTarget = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      console.log("entries: ", entries);
      if (entries[0].isIntersecting) {
        console.log("Scroll!!");
        if (newEntries) {
          dispatch(addSearchItems(newEntries));
        }
        if (nextReq) {
          setReq(nextReq);
        }
      }
    }, options);

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [dispatch, newEntries, nextReq, observerTarget]);

  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="flex-start"
      flexDirection="column"
      overflow="auto"
    >
      {searchItems.length > 0 ? (
        <table className="search-table">
          <thead>{getTableHeader()}</thead>
          <tbody>{searchItemComponents}</tbody>
        </table>
      ) : (
        <Stack alignItems="center" justifyContent="center" height="100%">
          <Typography>No data to display</Typography>
          <Typography>Please start search to display results</Typography>
        </Stack>
      )}
      <div ref={observerTarget}></div>
    </Box>
  );
};

export default SearchResults;
