import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  link: string | null;
  data: [protein] | null;
  loading: boolean;
  error: string | null;
  scrollPosition: number
}

const initialState: ProteinData = {
  link: null,
  data: null,
  loading: false,
  error: null,
  scrollPosition: 0
};

export const fetchProteins = createAsyncThunk(
  "proteinData/fetch",
  async ({ query }: { query: string }) => {
    const responce = await fetch(
      `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,cc_subcellular_location&query=(${query})`
    );
    const link = responce.headers.get("link");
    const data = await responce.json();
    return { data, link };
  }
);
export const scrollProteins = createAsyncThunk(
  "proteinData/scroll",
  async ({ link }: { link: string }) => {
    const responce = await fetch(link);
    const data = await responce.json();
    const newLink = responce.headers.get("link");
    return { data, newLink };
  }
);

export const proteinsSearchSlice = createSlice({
  name: "proteinData",
  initialState,
  reducers: {
    setScrollPosition:(state, action: PayloadAction<number>) => {
      state.scrollPosition = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProteins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProteins.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.results;
        state.link = action.payload.link;
      })
      .addCase(fetchProteins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Could not get the data.";
      })
      .addCase(scrollProteins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(scrollProteins.fulfilled, (state, action) => {
        state.loading = false;
        state.data = ([...(state.data as [protein]), ... action.payload.data.results] ) as [protein];
        state.link = action.payload.newLink;
      })
      .addCase(scrollProteins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Could not get the data.";
      });
  },
});

export const {
  setScrollPosition
} = proteinsSearchSlice.actions;
export const selectProteinData = (state: RootState) => state.proteinData;
export default proteinsSearchSlice.reducer;
