import PublicationComponent from "../components/PublicationComponent";
import { Publication } from "../interfaces/Publication";

export const getPublications = (entry: string) => {
  return fetch(`https://rest.uniprot.org/uniprotkb/${entry}/publications`)
    .then((response) => response.json())
    .then((data) => {
      console.log("data: ", data);
      if (data.results) {
        const publicationComponents = data.results.map(
          (result, index: number) => {
            const pub: Publication = {
              title: result.citation.title,
              authors: result.citation.authors,
              categories: result.references[0].sourceCategories,
              citedFor: result.references[0].referencePositions,
              source: result.references[0].source.name,
              PubMedLink: `https://pubmed.ncbi.nlm.nih.gov/${result.citation.citationCrossReferences[0].id}`,
              EuropePMCLink: `https://europepmc.org/article/MED/${result.citation.citationCrossReferences[0].id}`,
            };
            return <PublicationComponent {...pub} key={index} />;
          }
        );
        return publicationComponents;
      }
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};
