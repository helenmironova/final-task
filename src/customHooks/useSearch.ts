import { useEffect, useState } from "react";
import axios, { CancelTokenSource } from "axios";

export interface SearchResult {
  primaryAccession: string;
  uniProtkbId: string;
  genes: {
    geneName: {
      value: string;
    };
  }[];
  organism: {
    scientificName: string;
  };
  sequence: {
    length: number;
  };
}

export default function useSearch(query: string, size: number) {
  const [error, setError] = useState<boolean>(false);
  const [result, setResult] = useState<SearchResult[]>([]);

  useEffect(() => {
    setResult([]);
  }, [query]);

  useEffect(() => {
    setError(false);
    let cancel: CancelTokenSource | null = null;

    const fetchData = async () => {
      if (cancel) {
        cancel.cancel();
      }
      cancel = axios.CancelToken.source();

      if (!query) return;

      try {
        const response = await axios.get<{
          results: SearchResult[];
          docs: any[];
        }>(
          `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=(${query})&cursor=1mkycb2xwxbouw39b98v99ymv0kejlbmk6r7&size=${size}`,
          {
            cancelToken: cancel.token,
          }
        );

        const results = response.data.results;
        setResult(results);
      } catch (e) {
        if (axios.isCancel(e)) {
          return;
        }
        setError(true);
      }
    };

    fetchData();

    return () => {
      if (cancel) {
        cancel.cancel();
      }
    };
  }, [query, size]);

  return { error, result };
}
