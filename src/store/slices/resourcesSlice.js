import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { resourcesAPI } from '../../services/contentService';

export const fetchResourcesSection = createAsyncThunk(
  'resources/fetchSection',
  async (_, { rejectWithValue }) => {
    try {
      const data = await resourcesAPI.getResourcesSection();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch resources section'
      );
    }
  }
);

export const fetchBlogs = createAsyncThunk(
  'resources/fetchBlogs',
  async ({ limit = 3, start = 0 } = {}, { rejectWithValue }) => {
    try {
      const response = await resourcesAPI.getBlogs({ limit, start });
      return {
        data: response.data,
        meta: response.meta,
        start,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch blogs');
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  'resources/fetchBlogById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await resourcesAPI.getBlogById(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch blog by ID'
      );
    }
  }
);

export const fetchRelatedBlogs = createAsyncThunk(
  'resources/fetchRelatedBlogs',
  async (id, { rejectWithValue }) => {
    try {
      const data = await resourcesAPI.getRelatedBlogs(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch related blogs'
      );
    }
  }
);

const resourcesSlice = createSlice({
  name: 'resources',
  initialState: {
    sectionContent: null,
    blogs: [],
    blogsMeta: null,
    blogsHasMore: true,
    blogsLoading: false,
    singleBlog: null,
    relatedBlogs: null,
    loading: false,
    loadingBlogs: false,
    loadingSingleBlog: false,
    loadingRelatedBlogs: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResourcesSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResourcesSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionContent = action.payload;
      })
      .addCase(fetchResourcesSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBlogs.pending, (state) => {
        state.loadingBlogs = true;
        state.error = null;
        state.blogs = [];
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loadingBlogs = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.loadingSingleBlog = true;
        state.error = null;
        state.singleBlog = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loadingSingleBlog = false;
        state.singleBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loadingSingleBlog = false;
        state.error = action.payload;
      })
      .addCase(fetchRelatedBlogs.pending, (state) => {
        state.loadingRelatedBlogs = true;
        state.error = null;
        state.relatedBlogs = null;
      })
      .addCase(fetchRelatedBlogs.fulfilled, (state, action) => {
        state.loadingRelatedBlogs = false;
        state.relatedBlogs = action.payload;
      })
      .addCase(fetchRelatedBlogs.rejected, (state, action) => {
        state.loadingRelatedBlogs = false;
        state.error = action.payload;
      });
  },
});

export default resourcesSlice.reducer;
