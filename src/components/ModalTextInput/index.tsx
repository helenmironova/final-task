import { InputLabel, TextField } from "@mui/material";
import "./index.css";

interface Props {
  inputName: string;
  inputType: string;
  labelText: string;
  placeholderText: string;
  formError: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
const ModalTextInput = ({
  inputName,
  inputType,
  labelText,
  placeholderText,
  formError,
  onChange,
  value,
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
          borderRadius: "8px",
          border: formError ? "2px solid #EC3030" : "none",
        }}
        variant="filled"
        margin="normal"
        fullWidth
        name={inputName}
        type={inputType}
        label={placeholderText}
        autoComplete="current-password"
        InputLabelProps={{
          style: { fontSize: "12px" },
        }}
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default ModalTextInput;
