import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from '../localStorage';

const persistedState = loadState('state')?.selectedProtein;

const initialState = persistedState || {
  name: '',
  protein: {
    primaryAccession: "",
    uniProtkbId: "",
    sequence: {
      value: "",
      length: 0,
      molWeight: 0,
      crc64: 0,
    },
    proteinDescription: {
      recommendedName: {
        fullName: {
          value: "",
        }
      }
    },
    genes: [{
      geneName: {
        value: "",
      }
    }],
    entryAudit: {
      lastSequenceUpdateDate: "",
    }
  },
  references: {},
};

export const fetchProteinData = createAsyncThunk(
  'selectedProtein/fetchProteinData',
  async (name: string) => {
    const response = await fetch(`https://rest.uniprot.org/uniprotkb/${name}`);
    const data = await response.json();
    return data;
  }
);

export const fetchProteinReferencesData = createAsyncThunk(
  'selectedProtein/fetchProteinReferencesData',
  async (name: string) => {
    const response = await fetch(`https://rest.uniprot.org/uniprotkb/${name}/publications`);
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
      })
      .addCase(fetchProteinReferencesData.fulfilled, (state, action) => {
        return { ...state, references: action.payload };
      });
  },
});

export const { setNewSelectedProteinName } = selectedProteinSlice.actions;

export default selectedProteinSlice.reducer;
