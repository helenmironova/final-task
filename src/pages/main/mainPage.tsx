import {
  Fragment,
  useState,
  useCallback,
  useRef,
  ChangeEvent,
  RefCallback,
} from "react";
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
          {result.map((item: SearchResult, index: number) => {
            if (result.length === index + 1) {
              return (
                <div
                  className={classes.item_container}
                  ref={lastBookElementRef}
                  key={item.primaryAccession}
                >
                  <div className={classes.grid_item}>{index}</div>
                  <div className={classes.grid_item}>
                    {item.primaryAccession}
                  </div>
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
                  <div className={classes.grid_item}>
                    {item.primaryAccession}
                  </div>
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
    </Fragment>
  );
};

export default MainPage;

{
  /* <div className={classes.table_container}>
<table>
  <thead>
    <tr className={classes.header_row}>
      <th>#</th>
      <th>Entry</th>
      <th>Entry Names</th>
      <th>Genes</th>
      <th>Organism</th>
      <th>Length</th>
    </tr>
  </thead>
  <tbody>
    {result.map((item: SearchResult, index: number) => (
      <tr ref={lastBookElementRef} key={item.primaryAccession}>
        <td>{index}</td>
        <td>{item.primaryAccession}</td>
        <td>{item.uniProtkbId}</td>
        <td>{item.genes[0].geneName.value}</td>
        <td>{item.organism.scientificName}</td>
        <td>{item.sequence.length}</td>
      </tr>
    ))}
  </tbody>
</table>
</div> */
}
