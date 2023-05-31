import "./index.css";
import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { searchEntries } from "../../utils/search";
import SearchResultComponent from "../SearchResultComponent";
import { SearchItem } from "../../interfaces/SearchItem";
import { searchItemsState, addSearchItems } from "../../store/searchItemsSlice";
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
    const updateReq = (newReq: string): void => {
      setNextReq(newReq);
    };

    const displayResults = (): void => {
      const entries: SearchItem[] = [];
      if (req) {
        searchEntries(req, updateReq).then(({ link, data }) => {
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
            dispatch(addSearchItems(entries));
          }
        });
      }
    };
    displayResults();
  }, [dispatch, req, search, searchItemsNumber]);

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
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setReq(nextReq);
          console.log("nextReq: ", nextReq);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [nextReq, observerTarget]);

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
      <div ref={observerTarget}></div>
    </Box>
  );
};

export default SearchResults;
