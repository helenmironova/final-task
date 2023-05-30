import {
  Fragment,
  useState,
  useCallback,
  useRef,
  RefCallback,
  useEffect,
  ChangeEvent,
} from "react";
import classes from "./main-page.module.css";
import { useSearch, SearchResult } from "../../hooks/use-search";
import Navigation from "../../components/nav-bar";
import Filter from "../../components/filter";
import SearchBar from "../../components/search-bar";
import DataGrid from "../../components/data-grid";
import LoadingSpinner from "../../components/loading-spinner";

const MainPage = () => {
  const [query, setQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [size, setSize] = useState(25);
  const [data, setData] = useState<SearchResult[]>([]);
  const [requestType, setRequestType] = useState("");

  let url;
  let searchParam;
  if (requestType === "filter") {
    url = `https://rest.uniprot.org/uniprotkb/search?facets=model_organism,proteins_with,annotation_score&query=${filterQuery}&cursor=1mkycb2xwxbouw39b98v99ymv0kejlbmk6r7&size=${size}`;
    searchParam = filterQuery;
  } else {
    url = `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=(${query})&cursor=1mkycb2xwxbouw39b98v99ymv0kejlbmk6r7&size=${size}`;
    searchParam = query;
  }

  const { result } = useSearch(url, searchParam, size);
  console.log(result);

  useEffect(() => {
    setData(result);
  }, [result]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef: RefCallback<HTMLTableRowElement> = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setSize((prevSize) => prevSize + 25);
        }
      });
      if (node) observer.current?.observe(node);
    },
    []
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSize(25);
  };

  return (
    <Fragment>
      <Navigation />
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.searchBarAndFilterContainer}>
            <SearchBar query={query} handleSearch={handleSearch} />
            <Filter
              setFilterQuery={setFilterQuery}
              setSize={setSize}
              setRequestType={setRequestType}
            />
          </div>
          {query && data.length === 0 ? (
            <LoadingSpinner />
          ) : data.length === 0 ? (
            <div className={classes.no_data}>
              <div>No data to display</div>
              <div>Please start search to display results</div>
            </div>
          ) : (
            <DataGrid
              data={data}
              setData={setData}
              result={result}
              lastBookElementRef={lastBookElementRef}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default MainPage;
