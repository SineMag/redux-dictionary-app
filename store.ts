import { configureStore } from '@reduxjs/toolkit';
import dictionaryReducer from './src/features/dictionary/dictionarySlice'; // Import the reducer


export const store = configureStore({
  reducer: {
    // Reducers will be added here
    dictionary: dictionaryReducer, // Add reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;