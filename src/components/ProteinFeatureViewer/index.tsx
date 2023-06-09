import "./index.css";
import { useAppSelector } from "../../hooks/useAppSelector";

import { proteinState } from "../../store/proteinSlice";

import ProtvistaUniprot from "protvista-uniprot";

window.customElements.define("protvista-uniprot", ProtvistaUniprot);

const ProteinFeatureViewer = () => {
  const proteinAccession = useAppSelector(
    (state: { protein: proteinState }) => state.protein.primaryAccession
  );
  console.log("proteinAccession: ", proteinAccession);
  return (
    <>
      <script src="https://d3js.org/d3.v4.min.js" defer></script>
      <protvista-uniprot accession={proteinAccession} />
    </>
  );
};

export default ProteinFeatureViewer;
