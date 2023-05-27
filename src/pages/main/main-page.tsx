import {
  Fragment,
  useState,
  useCallback,
  useRef,
  ChangeEvent,
  RefCallback,
  useEffect,
} from "react";
import classes from "./main-page.module.css";
import { Link } from "react-router-dom";
import { useSearch, SearchResult } from "../../hooks/use-search";

import Navigation from "../../components/nav-bar/navigation";
import FormInput from "../../components/form-input/form-input";

import Sorting from "../../assets/Vector.svg";

const MainPage = () => {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(25);
  const [data, setData] = useState<SearchResult[]>([]);
  const [order, setOrder] = useState("ASC");

  const { result } = useSearch(query, size);
  useEffect(() => {
    setData(result);
  }, [result]);
  console.log("DATA", data);

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

  const getValueByColumns = (item: SearchResult, columns: string[]) => {
    let value: any = item; // Use type assertion to allow indexing with a string
    for (const column of columns) {
      value = value[column];
      if (typeof value === "undefined") {
        return ""; 
      }
    }

    if (columns.length === 0) {
      return value.genes && value.genes.length > 0 && value.genes[0].geneName
        ? value.genes[0].geneName.value
        : "N/A";
    }
    return value;
  };

  const sortingHandler = (columns: string[]) => {
    if (order === "ASC") {
      const sorted = [...result].sort((a, b) => {
        const aValue = getValueByColumns(a, columns);
        const bValue = getValueByColumns(b, columns);
        return String(aValue).toLowerCase() > String(bValue).toLowerCase()
          ? 1
          : -1;
      });
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...result].sort((a, b) => {
        const aValue = getValueByColumns(a, columns);
        const bValue = getValueByColumns(b, columns);
        return String(aValue).toLowerCase() < String(bValue).toLowerCase()
          ? 1
          : -1;
      });
      setData(sorted);
      setOrder("ASC");
    }
  };

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
              <div className={classes.grid_header}>
                Entry{" "}
                <img
                  src={Sorting}
                  alt="Sorting Icon"
                  onClick={() => sortingHandler(["primaryAccession"])}
                />
              </div>
              <div className={classes.grid_header}>
                Entry Names{" "}
                <img
                  src={Sorting}
                  alt="Sorting Icon"
                  onClick={() => sortingHandler([])}
                />
              </div>
              <div className={classes.grid_header}>
                Genes{" "}
                <img
                  src={Sorting}
                  alt="Sorting Icon"
                  onClick={() =>
                    sortingHandler(["genes", "0", "geneName", "value"])
                  }
                />
              </div>
              <div className={classes.grid_header}>
                Organism
                <img
                  src={Sorting}
                  alt="Sorting Icon"
                  onClick={() => sortingHandler(["organism", "scientificName"])}
                />
              </div>
              <div className={classes.grid_header}>
                Length{" "}
                <img
                  src={Sorting}
                  alt="Sorting Icon"
                  onClick={() => sortingHandler(["sequence", "length"])}
                />
              </div>
            </div>
          )}
          <div className={classes.grid_scroll}>
            {data.map((item: SearchResult, index: number) => {
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
                      {item.genes &&
                      item.genes.length > 0 &&
                      item.genes[0].geneName
                        ? item.genes[0].geneName.value
                        : "N/A"}
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
                      {item.genes &&
                      item.genes.length > 0 &&
                      item.genes[0].geneName
                        ? item.genes[0].geneName.value
                        : "N/A"}
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
