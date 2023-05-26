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
import { useNavigate } from "react-router-dom";
import {
  selectProteinData,
  scrollProteins,
  setScrollPosition,
} from "../../features/proteinData/proteinsSearchSlice";
import {
  selectProteinDetails,
  fetchProteinDetails,
  setId,
} from "../../features/proteinData/proteinDetailsSlice";

import React, { useEffect, useRef } from "react";

const DataTable = () => {
 
  const tableRef = useRef<HTMLTableElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const proteinDataState = useAppSelector(selectProteinData);
  const proteinDetails = useAppSelector(selectProteinDetails);
  const proteins = proteinDataState.data;
  let counter = 1;

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTop = proteinDataState.scrollPosition;
    }
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
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
      console.log(target.scrollTop)
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

  const tableRows = proteins?.map((item) => (
    <TableRow key={++counter} id={item.primaryAccession} onClick={handleClick}>
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
        {item?.comments[0]
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
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                    color="disabled"
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
                  Entry Names{" "}
                  <FilterListIcon
                    color="disabled"
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
                  Genes{" "}
                  <FilterListIcon
                    color="disabled"
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
                  Organism{" "}
                  <FilterListIcon
                    color="disabled"
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
                  Length{" "}
                  <FilterListIcon
                    color="disabled"
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
