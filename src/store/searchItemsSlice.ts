import { createSelector, createSlice } from "@reduxjs/toolkit";
import { SearchItem } from "../interfaces/SearchItem";

export interface searchItemsState {
  searchItems: SearchItem[];
  quantity: number;
}

const initialState: searchItemsState = {
  searchItems: [],
  quantity: 0,
};

const searchItemsSlice = createSlice({
  name: "searchItems",
  initialState,
  reducers: {
    addSearchItems: (state, action) => {
      state.searchItems = state.searchItems.concat(action.payload);
      state.quantity += action.payload.length;
    },
  },
});

export const { addSearchItems } = searchItemsSlice.actions;

export default searchItemsSlice.reducer;
