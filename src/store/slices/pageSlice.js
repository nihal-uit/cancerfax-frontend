import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { withDedupe } from "../utils/dedupeInFlight";
import { pagesAPI } from "../../services/contentService";

const API_URL = process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com';

const fetchSliderComponentsWithMedia = async (slug, timestamp) => {
  try {
    const params = new URLSearchParams();
    params.append("filters[slug][$eq]", slug);
    params.append(
      "populate[dynamic_zone][on][dynamic-zone.slider-section][populate][Slide][populate]",
      "*"
    );
    params.append("_t", timestamp.toString());
    const resp = await axios.get(`${API_URL}/api/pages?${params.toString()}`);
    const dz = resp.data?.data?.[0]?.dynamic_zone || [];
    return dz.filter((c) => c?.__component === "dynamic-zone.slider-section");
  } catch {
    return [];
  }
};

const fetchTestimonialComponentsWithMedia = async (slug, timestamp) => {
  try {
    const params = new URLSearchParams();
    params.append("filters[slug][$eq]", slug);
    params.append(
      "populate[dynamic_zone][on][dynamic-zone.testimonial-slider][populate][survivor_story][populate]",
      "*"
    );
    params.append("_t", timestamp.toString());
    const resp = await axios.get(`${API_URL}/api/pages?${params.toString()}`);
    const dz = resp.data?.data?.[0]?.dynamic_zone || [];
    return dz.filter((c) => c?.__component === "dynamic-zone.testimonial-slider");
  } catch {
    return [];
  }
};

const fetchTherapiesWithMedia = async (therapyIds, timestamp) => {
  if (!Array.isArray(therapyIds) || therapyIds.length === 0) return {};
  try {
    const params = new URLSearchParams();
    therapyIds.forEach((id) => params.append("filters[id][$in]", id));
    params.append("populate", "*");
    params.append("_t", timestamp.toString());
    const resp = await axios.get(`${API_URL}/api/therapies?${params.toString()}`);
    const data = resp.data?.data || [];
    return data.reduce((acc, item) => {
      const attrs = item?.attributes ? { id: item.id, ...item.attributes } : item;
      if (attrs?.id) acc[attrs.id] = attrs;
      return acc;
    }, {});
  } catch {
    return {};
  }
};

// fetchPageBySlug - heavy work: fetch page and enrich dynamic_zone components (deduped by slug)
export const fetchPageBySlug = createAsyncThunk(
  "page/fetchPageBySlug",
  async (slug, { rejectWithValue }) => {
    const normalizedSlug = slug?.trim?.() ?? "";
    const key = `page:${normalizedSlug}`;

    try {
      const payload = await withDedupe(key, async () => {
        const timestamp = Date.now();
        const pageParams = new URLSearchParams();
        pageParams.append("filters[slug][$eq]", normalizedSlug);
        // pageParams.append("populate[dynamic_zone][populate]", "*");
        // pageParams.append("populate[seo][populate]", "*");
        pageParams.append("populate", "*");
        pageParams.append("_t", timestamp.toString());

        const apiUrl = `${API_URL}/api/pages?${pageParams.toString()}`;
        const pagesRes = await axios.get(apiUrl);

        const page = pagesRes.data?.data?.[0] || null;
        if (!page) {
          throw { status: 404, message: `Page "${normalizedSlug}" not found` };
        }

        const pageAttributes = page.attributes || page;
        let dynamicZone = Array.isArray(pageAttributes.dynamic_zone) ? [...pageAttributes.dynamic_zone] : [];

      // Collect therapy IDs for enrichment
      // const therapyIds = dynamicZone
      //   .filter((c) => c?.__component === "dynamic-zone.therapy-section")
      //   .flatMap((c) => {
      //     const list = Array.isArray(c?.Therapy) ? c.Therapy : c?.therapies;
      //     return Array.isArray(list) ? list : [];
      //   })
      //   .map((t) => t?.id)
      //   .filter((id, idx, arr) => id && arr.indexOf(id) === idx);

      // Parallel enrichment calls
      // const [sliderComponentsWithMedia, testimonialComponentsWithMedia, therapiesMap] =
      //   await Promise.all([
      //     fetchSliderComponentsWithMedia(normalizedSlug || "home", timestamp),
      //     fetchTestimonialComponentsWithMedia(normalizedSlug || "home", timestamp),
      //     fetchTherapiesWithMedia(therapyIds, timestamp),
      //   ]);

      // Replace/enrich components where relevant
      // if (dynamicZone.length > 0) {
      //   dynamicZone = dynamicZone.map((component) => {
      //     // slider replacement
      //     if (component?.__component === "dynamic-zone.slider-section" && sliderComponentsWithMedia.length) {
      //       return sliderComponentsWithMedia.find((p) => p?.id === component?.id) || sliderComponentsWithMedia[0] || component;
      //     }

      //     // testimonial replacement
      //     if (component?.__component === "dynamic-zone.testimonial-slider" && testimonialComponentsWithMedia.length) {
      //       return testimonialComponentsWithMedia.find((p) => p?.id === component?.id) || testimonialComponentsWithMedia[0] || component;
      //     }

      //     // therapy enrichment
      //     if (component?.__component === "dynamic-zone.therapy-section" && Object.keys(therapiesMap).length) {
      //       const therapyArray = Array.isArray(component?.Therapy)
      //         ? component.Therapy
      //         : Array.isArray(component?.therapies)
      //         ? component.therapies
      //         : [];

      //       const enriched = therapyArray.map((therapy) => {
      //         const id = therapy?.id;
      //         const remote = id ? therapiesMap[id] : null;
      //         if (!remote) return therapy;
      //         const merged = remote?.attributes ? { id, ...remote.attributes } : remote;
      //         return { ...therapy, ...merged };
      //       });

      //       if (Array.isArray(component?.Therapy)) return { ...component, Therapy: enriched };
      //       if (Array.isArray(component?.therapies)) return { ...component, therapies: enriched };
      //       return component;
      //     }

      //     return component;
      //   });
      // }

        return {
          dynamicZone,
          seo: pageAttributes.seo || null,
          slug: pageAttributes.slug || normalizedSlug,
          pageId: page.id || null,
          documentId: page.documentId || page.id || null,
          dark_header: pageAttributes.dark_header || false,
        };
      });
      return payload;
    } catch (err) {
      if (err?.status === 404) return rejectWithValue({ status: 404, message: "Page not found" });
      if (err.response?.status === 404) return rejectWithValue({ status: 404, message: "Page not found" });
      return rejectWithValue(err.response?.data || err.message || err || "Failed to fetch page");
    }
  }
);

/** Normalize raw Strapi page to store payload shape */
const normalizePagePayload = (page) => {
  if (!page) return null;
  const pageAttributes = page.attributes || page;
  const dynamicZone = Array.isArray(pageAttributes.dynamic_zone) ? [...pageAttributes.dynamic_zone] : [];
  return {
    dynamicZone,
    seo: pageAttributes.seo || null,
    slug: pageAttributes.slug || null,
    pageId: page.id || null,
    documentId: page.documentId || page.id || null,
    dark_header: pageAttributes.dark_header || false,
  };
};

/** Fetch a single page by documentId via /api/pages and store in state */
export const fetchPageByDocumentId = createAsyncThunk(
  "page/fetchPageByDocumentId",
  async (documentId, { rejectWithValue }) => {
    const id = documentId ?? "";
    const key = `pageDoc:${id}`;
    try {
      const page = await withDedupe(key, () => pagesAPI.getByDocumentId(id));
      if (!page) {
        throw { status: 404, message: `Page with documentId "${id}" not found` };
      }
      return normalizePagePayload(page);
    } catch (err) {
      if (err?.status === 404) return rejectWithValue({ status: 404, message: "Page not found" });
      if (err?.response?.status === 404) return rejectWithValue({ status: 404, message: "Page not found" });
      return rejectWithValue(err?.response?.data || err?.message || err || "Failed to fetch page");
    }
  }
);

const pageSlice = createSlice({
  name: "page",
  initialState: {
    /** Cached page payloads keyed by slug */
    pagesBySlug: {},
    /** Slugs currently being fetched */
    loadingSlugs: {},
    /** Last fetch error per slug */
    errorsBySlug: {},
    /** Cached page payloads keyed by documentId (from fetchPageByDocumentId) */
    pageByDocumentId: {},
    /** DocumentIds currently being fetched */
    loadingByDocumentId: {},
    /** Last fetch error per documentId */
    errorsByDocumentId: {},
  },
  reducers: {
    clearPageData(state, action) {
      const slug = action.payload;
      if (slug != null) {
        delete state.pagesBySlug[slug];
        delete state.loadingSlugs[slug];
        delete state.errorsBySlug[slug];
      } else {
        state.pagesBySlug = {};
        state.loadingSlugs = {};
        state.errorsBySlug = {};
        state.pageByDocumentId = {};
        state.loadingByDocumentId = {};
        state.errorsByDocumentId = {};
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPageBySlug.pending, (state, action) => {
        const slug = action.meta.arg?.trim?.() ?? "";
        if (slug) {
          state.loadingSlugs[slug] = true;
          delete state.errorsBySlug[slug];
        }
      })
      .addCase(fetchPageBySlug.fulfilled, (state, action) => {
        const slug = action.payload?.slug ?? action.meta.arg?.trim?.() ?? "";
        if (slug) {
          state.pagesBySlug[slug] = action.payload;
          delete state.loadingSlugs[slug];
          delete state.errorsBySlug[slug];
        }
      })
      .addCase(fetchPageBySlug.rejected, (state, action) => {
        const slug = action.meta.arg?.trim?.() ?? "";
        if (slug) {
          state.errorsBySlug[slug] = action.payload;
          delete state.loadingSlugs[slug];
        }
      })
      .addCase(fetchPageByDocumentId.pending, (state, action) => {
        const docId = action.meta.arg ?? "";
        if (docId) {
          state.loadingByDocumentId[docId] = true;
          delete state.errorsByDocumentId[docId];
        }
      })
      .addCase(fetchPageByDocumentId.fulfilled, (state, action) => {
        const payload = action.payload;
        const docId = payload?.documentId ?? action.meta.arg ?? "";
        if (docId) {
          state.pageByDocumentId[docId] = payload;
          delete state.loadingByDocumentId[docId];
          delete state.errorsByDocumentId[docId];
        }
      })
      .addCase(fetchPageByDocumentId.rejected, (state, action) => {
        const docId = action.meta.arg ?? "";
        if (docId) {
          state.errorsByDocumentId[docId] = action.payload;
          delete state.loadingByDocumentId[docId];
        }
      });
  },
});

/** Select page data, loading, and error for a given slug (for cached pages) */
export const selectPageBySlug = (state, slug) => {
  const normalizedSlug = slug?.trim?.() ?? "";
  return {
    pageData: state.page?.pagesBySlug?.[normalizedSlug] ?? null,
    pageLoading: !!state.page?.loadingSlugs?.[normalizedSlug],
    pageError: state.page?.errorsBySlug?.[normalizedSlug] ?? null,
  };
};

/** Select page data, loading, and error for a given documentId */
export const selectPageByDocumentId = (state, documentId) => {
  const id = documentId ?? "";
  return {
    pageData: state.page?.pageByDocumentId?.[id] ?? null,
    pageLoading: !!state.page?.loadingByDocumentId?.[id],
    pageError: state.page?.errorsByDocumentId?.[id] ?? null,
  };
};

export const { clearPageData } = pageSlice.actions;
export default pageSlice.reducer;
