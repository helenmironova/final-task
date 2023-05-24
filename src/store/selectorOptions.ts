import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    alreadyFetched: false,
    organismOptions: [],
    annotationOptions: [],
    proteinWithOptions: [],
}

export const selectorOptionsSlice = createSlice({
  name: 'selectorOptions',
  initialState,
  reducers: {
    setOrganismOptions: (state, action)=>{
        state.organismOptions = action.payload;
    },
    setAnnotationOptions: (state, action)=>{
        state.annotationOptions = action.payload;
    },
    setProteinWithOptions: (state, action)=>{
        state.proteinWithOptions = action.payload
    },
    setAlreadyFetched: (state) =>{
        state.alreadyFetched = true;
    }   
    },
})

// Action creators are generated for each case reducer function
export const {setAnnotationOptions, setOrganismOptions, setProteinWithOptions, setAlreadyFetched} = selectorOptionsSlice.actions

export default selectorOptionsSlice.reducer