import { useLocation, useParams } from "react-router-dom";
import "./index.css";
import { getProteinInfo } from "../../utils/search";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { RootState } from "../../store/store";

const ProteinFeatureViewer = (): JSX.Element => {
  const proteinInfoData = useAppSelector((state: RootState) => {
    if (state.protein) {
      return state.protein;
    }
  });

  return (
    <Box
      sx={{
        overflowWrap: "break-word",
      }}
    >
      <Typography>Protein viewer</Typography>
    </Box>
  );
};

export default ProteinFeatureViewer;
