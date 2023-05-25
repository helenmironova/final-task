import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
  items: [],
  isLoading: false,
  nextUrl: '',
};

export const listItemsSlice = createSlice({
  name: 'listItems',
  initialState,
  reducers: {
    addListItems: (state, action) => {
      state.items.push(...action.payload);
    },
    removeItems: (state) => {
      state.items.splice(0, state.items.length);
    },
    setNextUrl: (state, action) => {
      state.nextUrl = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addListItems, removeItems, setNextUrl} = listItemsSlice.actions

export default listItemsSlice.reducer