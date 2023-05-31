import classes from "./protein-page.module.css";
import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import Navigation from "../../components/nav-bar";
import ProteinDetails from "../../components/protein-details";
import LoadingSpinner from "../../components/loading-spinner";
import ProteinPublications from "../../components/protein-publications";
import { fetchData } from "../../api/axios/fetchData";
import FeatureViewer from "../../components/feature-viewer";

interface ProteinData {
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

interface Publications {
  citation: {
    title: string;
    authors: string;
    journal: string;
    citationCrossReferences: { id: string }[];
  };
  references: {
    source: {
      name: string;
    };
    sourceCategories: string[];
  }[];
}

const ProteinPage = () => {
  const [state, setState] = useState<ProteinData | null>(null);
  const [publications, setPublications] = useState<Publications[] | null>(null);
  const [view, setView] = useState("details");
  const { Id } = useParams();

  console.log("publications", publications);

  useEffect(() => {
    const url = `https://rest.uniprot.org/uniprotkb/${Id}/publications`;
    fetchData(url).then((res) => setPublications(res.results));
  }, []);

  useEffect(() => {
    let url = `https://rest.uniprot.org/uniprotkb/${Id}`;
    fetchData(url).then((res) => setState(res));
  }, []);

  if (!state) {
    return <LoadingSpinner />;
  } else {
    return (
      <Fragment>
        <Navigation />
        <main className={classes.main_container}>
          <div className={classes.headline_container}>
            <h2>
              {state.primaryAccession} / {state.uniProtkbId}
            </h2>
            <div className={classes.scientificName}>
              {state.organism.scientificName}
            </div>
          </div>
          <div className={classes.content}>
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

              {view === "feature" && <FeatureViewer accession={Id} />}

              {view === "publications" &&
                publications !== null &&
                publications.map((item: Publications, index) => {
                  return (
                    <ProteinPublications
                      key={index}
                      title={item.citation.title}
                      authors={item.citation.authors}
                      categories={item.references[0]?.sourceCategories}
                      source={item.references[0].source.name}
                      journals={item.citation.journal}
                      link={item.citation.citationCrossReferences}
                    />
                  );
                })}
            </div>
          </div>
        </main>
      </Fragment>
    );
  }
};

export default ProteinPage;
