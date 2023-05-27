import { Fragment } from "react";
import { SearchResult } from "../../hooks/use-search";
import DataGridHeader from "./data-grid-header";
import DataGridBody from "./data-grid-body";

interface DataGridProps {
  query: string;
  data: SearchResult[];
  setData: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  result: SearchResult[];
  lastBookElementRef: React.RefCallback<HTMLTableRowElement>;
}

const DataGrid = ({
  query,
  data,
  setData,
  result,
  lastBookElementRef,
}: DataGridProps) => {
  return (
    <Fragment>
      <DataGridHeader query={query} setData={setData} result={result} />
      <DataGridBody data={data} lastBookElementRef={lastBookElementRef} />
    </Fragment>
  );
};

export default DataGrid;
