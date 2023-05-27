interface ProteinPageProps {
  title: string;
  authors: string;
  journals: string;
}

const ProteinPublications = ({
  title,
  authors,
  journals,
}: ProteinPageProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{authors}</p>
      <p>Cited for: {journals}</p>
    </div>
  );
};

export default ProteinPublications;
