import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface protein {
  primaryAccession: string;
  uniProtkbId: string;
  organism: {
    scientificName: string;
  };
  sequence: {
    length: number;
  };
  genes: [
    {
      geneName: {
        value: string;
      };
    }
  ];
  comments: [
    {
      subcellularLocations: [
        {
          location: {
            value: string;
          };
        }
      ];
    }
  ];
}

interface ProteinData {
  link: string | null
  data: [protein] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProteinData = {
  link: null,
  data: null,
  loading: false,
  error: null,
};

export const fetchProteins = createAsyncThunk(
  "proteinData/fetch",
  async ({ query }: { query: string }) => {
    const responce = await fetch(
      `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,cc_subcellular_location&query=(${query})`
    );
    const link = responce.headers.get("link")
    const data = await responce.json();
    return {data, link};
  }
);

export const proteinsSearchSlice = createSlice({
  name: "proteinData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProteins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProteins.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.results;
        state.link = action.payload.link
      })
      .addCase(fetchProteins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Could not get the data.";
      });
  },
});

export const selectProteinData = (state: RootState) => state.proteinData;
export default proteinsSearchSlice.reducer;
