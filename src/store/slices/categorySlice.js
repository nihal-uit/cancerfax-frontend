import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { categoriesAPI } from '../../services/contentService';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
      try {
        const data = await categoriesAPI.getCategories();
        return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch categories'
      );
    }
  }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
      categories: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCategories.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.loading = false;
          state.categories = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    },
  });

  export default categorySlice.reducer;