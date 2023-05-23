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
import { useAppSelector } from "../../app/hooks";
import { selectProteinData } from "../../features/proteinData/proteinDataSlice";

const DataTable = () => {
  const proteinDataState = useAppSelector(selectProteinData);
  const proteins = proteinDataState.data;
  let counter = 1;

  const tableRows = proteins?.map((item) => (
    <TableRow key={++counter}>
      <TableCell>{counter}</TableCell>
      <TableCell sx={{ color: "#175BC0" }}>{item.primaryAccession}</TableCell>
      <TableCell sx={{ maxWidth: "150px" }}>{item.uniProtkbId}</TableCell>
      <TableCell sx={{ maxWidth: "150px" }}>
        {item?.genes?.map((item) => item.geneName?.value).join(", ")}
      </TableCell>
      <TableCell sx={{ maxWidth: "150px" }}>
        <span className="dataTable__organism">
          {item?.organism?.scientificName}
        </span>
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
        <TableContainer sx={{ maxHeight: "70vh" }}>
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
