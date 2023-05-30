import Button from "@mui/material/Button";
import { useAppSelector } from "../../app/hooks";
import { selectProteinPublications } from "../../features/proteinData/proteinPublications";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "./proteinPublications.css";
import { NavLink } from "react-router-dom";

const ProteinPublications = () => {
  const publications = useAppSelector(selectProteinPublications);
  let counter = 1;

  return (
    <div className="proteinPublications">
      {publications?.data?.map((publication) => (
        <div className="publicationCard" key={counter++}>
          <h3>{publication?.citation?.title}</h3>
          <div className="publicationCard__authors">
            {publication?.citation?.authors?.join(", ").length > 200
              ? publication?.citation?.authors?.join(", ").substring(0, 200) +
                "  ..."
              : publication?.citation?.authors?.join(", ")}
          </div>
          <div>
            <span className="publicationCard__title--small">Categories: </span>
            {publication?.references[0]
              ? publication.references[0].sourceCategories?.join(", ")
              : ""}
          </div>
          <div>
            <span className="publicationCard__title--small"> Cited for: </span>
            {publication?.references[0]
              ? publication?.references[0].referencePositions?.join(", ")
              : ""}
          </div>
          <div>
            <span className="publicationCard__title--small">Source: </span>

            {publication?.references
              ? publication?.references[0].source?.name
              : ""}
          </div>
          <div>
            {publication?.citation?.citationCrossReferences?.map((item) =>
              item?.database === "PubMed" ? (
                <span>
                  <NavLink
                    to={`https://pubmed.ncbi.nlm.nih.gov/${item.id}`}
                    target="_blank"
                  >
                    <Button
                      sx={{
                        border: "1px solid #3C86F4",
                        borderRadius: "4px",
                        width: "fit-content",
                        height: "25px",
                        textTransform: "capitalize",
                        marginRight: "10px",
                      }}
                      variant="text"
                    >
                      PubMed <OpenInNewIcon />
                    </Button>
                  </NavLink>
                  <NavLink
                    to={`https://europepmc.org/article/MED/${item.id}`}
                    target="_blank"
                  >
                    <Button
                      className="btn__publicationLink"
                      sx={{
                        border: "1px solid #3C86F4",
                        borderRadius: "4px",
                        width: "fit-content",
                        height: "25px",
                        textTransform: "capitalize",
                        marginRight: "10px",
                      }}
                      variant="text"
                    >
                      Europe PMC <OpenInNewIcon />
                    </Button>
                  </NavLink>
                </span>
              ) : (
                ""
              )
            )}

            <span>
              <NavLink
                to={
                  publication?.citation?.citationCrossReferences?.length > 1
                    ? `https://dx.doi.org/${publication?.citation?.citationCrossReferences?.filter( item => item.database === "DOI").map(item => item.id).join("")}`
                    : ""
                }
                target="_blank"
                onClick={(e) => {
                  if (!publication.citation.citationCrossReferences) {
                    e.preventDefault();
                  }
                  if (
                    publication?.citation?.citationCrossReferences?.length <= 1
                  ) {
                    e.preventDefault();
                  }
                }}
              >
                <Button
                  disabled={
                    publication.citation.citationCrossReferences
                      ? publication.citation.citationCrossReferences.filter(
                          (item) => item.database === "DOI"
                        ).length <= 0
                      : true
                  }
                  sx={{
                    borderRadius: "4px",
                    width: "fit-content",
                    height: "25px",
                    textTransform: "capitalize",
                    marginRight: "10px",
                    border: publication.citation.citationCrossReferences
                      ? publication.citation.citationCrossReferences.filter(
                          (item) => item.database === "DOI"
                        ).length > 0
                        ? "1px solid #3C86F4"
                        : "none"
                      : "none",
                  }}
                  variant="text"
                >
                  {" "}
                  {publication.citation.journal} {publication.citation.volume}:
                  {publication.citation.firstPage}-
                  {publication.citation.lastPage}{" "}
                  {publication.citation.publicationDate}
                  <OpenInNewIcon />
                </Button>
              </NavLink>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProteinPublications;
