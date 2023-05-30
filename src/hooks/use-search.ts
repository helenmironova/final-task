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

  comments: {
    subcellularLocations: {
      location: {
        value: string;
      };
    }[];
  }[];
}

export const useSearch = (url: string, query: string, size: number) => {
  const [error, setError] = useState<boolean>(false);
  const [result, setResult] = useState<SearchResult[]>([]);

  useEffect(() => {
    setResult([]);
  }, [query]);

  useEffect(() => {
    setError(false);
    let cancelToken: CancelTokenSource | null = null;

    const fetchData = async () => {
      if (cancelToken) {
        cancelToken.cancel();
      }
      cancelToken = axios.CancelToken.source();

      if (!query) return;
      try {
        const response = await axios.get<{
          results: SearchResult[];
          docs: any[];
        }>(url, {
          cancelToken: cancelToken.token,
        });

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
      if (cancelToken) {
        cancelToken.cancel();
      }
    };
  }, [query, size]);

  return { error, result, setResult };
};
