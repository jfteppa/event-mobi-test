import { configureStore } from '@reduxjs/toolkit';
import gistsReducer from './components/gists/gists-slice';

export const store = configureStore({
  reducer: {
    gists: gistsReducer
  },
})
