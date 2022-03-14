import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGistsByUsername = createAsyncThunk(
  'gists/fetchByUsername',
  async (username, thunkAPI) => {
    const res = await fetch(`https://api.github.com/users/${username}/gists`).then(data => data.json());
    return res;
  }
);

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const gistsSlice = createSlice({
  name: 'gists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGistsByUsername.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true;
          state.error = null;
        }
      })
      .addCase(fetchGistsByUsername.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
          state.error = null;
          state.list = action.payload;
        }
      })
      .addCase(fetchGistsByUsername.rejected, (state, action) => {
        if (state.loading) {
          state.loading = false;
          state.error = action.error;
          state.list = [];
        }
      })
  },
})

export const selectGists = (state) => state.gists;

export default gistsSlice.reducer;
