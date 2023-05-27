import { createSlice } from '@reduxjs/toolkit'
import { loadState } from '../localStorage';

const persistedState = loadState('state')?.sortOptions;

const initialState = persistedState || {
    selected: null,
    type: null,
}

export const sortOptionsSlice = createSlice({
  name: 'sortOptions',
  initialState,
  reducers: {
    setNewValueSort: (state, action) => {
        const newValue = action.payload;
        return { ...state, ...newValue };
    },  
  },
})

// Action creators are generated for each case reducer function
export const {setNewValueSort} = sortOptionsSlice.actions

export default sortOptionsSlice.reducer