import Header from "../components/Header";
import { Stack } from "@mui/material";
import ProteinDetails from "../components/ProteinDetails";
import ProteinInfo from "../components/ProteinInfo";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProteinInfo } from "../utils/search";

const PageSearch = (): JSX.Element => {
  const { id } = useParams();
  const [proteinInfoData, setProteinInfoData] = useState(null);

  useEffect(() => {
    if (id) {
      getProteinInfo(id).then((data) => {
        setProteinInfoData({
          primaryAccession: data.primaryAccession,
          uniProtkbId: data.uniProtkbId,
          organismName: data.organism.scientificName,
          feature: data.features[0].description,
          geneName: data.genes[0].geneName.value,
          sequence: data.sequence.value,
        });
      });
    }
  }, [id]);

  return (
    <Stack width="100%" height="100%">
      <Header />
      <ProteinInfo proteinInfoData={proteinInfoData} />
      <ProteinDetails proteinInfoData={proteinInfoData} />
    </Stack>
  );
};

export default PageSearch;
