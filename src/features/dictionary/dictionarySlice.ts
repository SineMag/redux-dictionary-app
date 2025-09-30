// A simplified interface for the API response
export interface Definition {
  definition: string;
  example?: string;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

export interface WordEntry {
  word: string;
  phonetic: string;
  meanings: Meaning[];
}

export interface DictionaryState {
  entries: WordEntry[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DictionaryState = {
  entries: [],
  loading: 'idle',
  error: null,
};


//Thunk
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// ... import interfaces from above

export const fetchWordDefinition = createAsyncThunk( // a Thunk comes with a lifecycle of actions - pending, fulfilled, rejected,, to keep the user updated on the request status
  'dictionary/fetchWord', // a string-action type.. to create additional actions like pending, fulfilled, rejected
  async (word: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<WordEntry[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.title || 'Could not find definition.');
      }
      return rejectWithValue('An unknown error occurred.');
    }
  }
);


//Slice
export const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    // Standard reducers can go here if needed
  },
  extraReducers: (builder) => {
    builder //must have a current state before it gets modified
      .addCase(fetchWordDefinition.pending, (state) => { // depends on the lifecycle of the thunk.. for the user to access it 
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchWordDefinition.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.entries = action.payload; // the data returned from the thunk (response.data)
      })
      .addCase(fetchWordDefinition.rejected, (state, action) => {
        state.loading = 'failed';
        state.entries = [];
        state.error = action.payload as string; // an error object that as a string (stringifyed)
      });
  },
});

export default dictionarySlice.reducer; 
// if you were import from this file, by default it would import the reducer (dictionarySlice.reducer)
// it'll be imported in store.ts and added to the store at dictionartReducer


