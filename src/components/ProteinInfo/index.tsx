import { useParams } from "react-router-dom";
import "./index.css";
import { getProteinInfo } from "../../utils/search";
import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";

const ProteinInfo = ({ proteinInfoData }): JSX.Element => {
  console.log("proteinInfoData: ", proteinInfoData);
  if (proteinInfoData) {
    return (
      <Stack>
        <Stack direction="row">
          <Typography>
            {proteinInfoData.primaryAccession +
              " / " +
              proteinInfoData.uniProtkbId}
          </Typography>
          <Typography>{proteinInfoData.organismName}</Typography>
        </Stack>
        <Typography>Protein</Typography>
        <Typography>{proteinInfoData.feature}</Typography>
        <Typography>Gene</Typography>
        <Typography>{proteinInfoData.geneName}</Typography>
      </Stack>
    );
  } else {
    return <>Not found</>;
  }
};

export default ProteinInfo;
