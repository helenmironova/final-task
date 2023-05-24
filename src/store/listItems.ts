import { createSlice } from '@reduxjs/toolkit'

const initialState: any = [];

export const listItemsSlice = createSlice({
  name: 'listItems',
  initialState,
  reducers: {
    addListItems: (state, action) => {
      state.push(...action.payload);
    },
    removeItems: (state) => {
      state.splice(0, state.length);
    }
  },
})

// Action creators are generated for each case reducer function
export const { addListItems, removeItems} = listItemsSlice.actions

export default listItemsSlice.reducer