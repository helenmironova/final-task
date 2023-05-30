import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
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
import { selectFilter } from "../../features/proteinData/filterPanelSlice";

import React, { useEffect, useRef } from "react";

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
  const filter = useAppSelector(selectFilter);
  const filterOptions = filter.data?.values;
  const searchValue = location.search.split("=")[1];
  let counter = 1;

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTop = proteinDataState.scrollPosition;
    }
  });

  const handleSearch = (event: React.MouseEvent<HTMLDivElement>) => {
    const rowId = (
      (event.target as HTMLTableCellElement)
        .parentElement as HTMLTableRowElement
    ).id;
    dispatch(setId(rowId));
    dispatch(fetchProteinDetails({ entry: rowId }));
    if (proteinDetails.loading === false) {
      navigate(`/protein/${rowId}`);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLTableElement>) => {
    const target = event.currentTarget;
    if (tableRef.current) {
      dispatch(setScrollPosition(target.scrollTop));
    }
    if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
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

  const tableRows = proteins?.map((item) => (
    <TableRow key={++counter} id={item.primaryAccession} onClick={handleSearch}>
      <TableCell>{counter}</TableCell>
      <TableCell sx={{ color: "#175BC0" }}>{item.primaryAccession}</TableCell>
      <TableCell sx={{ maxWidth: "150px" }}>{item.uniProtkbId}</TableCell>
      <TableCell sx={{ maxWidth: "150px" }}>
        {item?.genes?.map((item) => item.geneName?.value).join(", ")}
      </TableCell>
      <TableCell sx={{ maxWidth: "150px" }}>
        {item?.organism?.scientificName}
      </TableCell>
      <TableCell sx={{ maxWidth: "150px" }}>
        {item?.comments?.length > 1
          ? item.comments[0].subcellularLocations
              .map((item) => item.location.value)
              .join(" ")
          : ""}
      </TableCell>
      <TableCell sx={{ maxWidth: "150px" }}>{item?.sequence?.length}</TableCell>
    </TableRow>
  ));

  return (
    <div className="dataTable">
      <Paper sx={{ width: "100%", overflow: "hidden", marginTop:"30px" }}>
        <TableContainer
          sx={{ maxHeight: "70vh" }}
          ref={tableRef}
          onScroll={handleScroll}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ borderRadius: "10px" }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F5F5",
                    fontWeight: "700",
                  }}
                >
                  #
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F5F5",
                    fontWeight: "700",
                  }}
                >
                  Entry{" "}
                  <FilterListIcon
                    onClick={() => handleSort("accession")}
                    color={sortType === "accession" ? "info" : "disabled"}
                    sx={{
                      position: "absolute",
                      top: "15px",
                      marginLeft: "8px",
                      cursor: "pointer",
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F5F5",
                    fontWeight: "700",
                  }}
                >
                  Entry Names
                  <FilterListIcon
                   onClick={() => handleSort("id")}
                    color={sortType === "id" ? "info" : "disabled"}
                    sx={{
                      position: "absolute",
                      top: "15px",
                      marginLeft: "10px",
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F5F5",
                    fontWeight: "700",
                  }}
                >
                  Genes
                  <FilterListIcon
                  onClick={() => handleSort("gene")}
                    color={sortType === "gene" ? "info" : "disabled"}
                    sx={{
                      position: "absolute",
                      top: "15px",
                      marginLeft: "10px",
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F5F5",
                    fontWeight: "700",
                  }}
                >
                  Organism
                  <FilterListIcon
                  onClick={() => handleSort("organism_name")}
                    color={sortType === "organism_name" ? "info" : "disabled"}
                    sx={{
                      position: "absolute",
                      top: "15px",
                      marginLeft: "10px",
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F5F5",
                    fontWeight: "700",
                  }}
                >
                  Subcellular Location
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F5F5",
                    fontWeight: "700",
                  }}
                >
                  Length
                  <FilterListIcon
                  onClick={() => handleSort("length")}
                    color={sortType === "length" ? "info" : "disabled"}
                    sx={{
                      position: "absolute",
                      top: "15px",
                      marginLeft: "10px",
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableRows}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default DataTable;
