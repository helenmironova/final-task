import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { loadState } from '../localStorage';

const persistedState = loadState('state')?.searchText

const initialState: string = persistedState || '';

export const searchTextSlice = createSlice({
  name: 'searchText',
  initialState,
  reducers: {
    setNewSearchText: (_, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const {setNewSearchText} = searchTextSlice.actions

export default searchTextSlice.reducer