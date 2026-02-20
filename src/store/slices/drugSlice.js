import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { drugAPI } from '../../services/contentService';

export const fetchDrugBySlug = createAsyncThunk(
  'drug/fetchDrugBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const data = await drugAPI.getDrugBySlug(slug);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch drug by slug');
    }
  }
);

export const fetchDrugs = createAsyncThunk(
  'drug/fetchDrugs',
  async ({ limit = 3, start = 0, query = '', sorting = '' } = {}, { rejectWithValue }) => {
    try {
      const data = await drugAPI.getDrugs({ limit, start, query, sorting });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch drugs');
    }
  }
);

const drugSlice = createSlice({
  name: 'drug',
  initialState: {
    drug: null,
    drugs: [],
    loading: false,
    drugsLoading: false,
    drugsHasMore: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrugBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrugBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.drug = action.payload;
      })
      .addCase(fetchDrugBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDrugs.pending, (state) => {
        state.drugsLoading = true;
        state.error = null;
      })
      .addCase(fetchDrugs.fulfilled, (state, action) => {
        state.drugsLoading = false;
        state.drugs = action.payload.data ?? [];
        const meta = action.payload.meta?.pagination;
        state.drugsHasMore = meta
          ? (meta.start + meta.limit) < meta.total
          : false;
      })
      .addCase(fetchDrugs.rejected, (state, action) => {
        state.drugsLoading = false;
        state.error = action.payload;
      });
  },
});

export default drugSlice.reducer;