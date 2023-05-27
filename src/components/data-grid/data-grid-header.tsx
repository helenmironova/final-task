import { Fragment, useState } from "react";
import classes from "./data-grid-header.module.css";
import Sorting from "../../assets/Vector.svg";

import { SearchResult } from "../../hooks/use-search";

interface DataGriHeaderdProps {
  query: string;
  setData: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  result: SearchResult[];
}

const DataGridHeader = ({ query, setData, result }: DataGriHeaderdProps) => {
  const [order, setOrder] = useState("ASC");

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
    </Fragment>
  );
};

export default DataGridHeader;
