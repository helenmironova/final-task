import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { extractFilterOptions ,QueryOptions } from "../../components/FilterPanel/extractFilterOptions";

interface FilterOprions {
  name: string;
  values: [
    {
      label: string;
      value: string;
    }
  ];
}


interface Filter {
  isOpen: boolean;
  data: [FilterOprions] | null;
  loading: boolean
}

const initialState: Filter = {
  isOpen: false,
  data: null,
  loading: false
};

export const fetchFilterOptions = createAsyncThunk(
  "filter/fetch",
  async ({ query, options }: { query: string; options?: QueryOptions }) => {
    const queryOptions = extractFilterOptions(options);

    const responce = await fetch(
      ` https://rest.uniprot.org/uniprotkb/search?facets=model_organism,proteins_with,annotation_score&query=(${query})${queryOptions}`
    );
    const data = await responce.json();
    return data;
  }
);

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterOpen: (state) => {
      state.isOpen = true;
    },
    filterClose: (state) => {
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilterOptions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilterOptions.fulfilled, (state, action) => {
      state.data = action.payload.facets;
      state.loading = false;
    });
    builder.addCase(fetchFilterOptions.rejected, (state) => {
      state.loading = false;
    });
  },
});
export const { filterOpen, filterClose } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;
export default filterSlice.reducer;
