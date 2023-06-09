import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export interface proteinState {
  primaryAccession: string;
  uniProtkbId: string;
  organismName: string;
  feature: string;
  geneName: string;
  length: string;
  mass: string;
  lastUpdated: string;
  checksum: string;
  sequence: string;
}

const initialState: proteinState = {
  primaryAccession: "",
  uniProtkbId: "",
  organismName: "",
  feature: "",
  geneName: "",
  length: "",
  mass: "",
  lastUpdated: "",
  checksum: "",
  sequence: "",
};

const proteinSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProtein: (state, action) => {
      state.primaryAccession = action.payload.primaryAccession;
      state.uniProtkbId = action.payload.uniProtkbId;
      state.organismName = action.payload.organismName;
      state.feature = action.payload.feature;
      state.geneName = action.payload.geneName;
      state.length = action.payload.length;
      state.mass = action.payload.mass;
      state.lastUpdated = action.payload.lastUpdated;
      state.checksum = action.payload.checksum;
      state.sequence = action.payload.sequence;
    },
  },
});

export const { setProtein } = proteinSlice.actions;

export default proteinSlice.reducer;
