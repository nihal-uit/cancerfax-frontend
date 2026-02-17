import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hospitalNetworkAPI } from '../../services/contentService';

// Fetch hero section content
export const fetchHospitalHeroSection = createAsyncThunk(
  'hospitalNetwork/fetchHeroSection',
  async (_, { rejectWithValue }) => {
    try {
      const data = await hospitalNetworkAPI.getHeroSection();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch hero section');
    }
  }
);

// Fetch hospitals list
export const fetchHospitals = createAsyncThunk(
  'hospitalNetwork/fetchHospitals',
  async ({ limit = 3, start = 0, query = '', sorting = '' } = {}, { rejectWithValue }) => {
    try {
      const response = await hospitalNetworkAPI.getHospitals({ limit, start, query, sorting });
      return {
        data: response.data,
        meta: response.meta,
        start,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch hospitals');
    }
  }
);

export const fetchHospitalBySlug = createAsyncThunk(
  'hospitalNetwork/fetchHospitalBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const data = await hospitalNetworkAPI.getHospitalBySlug(slug);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch hospital by slug');
    }
  }
);

const hospitalNetworkSlice = createSlice({
  name: 'hospitalNetwork',
  initialState: {
    heroSection: null,
    hospitals: [],
    hospital: null,
    loading: false,
    hospitalsLoading: false,
    hospitalsHasMore: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Hero Section
      .addCase(fetchHospitalHeroSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHospitalHeroSection.fulfilled, (state, action) => {
        state.loading = false;
        state.heroSection = action.payload;
      })
      .addCase(fetchHospitalHeroSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Hospitals
      .addCase(fetchHospitals.pending, (state) => {
        state.hospitalsLoading = true;
        state.error = null;
      })
      .addCase(fetchHospitals.fulfilled, (state, action) => {
        const { data, meta, start } = action.payload;
        if (start === 0) {
          state.hospitals = data;
        } else {
          const existingIds = new Set(
            state.hospitals.map((hospital) => hospital?.documentId || hospital?.id)
          );
          const newItems = data.filter((hospital) => {
            const identifier = hospital?.documentId || hospital?.id;
            return identifier ? !existingIds.has(identifier) : true;
          });
          state.hospitals = [...state.hospitals, ...newItems];
        }
        state.hospitalsMeta = meta;
        const total = meta?.pagination?.total;
        state.hospitalsHasMore =
          typeof total === 'number'
            ? state.hospitals.length < total
            : data.length > 0;
        state.hospitalsLoading = false;
      })
      .addCase(fetchHospitals.rejected, (state, action) => {
        state.hospitalsLoading = false;
        state.error = action.payload;
      })

      // Fetch Hospital by Slug
      .addCase(fetchHospitalBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHospitalBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.hospital = action.payload;
      })
      .addCase(fetchHospitalBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default hospitalNetworkSlice.reducer;

















