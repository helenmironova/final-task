import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
 import { RootState } from "../../app/store";
import {auth} from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth";


 interface AuthState {
    user: FirebaseUser | null | void;
    loading: boolean;
    error: string | null;
  }

  const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
  };

  export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }) => {
      await signInWithEmailAndPassword(auth, email, password);
    }
  );
  
  export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({ email, password }: { email: string; password: string }) => {
      await createUserWithEmailAndPassword(auth, email, password);
    }
  );



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed.';
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign up failed.';
      });
  },
});

// export const {
//   addTodo,
//   deleteTodo,
//   updateTodo,
//   finishTodo,
//   setTodo,
//   setCurrentEditTask,
//   clearCurrentEditTask,
// } = todoSlice.actions;

 export const selectAuth = (state: RootState) => state.auth;

// export const selectCurrentEditTask = (state: RootState) =>
//   state.todo.currentEditTask;

// export default todoSlice.reducer;