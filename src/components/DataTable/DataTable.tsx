import { TableCell } from "@mui/material";
import { Table, Column, RowMouseEventHandlerParams } from "react-virtualized";
import "react-virtualized/styles.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectProteinData,
  scrollProteins,
  setScrollPosition,
  setSortValue,
  fetchProteins,
} from "../../features/proteinData/proteinsSearchSlice";
import {
  selectProteinDetails,
  fetchProteinDetails,
  setId,
} from "../../features/proteinData/proteinDetailsSlice";
import "./datatable.css";

import { useEffect, useRef } from "react";

const DataTable = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const proteinDataState = useAppSelector(selectProteinData);
  const proteinDetails = useAppSelector(selectProteinDetails);
  const proteins = proteinDataState.data;
  const sortType = proteinDataState.sort.type;
  const sortValue = proteinDataState.sort.value;
  const searchValue = location.search.split("=")[1];
  const rowHeight = 50; // Set the height of each row in pixels
  const tableHeight = 500; // Set the desired height of the table in pixels
  const rowCount = proteins ? proteins.length : 1;

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTop = proteinDataState.scrollPosition;
    }
  });

  const openProtein = (info: RowMouseEventHandlerParams) => {
    const rowId = info.rowData.primaryAccession;
    dispatch(setId(rowId));
    dispatch(fetchProteinDetails({ entry: rowId }));
    if (proteinDetails.loading === false) {
      navigate(`/protein/${rowId}`);
    }
  };

  const handleScroll = ({
    clientHeight,
    scrollTop,
    scrollHeight,
  }: {
    scrollTop: number;
    scrollHeight: number;
    clientHeight: number;
  }) => {
    dispatch(setScrollPosition(scrollTop));

    if (scrollTop + clientHeight >= scrollHeight) {
      if (proteinDataState.link) {
        const string = proteinDataState.link.replace(/<|>/g, "");
        const match = string.match(/[^;]+/);
        if (match) {
          const url = match[0];
          dispatch(scrollProteins({ link: url }));
        }
      }
    }
  };
  const handleSort = (
    typeOfSortIcon:
      | "id"
      | "accession"
      | "gene"
      | "organism_name"
      | "length"
      | "default"
  ) => {
    if (sortType === typeOfSortIcon && sortValue === "asc") {
      dispatch(setSortValue({ type: typeOfSortIcon, value: "desc" }));
      dispatch(
        fetchProteins({
          query: searchValue,
          sort: { type: typeOfSortIcon, value: "desc" },
        })
      );
    } else if (sortType === typeOfSortIcon && sortValue === "desc") {
      dispatch(setSortValue({ type: "default", value: "default" }));
      dispatch(
        fetchProteins({
          query: searchValue,
          sort: { type: "accession", value: "asc" },
        })
      );
    } else {
      dispatch(setSortValue({ type: typeOfSortIcon, value: "asc" }));
      dispatch(
        fetchProteins({
          query: searchValue,
          sort: { type: typeOfSortIcon, value: "asc" },
        })
      );
    }
  };

  return (
    <div className="dataTable">
      <Table
        width={1150}
        height={tableHeight}
        headerHeight={50}
        rowHeight={rowHeight}
        rowCount={rowCount}
        rowGetter={({ index }) => (proteins ? proteins[index] : "")}
        onScroll={handleScroll}
        onRowClick={openProtein}
        headerStyle={{
          backgroundColor: "#F5F5F5",
          height: "40px",
          display: "flex",
          alignItems: "center",
          borderRadius: "8px",
          justifyContent: "space-between",
          padding: "0 10px",
        }}
      >
        <Column
          label="#"
          dataKey="primaryAccession"
          width={50}
          style={{ paddingLeft: "10px" }}
          cellRenderer={({ rowIndex }) => rowIndex + 1}
        />
        <Column
          label={
            <>
              Entry
              <FilterListIcon
                onClick={() => handleSort("accession")}
                color={sortType === "accession" ? "info" : "disabled"}
                sx={{
                  cursor: "pointer",
                  marginLeft: "60px"
                }}
              />
            </>
          }
          dataKey="primaryAccession"
          width={150}
          style={{ paddingLeft: "20px", color: "#175BC0" }}
          cellRenderer={({ rowData }) => <div>{rowData.primaryAccession}</div>}
        />
        <Column
          label={
            <>
              Entry names
              <FilterListIcon
                onClick={() => handleSort("id")}
                color={sortType === "id" ? "info" : "disabled"}
                sx={{
                  cursor: "pointer",
                  marginLeft: "10px"
                }}
              />
            </>
          }
          dataKey="uniProtkbId"
          width={150}
          style={{ paddingLeft: "20px" }}
          cellRenderer={({ rowData }) => <div>{rowData.uniProtkbId}</div>}
        />
        <Column
          label={
            <>
              Genes
              <FilterListIcon
                onClick={() => handleSort("gene")}
                color={sortType === "gene" ? "info" : "disabled"}
                sx={{
                  cursor: "pointer",
                  marginLeft: "60px"
                }}
              />
            </>
          }
          dataKey="genes"
          width={150}
          style={{ paddingLeft: "20px" }}
          cellRenderer={({ rowData }) => (
            <div>
              {rowData?.genes
                ?.map(
                  (item: { geneName: { value: string } }) =>
                    item.geneName?.value
                )
                .join(", ")}
            </div>
          )}
        />
        <Column
          label={
            <>
              Organism
              <FilterListIcon
                onClick={() => handleSort("organism_name")}
                color={sortType === "organism_name" ? "info" : "disabled"}
                sx={{
                  cursor: "pointer",
                  marginLeft: "120px"
                }}
              />
            </>
          }
          dataKey="organism"
          width={250}
          cellRenderer={({ rowData }) => (
            <div className="dataTable__organism">
              {rowData?.organism?.scientificName?.substring(0, 25) + "..."}
            </div>
          )}
        />
        <Column
          label="Subcellular Location"
          dataKey="comments"
          width={200}
          headerStyle={{ margin: "5px" }}
          cellRenderer={({ rowData }) => (
            <TableCell sx={{ maxWidth: "150px" }}>
              {rowData?.comments?.length > 1
                ? rowData.comments[0].subcellularLocations
                    .map(
                      (location: {
                        location: {
                          value: string;
                        };
                      }) => location.location.value
                    )
                    .join(" ")
                : ""}
            </TableCell>
          )}
        />
        <Column
          label={
            <>
              Length
              <FilterListIcon
                onClick={() => handleSort("length")}
                color={sortType === "length" ? "info" : "disabled"}
                sx={{
                  cursor: "pointer",
                  marginLeft: "7px"
                }}
              />
            </>
          }
          dataKey="sequence"
          width={100}
          cellRenderer={({ rowData }) => <div>{rowData?.sequence?.length}</div>}
        />
      </Table>
    </div>
  );
};

export default DataTable;
