import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import searchItemsReducer from "./searchItemsSlice";
import proteinReducer from "./proteinSlice";

const rootReducer = combineReducers({
  user: userReducer,
  searchItems: searchItemsReducer,
  protein: proteinReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
