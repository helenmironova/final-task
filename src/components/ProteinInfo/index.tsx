import { useParams } from "react-router-dom";
import "./index.css";
import { getProteinInfo } from "../../utils/search";
import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { proteinState, setProtein } from "../../store/proteinSlice";
import { RootState } from "../../store/store";

const ProteinInfo = (): JSX.Element => {
  const proteinInfoData = useAppSelector((state: RootState) => {
    if (state.protein) {
      return state.protein;
    }
  });

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
