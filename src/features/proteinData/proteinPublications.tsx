import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Publication {
  citation: {
    title: string;
    authors: [];
    citationCrossReferences: [
        {
            database: string,
        id: string
        }
      ];
    journal: string;
    volume: string;
    firstPage: string;
    lastPage: string;
    publicationDate: string;
  };
  references: [
    {
        source: {
            name: string
        }
      sourceCategories: [];
      referencePositions: []
    }
  ];
 
}

interface ProteinPublications {
  data: [Publication] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProteinPublications = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProteinPublications = createAsyncThunk(
  "proteinPublications/fetchPublications",
  async ({ entry }: { entry: string }) => {
    const responce = await fetch(
      `https://rest.uniprot.org/uniprotkb/${entry}/publications`
    );
    const data = await responce.json();
    return data.results;
  }
);

export const proteinDetailsSlice = createSlice({
  name: "proteinPublications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProteinPublications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProteinPublications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProteinPublications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Could not get the data.";
      });
  },
});

export const selectProteinPublications = (state: RootState) =>
  state.proteinPublications;
export default proteinDetailsSlice.reducer;
