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
    <div className={classes.details}>
      <h4 className={classes.sequence}>Sequence</h4>
      <div className={classes.description}>
        <div className={classes.lengthAndMass}>
          <div className={classes.margin_bottom}>
            <div>Length</div>
            <div>{length}</div>
          </div>
          <div>
            <div>Mass(Da)</div>
            <div>{weight}</div>
          </div>
        </div>
        <div className={classes.lengthAndMass}>
          <div className={classes.margin_bottom}>
            <div>Last updated</div>
            <div>{lastUpdateDate.toString()}</div>
          </div>
          <div>
            <div>Checksum</div>
            <div>{checkSum}</div>
          </div>
        </div>
      </div>
      <section className={classes.section}>
        <p>{sectionText}</p>
      </section>
    </div>
  );
};

export default ProteinDetails;
