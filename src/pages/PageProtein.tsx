import Header from "../components/Header";
import { Stack } from "@mui/material";
import ProteinDetails from "../components/ProteinDetails";
import ProteinInfo from "../components/ProteinInfo";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProteinInfo } from "../utils/search";
import ProteinTabs from "../components/ProteinTabs";
import { useSelector } from "react-redux";
import { useAppSelector } from "../hooks/useAppSelector";
import { proteinState, setProtein } from "../store/proteinSlice";
import { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";

const PageSearch = (): JSX.Element => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      getProteinInfo(id)
        .then((data) => {
          const newProtein: proteinState = {
            primaryAccession: data.primaryAccession,
            uniProtkbId: data.uniProtkbId,
            organismName: data.organism.scientificName,
            feature: data.features[0].description,
            geneName: data.genes[0].geneName.value,
            length: data.sequence.length,
            mass: data.sequence.molWeight,
            lastUpdated: data.entryAudit.lastSequenceUpdateDate,
            checksum: data.sequence.crc64,
            sequence: data.sequence.value,
          };

          dispatch(setProtein(newProtein));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch, id]);
  return (
    <Stack width="100%" height="100%">
      <Header />
      <Stack padding="30px 130px">
        <ProteinInfo />
        <ProteinTabs />
      </Stack>
    </Stack>
  );
};

export default PageSearch;
