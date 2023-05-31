import { Fragment } from "react";
import { SearchResult } from "../../hooks/use-search";
import DataGridHeader from "./data-grid-header";
import DataGridBody from "./data-grid-body";

interface DataGridProps {
  data: SearchResult[];
  setData: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  lastBookElementRef: React.RefCallback<HTMLTableRowElement>;
}

const DataGrid = ({ data, setData, lastBookElementRef }: DataGridProps) => {
  return (
    <Fragment>
      <DataGridHeader setData={setData} data={data} />
      <DataGridBody data={data} lastBookElementRef={lastBookElementRef} />
    </Fragment>
  );
};

export default DataGrid;
