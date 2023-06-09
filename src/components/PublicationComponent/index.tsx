import { Link, Stack, Typography } from "@mui/material";
import { Publication } from "../../interfaces/Publication";
import "./index.css";

const PublicationComponent = ({
  title,
  authors,
  categories,
  citedFor,
  source,
  PubMedLink,
  EuropePMCLink,
}: Publication): JSX.Element => {
  const labelsAndData = {
    Categories: categories,
    "Cited for": citedFor,
    Source: source,
  };
  const labelsAndLinks = {
    PubMed: PubMedLink,
    " Europe PMC": EuropePMCLink,
  };
  const labelComponents = Object.entries(labelsAndData).map(([key, value]) => (
    <Stack flexDirection="row" key={key}>
      <Typography fontSize={14} color="#6C6C6C">
        {key + ": "}
      </Typography>
      <Typography fontSize={14}>{value}</Typography>
    </Stack>
  ));
  const linkComponents = Object.entries(labelsAndLinks).map(([key, value]) => (
    <Link
      key={key}
      href={value}
      target="_blank"
      rel="noopener"
      underline="none"
      border="1px solid #3C86F4"
      borderRadius="4px"
      padding="4px 11px"
      fontSize={12}
      marginRight="9px"
    >
      {key}
    </Link>
  ));

  return (
    <Stack
      sx={{
        background: "#F5F6F8",
        borderRadius: "12px",
        marginBottom: "15px",
        padding: "14px 22px 10px 23px",
      }}
    >
      <Typography fontWeight={600} fontSize={16} className="publication__title">
        {title}
      </Typography>
      <Typography fontSize={14} className="publication__authors">
        {authors}
      </Typography>
      {labelComponents}
      <Stack flexDirection="row" marginTop="19px">
        {linkComponents}
      </Stack>
    </Stack>
  );
};

export default PublicationComponent;
