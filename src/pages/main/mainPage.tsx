import {
  Fragment,
  useState,
  useCallback,
  useRef,
  ChangeEvent,
  RefCallback,
} from "react";
import classes from "./mainPage.module.css";
import { Link } from "react-router-dom";
import useSearch, { SearchResult } from "../../customHooks/useSearch";

import Navigation from "../../components/nav-bar/navigation";
import FormInput from "../../components/form-input/form-input";

const MainPage = () => {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(25);

  const { result } = useSearch(query, size);

  console.log(result);

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

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setSize(25);
  }

  return (
    <Fragment>
      <Navigation />
      <div className={classes.container}>
        <div className={classes.content}>
          <FormInput
            type="search"
            onChange={handleSearch}
            name="searchField"
            placeholder="Enter search value"
            required={false}
            value={query}
            styles="searchField"
          />
          {!query && (
            <div className={classes.no_data}>
              <div>No data to display</div>
              <div>Please start search to display results</div>
            </div>
          )}

          {query && (
            <div className={classes.grid_container}>
              <div className={classes.grid_header}>#</div>
              <div className={classes.grid_header}>Entry</div>
              <div className={classes.grid_header}>Entry Names</div>
              <div className={classes.grid_header}>Genes</div>
              <div className={classes.grid_header}>Organism</div>
              <div className={classes.grid_header}>Length</div>
            </div>
          )}
          <div className={classes.grid_scroll}>
            {result.map((item: SearchResult, index: number) => {
              if (result.length === index + 1) {
                return (
                  <div
                    className={classes.item_container}
                    ref={lastBookElementRef}
                    key={item.primaryAccession}
                  >
                    <div className={classes.grid_item}>{index + 1}</div>
                    <Link
                      className={classes.grid_item}
                      to={`/protein/${item.primaryAccession}`}
                    >
                      {item.primaryAccession}
                    </Link>
                    <div className={classes.grid_item}>{item.uniProtkbId}</div>
                    <div className={classes.grid_item}>
                      {item.genes[0].geneName.value}
                    </div>
                    <div className={classes.grid_item}>
                      {item.organism.scientificName}
                    </div>
                    <div className={classes.grid_item}>
                      {item.sequence.length}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className={classes.item_container}
                    key={item.primaryAccession}
                  >
                    <div className={classes.grid_item}>{index}</div>
                    <Link
                      className={classes.grid_item}
                      to={`/protein/${item.primaryAccession}`}
                    >
                      {item.primaryAccession}
                    </Link>
                    <div className={classes.grid_item}>{item.uniProtkbId}</div>
                    <div className={classes.grid_item}>
                      {item.genes[0].geneName.value}
                    </div>
                    <div className={classes.grid_item}>
                      {item.organism.scientificName}
                    </div>
                    <div className={classes.grid_item}>
                      {item.sequence.length}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MainPage;
