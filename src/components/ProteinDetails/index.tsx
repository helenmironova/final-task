import { useLocation, useParams } from "react-router-dom";
import "./index.css";
import { getProteinInfo } from "../../utils/search";
import { Box, Typography } from "@mui/material";

const ProteinDetails = ({ proteinInfoData }): JSX.Element => {
  return (
    <Box
      sx={{
        overflowWrap: "break-word",
      }}
    >
      <Typography>{proteinInfoData.sequence}</Typography>
    </Box>
  );
};

export default ProteinDetails;
