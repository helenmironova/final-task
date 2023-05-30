import { Fragment, useState } from "react";
import classes from "./data-grid-header.module.css";
import Sorting from "../../assets/Vector.svg";

import { SearchResult } from "../../hooks/use-search";

interface DataGriHeaderdProps {
  setData: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  data: SearchResult[];
}

const DataGridHeader = ({ setData, data }: DataGriHeaderdProps) => {
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
      const sorted = [...data].sort((a, b) => {
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
      const sorted = [...data].sort((a, b) => {
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
      {data.length !== 0 && (
        <div className={classes.grid_container}>
          <h4 className={classes.grid_header}>#</h4>
          <div className={classes.grid_header}>
            <h4>Entry </h4>
            <img
              src={Sorting}
              alt="Sorting Icon"
              onClick={() => sortingHandler(["primaryAccession"])}
            />
          </div>
          <div className={classes.grid_header}>
            <h4>Entry Names </h4>
            <img
              src={Sorting}
              alt="Sorting Icon"
              onClick={() => sortingHandler(["uniProtkbId"])}
            />
          </div>
          <div className={classes.grid_header}>
            <h4>Genes </h4>
            <img
              src={Sorting}
              alt="Sorting Icon"
              onClick={() =>
                sortingHandler(["genes", "0", "geneName", "value"])
              }
            />
          </div>
          <div className={classes.grid_header}>
            <h4>Organism</h4>
            <img
              src={Sorting}
              alt="Sorting Icon"
              onClick={() => sortingHandler(["organism", "scientificName"])}
            />
          </div>
          <div className={classes.grid_header}>
            <h4>Subcellular Location</h4>
            <img
              src={Sorting}
              alt="Sorting Icon"
              onClick={() =>
                sortingHandler([
                  "comments",
                  "0",
                  "subcellularLocations",
                  "0",
                  "location",
                ])
              }
            />
          </div>
          <div className={classes.grid_header}>
            <h4>Length</h4>
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
