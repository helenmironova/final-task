import { Fragment } from "react";

import ProtvistaUniprot from "protvista-uniprot";
window.customElements.define("protvista-uniprot", ProtvistaUniprot);

const FeatureViewer = ({ accession }: { accession: string | undefined }) => {
  return (
    <Fragment>
      <protvista-uniprot accession={accession} />
    </Fragment>
  );
};

export default FeatureViewer;
