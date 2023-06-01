import { useLocation, useParams } from "react-router-dom";
import "./index.css";
import { getProteinInfo } from "../../utils/search";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import ProteinDetails from "../ProteinDetails";
import ProteinFeatureViewer from "../ProteinFeatureViewer";
import ProteinPublications from "../ProteinPublications";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

const ProteinTabs = (): JSX.Element => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Details" />
          <Tab label="Feature viewer" />
          <Tab label="Publications" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ProteinDetails></ProteinDetails>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProteinFeatureViewer></ProteinFeatureViewer>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProteinPublications></ProteinPublications>
      </TabPanel>
    </>
  );
};

export default ProteinTabs;
