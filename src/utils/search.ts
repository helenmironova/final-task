export const searchEntries = (req: string) => {
  let link: string | null;
  return fetch(req)
    .then((response) => {
      const headers = response.headers;
      link = headers.get("link");

      return response.json();
    })
    .then((data) => {
      console.log("link: ", link);
      return { link, data };
    })
    .catch((error) => {
      // Handle the error
      return error;
    });
};

export const getProteinInfo = (entry: string) => {
  return fetch(`https://rest.uniprot.org/uniprotkb/${entry}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("data: ", data);
      return data;
    });
};
