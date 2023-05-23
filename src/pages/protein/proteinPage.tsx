import classes from "./proteinPage.module.css";
import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import Navigation from "../../components/nav-bar/navigation";
import ProteinDetails from "../../components/proteinDetails/proteinDetails";
import ProteinPublications from "../../components/protein-publications/proteinPublications";
import { fetchData } from "../../api/axios/fetchData";

interface IProteinData {
  primaryAccession: string;
  uniProtkbId: string;
  genes: [{ geneName: { value: string } }];
  organism: {
    scientificName: string;
  };
  proteinDescription: {
    recommendedName: {
      fullName: {
        value: string;
      };
    };
  };
  sequence: {
    length: string;
    molWeight: number;
    value: string;
  };
  entryAudit: {
    lastSequenceUpdateDate: Date;
  };
}

interface IPublications {
  citation: {
    title: string;
    authors: string;
    journal: string;
  };
}

function ProteinPage() {
  const [state, setState] = useState<IProteinData | null>(null);
  const [publications, setPublications] = useState<IPublications[] | null>(
    null
  );
  const [view, setView] = useState("details");
  const { Id } = useParams();

  console.log("STATE", publications);

  useEffect(() => {
    const url = `https://rest.uniprot.org/uniprotkb/${Id}/publications`;
    fetchData(url).then((res) => setPublications(res.results));
  }, []);

  useEffect(() => {
    let url = `https://rest.uniprot.org/uniprotkb/${Id}`;
    fetchData(url).then((res) => setState(res));
  }, []);

  if (!state) {
    return <div>Loading...</div>;
  } else {
    return (
      <Fragment>
        <Navigation />
        <div className={classes.main_container}>
          <div className={classes.headline_container}>
            <h2>
              {state.primaryAccession} / {state.uniProtkbId}
            </h2>
            <div className={classes.scientificName}>
              {state.organism.scientificName}
            </div>
          </div>
          <div>
            <h4>Protein</h4>
            <p>{state.proteinDescription.recommendedName.fullName.value}</p>
            <h4>Gene</h4>
            <p>{state.genes[0].geneName.value}</p>
          </div>
          <div className={classes.sections}>
            <div className={classes.headline}>
              <div
                className={`${view === "details" ? classes.active : ""}`}
                onClick={() => {
                  setView("details");
                }}
              >
                Details
              </div>
              <div
                className={`${view === "feature" ? classes.active : ""}`}
                onClick={() => {
                  setView("feature");
                }}
              >
                Feature viewer
              </div>
              <div
                className={`${view === "publications" ? classes.active : ""}`}
                onClick={() => {
                  setView("publications");
                }}
              >
                Publications
              </div>
            </div>
            <div className={classes.publication_container}>
              {view === "details" && (
                <ProteinDetails
                  length={state.sequence.length}
                  weight={state.sequence.molWeight}
                  lastUpdateDate={state.entryAudit.lastSequenceUpdateDate}
                  checkSum={state.uniProtkbId}
                  sectionText={state.sequence.value}
                />
              )}
              {view === "publications" &&
                publications !== null &&
                publications.map((item: IPublications) => {
                  return (
                    <ProteinPublications
                      title={item.citation.title}
                      authors={item.citation.authors}
                      journals={item.citation.journal}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ProteinPage;
