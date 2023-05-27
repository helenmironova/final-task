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
import Navigation from "../../components/nav-bar/navigation";
import SearchBar from "../../components/search-bar/search-bar";
import DataGrid from "../../components/data-grid/data-grid";

const MainPage = () => {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(25);
  const [data, setData] = useState<SearchResult[]>([]);

  const { result } = useSearch(query, size);
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
          <SearchBar query={query} handleSearch={handleSearch} />

          {!query && (
            <div className={classes.no_data}>
              <div>No data to display</div>
              <div>Please start search to display results</div>
            </div>
          )}
          <DataGrid
            query={query}
            data={data}
            setData={setData}
            result={result}
            lastBookElementRef={lastBookElementRef}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default MainPage;
