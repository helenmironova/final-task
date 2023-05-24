import { configureStore } from '@reduxjs/toolkit';
import  listItemsReducer from './listItems';
import filterOptionsReducer from './filterOptions';
import selectorOptionsReducer from './selectorOptions';
import searchTextReducer from './searchText'

const store = configureStore({
    reducer: {
        listItems: listItemsReducer,
        filterOptions: filterOptionsReducer,
        selectorOptions: selectorOptionsReducer,
        searchText: searchTextReducer,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch 
