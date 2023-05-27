import { Fragment } from "react";

import ProtvistaUniprot from "protvista-uniprot";
window.customElements.define("protvista-uniprot", ProtvistaUniprot);

const FeatureViewer = ({ accession }: { accession: string | undefined }) => {
  console.log("accession", accession);

  return (
    <Fragment>
      <protvista-uniprot accession={accession} />
    </Fragment>
  );
};

export default FeatureViewer;
