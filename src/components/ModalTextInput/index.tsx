import { InputLabel, TextField } from "@mui/material";
import "./index.css";

interface Props {
  inputType: string;
  labelText: string;
  placeholderText: string;
}
const ModalTextInput = ({
  inputType,
  labelText,
  placeholderText,
}: Props): JSX.Element => {
  return (
    <>
      <InputLabel
        sx={{
          textTransform: "capitalize",
          fontWeight: "600",
          fontSize: "14px",
          color: "#2B2B2B",
        }}
      >
        {labelText}
      </InputLabel>
      <TextField
        sx={{
          height: "48px",
          boxSizing: "border-box",
          overflow: "hidden",
          marginTop: "0",
        }}
        variant="filled"
        margin="normal"
        fullWidth
        name={inputType}
        type={inputType}
        id={inputType}
        label={placeholderText}
        autoComplete="current-password"
        InputLabelProps={{
          style: { fontSize: "12px" },
        }}
      />
    </>
  );
};

export default ModalTextInput;
