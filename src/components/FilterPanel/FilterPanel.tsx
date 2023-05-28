import "./filterPanel.css";
import Button from "@mui/material/Button";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { useFormik } from "formik";
import {
  selectFilter,
  filterClose,
  fetchFilterOptions,
} from "../../features/proteinData/filterPanelSlice";
import { fetchProteins } from "../../features/proteinData/proteinsSearchSlice";
import {  useRef } from "react";
import { useLocation } from "react-router-dom";

const FilterPanel = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const filterState = useAppSelector(selectFilter);
  const location = useLocation();
  const searchValue = location.search.split("=")[1];

  const organisms = filterState.data
    ?.filter((item) => item.name === "model_organism")
    .map((item) => item.values)[0];
  const annotation = filterState.data
    ?.filter((item) => item.name === "annotation_score")
    .map((item) => item.values)[0];
  const proteins = filterState.data
    ?.filter((item) => item.name === "proteins_with")
    .map((item) => item.values)[0];

  const formik = useFormik({
    initialValues: {
      gene: "",
      organism: "",
      length_from: "",
      length_to: "",
      annotation: "",
      proteins: "",
    },
    onSubmit: (values) => {
      dispatch(
        fetchProteins({
          query: searchValue
            ? searchValue
            : formik.values.gene
            ? formik.values.gene
            : "*",
          options: values,
        })
      );
      dispatch(filterClose());
    },
  });

  const handleChange = () => {
    const options = formik.values;
    dispatch(
      fetchFilterOptions({
        query: formik.values.gene ? formik.values.gene : "*",
        options: options,
      })
    );
  };

  const filterClassName = filterState.isOpen
    ? "filterPanel"
    : "filterPanel filterPanel__closed";

  return (
    <form
      ref={formRef}
      className={filterClassName}
      onSubmit={formik.handleSubmit}
      onChange={handleChange}
    >
      <h3>Filters</h3>
      <div className="filterPanel__section">
        <InputLabel sx={{ color: "#000", fontSize: "14px", fontWeight: "600" }}>
          Gene Name
        </InputLabel>
        <OutlinedInput
          id="gene"
          name="gene"
          value={formik.values.gene || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          sx={{ backgroundColor: "#F5F5F5", width: "100%", fontSize: "14px" }}
          placeholder="Enter Gene Name"
        />
      </div>
      <div className="filterPanel__section">
        <InputLabel sx={{ color: "#000", fontSize: "14px", fontWeight: "600" }}>
          Organism
        </InputLabel>
        <Select
          id="organism"
          name="organism"
          value={formik.values.organism || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          sx={{ backgroundColor: "#F5F5F5", width: "100%" }}
        >
          {organisms?.map((item) => (
            <MenuItem key={item.label} value={item.label}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="filterPanel__section">
        <InputLabel sx={{ color: "#000", fontSize: "14px", fontWeight: "600" }}>
          Sequence length
        </InputLabel>
        <div className="filterPanel__sequence-length">
          <OutlinedInput
            id="length_from"
            name="length_from"
            type="number"
            value={formik.values.length_from || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ backgroundColor: "#F5F5F5", width: "40%", fontSize: "14px" }}
            placeholder="From"
          />
          <HorizontalRuleIcon sx={{ color: "#9F9F9F", marginTop: "15px" }} />
          <OutlinedInput
            id="length_to"
            name="length_to"
            type="number"
            value={formik.values.length_to}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ backgroundColor: "#F5F5F5", width: "40%", fontSize: "14px" }}
            placeholder="To"
          />
        </div>
      </div>
      <div className="filterPanel__section">
        <InputLabel sx={{ color: "#000", fontSize: "14px", fontWeight: "600" }}>
          Annotation score
        </InputLabel>
        <Select
          id="annotation"
          name="annotation"
          value={formik.values.annotation || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          sx={{ backgroundColor: "#F5F5F5", width: "100%" }}
        >
          {annotation?.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="filterPanel__section">
        <InputLabel sx={{ color: "#000", fontSize: "14px", fontWeight: "600" }}>
          Protein with
        </InputLabel>
        <Select
          id="proteins"
          name="proteins"
          value={formik.values.proteins || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          sx={{ backgroundColor: "#F5F5F5", width: "100%" }}
        >
          {proteins?.map((item) => (
            <MenuItem key={item.label} value={item.label}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="filterPanel__btns">
        <Button
          sx={{
            width: "45%",
            height: "48px",
            textTransform: "capitalize",
            fontWeight: "600",
            "&.MuiButton-root:hover": { bgcolor: "#FFF" },
          }}
          variant="text"
          onClick={() => {
            dispatch(filterClose());
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={
            formik.values.gene === "" &&
            formik.values.organism === "" &&
            formik.values.length_from === "" &&
            formik.values.length_to === "" &&
            formik.values.annotation === "" &&
            formik.values.proteins === ""
          }
          type="submit"
          sx={{
            width: "45%",
            height: "48px",
            textTransform: "capitalize",
            fontWeight: "600",
            backgroundColor: "#D8E7FF",
            color: "#3C86F4",
            boxShadow: "none",
          }}
        >
          Apply filters
        </Button>
      </div>
    </form>
  );
};

export default FilterPanel;
