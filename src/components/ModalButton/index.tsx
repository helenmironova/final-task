import Button from "@mui/material/Button";
import "./index.css";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isDisabled: boolean;
}
const ModalButton = ({ children, isDisabled }: Props): JSX.Element => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{
        mt: 1,
        mb: 1,
        fontSize: "12px",
        fontWeight: "700",
        padding: "12px 0",
        textTransform: "capitalize",
        background: "#D8E7FF",
        color: "#175BC0",
        ":hover": {
          color: "#fff",
        },
        boxShadow: "none",
      }}
      disabled={isDisabled}
    >
      {children}
    </Button>
  );
};

export default ModalButton;
