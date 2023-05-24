import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    geneName: null,
    organism: null,
    sequenceLength__from: null,
    sequenceLength__to: null, 
    annotationScore: null,
    proteinWith: null,
}

export const filterOptionsSlice = createSlice({
  name: 'filterOptions',
  initialState,
  reducers: {
    setNewValue: (state, action) => {
        const newValue = action.payload;
        return { ...state, ...newValue };
    },  
  },
})

// Action creators are generated for each case reducer function
export const {setNewValue} = filterOptionsSlice.actions

export default filterOptionsSlice.reducer