import { useEffect, useState } from "react";
import axios from "axios";

export default function useSearch(query, size) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [result, setResult] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setResult([]);
  }, [query]);

  console.log(size);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=(${query})&cursor=1mkycb2xwxbouw39b98v99ymv0kejlbmk6r7&size=${size}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        const result = res.data.results;
        setResult(result);
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, size]);

  return { loading, error, result, hasMore };
}
