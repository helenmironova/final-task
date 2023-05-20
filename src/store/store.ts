import { configureStore } from '@reduxjs/toolkit';
import  listItemsReducer from './listItems';

const store = configureStore({
    reducer: {
        listItems: listItemsReducer,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch 
