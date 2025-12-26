import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { diseaseAPI } from '../../services/contentService';

export const fetchDiseaseBySlug = createAsyncThunk(
  'disease/fetchDiseaseBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const data = await diseaseAPI.getDiseaseBySlug(slug);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch disease by slug');
    }
  }
);

const diseaseSlice = createSlice({
  name: 'disease',
  initialState: {
    disease: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiseaseBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiseaseBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.disease = action.payload;
      })
      .addCase(fetchDiseaseBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default diseaseSlice.reducer;

