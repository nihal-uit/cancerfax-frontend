import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clinicalTrialsAPI } from '../../services/contentService';

export const fetchClinicalTrialsSection = createAsyncThunk(
  'clinicalTrials/fetchSection',
  async (_, { rejectWithValue }) => {
    try {
      const data = await clinicalTrialsAPI.getClinicalTrialsSection();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch clinical trials section');
    }
  }
);

export const fetchTrialTypes = createAsyncThunk(
  'clinicalTrials/fetchTrialTypes',
  async (_, { rejectWithValue }) => {
    try {
      const data = await clinicalTrialsAPI.getTrialTypes();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch trial types');
    }
  }
);

export const fetchClinicalTrialsBySlug = createAsyncThunk(
  'clinicalTrials/fetchBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const data = await clinicalTrialsAPI.getClinicalTrialsBySlug(slug);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch clinical trials by slug');
    }
  }
);

export const fetchClinicalTrialsList = createAsyncThunk(
  'clinicalTrials/fetchList',
  async (
    { search = '', country = '', disease = '', treatment = '', start = 0, limit = 12 } = {},
    { rejectWithValue }
  ) => {
    try {
      const data = await clinicalTrialsAPI.getClinicalTrials({
        search,
        country,
        disease,
        treatment,
        start,
        limit,
      });
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch clinical trials list');
    }
  }
);

const clinicalTrialsSlice = createSlice({
  name: 'clinicalTrials',
  initialState: {
    sectionContent: null,
    trialTypes: [],
    list: [],
    listLoading: false,
    listError: null,
    loading: false,
    error: null,
    heroSearchQuery: '',
    clinicalTrials: null,
  },
  reducers: {
    setHeroSearchQuery: (state, action) => {
      state.heroSearchQuery = action.payload ?? '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClinicalTrialsSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClinicalTrialsSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionContent = action.payload;
      })
      .addCase(fetchClinicalTrialsSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTrialTypes.fulfilled, (state, action) => {
        state.trialTypes = action.payload;
      })
      .addCase(fetchClinicalTrialsList.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(fetchClinicalTrialsList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchClinicalTrialsList.rejected, (state, action) => {
        state.listLoading = false;
        state.listError = action.payload;
        state.list = [];
      })
      .addCase(fetchClinicalTrialsBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClinicalTrialsBySlug.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure clinicalTrials is always an array for consistency with component usage
        state.clinicalTrials = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      .addCase(fetchClinicalTrialsBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.clinicalTrials = null;
      });
  },
});

export const { setHeroSearchQuery } = clinicalTrialsSlice.actions;
export default clinicalTrialsSlice.reducer;




























