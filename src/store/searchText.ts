import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: string = '';

export const searchTextSlice = createSlice({
  name: 'searchText',
  initialState,
  reducers: {
    setNewSearchText: (state: string, action: PayloadAction<string>) => {
        return action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {setNewSearchText} = searchTextSlice.actions

export default searchTextSlice.reducer