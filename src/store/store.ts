import { configureStore} from '@reduxjs/toolkit';
import  listItemsReducer from './listItems';
import filterOptionsReducer from './filterOptions';
import selectorOptionsReducer from './selectorOptions';
import searchTextReducer from './searchText'
import selectedReducer from './selected'
import thunkMiddleware from 'redux-thunk';


const store = configureStore({
    reducer: {
        listItems: listItemsReducer,
        filterOptions: filterOptionsReducer,
        selectorOptions: selectorOptionsReducer,
        searchText: searchTextReducer,
        selected: selectedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        thunk: {
            extraArgument: {}, // Customize your thunk middleware options if needed
        },
        serializableCheck: false, // Disable serializable state check
        }).concat(thunkMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch 
