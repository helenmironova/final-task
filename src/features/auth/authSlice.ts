import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User  } from "firebase/auth";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

interface AuthState {
  isLoggedIn: boolean;
  email: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  email: null,
  loading: false,
  error: null,
};

export const getAuthState = createAsyncThunk<User | null>("auth/getAuthState", async () => {
  return new Promise<User | null>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        resolve(user);
      } else {
        // User is signed out
        resolve(null);
      }
    });
  });
});
  
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data;
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }: { email: string; password: string }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.user.email;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed.";
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.user.email;
        state.isLoggedIn = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Sign up failed.";
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.email = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Log out failed.";
      })
      .addCase(getAuthState.fulfilled, (state, action) => {
        if (action.payload === null) {
          state.email = null;
          state.isLoggedIn = false;
        } else {
          state.email = action.payload.email;
          state.isLoggedIn = true;
        }
      });
  },
});

export const { clearErrors } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
