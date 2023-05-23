interface IProteinPageProps {
  title: string;
  authors: string;
  journals: string;
}

function ProteinPublications({ title, authors, journals }: IProteinPageProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{authors}</p>
      <p>Cited for: {journals}</p>
    </div>
  );
}

export default ProteinPublications;
