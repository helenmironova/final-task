import { createSlice } from '@reduxjs/toolkit'
import { loadState } from '../localStorage';

const persistedState = loadState('state')?.filterOptions;

const initialState = persistedState || {
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
    setNewValueFilter: (state, action) => {
        const newValue = action.payload;
        return { ...state, ...newValue };
    },  
  },
})

// Action creators are generated for each case reducer function
export const {setNewValueFilter} = filterOptionsSlice.actions

export default filterOptionsSlice.reducer