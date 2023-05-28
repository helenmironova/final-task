import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ProtvistaUniprot from "protvista-uniprot";

import CopyIcon from "../../assets/CopyIcon";

import "./ProteinTabs.css";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "protvista-uniprot": any;
    }
  }
}

window.customElements.define("protvista-uniprot", ProtvistaUniprot as any);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ProteinData {
  organism: string;
  accession: string;
  uniProtkbId: string;
  description: string;
  gene: string;
  length: number;
  lastUpdated: string;
  mass: number;
  checksum: string;
  sequence: string;
}

interface ProteinTabsProps {
  data: ProteinData;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: 3 }}>
          <div className="wrapper">{children}</div>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProteinTabs: React.FC<ProteinTabsProps> = ({ data }) => {
  const [value, setValue] = React.useState(0);
  const [isCopied, setIsCopied] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.target!;
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: "var(--active-blue)",
              color: "var(--dark-grey-3)",
            },
          }}
        >
          <Tab
            label="Details"
            {...a11yProps(0)}
            sx={{
              fontFamily: "Open Sans",
              textTransform: "initial",
              fontWeight: "600",
            }}
          />
          <Tab
            label="Feature Viewer"
            {...a11yProps(1)}
            sx={{
              fontFamily: "Open Sans",
              textTransform: "initial",
              fontWeight: "600",
            }}
          />
          <Tab
            label="Publications"
            sx={{
              fontFamily: "Open Sans",
              textTransform: "initial",
              fontWeight: "600",
            }}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <h2 className="title">{"Sequence"}</h2>
        <div className="flex-container">
          <div className="column">
            <div>
              <h3 className="data-title">{"Length"}</h3>
              <p className="data-text">{data.length}</p>
            </div>
            <div>
              <h3 className="data-title">{"Mass"}</h3>
              <p className="data-text">{data.mass}</p>
            </div>
          </div>
          <div className="column">
            <div>
              <h3 className="data-title">{"Last Updated"}</h3>
              <p className="data-text">{data.lastUpdated}</p>
            </div>
            <div>
              <h3 className="data-title">{"Checksum"}</h3>
              <p className="data-text">{data.checksum}</p>
            </div>
          </div>
        </div>
        <div className="sequence-container">
          <p className="data-text">{data.sequence}</p>
          <button
            className="copy-btn"
            onClick={() => {
              navigator.clipboard.writeText(data.sequence);
              setIsCopied(true);
            }}
          >
            <CopyIcon /> <span>{isCopied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <protvista-uniprot accession={data.accession} />
        </div>
      </TabPanel>
    </Box>
  );
};

export default ProteinTabs;

