export const searchEntries = (query: string) => {
  const req = `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,cc_subcellular_location&query=${query}`;
  return fetch(req)
    .then((response) => response.json())
    .then((data) => {
      // Process the data or update your table with the results
      return data;
    })
    .catch((error) => {
      // Handle the error
      return error;
    });
};
