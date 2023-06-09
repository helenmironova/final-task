import { useLocation, useParams } from "react-router-dom";
import "./index.css";
import { getProteinInfo } from "../../utils/search";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { RootState } from "../../store/store";
import { getPublications } from "../../utils/publications";
import { useEffect, useState } from "react";
import { proteinState } from "../../store/proteinSlice";

const ProteinPublications = (): JSX.Element => {
  // const proteinInfoData = useAppSelector((state: RootState) => {
  //   if (state.protein) {
  //     return state.protein;
  //   }
  // });
  const [publications, setPublications] = useState([]);
  const proteinAccession = useAppSelector(
    (state: { protein: proteinState }) => state.protein.primaryAccession
  );
  useEffect(() => {
    getPublications(proteinAccession).then((publicationComponents) => {
      setPublications(publicationComponents);
    });
  }, [proteinAccession]);

  return (
    <Box
      sx={{
        overflowWrap: "break-word",
      }}
    >
      {publications}
    </Box>
  );
};

export default ProteinPublications;
