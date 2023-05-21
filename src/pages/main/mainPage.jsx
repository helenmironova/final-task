import { Fragment, useState, useCallback, useRef } from "react";
import classes from "./mainPage.module.css";
import useSearch from "../../customHooks/useSearch";

import Navigation from "../../components/nav-bar/navigation";
import FormInput from "../../components/form-input/form-input";
import { getTokenSourceMapRange } from "typescript";

const MainPage = () => {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(25);

  const { result, hasMore, loading } = useSearch(query, size);

  console.log(result);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        console.log("END");
        if (entries[0].isIntersecting && hasMore) {
          setSize((prevSize) => prevSize + 25);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(e) {
    setQuery(e.target.value);
    setSize(0);
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
          <table>
            <thead>
              <tr>
                <th>Primary Accession</th>
                <th>UniProtKB ID</th>
                <th>Organism</th>
                <th>Genes</th>
              </tr>
            </thead>
            <tbody>
              {result.map((item) => (
                <tr key={item.primaryAccession}>
                  <td>{item.primaryAccession}</td>
                  <td>{item.uniProtkbId}</td>
                  <td>{item.organism.commonName}</td>
                  <td>{item.genes[0].geneName.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>{loading && "Loading..."}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default MainPage;
