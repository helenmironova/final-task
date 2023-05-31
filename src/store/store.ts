import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import searchItemsReducer from "./searchItemsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  searchItems: searchItemsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
