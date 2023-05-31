import { createSlice } from "@reduxjs/toolkit";
import { SearchItem } from "../interfaces/SearchItem";

export interface searchItemsState {
  searchItems: SearchItem[];
}

const initialState: searchItemsState = {
  searchItems: [],
};

const searchItemsSlice = createSlice({
  name: "searchItems",
  initialState,
  reducers: {
    setSearchItems: (state, action) => {
      state.searchItems = action.payload;
      console.log("action.payload: ", action.payload);
    },
  },
});

export const { setSearchItems } = searchItemsSlice.actions;

export default searchItemsSlice.reducer;
