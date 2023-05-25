import { configureStore} from '@reduxjs/toolkit';
import  listItemsReducer from './listItems';
import filterOptionsReducer from './filterOptions';
import selectorOptionsReducer from './selectorOptions';
import searchTextReducer from './searchText'
import thunkMiddleware from 'redux-thunk';
import selectedProteinReducer from './selectedProtein'


const store = configureStore({
    reducer: {
        listItems: listItemsReducer,
        filterOptions: filterOptionsReducer,
        selectorOptions: selectorOptionsReducer,
        searchText: searchTextReducer,
        selectedProtein: selectedProteinReducer,
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
