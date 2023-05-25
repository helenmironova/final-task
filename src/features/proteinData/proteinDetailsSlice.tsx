import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface proteinDetailed {
  primaryAccession: string;
  uniProtkbId: string;
  proteinDescription: {
    recommendedName: {
      fullName: {
        value: string;
      };
    };
  };
  genes: [
    {
      geneName: {
        value: string;
      };
    }
  ];
  sequence: {
    value: string;
    length: number;
    molWeight: number;
    crc64: string;
  };
  entryAudit: {
    lastSequenceUpdateDate: string;
  };
  organism: {
    scientificName: string
  }
}

interface ProteinData {
  id: null | string
  data: proteinDetailed | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProteinData = {
  id: null,
  data: null,
  loading: false,
  error: null,
};

export const fetchProteinDetails = createAsyncThunk(
  "proteinDetails/fetch",
  async ({ entry}: { entry: string }) => {
    const responce = await fetch(
      `https://rest.uniprot.org/uniprotkb/${entry}`
    );
    const data = await responce.json();
    return data;
  }
);

export const proteinsSearchSlice = createSlice({
  name: "proteinDetails",
  initialState,
  reducers: {
    setId:(state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProteinDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProteinDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProteinDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Could not get the data.";
      });
  },
});
export const {
  setId
} = proteinsSearchSlice.actions;

export const selectProteinDetails = (state: RootState) => state.proteinDetails;
export default proteinsSearchSlice.reducer;
