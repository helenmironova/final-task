import { Fragment } from "react";
import classes from "./data-grid-body.module.css";

import { SearchResult } from "../../hooks/use-search";
import { Link } from "react-router-dom";

interface DataGridBodyProps {
  data: SearchResult[];
  lastBookElementRef: React.RefCallback<HTMLTableRowElement>;
}
const DataGridBody = ({ data, lastBookElementRef }: DataGridBodyProps) => {
  return (
    <Fragment>
      <main className={classes.grid_scroll}>
        {data.map((item: SearchResult, index: number) => (
          <div
            className={classes.item_container}
            ref={index === data.length - 1 ? lastBookElementRef : null}
            key={item.primaryAccession}
          >
            <div className={classes.grid_item}>{index}</div>
            <Link
              className={classes.primaryAccession}
              to={`/protein/${item.primaryAccession}`}
            >
              {item.primaryAccession}
            </Link>
            <div className={classes.uniProtkbId}>{item.uniProtkbId}</div>
            <div className={classes.genes}>
              {item.genes && item.genes.length > 0 && item.genes[0].geneName
                ? item.genes[0].geneName.value
                : "N/A"}
            </div>
            <div className={classes.organism}>
              {item.organism.scientificName}
            </div>
            <div className={classes.grid_item}>
              {item.comments &&
              item.comments?.length > 0 &&
              item.comments[0].subcellularLocations?.length > 0 &&
              item.comments[0].subcellularLocations[0]?.location?.value
                ? item.comments[0].subcellularLocations[0].location?.value
                : "N/A"}
            </div>
            <div className={classes.grid_item}>{item.sequence.length}</div>
          </div>
        ))}
      </main>
    </Fragment>
  );
};

export default DataGridBody;
