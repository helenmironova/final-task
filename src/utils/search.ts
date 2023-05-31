export const searchEntries = (req: string, updateReq) => {
  let link: string;
  return fetch(req)
    .then((response) => {
      const headers = response.headers;
      link = headers.get("link");

      // Use the headers as needed
      updateReq(link);

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
