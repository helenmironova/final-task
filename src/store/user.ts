import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { loadState } from '../localStorage';

const persistedState = loadState('state')?.searchText

const initialState: string = persistedState || '';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNewUser: (state: string, action: PayloadAction<string>) => {
        return action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {setNewUser} = userSlice.actions

export default userSlice.reducer