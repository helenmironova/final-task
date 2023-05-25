import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: string = '';

export const selectedProteinSlice = createSlice({
  name: 'selectedProtein',
  initialState,
  reducers: {
    setNewSelectedProtein: (state: string, action: PayloadAction<string>) => {
        return action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {setNewSelectedProtein} = selectedProteinSlice.actions

export default selectedProteinSlice.reducer