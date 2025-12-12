import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doctorAPI } from '../../services/contentService';

export const fetchDoctorBySlug = createAsyncThunk(
  'doctor/fetchDoctorBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const data = await doctorAPI.getDoctorBySlug(slug);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch doctor by slug');
    }
  }
);

export const fetchDoctors = createAsyncThunk(
  'doctor/fetchDoctors',
  async ({ limit = 3, start = 0, query = '' } = {}, { rejectWithValue }) => {
    try {
      const response = await doctorAPI.getDoctors({ limit, start, query });
      return {
        data: response.data,
        meta: response.meta,
        start,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch doctors');
    }
  }
);

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    doctor: null,
    doctors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(fetchDoctorBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload.data;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doctorSlice.reducer;