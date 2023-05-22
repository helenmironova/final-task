import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
 import { RootState } from "../../app/store";

interface protein {
  primaryAccession: string,
  uniProtkbId: string,
  organism: {
    scientificName: string
  },
  sequence: {
    length: number
  },
  genes: [
    {
      geneName: {
        value: string
      }
    }
  ],
  comments: [
    
    {
      subcellularLocations: [
        {
          location: {
          value: string
        }
      }
    ]
  }
  ]
}

interface ProteinData {
    data:  [protein] | null  ,
    loading: boolean,
    error: string | null
}



  const initialState : ProteinData = {
    data: null,
    loading: false,
    error: null
   
  };

  export const fetchProteinData = createAsyncThunk(
    'proteinData/fetch',
    async ({ query }: { query: string }) => {
        const responce = await fetch(`https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,cc_subcellular_location&query=(${query})`)
        const data = await responce.json()
        return data;
    }   
  );
  






export const proteinDataSlice = createSlice({
  name: 'proteinData',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProteinData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProteinData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.results;
       
      })
      .addCase(fetchProteinData.rejected, (state, action ) => {
        state.loading = false;
        state.error = action.error.message || 'Could not get the data.';
      })
  },
});



 export const selectProteinData = (state: RootState) => state.proteinData;
export default proteinDataSlice.reducer;