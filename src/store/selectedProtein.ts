import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from '../localStorage';

const persistedState = loadState('state')?.selectedProtein;

const initialState = persistedState || {
  name: '',
  protein: {},
};

export const fetchProteinData = createAsyncThunk(
  'selectedProtein/fetchProteinData',
  async (name: string) => {
    const response = await fetch(`https://rest.uniprot.org/uniprotkb/${name}`);
    const data = await response.json();
    return data;
  }
);

export const selectedProteinSlice = createSlice({
  name: 'selectedProtein',
  initialState,
  reducers: {
    setNewSelectedProteinName: (state, action: PayloadAction<string>) => {
      return { ...state, name: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProteinData.fulfilled, (state, action) => {
        return { ...state, protein: action.payload };
      });
  },
});


export const { setNewSelectedProteinName } = selectedProteinSlice.actions;

export default selectedProteinSlice.reducer;
