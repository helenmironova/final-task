import classes from "./protein-publications.module.css";
import Link from "../../assets/Link.svg";

interface ProteinPageProps {
  title: string;
  authors: string;
  categories?: string[];
  journals: string;
  source?: string;
  link?: string[];
}

const ProteinPublications = ({
  title,
  authors,
  categories,
  journals,
  source,
  link,
}: ProteinPageProps) => {
  console.log("categories", categories);
  console.log("link", link);
  return (
    <div className={classes.container}>
      {title && <h3 className={classes.title}>{title}</h3>}
      {authors && <p className={classes.author}>{authors}</p>}
      {categories && (
        <p className={classes.categories}>
          Categories:{" "}
          {categories.map((item: string, index: number) => (
            <span key={item}>
              {item}
              {index !== categories.length - 1 && ", "}
            </span>
          ))}
        </p>
      )}
      {journals && (
        <p className={classes.journals}>
          Cited for: <span>{journals}</span>
        </p>
      )}
      {source && (
        <p className={classes.source}>
          Source:
          <span>{source}</span>
        </p>
      )}
      {link && (
        <div>
          {link.map((item: any, index: number) => (
            <span key={index}>
              <a
                className={classes.link}
                target="_blank"
                href={`https://pubmed.ncbi.nlm.nih.gov/${item.id}`}
              >
                <span>PubMed</span>
                <img src={Link} alt="New Tab Icon" />
              </a>
              <a
                className={classes.link}
                target="_blank"
                href={`https://europepmc.org/article/MED/${item.id}`}
              >
                <span>Europe PMC</span>
                <img src={Link} alt="New Tab Icon" />
              </a>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProteinPublications;
