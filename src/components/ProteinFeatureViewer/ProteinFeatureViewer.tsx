// @ts-nocheck
import { useAppSelector } from "../../app/hooks";
import { selectProteinDetails } from "../../features/proteinData/proteinDetailsSlice";

const ProteinFeatureViewer = () => {
  const proteinDetails = useAppSelector(selectProteinDetails);
  const accession = proteinDetails?.data?.primaryAccession;
  return (
    <div className="proteinFeatureViewer">
      <protvista-uniprot accession={accession} />
    </div>
  );
};

export default ProteinFeatureViewer;
