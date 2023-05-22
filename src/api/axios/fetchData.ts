import axios from "axios";

export const fetchData = (url: string) => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
