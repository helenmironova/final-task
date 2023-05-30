import { Fragment } from "react";
import classes from "./data-grid-body.module.css";

import { SearchResult } from "../../hooks/use-search";
import { Link } from "react-router-dom";

interface DataGridBodyProps {
  data: SearchResult[];
  lastBookElementRef: React.RefCallback<HTMLTableRowElement>;
}
const DataGridBody = ({ data, lastBookElementRef }: DataGridBodyProps) => {
  console.log(data);
  return (
    <Fragment>
      <div className={classes.grid_scroll}>
        {data.map((item: SearchResult, index: number) => (
          <div
            className={classes.item_container}
            ref={index === data.length - 1 ? lastBookElementRef : null}
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
              {item.genes && item.genes.length > 0 && item.genes[0].geneName
                ? item.genes[0].geneName.value
                : "N/A"}
            </div>
            <div className={classes.grid_item}>
              {item.organism.scientificName}
            </div>
            <div className={classes.grid_item}>
              {item.comments &&
              item.comments.length > 0 &&
              item.comments[0].subcellularLocations.length > 0 &&
              item.comments[0].subcellularLocations[0]?.location?.value
                ? item.comments[0].subcellularLocations[0].location.value
                : "N/A"}
            </div>
            <div className={classes.grid_item}>{item.sequence.length}</div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default DataGridBody;
