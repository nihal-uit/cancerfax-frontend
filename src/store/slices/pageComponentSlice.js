import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pageComponentAPI } from '../../services/contentService';

export const fetchPageComponentBySlug = createAsyncThunk(
  'pageComponent/fetchPageComponent',
  async (payload, { rejectWithValue }) => {
    const { slug, queryParams = {} } = typeof payload === 'object' && payload !== null
      ? payload
      : { slug: payload, queryParams: {} };
    if (!slug) {
      return rejectWithValue('Slug is required');
    }
    try {
      const data = await pageComponentAPI.getPageComponent(slug, queryParams);
      return data?.[0]?.dynamic_zone?.[0] ?? null;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err?.message || err || 'Failed to fetch page component');
    }
  }
);

const pageComponentSlice = createSlice({
  name: 'pageComponent',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearPageComponentData(state) {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPageComponentBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPageComponentBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchPageComponentBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectPageComponentBySlug = (state) => ({
  data: state.pageComponent?.data ?? null,
  loading: !!state.pageComponent?.loading,
  error: state.pageComponent?.error ?? null,
});

export const { clearPageComponentData } = pageComponentSlice.actions;
export default pageComponentSlice.reducer;
