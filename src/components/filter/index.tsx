import { useState } from "react";
import classes from "./filter.module.css";
import filter from "../../assets/filter.svg";

interface FilterProps {
  setFilterQuery: React.Dispatch<React.SetStateAction<string>>;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  setRequestType: React.Dispatch<React.SetStateAction<string>>;
}

const Filter = ({ setFilterQuery, setSize, setRequestType }: FilterProps) => {
  const [showModal, setShowModal] = useState(false);
  const [geneName, setGeneName] = useState("");
  const [organism, setOrganism] = useState("");
  const [sequenceLengthFrom, setSequenceLengthFrom] = useState("");
  const [sequenceLengthTo, setSequenceLengthTo] = useState("");
  const [annotationScore, setAnnotationScore] = useState("");
  const [proteinWith, setProteinWith] = useState("");

  const organismOptions = [
    "Homo Sapiens",
    "Oryza sativa subsp. japonica",
    "Arabidopsis thaliana",
    "Rattus norvegicus",
    "Mus musculus",
    "S.cerevisiae",
  ];

  const annotationScoreOptions = [1, 2, 3, 4, 5];
  const proteinWithOptions = [
    "3D structure",
    "Active site",
    "Activity regulation",
    "Alternative products",
    "Alternative splicing",
    "Beta Strand",
    "Binary interaction",
    "Binding site",
    "Biophysical properties",
    "Biotechnological use",
  ];

  const handleFilter = () => {
    const query = buildQuery();
    setSize(25);
    setFilterQuery(query);
    setRequestType("filter");
    setShowModal(false);
  };

  const buildQuery = () => {
    const filters = [];

    
    if (geneName) {
      filters.push(`gene:${geneName}`);
    }

    if (organism) {
      filters.push(`model_organism:${organism}`);
    }

    if (sequenceLengthFrom && sequenceLengthTo) {
      const lengthRange = `length:[${sequenceLengthFrom} TO ${sequenceLengthTo}]`;
      filters.push(encodeURIComponent(lengthRange));
    }

    if (annotationScore) {
      filters.push(`annotation_score:${annotationScore}`);
    }

    if (proteinWith) {
      filters.push(`proteins_with:${proteinWith}`);
    }

    return filters.join(" AND ");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <img
        className={classes.filter}
        src={filter}
        alt="Filter Icon"
        onClick={() => setShowModal(true)}
      />

      {showModal && (
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            <div className={classes.modalHeader}>
              <h2>Filter</h2>
            </div>
            <div className={classes.modalBody}>
              <div className={classes.formGroup}>
                <label htmlFor="geneName">Gene Name</label>
                <input
                  type="text"
                  id="geneName"
                  value={geneName}
                  onChange={(e) => setGeneName(e.target.value)}
                />
              </div>
              <div className={classes.formGroup}>
                <label htmlFor="organism">Organism</label>
                <select
                  id="organism"
                  value={organism}
                  onChange={(e) => setOrganism(e.target.value)}
                >
                  <option value="">Select an organism</option>
                  {organismOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className={classes.rangeContainer}>
                <label htmlFor="sequenceLengthFrom">Sequence Length</label>
                <div>
                  <input
                    placeholder="From"
                    type="text"
                    id="sequenceLengthFrom"
                    value={sequenceLengthFrom}
                    onChange={(e) => setSequenceLengthFrom(e.target.value)}
                  />
                  <input
                    placeholder="To"
                    type="text"
                    id="sequenceLengthTo"
                    value={sequenceLengthTo}
                    onChange={(e) => setSequenceLengthTo(e.target.value)}
                  />
                </div>
              </div>

              <div className={classes.formGroup}>
                <label htmlFor="annotationScore">Annotation Score</label>
                <select
                  id="annotationScore"
                  value={annotationScore}
                  onChange={(e) => setAnnotationScore(e.target.value)}
                >
                  <option value="">Select an annotation score</option>
                  {annotationScoreOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className={classes.formGroup}>
                <label htmlFor="proteinWith">Protein With</label>
                <select
                  id="proteinWith"
                  value={proteinWith}
                  onChange={(e) => setProteinWith(e.target.value)}
                >
                  <option value="">Select a protein</option>
                  {proteinWithOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={classes.modalFooter}>
              <button className={classes.cancelButton} onClick={closeModal}>
                Cancel
              </button>
              <button className={classes.filterButton} onClick={handleFilter}>
                Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
