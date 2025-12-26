import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { resourceCategoriesAPI } from '../../services/contentService';

export const fetchResourceCategories = createAsyncThunk(
    'resourcesCategory/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const data = await resourceCategoriesAPI.getCategories();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch resources categories');
        }
    }
);

export const fetchResourceSubCategories = createAsyncThunk(
    'resourcesCategory/fetchSubCategories',
    async (_, { rejectWithValue }) => {
        try {
            const data = await resourceCategoriesAPI.getSubCategories();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch resources subcategories');
        }
    }
);

const resourcesCategorySlice = createSlice({
    name: 'resourcesCategory',
    initialState: {
        categories: [],
        subcategories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchResourceCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchResourceCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchResourceCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchResourceSubCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchResourceSubCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.subcategories = action.payload;
            })
            .addCase(fetchResourceSubCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default resourcesCategorySlice.reducer;