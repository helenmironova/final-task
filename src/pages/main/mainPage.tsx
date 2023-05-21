import { Fragment, useState, useCallback, useRef, ChangeEvent } from "react";
import classes from "./mainPage.module.css";
import useSearch, { SearchResult } from "../../customHooks/useSearch";

import Navigation from "../../components/nav-bar/navigation";
import FormInput from "../../components/form-input/form-input";

const MainPage = () => {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(25);

  const { result } = useSearch(query, size);

  console.log(result);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setSize((prevSize) => prevSize + 25);
      }
    });
    if (node) observer.current?.observe(node);
  }, []);

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
          {result.map((item: SearchResult, index: number) => {
            if (result.length === index + 1) {
              return (
                <div ref={lastBookElementRef} key={item.primaryAccession}>
                  {item.primaryAccession}
                </div>
              );
            } else {
              return (
                <div key={item.primaryAccession}>{item.primaryAccession}</div>
              );
            }
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default MainPage;
