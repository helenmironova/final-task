import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadState } from '../localStorage';
import { setNewSelectedProteinName, fetchProteinData } from './selectedProtein';

const persistedState = loadState('state')?.listItems;

const initialState: any = persistedState || {
  items: [],
  isLoading: false,
  nextUrl: '',
};

// Helper function to parse the next URL from the Link header
const parseNextLink = (linkHeader: string | null): string | null => {
  if (linkHeader) {
    const links = linkHeader.split(", ");
    for (const link of links) {
      const [url, rel] = link.split("; ");
      if (rel === 'rel="next"') {
        return url.slice(1, -1); // Remove the angle brackets around the URL
      }
    }
  }
  return null;
};

// Define the async thunk action
export const fetchItems = createAsyncThunk(
  'listItems/fetchItems',
  async (url: string, { dispatch }) => {
    try {
      const response = await fetch(url);
      const linkHeader = response.headers.get("Link");
      const nextUrl = parseNextLink(linkHeader);
      const [data, newNextUrl] = await Promise.all([response.json(), nextUrl]);
      const newItems = data.results;
      dispatch(setNextUrl(newNextUrl || ''));
      dispatch(addListItems(newItems));
      dispatch(setNewSelectedProteinName(newItems[0].primaryAccession))
      dispatch(fetchProteinData(newItems[0].primaryAccession))
    } catch (error) {
      console.error(error);
    }
  }
);

export const listItemsSlice = createSlice({
  name: 'listItems',
  initialState,
  reducers: {
    addListItems: (state, action) => {
      state.items.push(...action.payload);
    },
    removeItems: (state) => {
      state.items.splice(0, state.items.length);
    },
    setNextUrl: (state, action) => {
      state.nextUrl = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const { addListItems, removeItems, setNextUrl } = listItemsSlice.actions;

export default listItemsSlice.reducer;
