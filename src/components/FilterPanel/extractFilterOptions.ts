export interface QueryOptions {
    gene: string;
    organism: string;
    length_from: string;
    length_to: string;
    annotation: string;
    proteins: string;
  }
export const extractFilterOptions = (options : QueryOptions | undefined) => {
    const model_organism = options?.organism
      ? `(model_organism:${options?.organism})`
      : null;
    const annotation_score = options?.annotation
      ? `(annotation_score:${options?.annotation})`
      : null;
    const proteins_with = options?.proteins
      ? `(proteins_with:${options?.proteins})`
      : null;
    const length =
      options?.length_to && options?.length_from
        ? `(length:%5B${options.length_from}%20TO%20${options.length_to}%5D)`
        : null;

    const filterOptions = [
      model_organism,
      annotation_score,
      proteins_with,
      length,
    ];

    const queryOptions = filterOptions.filter((item) => item !== null);
    const string = queryOptions.join(" AND ");
    const result = string !== "" ? ` AND ${string}` : "";
    return result;

}