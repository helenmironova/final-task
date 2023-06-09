import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export interface userState {
  email: string;
}

const initialState: userState = {
  email: "",
};

const tasksSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = tasksSlice.actions;

export default tasksSlice.reducer;
