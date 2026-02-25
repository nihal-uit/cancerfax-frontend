import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { locationNetworkAPI, doctorAPI, pageComponentAPI } from '../../services/contentService';

export const fetchHospitalMediaByIds = createAsyncThunk(
  'nestedData/fetchHospitalMediaByIds',
  async (ids = [], { rejectWithValue }) => {
    if (!Array.isArray(ids) || ids.length === 0) {
      return rejectWithValue('ids array is required');
    }
    try {
      const data = await locationNetworkAPI.getHospitalMediaByIds(ids);
      return data || [];
    } catch (err) {
      return rejectWithValue(err?.response?.data || err?.message || err || 'Failed to fetch hospital media');
    }
  }
);

export const fetchDoctorMediaByIds = createAsyncThunk(
  'nestedData/fetchDoctorMediaByIds',
  async (ids = [], { rejectWithValue }) => {
    if (!Array.isArray(ids) || ids.length === 0) {
      return rejectWithValue('ids array is required');
    }
    try {
      const data = await doctorAPI.getDoctorMediaByIds(ids);
      return data || [];
    } catch (err) {
      return rejectWithValue(err?.response?.data || err?.message || err || 'Failed to fetch doctor media');
    }
  }
);

export const fetchSurvivorStoryMediaByIds = createAsyncThunk(
  'nestedData/fetchSurvivorStoryMediaByIds',
  async (ids = [], { rejectWithValue }) => {
    if (!Array.isArray(ids) || ids.length === 0) {
      return rejectWithValue('ids array is required');
    }
    try {
      const data = await pageComponentAPI.getSurvivorStoryMediaByIds(ids);
      return data || [];
    } catch (err) {
      return rejectWithValue(err?.response?.data || err?.message || err || 'Failed to fetch doctor media');
    }
  }
);


const initialState = {
  hospitals: {
    byId: {},
    allIds: [],
    loading: false,
    error: null,
  },
  doctors: {
    byId: {},
    allIds: [],
    loading: false,
    error: null,
  },
  survivorStories: {
    byId: {},
    allIds: [],
    loading: false,
    error: null,
  },
};

const nestedDataSlice = createSlice({
  name: 'nestedData',
  initialState,
  reducers: {
    clearNestedData(state) {
      state.hospitals = { byId: {}, allIds: [], loading: false, error: null };
      state.doctors = { byId: {}, allIds: [], loading: false, error: null };
    },
  },
  extraReducers: (builder) => {
    // Hospitals handlers (replace)
    builder
      .addCase(fetchHospitalMediaByIds.pending, (state) => {
        state.hospitals.loading = true;
        state.hospitals.error = null;
      })
      .addCase(fetchHospitalMediaByIds.fulfilled, (state, action) => {
        state.hospitals.loading = false;
        state.hospitals.error = null;
        const items = Array.isArray(action.payload) ? action.payload : [];
        const byId = {};
        const allIds = [];
        items.forEach((item) => {
          const id = item?.id ?? item?.documentId ?? (item?.attributes && (item.attributes.id ?? item.attributes.documentId));
          if (id != null) {
            byId[id] = item;
            allIds.push(id);
          }
        });
        state.hospitals.byId = byId;
        state.hospitals.allIds = allIds;
      })
      .addCase(fetchHospitalMediaByIds.rejected, (state, action) => {
        state.hospitals.loading = false;
        state.hospitals.error = action.payload || action.error?.message || 'Failed to fetch hospitals';
      });

    // Doctors handlers (replace)
    builder
      .addCase(fetchDoctorMediaByIds.pending, (state) => {
        state.doctors.loading = true;
        state.doctors.error = null;
      })
      .addCase(fetchDoctorMediaByIds.fulfilled, (state, action) => {
        state.doctors.loading = false;
        state.doctors.error = null;
        const items = Array.isArray(action.payload) ? action.payload : [];
        const byId = {};
        const allIds = [];
        items.forEach((item) => {
          const id = item?.id ?? item?.documentId ?? (item?.attributes && (item.attributes.id ?? item.attributes.documentId));
          if (id != null) {
            byId[id] = item;
            allIds.push(id);
          }
        });
        state.doctors.byId = byId;
        state.doctors.allIds = allIds;
      })
      .addCase(fetchDoctorMediaByIds.rejected, (state, action) => {
        state.doctors.loading = false;
        state.doctors.error = action.payload || action.error?.message || 'Failed to fetch doctors';
      });

      // Survivor Stories handlers (replace)
    builder
    .addCase(fetchSurvivorStoryMediaByIds.pending, (state) => {
      state.survivorStories.loading = true;
      state.survivorStories.error = null;
    })
    .addCase(fetchSurvivorStoryMediaByIds.fulfilled, (state, action) => {
      state.survivorStories.loading = false;
      state.survivorStories.error = null;
      const items = Array.isArray(action.payload) ? action.payload : [];
      const byId = {};
      const allIds = [];
      items.forEach((item) => {
        const id = item?.id ?? item?.documentId ?? (item?.attributes && (item.attributes.id ?? item.attributes.documentId));
        if (id != null) {
          byId[id] = item;
          allIds.push(id);
        }
      });
      state.survivorStories.byId = byId;
      state.survivorStories.allIds = allIds;
    })
    .addCase(fetchSurvivorStoryMediaByIds.rejected, (state, action) => {
      state.survivorStories.loading = false;
      state.survivorStories.error = action.payload || action.error?.message || 'Failed to fetch survivor stories';
    });
  },
});

export const selectNestedHospitals = (state) => {
  const allIds = state.nestedData?.hospitals?.allIds || [];
  const byId = state.nestedData?.hospitals?.byId || {};
  return {
    data: allIds.map((id) => byId[id]),
    loading: !!state.nestedData?.hospitals?.loading,
    error: state.nestedData?.hospitals?.error ?? null,
  };
};

export const selectNestedDoctors = (state) => {
  const allIds = state.nestedData?.doctors?.allIds || [];
  const byId = state.nestedData?.doctors?.byId || {};
  return {
    data: allIds.map((id) => byId[id]),
    loading: !!state.nestedData?.doctors?.loading,
    error: state.nestedData?.doctors?.error ?? null,
  };
};

export const selectNestedSurvivorStories = (state) => {
  const allIds = state.nestedData?.survivorStories?.allIds || [];
  const byId = state.nestedData?.survivorStories?.byId || {};
  return {
    data: allIds.map((id) => byId[id]),
    loading: !!state.nestedData?.survivorStories?.loading,
    error: state.nestedData?.survivorStories?.error ?? null,
  };
};

export const { clearNestedData } = nestedDataSlice.actions;
export default nestedDataSlice.reducer;

