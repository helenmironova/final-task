import React from "react"
import { Link } from "react-router-dom"

import ExternalLinkIcon from "../../assets/external-link-icon"
import Wrapper from "./publications-styled"

const Publications = ({ publications }: any) => {
  return (
    <Wrapper>
      {publications &&
        publications.map((publication: any) => (
          <div key={publication.citation.id} className="publication-container">
            <h3 className="publication-title">{publication.citation.title}</h3>
            <p className="publication-authors">
              {publication.citation.authors && (
                <React.Fragment>
                  {publication.citation.authors.length > 15
                    ? publication.citation.authors
                        .slice(0, 15)
                        .map((author: string, index: number) => {
                          return index ===
                            publication.citation.authors.slice(0, 15).length -
                              1 ? (
                            <span key={index}>
                              {author}
                              {"..."}
                            </span>
                          ) : (
                            <span key={index}>
                              {author}
                              {", "}
                            </span>
                          )
                        })
                    : publication.citation.authors.map(
                        (author: string, index: number) => {
                          return index ===
                            publication.citation.authors.length - 1 ? (
                            <span key={index}>{author}</span>
                          ) : (
                            <span key={index}>
                              {author}
                              {", "}
                            </span>
                          )
                        },
                      )}
                </React.Fragment>
              )}
            </p>
            <p>
              <span className="subtitle-grey-text">{"Categories: "}</span>
              {publication.references &&
              publication.references[0] &&
              publication.references[0].sourceCategories
                ? publication.references[0].sourceCategories.join(", ")
                : ""}
            </p>
            <p>
              <span className="subtitle-grey-text">{"Cited for: "}</span>
              {publication.references &&
              publication.references[0] &&
              publication.references[0].referencePositions
                ? publication.references[0].referencePositions.join(", ")
                : ""}
            </p>
            <p>
              <span className="subtitle-grey-text">{"Source: "}</span>
              <span>
                {publication.references &&
                  publication.references[0] &&
                  publication.references[0].source.name}
              </span>
            </p>

            {publication.citation.citationCrossReferences &&
            publication.citation.citationCrossReferences[0] ? (
              <div className="publication-links-container">
                <Link
                  className="publication-link"
                  to={`https://pubmed.ncbi.nlm.nih.gov/${publication.citation.citationCrossReferences[0].id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {"PubMed "}
                  {<ExternalLinkIcon />}
                </Link>{" "}
                <Link
                  className="publication-link"
                  to={`https://europepmc.org/article/MED/${publication.citation.citationCrossReferences[0].id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {"Europe PMC "}
                  {<ExternalLinkIcon />}
                </Link>{" "}
                <Link
                  className={`publication-link ${
                    !publication.citation.citationCrossReferences[1]?.id &&
                    "disabled"
                  }`}
                  to={
                    publication.citation?.citationCrossReferences[1]?.id
                      ? `https://dx.doi.org/${publication.citation.citationCrossReferences[1].id}`
                      : ""
                  }
                  onClick={(event) => {
                    if (!publication.citation.citationCrossReferences[1]?.id) {
                      event.preventDefault()
                    }
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${publication.citation.journal} :${publication.citation.firstPage}-${publication.citation.lastPage} (${publication.citation.publicationDate})`}{" "}
                  {<ExternalLinkIcon />}
                </Link>{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
    </Wrapper>
  )
}

export default Publications
