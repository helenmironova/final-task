import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: number = 0;

export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    setNewSelected: (state: any, action: PayloadAction<number>) => {
        return action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {setNewSelected} = selectedSlice.actions

export default selectedSlice.reducer