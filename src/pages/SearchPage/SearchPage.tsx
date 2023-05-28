import TextField from "@mui/material/TextField";
import Header from "../../components/Header/Header";
import "./searchPage.css";
import { Button } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { useLocation, useSearchParams } from "react-router-dom";
import Placeholder from "../../components/Placeholder/Placeholder";
import DataTable from "../../components/DataTable/DataTable";
import { fetchProteins } from "../../features/proteinData/proteinsSearchSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectProteinData } from "../../features/proteinData/proteinsSearchSlice";
import {
  fetchFilterOptions,
  filterOpen,
  selectFilter,
} from "../../features/proteinData/filterPanelSlice";
import { Dna } from "react-loader-spinner";
import FilterPanel from "../../components/FilterPanel/FilterPanel";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const proteinDataState = useAppSelector(selectProteinData);
  const filterState = useAppSelector(selectFilter);
  const location = useLocation();
  const searchValue = location.search.split("=")[1];

  function getProtein(event: React.FormEvent) {
    event.preventDefault();
    interface RequestData {
      query: string;
    }
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form) as unknown as Iterable<
      [RequestData, FormDataEntryValue]
    >;
    const data = Object.fromEntries(formData);
    setSearchParams({ query: data.query });
    dispatch(fetchProteins({ query: data.query ? data.query : "*" }));
  }

  const filterButtonBGColor = filterState.isOpen ? "#3C86F4" : "#d8e6fd";
  const filterButtonColor = filterState.isOpen ? "#fff" : "#3C86F4";
  return (
    <div className="searchPage__wrapper">
      <Header />
      <FilterPanel />
      <div className="searchPage">
        <div className="searchPage__container">
          <form
            action=""
            className="searchPage__searchfield"
            onSubmit={getProtein}
          >
            <TextField
              name="query"
              sx={{ width: "70%", marginTop: "30px" }}
              label="Enter search value"
              defaultValue={searchValue}
            />
            <Button
              type="submit"
              sx={{
                width: "20%",
                height: "55px",
                textTransform: "capitalize",
                "&.MuiButton-root:hover": { bgcolor: "#D8E7FF" },
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
                height: "55px",
                "&.MuiButton-root:hover": { bgcolor: filterButtonBGColor },
                backgroundColor: filterButtonBGColor,
                boxShadow: "none",
                color: filterButtonColor,
                borderRadius: "12px",
                margin: "30px 0",
              }}
              onClick={() => {
                dispatch(filterOpen());
                dispatch(fetchFilterOptions({ query: "*" }));
              }}
            >
              <TuneIcon />
            </Button>
          </form>
          {proteinDataState.data === null ? (
            <Placeholder text="No data to display. Please start search to display results" />
          ) : proteinDataState?.data?.length < 1 ? (
            <Placeholder text="Could not find anything. Please search for something else" />
          ) : proteinDataState.error ? (
            <Placeholder text="An error occured" />
          ) : proteinDataState.loading && proteinDataState?.link === null ? (
            <div className="dna_spinner">
              <Dna
                visible={true}
                height="180"
                width="180"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          ) : (
            <DataTable />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
