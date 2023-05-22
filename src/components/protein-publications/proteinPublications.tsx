import React from "react";
import classes from "./proteinPublications.module.css";

function ProteinPublications({ title, authors, journals }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{authors}</p>
      <p>Cited for: {journals}</p>
    </div>
  );
}

export default ProteinPublications;
