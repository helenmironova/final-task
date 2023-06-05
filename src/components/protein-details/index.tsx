import classes from "./protein-details.module.css";

interface ProteinDetails {
  length: string;
  weight: number;
  lastUpdateDate: Date;
  checkSum: string;
  sectionText: string;
}

const ProteinDetails = ({
  length,
  weight,
  lastUpdateDate,
  checkSum,
  sectionText,
}: ProteinDetails) => {
  return (
    <main className={classes.details}>
      <h4 className={classes.sequence}>Sequence</h4>
      <div className={classes.description}>
        <div className={classes.lengthAndMass}>
          <div className={classes.margin_bottom}>
            <p>Length</p>
            <p>{length}</p>
          </div>
          <div>
            <p>Mass(Da)</p>
            <p>{weight}</p>
          </div>
        </div>
        <div className={classes.lengthAndMass}>
          <div className={classes.margin_bottom}>
            <p>Last updated</p>
            <p>{lastUpdateDate.toString()}</p>
          </div>
          <div>
            <p>Checksum</p>
            <p>{checkSum}</p>
          </div>
        </div>
      </div>
      <section className={classes.section}>
        <p>{sectionText}</p>
      </section>
    </main>
  );
};

export default ProteinDetails;
