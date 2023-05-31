import {
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import "./index.css";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const FiltersModal = ({ isOpen, onClose }: Props): JSX.Element => {
  const handleSubmit = () => {
    //
  };

  return (
    <div className="filters">
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        width={"100%"}
        hidden={!isOpen}
      >
        <Typography>Filters</Typography>
        <InputLabel htmlFor="search-input">Search</InputLabel>
        <OutlinedInput id="search-input" placeholder="Search" />
      </Box>
    </div>
  );
};

export default FiltersModal;
