import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import proteinDataReducer from "../features/proteinData/proteinsSearchSlice";
import proteinDetailsReducer from "../features/proteinData/proteinDetailsSlice";
import filterReducer from "../features/proteinData/filterPanelSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    proteinData: proteinDataReducer,
    proteinDetails: proteinDetailsReducer,
    filter: filterReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
