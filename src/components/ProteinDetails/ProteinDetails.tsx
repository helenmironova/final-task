import Button from "@mui/material/Button";
import clipboardCopy from "clipboard-copy";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useAppSelector,} from "../../app/hooks";
import { selectProteinDetails } from "../../features/proteinData/proteinDetailsSlice";
import "./proteinDetails.css";
import moment from "moment";

const ProteinDetails = () => {
  const  proteinDetails = useAppSelector(selectProteinDetails);
  const proteinData = proteinDetails.data;
  const date = moment(proteinData?.entryAudit.lastSequenceUpdateDate).format("MMM DD YYYY"); 
 

  return (
    <div className="proteinDetails">
      <h3>Sequence</h3>
      <div className="proteinDetails__info">
        <div className="proteinDetails__info-item proteinDetails__info-length">
          <h4>Length</h4>
          <div>{proteinData?.sequence.length}</div>
        </div>
        <div className="proteinDetails__info-item proteinDetails__info-last-updated">
          <h4>Last updated</h4>
          <div>{date}</div>
        </div>
        <div className="proteinDetails__info-item proteinDetails__info-mass">
          <h4>Mass (Da)</h4>
          <div>{proteinData?.sequence.molWeight}</div>
        </div>
        <div className="proteinDetails__info-item proteinDetails__info-checksum">
          <h4>Checksum</h4>
          <div>{proteinData?.sequence.crc64}</div>
        </div>
      </div>
      <div className="proteinDetails__copy">
        <Button
          variant="text"
          color="primary"
          onClick={() => clipboardCopy(proteinData?.sequence.value ? proteinData?.sequence.value : "")}
        >
          Copy
          <ContentCopyIcon />
        </Button>
        <div className="proteinDetails__copy-field">
          {proteinData?.sequence.value}
        </div>
      </div>
    </div>
  );
};

export default ProteinDetails;
