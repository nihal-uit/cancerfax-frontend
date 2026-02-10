import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { diseaseAPI, therapyAPI } from '../../services/contentService';

// Async thunk to submit cost calculator form
export const submitCostCalculator = createAsyncThunk(
  'costCalculator/submitCostCalculator',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/cost-calculator-submissions', {
        data: formData
      });
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to submit cost calculator form');
    }
  }
);

// Async thunk to submit detailed cost breakup form
export const submitCostBreakupForm = createAsyncThunk(
  'costCalculator/submitCostBreakupForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/cost-calculator-leads', {
        data: formData
      });
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to submit cost breakup form');
    }
  }
);

// Async thunk to fetch diseases by age and gender
export const fetchDiseasesByAgeAndGender = createAsyncThunk(
  'costCalculator/fetchDiseasesByAgeAndGender',
  async ({ ageCategory }, { rejectWithValue }) => {
    try {
      // Map age category to age_criteria and gender_criteria
      const ageGenderMap = {
        'pediatricMale': { ageCriteria: 'pediatric', genderCriteria: 'male' },
        'pediatricFemale': { ageCriteria: 'pediatric', genderCriteria: 'female' },
        'adultMale': { ageCriteria: 'adult', genderCriteria: 'male' },
        'adultFemale': { ageCriteria: 'adult', genderCriteria: 'female' },
      };

      const { ageCriteria, genderCriteria } = ageGenderMap[ageCategory] || {};
      if (!ageCriteria || !genderCriteria) {
        return [];
      }

      const data = await diseaseAPI.getDiseasesByAgeAndGender(ageCriteria, genderCriteria);
      return data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch diseases');
    }
  }
);

// Async thunk to fetch therapies by disease
export const fetchTherapiesByDisease = createAsyncThunk(
  'costCalculator/fetchTherapiesByDisease',
  async (diseaseId, { rejectWithValue }) => {
    try {
      const data = await therapyAPI.getTherapiesByDisease(diseaseId);
      return data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch therapies');
    }
  }
);

const costCalculatorSlice = createSlice({
  name: 'costCalculator',
  initialState: {
    formData: {
      ageCategory: '',
      disease: '',
      diseaseId: '',
      treatment: '',
      treatmentId: '',
      location: '',
    },
    costBreakupFormData: {
      name: '',
      phoneNumber: '',
      email: '',
      location: '',
      ageCategory: '',
      disease: '',
      diseaseId: '',
      treatment: '',
      treatmentId: '',
      message: '',
    },
    diseases: [],
    therapies: [],
    selectedTherapy: null,
    availableCountries: [],
    diseasesLoading: false,
    therapiesLoading: false,
    calculationResult: null,
    submissionStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    costBreakupSubmissionStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    loading: false,
    error: null,
  },
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
      
      // Reset dependent fields when parent field changes
      if (field === 'ageCategory') {
        state.formData.disease = '';
        state.formData.diseaseId = '';
        state.formData.treatment = '';
        state.formData.treatmentId = '';
        state.formData.location = '';
        state.diseases = [];
        state.therapies = [];
        state.selectedTherapy = null;
        state.availableCountries = [];
      } else if (field === 'disease') {
        state.formData.treatment = '';
        state.formData.treatmentId = '';
        state.formData.location = '';
        state.therapies = [];
        state.selectedTherapy = null;
        state.availableCountries = [];
      } else if (field === 'treatment') {
        state.formData.location = '';
        state.selectedTherapy = null;
        state.availableCountries = [];
      }
    },
    setSelectedTherapy: (state, action) => {
      state.selectedTherapy = action.payload;
      // Extract available countries from therapy
      if (action.payload) {
        const countries = [];
        
        // Helper to extract country from relation (handles both .data and direct formats)
        const extractCountry = (countryRel) => {
          if (!countryRel) return null;
          // Handle nested .data structure
          if (countryRel.data) {
            const countryData = Array.isArray(countryRel.data) ? countryRel.data[0] : countryRel.data;
            return countryData ? { id: countryData.id, ...(countryData.attributes || countryData) } : null;
          }
          // Handle direct format (already formatted by formatStrapiResponse)
          return countryRel.id ? countryRel : null;
        };
        
        // Add countries from country_costs (preferred)
        if (action.payload.country_costs && Array.isArray(action.payload.country_costs)) {
          action.payload.country_costs.forEach(cost => {
            const country = extractCountry(cost.country);
            if (country && !countries.find(c => c.id === country.id)) {
              countries.push(country);
            }
          });
        }
        
        // Add countries from countries relation (fallback)
        if (action.payload.countries) {
          const countriesData = Array.isArray(action.payload.countries) 
            ? action.payload.countries 
            : (action.payload.countries.data || []);
          
          countriesData.forEach(countryRel => {
            const country = extractCountry(countryRel);
            if (country && !countries.find(c => c.id === country.id)) {
              countries.push(country);
            }
          });
        }
        
        state.availableCountries = countries;
      } else {
        state.availableCountries = [];
      }
    },
    updateCostBreakupFormField: (state, action) => {
      const { field, value } = action.payload;
      state.costBreakupFormData[field] = value;
    },
    resetForm: (state) => {
      state.formData = {
        ageCategory: '',
        disease: '',
        diseaseId: '',
        treatment: '',
        treatmentId: '',
        location: '',
      };
      state.diseases = [];
      state.therapies = [];
      state.selectedTherapy = null;
      state.availableCountries = [];
      state.submissionStatus = 'idle';
      state.error = null;
    },
    resetCostBreakupForm: (state) => {
      state.costBreakupFormData = {
        name: '',
        phoneNumber: '',
        email: '',
        location: '',
        ageCategory: '',
        disease: '',
        diseaseId: '',
        treatment: '',
        treatmentId: '',
        message: '',
      };
      state.costBreakupSubmissionStatus = 'idle';
      state.error = null;
    },
    resetSubmissionStatus: (state) => {
      state.submissionStatus = 'idle';
      state.error = null;
    },
    setSubmissionStatus: (state, action) => {
      state.submissionStatus = action.payload;
    },
    resetCostBreakupSubmissionStatus: (state) => {
      state.costBreakupSubmissionStatus = 'idle';
      state.error = null;
    },
    setCalculationResult: (state, action) => {
      state.calculationResult = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit cost calculator form
      .addCase(submitCostCalculator.pending, (state) => {
        state.submissionStatus = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(submitCostCalculator.fulfilled, (state, action) => {
        state.submissionStatus = 'succeeded';
        state.loading = false;
        state.calculationResult = action.payload;
      })
      .addCase(submitCostCalculator.rejected, (state, action) => {
        state.submissionStatus = 'failed';
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Submit cost breakup form
      .addCase(submitCostBreakupForm.pending, (state) => {
        state.costBreakupSubmissionStatus = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(submitCostBreakupForm.fulfilled, (state, action) => {
        state.costBreakupSubmissionStatus = 'succeeded';
        state.loading = false;
      })
      .addCase(submitCostBreakupForm.rejected, (state, action) => {
        state.costBreakupSubmissionStatus = 'failed';
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Fetch diseases by age and gender
      .addCase(fetchDiseasesByAgeAndGender.pending, (state) => {
        state.diseasesLoading = true;
        state.diseases = [];
      })
      .addCase(fetchDiseasesByAgeAndGender.fulfilled, (state, action) => {
        state.diseasesLoading = false;
        state.diseases = action.payload || [];
      })
      .addCase(fetchDiseasesByAgeAndGender.rejected, (state, action) => {
        state.diseasesLoading = false;
        state.diseases = [];
        state.error = action.payload || action.error.message;
      })
      // Fetch therapies by disease
      .addCase(fetchTherapiesByDisease.pending, (state) => {
        state.therapiesLoading = true;
        state.therapies = [];
      })
      .addCase(fetchTherapiesByDisease.fulfilled, (state, action) => {
        state.therapiesLoading = false;
        state.therapies = action.payload || [];
      })
      .addCase(fetchTherapiesByDisease.rejected, (state, action) => {
        state.therapiesLoading = false;
        state.therapies = [];
        state.error = action.payload || action.error.message;
      });
  },
});

export const { 
  updateFormField,
  updateCostBreakupFormField,
  resetForm,
  resetCostBreakupForm,
  resetSubmissionStatus,
  resetCostBreakupSubmissionStatus,
  setCalculationResult,
  setSelectedTherapy,
  setSubmissionStatus
} = costCalculatorSlice.actions;

export default costCalculatorSlice.reducer;
