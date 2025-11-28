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

const resourcesSlice = createSlice({
  name: 'resources',
  initialState: {
    sectionContent: null,
    blogs: [],
    blogsMeta: null,
    blogsHasMore: true,
    blogsLoading: false,
    singleBlog: null,
    loading: false,
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
        state.blogsLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        const { data, meta, start } = action.payload;
        if (start === 0) {
          state.blogs = data;
        } else {
          const existingIds = new Set(
            state.blogs.map((blog) => blog?.documentId || blog?.id)
          );
          const newItems = data.filter((blog) => {
            const identifier = blog?.documentId || blog?.id;
            return identifier ? !existingIds.has(identifier) : true;
          });
          state.blogs = [...state.blogs, ...newItems];
        }
        state.blogsMeta = meta;
        const total = meta?.pagination?.total;
        state.blogsHasMore =
          typeof total === 'number'
            ? state.blogs.length < total
            : data.length > 0;
        state.blogsLoading = false;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.blogsLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleBlog = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default resourcesSlice.reducer;
