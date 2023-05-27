import { useState } from "react";
import classes from "./filter.module.css";
import filter from "../../assets/filter.svg";

const Filter = ({ setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [geneName, setGeneName] = useState("");
  const [organism, setOrganism] = useState("");
  const [sequenceLengthFrom, setSequenceLengthFrom] = useState("");
  const [sequenceLengthTo, setSequenceLengthTo] = useState("");
  const [annotationScore, setAnnotationScore] = useState("");
  const [proteinWith, setProteinWith] = useState("");

  const handleFilter = () => {
    const query = buildQuery();

    fetch(
      `https://rest.uniprot.org/uniprotkb/search?facets=model_organism,proteins_with,annotation_score&query=${query}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data.results);
        setShowModal(false);
      })
      .catch((error) => {
        console.error(error);
      });
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
      filters.push(`length:[${sequenceLengthFrom} TO ${sequenceLengthTo}]`);
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
                <input
                  type="text"
                  id="organism"
                  value={organism}
                  onChange={(e) => setOrganism(e.target.value)}
                />
              </div>
              <div className={classes.formGroup}>
                <label>Sequence Length</label>
                <div className={classes.rangeContainer}>
                  <input
                    type="number"
                    placeholder="From"
                    value={sequenceLengthFrom}
                    onChange={(e) => setSequenceLengthFrom(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="To"
                    value={sequenceLengthTo}
                    onChange={(e) => setSequenceLengthTo(e.target.value)}
                  />
                </div>
              </div>
              <div className={classes.formGroup}>
                <label htmlFor="annotationScore">Annotation Score</label>
                <input
                  type="number"
                  id="annotationScore"
                  value={annotationScore}
                  onChange={(e) => setAnnotationScore(e.target.value)}
                />
              </div>
              <div className={classes.formGroup}>
                <label htmlFor="proteinWith">Protein With</label>
                <input
                  type="text"
                  id="proteinWith"
                  value={proteinWith}
                  onChange={(e) => setProteinWith(e.target.value)}
                />
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
