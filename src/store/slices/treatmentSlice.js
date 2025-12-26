import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { treatmentAPI } from '../../services/contentService';
import { countryTreatmentAPI } from '../../services/contentService';

export const fetchTreatmentBySlug = createAsyncThunk(
  'treatment/fetchTreatmentBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const data = await treatmentAPI.getTreatmentBySlug(slug);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch doctor by slug');
    }
  }
);

export const fetchTreatments = createAsyncThunk(
  'treatment/fetchTreatments',
  async ({ limit = 3, start = 0, query = '' } = {}, { rejectWithValue }) => {
    try {
      const response = await treatmentAPI.getTreatments({ limit, start, query });
      return {
        data: response.data,
        meta: response.meta,
        start,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch treatments');
    }
  }
);

export const fetchCountryTreatmentBySlug = createAsyncThunk(
  'countryTreatment/fetchCountryTreatmentBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const data = await countryTreatmentAPI.getCountryTreatmentBySlug(slug);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch country treatment by slug');
    }
  }
);

const treatmentSlice = createSlice({
  name: 'treatment',
  initialState: {
    treatment: null,
    treatments: [],
    countryTreatment: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTreatmentBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTreatmentBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.treatment = action.payload;
      })
      .addCase(fetchTreatmentBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTreatments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTreatments.fulfilled, (state, action) => {
        state.loading = false;
        state.treatments = action.payload.data;
      })
      .addCase(fetchTreatments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCountryTreatmentBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountryTreatmentBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.countryTreatment = action.payload;
      })
      .addCase(fetchCountryTreatmentBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
  },
});

export default treatmentSlice.reducer;