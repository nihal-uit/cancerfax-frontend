import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import qs from "qs";
import { getMediaUrl } from "../../services/api";
import { withDedupe } from "../utils/dedupeInFlight";

const API_URL = process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com';

// resolveLogoUrl - minimal deterministic helper to return a URL or null
const resolveLogoUrl = (logo) => {
  if (!logo) return null;
  if (typeof logo === "string") return logo.trim() ? getMediaUrl(logo.trim()) : null;
  if (logo?.url) return getMediaUrl(logo.url);
  if (logo?.data?.attributes?.url) return getMediaUrl(logo.data.attributes.url);
  if (logo?.attributes?.url) return getMediaUrl(logo.attributes.url);
  if (logo?.hash && logo?.name) return getMediaUrl(`/uploads/${logo.hash}_${logo.name}`);
  return null;
};

export const fetchGlobalData = createAsyncThunk(
  "global/fetchGlobalData",
  async (_, { rejectWithValue }) => {
    try {
      return await withDedupe("global", async () => {
        const timestamp = Date.now();
        const globalPopulateQuery = qs.stringify(
          {
            populate: {
              settings: {
                populate: {
                  logo: { fields: ["id", "url", "hash", "name"] },
                  favicon: { fields: ["id", "url", "hash", "name"] },
                  address: true,
                  offices: { populate: true },
                  ogImage: { fields: ["id", "url", "hash", "name"] },
                  whatsappButton: true,
                  cookieConsent: true,
                },
              },
              navbar: { populate: true },
              footer: {
                populate: {
                  logo: { fields: ["id", "url", "hash", "name"] },
                  footer_columns: { populate: { links: true } },
                  social_media_links: { populate: { image: true, link: true } },
                  locations: true,
                  policy_links: true,
                  cta: true,
                },
              },
            },
            _t: timestamp,
          },
          { encodeValuesOnly: true }
        );

        const url = `${API_URL}/api/global?${globalPopulateQuery}`;
        const res = await axios.get(url);
        const raw = res?.data?.data || null;
        const globalData = raw?.attributes ? { id: raw.id, ...raw.attributes } : raw;

        let navbarLogoUrl = resolveLogoUrl(globalData?.navbar?.logo);
        let footerLogoUrl = resolveLogoUrl(globalData?.footer?.logo);
        const knownLogoUrl = `${API_URL}/uploads/logo_851ef64fcb.png`;

        if (!navbarLogoUrl && !footerLogoUrl) {
          navbarLogoUrl = footerLogoUrl = knownLogoUrl;
        } else if (!navbarLogoUrl) {
          navbarLogoUrl = footerLogoUrl || knownLogoUrl;
        } else if (!footerLogoUrl) {
          footerLogoUrl = navbarLogoUrl || knownLogoUrl;
        }

        return {
          ...globalData,
          navbarLogoUrl,
          footerLogoUrl,
        };
      });
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message || "Failed to fetch global data");
    }
  }
);

export const fetchMenuData = createAsyncThunk(
  "global/fetchMenuData",
  async (_, { rejectWithValue }) => {
    try {
      return await withDedupe("menu", async () => {
        const menuPopulateQuery = qs.stringify(
          {
            populate: {
              parent: true,
              children: {
                populate: {
                  children: {
                    populate: { children: true },
                  },
                },
              },
            },
          },
          { encodeValuesOnly: true }
        );
        const url = `${API_URL}/api/menu-items?${menuPopulateQuery}`;
        const response = await axios.get(url);
        return response.data.data;
      });
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message || "Failed to fetch menu data");
    }
  }
);

const globalSlice = createSlice({
  name: "global",
  initialState: {
    data: null,
    menuData: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearGlobalData(state) {
      state.data = null;
      state.menuData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGlobalData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGlobalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMenuData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.loading = false;
        state.menuData = action.payload;
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { clearGlobalData } = globalSlice.actions;
export default globalSlice.reducer;
