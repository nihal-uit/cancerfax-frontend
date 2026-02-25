import qs from 'qs';
import api, { formatStrapiResponse } from './api';

// Navigation API
export const navigationAPI = {
  getNavigation: async () => {
    const response = await api.get('/navigation?populate=*');
    return formatStrapiResponse(response.data.data);
  },

  getLogo: async () => {
    const response = await api.get('/logo?populate=deep');
    return formatStrapiResponse(response.data.data);
  },

  getLanguages: async () => {
    const response = await api.get('/languages?populate=deep');
    return formatStrapiResponse(response.data.data);
  },

  getButtons: async () => {
    const response = await api.get('/navigation-buttons?populate=*');
    return formatStrapiResponse(response.data.data);
  },
};

// Hero Section API
export const heroAPI = {
  getHeroContent: async () => {
    const response = await api.get('/hero-section?populate=*');
    return formatStrapiResponse(response.data.data);
  },

  getSurvivorStory: async () => {
    const response = await api.get('/survivor-story?populate=*');
    return formatStrapiResponse(response.data.data);
  },
};

// About Section API
export const aboutAPI = {
  getAboutContent: async () => {
    const response = await api.get('/about-section?populate=*');
    return formatStrapiResponse(response.data.data);
  },
};

// Pages API
export const pagesAPI = {
  /**
   * Fetch a page by slug with optional query params (e.g. populate) passed by the caller.
   * @param {string} slug - Page slug
   * @param {Object} [queryParams={}] - Additional query params as key-value pairs (e.g. populate options from component)
   */
  getBySlug: async (slug, queryParams = {}) => {
    const params = new URLSearchParams();
    params.append('filters[slug][$eq]', (slug || '').trim());
    if (queryParams && typeof queryParams === 'object' && !Array.isArray(queryParams)) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (key != null && value != null) params.append(key, String(value));
      });
    }
    // params.append('_t', Date.now().toString());
    const response = await api.get(`/pages?${params.toString()}`);
    return response.data?.data?.[0] ?? null;
  },
  getByDocumentId: async (documentId) => {
    if (!documentId) return null;
    const params = new URLSearchParams();
    params.append('filters[documentId][$eq]', documentId);
    params.append('populate[dynamic_zone][populate]', '*');
    params.append('populate[seo][populate]', '*');
    
    params.append('_t', Date.now().toString());
    const response = await api.get(`/pages?${params.toString()}`);
    return response.data?.data?.[0] ?? null;
  },
};

// Page Component API
export const pageComponentAPI = {
  /** Fetch page component data for survivor-stories (used by SurvivorStoriesHero). */
  getPageComponent: async (slug, queryParams = {}) => {
    const query = {
      filters: { slug: { $eq: slug } },
      ...(queryParams && typeof queryParams === 'object' && !Array.isArray(queryParams) ? queryParams : {}),
    };
    const queryString = qs.stringify(query, { encodeValuesOnly: true });
    const response = await api.get(`/pages?${queryString}`);
    return response.data?.data;
  },

  getSurvivorStoryMediaByIds: async (ids = []) => {
    if (!Array.isArray(ids) || ids.length === 0) return [];
    // Build filters for Strapi: filters[id][$in][0]=id1&filters[id][$in][1]=id2...
    const idFilters = ids
      .map((id, idx) => `filters[id][$in][${idx}]=${encodeURIComponent(id)}`)
      .join('&');

    const response = await api.get(`/survivor-stories?${idFilters}&populate[hero][populate][featuredImage][fields][0]=url&populate[hero][populate][featuredVideo][fields][0]=url`);
    return response.data.data || [];
  },
};

// Innovative Care API
export const innovativeCareAPI = {
  getInnovativeCare: async () => {
    const response = await api.get('/innovative-care?populate=*');
    return formatStrapiResponse(response.data.data);
  },

  getTherapies: async () => {
    const response = await api.get('/therapies?populate=*');
    return formatStrapiResponse(response.data.data);
  },

  getTherapiesBySlug: async (slug) => {
    const response = await api.get(`/therapies?filters[slug][$eq]=${slug}&populate=*`);
    return response.data.data;
  },
};

// Testimonials API
export const testimonialsAPI = {
  getTestimonials: async () => {
    const response = await api.get('/testimonials?populate=*');
    return formatStrapiResponse(response.data.data);
  },

  getFeaturedTestimonial: async () => {
    const response = await api.get(
      '/testimonials?filters[featured][$eq]=true&populate=*'
    );
    const data = formatStrapiResponse(response.data.data);
    return Array.isArray(data) ? data[0] : data;
  },
};

// Clinical Trials API
export const clinicalTrialsAPI = {
  getClinicalTrialsSection: async () => {
    const response = await api.get('/clinical-trials-section?populate=*');
    return formatStrapiResponse(response.data.data);
  },

  getTrialTypes: async () => {
    const response = await api.get('/trial-types?populate=*');
    return formatStrapiResponse(response.data.data);
  },

  getClinicalTrialsBySlug: async (slug) => {
    const response = await api.get(`/clinical-trials?filters[slug][$eq]=${slug}&populate=*`);
    return response.data.data;
  },

  /**
   * Fetch clinical trials list with optional search and filters.
   * @param {Object} params - { search, country, disease, therapy, start, limit }
   * @returns {Array} List of trial records (same shape as trialData.json).
   */
  getClinicalTrials: async ({
    search = '',
    country = '',
    disease = '',
    therapy = '',
    start = 0,
    limit = 12,
  } = {}) => {
    const params = new URLSearchParams();
    // params.append('populate', '*');
    params.append('fields[0]', 'name');
    params.append('fields[1]', 'slug');
    params.append('fields[2]', 'trial_id');
    params.append('filters[isActive][$eq]', 'true');
    params.append('pagination[start]', String(start));
    params.append('pagination[limit]', String(limit));

    if (search && search.trim()) {
      params.append('filters[name][$containsi]', search.trim());
    }
    if (country) {
      params.append('filters[countries][country][$eq]', country);
    }
    if (disease) {
      params.append('filters[diseases][slug][$eq]', disease);
    }
    if (therapy) {
      params.append('filters[therapies][slug][$eq]', therapy);
    }

    const response = await api.get(`/clinical-trials?${params.toString()}`);
    return response.data.data || [];
  },
};

// How It Works API
export const howItWorksAPI = {
  getHowItWorksSection: async () => {
    const response = await api.get('/how-it-works?populate=*');
    return formatStrapiResponse(response.data.data);
  },

  getSteps: async () => {
    const response = await api.get('/steps?populate=*&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },
};

// Resources API
export const resourcesAPI = {
  getResourcesSection: async () => {
    const response = await api.get('/resources-section?populate=*');
    return formatStrapiResponse(response.data.data);
  },

  getBlogs: async ({ limit = 3, start = 0, query = '', categorySlug = '', subcategorySlug = '', sorting = '' } = {}) => {
    let filters = 'filters[isActive][$eq]=true';
    
    if (query) {
      filters += `&filters[title][$containsi]=${query}`;
    }
    
    // Add category filter if provided
    if (categorySlug) {
      filters += `&filters[resource_category][slug][$eq]=${categorySlug}`;
    }
    
    // Add subcategory filter if provided
    if (subcategorySlug) {
      filters += `&filters[resource_subcategory][slug][$eq]=${subcategorySlug}`;
    }
    
    // Convert sorting option to Strapi sort format
    let sortParam = 'sort=publishedDate:desc'; // default
    if (sorting) {
      switch (sorting) {
        case 'a-z':
          sortParam = 'sort=title:asc';
          break;
        case 'z-a':
          sortParam = 'sort=title:desc';
          break;
        case 'published-date-newest':
          sortParam = 'sort=publishedDate:desc';
          break;
        case 'published-date-oldest':
          sortParam = 'sort=publishedDate:asc';
          break;
        default:
          sortParam = 'sort=publishedDate:desc';
      }
    }
    
    // Use populate=* for resources endpoint (works fine, as confirmed by API response)
    // The error was only when trying to populate subcategories on resource_category directly
    // const response = await api.get(`/resources?${filters}&populate=*&pagination[start]=${start}&pagination[limit]=${limit}&${sortParam}`);
    
    const response = await api.get(`/resources?${filters}&fields[0]=title&fields[1]=slug&fields[2]=publishedDate&fields[3]=readTime&populate[featuredImage][fields][0]=url&populate[resource_category][fields][0]=name&populate[author][fields][0]=firstName&populate[author][fields][1]=lastName&populate[author][populate][profilePicture][fields][0]=url&populate[content][fields][0]=description_block&pagination[start]=${start}&pagination[limit]=${limit}&${sortParam}`);
    
    return response.data;
  },

  getBlogById: async (id) => {
    const response = await api.get(`/resources/${id}?populate=*`);
    return response.data.data;
  },

  getRelatedBlogs: async (id) => {
    // const response = await api.get(`/resources/${id}?populate[related_posts][populate][related_posts][populate][featuredImage]=true`);
    const response = await api.get(`/resources/${id}?populate[related_posts][populate][related_posts][fields][0]=title&populate[related_posts][populate][related_posts][fields][1]=slug&populate[related_posts][populate][related_posts][fields][2]=excerpt&populate[related_posts][populate][related_posts][fields][3]=readTime&populate[related_posts][populate][related_posts][fields][4]=publishedDate&populate[related_posts][populate][related_posts][populate][featuredImage][fields][0]=url&populate[related_posts][populate][related_posts][populate][resource_category][fields][0]=name&populate[related_posts][populate][related_posts][populate][resource_category][fields][1]=slug&populate[related_posts][populate][related_posts][populate][resource_subcategory][fields][0]=name&populate[related_posts][populate][related_posts][populate][resource_subcategory][fields][1]=slug&populate[related_posts][populate][related_posts][populate][author][fields][0]=firstName&populate[related_posts][populate][related_posts][populate][author][fields][1]=lastName&populate[related_posts][populate][related_posts][populate][author][populate][profilePicture][fields][0]=url`);
    return response.data.data;
  },

  getBlogBySlug: async (slug) => {
    // Use populate=* for resources endpoint (works fine)
    // Encode slug so special characters in URL don't break the request
    const response = await api.get(
      `/resources?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    );
    return response.data.data;
  },

  /**
   * Fetch previous and next active resources by id (for prev/next navigation).
   * @param {number|string} id - Current resource id (data.id)
   * @returns {{ previous: object|null, next: object|null }}
   */
  getPreviousNextActiveResources: async (id) => {
    if (id == null || id === '') {
      return { previous: null, next: null };
    }
    const [prevRes, nextRes] = await Promise.all([
      api.get(
        `/resources?filters[isActive][$eq]=true&filters[id][$lt]=${id}&sort=id:desc&pagination[limit]=1`
      ),
      api.get(
        `/resources?filters[isActive][$eq]=true&filters[id][$gt]=${id}&sort=id:asc&pagination[limit]=1`
      ),
    ]);
    const previous = prevRes.data.data?.[0] ?? null;
    const next = nextRes.data.data?.[0] ?? null;
    return { previous, next };
  },

};

// Resource Categories API
export const resourceCategoriesAPI = {
  getCategories: async () => {
    const response = await api.get(
      '/resource-categories?filters[isActive][$eq]=true&fields[0]=slug&fields[1]=name'
    );
    const categories = response.data.data || [];
    // Normalize structure to handle both Strapi v4 (with attributes) and flattened responses
    return categories.map((category) => {
      // If already flattened (has slug directly), return as is
      if (category.slug) {
        return {
          id: category.id,
          documentId: category.documentId,
          slug: category.slug,
          name: category.name,
        };
      }
      // If has attributes, flatten it
      if (category.attributes) {
        return {
          id: category.id,
          documentId: category.documentId,
          slug: category.attributes.slug,
          name: category.attributes.name,
        };
      }
      return category;
    });
  },

  getCategoryBySlug: async (slug) => {
    // Fetch category without populating subcategories (they're a separate content type)
    // Subcategories should be fetched separately using getSubCategories() or filtered by category
    const response = await api.get(
      `/resource-categories?filters[slug][$eq]=${slug}&fields[0]=id&fields[1]=slug&fields[2]=name`
    );
    return response.data.data?.[0] || null;
  },

  // Get subcategories filtered by category slug
  getSubCategoriesByCategorySlug: async (categorySlug) => {
    // Fetch subcategories that belong to a specific category
    // Assuming subcategories have a relation to categories
    const response = await api.get(
      `/resource-subcategories?filters[isActive][$eq]=true&filters[resource_category][slug][$eq]=${categorySlug}&fields[0]=slug&fields[1]=name`
    );
    const subcategories = response.data.data || [];
    // Normalize structure to handle both Strapi v4 (with attributes) and flattened responses
    return subcategories.map((subcategory) => {
      // If already flattened (has slug directly), return as is
      if (subcategory.slug) {
        return {
          id: subcategory.id,
          documentId: subcategory.documentId,
          slug: subcategory.slug,
          name: subcategory.name,
        };
      }
      // If has attributes, flatten it
      if (subcategory.attributes) {
        return {
          id: subcategory.id,
          documentId: subcategory.documentId,
          slug: subcategory.attributes.slug,
          name: subcategory.attributes.name,
        };
      }
      return subcategory;
    });
  },

  getSubCategories: async () => {
    const response = await api.get(
      '/resource-subcategories?filters[isActive][$eq]=true&fields[0]=slug&fields[1]=name'
    );
    const subcategories = response.data.data || [];
    // Normalize structure to handle both Strapi v4 (with attributes) and flattened responses
    return subcategories.map((subcategory) => {
      // If already flattened (has slug directly), return as is
      if (subcategory.slug) {
        return {
          id: subcategory.id,
          documentId: subcategory.documentId,
          slug: subcategory.slug,
          name: subcategory.name,
        };
      }
      // If has attributes, flatten it
      if (subcategory.attributes) {
        return {
          id: subcategory.id,
          documentId: subcategory.documentId,
          slug: subcategory.attributes.slug,
          name: subcategory.attributes.name,
        };
      }
      return subcategory;
    });
  },
};

// Clinical Trials Showcase API
export const clinicalTrialsShowcaseAPI = {
  getShowcaseSlides: async () => {
    const response = await api.get('/clinical-trials-showcase?populate=deep');
    return formatStrapiResponse(response.data.data);
  },
};

// Footer API
export const footerAPI = {
  getFooterContent: async () => {
    const response = await api.get('/footer?populate=deep');
    return formatStrapiResponse(response.data.data);
  },

  getContactInfo: async () => {
    const response = await api.get('/contact-infos?populate=*&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },

  getSocialLinks: async () => {
    const response = await api.get('/social-links?populate=*&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },

  getLocations: async () => {
    const response = await api.get(
      '/footer-locations?populate=*&sort=order:asc'
    );
    return formatStrapiResponse(response.data.data);
  },

  getLinkColumns: async () => {
    const response = await api.get(
      '/footer-link-columns?populate=deep&sort=order:asc'
    );
    return formatStrapiResponse(response.data.data);
  },
};

// Get In Touch API
export const getInTouchAPI = {
  getGetInTouchSection: async () => {
    const response = await api.get('/get-in-touch-section?populate=*');
    return formatStrapiResponse(response.data.data);
  },
};

// Location Network API
export const locationNetworkAPI = {
  getLocationNetworkSection: async () => {
    const response = await api.get('/location-network-section?populate=deep');
    return formatStrapiResponse(response.data.data);
  },

  getHospitals: async ({ limit = 3, start = 0, query = '' } = {}) => {
    let response;
    if (query) {
      response = await api.get(`/hospitals?populate=*&sort=order:asc&filters[name][$containsi]=${query}`);
    } else{
      response = await api.get('/hospitals?populate=*&sort=order:asc');
    }
    return formatStrapiResponse(response.data.data);
  },

  getHospitalBySlug: async (slug) => {
    const response = await api.get(`/hospitals?filters[slug][$eq]=${slug}&populate=*`);
    return response.data.data;
  },
  
  /**
   * Fetch hospital media (hospitalImage / featuredImage) for a list of hospital ids.
   * Useful for populating deep-nested image fields when the parent payload doesn't include media.
   * @param {Array<number|string>} ids
   * @returns {Array} Array of hospital objects (may be flattened based on Strapi response)
   */
  getHospitalMediaByIds: async (ids = []) => {
    if (!Array.isArray(ids) || ids.length === 0) return [];
    // Build filters for Strapi: filters[id][$in][0]=id1&filters[id][$in][1]=id2...
    const idFilters = ids
      .map((id, idx) => `filters[id][$in][${idx}]=${encodeURIComponent(id)}`)
      .join('&');

    const response = await api.get(
      `/hospitals?${idFilters}&populate[hospitalImage][fields][0]=url&populate[related][populate][related_hospitals][populate]=hospitalImage`
    );
    return response.data.data || [];
  },
};

// Clinical Trials About API
export const clinicalTrialsAboutAPI = {
  getClinicalTrialsAboutSection: async () => {
    const response = await api.get('/clinical-trials-about-section?populate=*');
    return formatStrapiResponse(response.data.data);
  },
};

// Video Testimonials API
export const videoTestimonialsAPI = {
  getVideoTestimonialsSection: async () => {
    const response = await api.get('/video-testimonials-section?populate=*');
    return formatStrapiResponse(response.data.data);
  },
};

// General Settings API
export const settingsAPI = {
  getGeneralSettings: async () => {
    const response = await api.get('/general-setting?populate=*');
    return formatStrapiResponse(response.data.data);
  },

  getSEOSettings: async () => {
    const response = await api.get('/seo-setting?populate=*');
    return formatStrapiResponse(response.data.data);
  },
};

// Hospital Network API
export const hospitalNetworkAPI = {
  getHeroSection: async () => {
    const response = await api.get('/hospital-network-hero?populate=deep');
    return formatStrapiResponse(response.data.data);
  },

  getHospitals: async ({ limit = 3, start = 0, query = '', sorting = '', country = '', treatment = '' } = {}) => {
    const filterParts = [];

    if (query) {
      filterParts.push(`filters[name][$containsi]=${encodeURIComponent(query)}`);
    }
    if (country) {
      filterParts.push(`filters[address][address][country][$eq]=${encodeURIComponent(country)}`);
    }
    if (treatment) {
      filterParts.push(`filters[treatments][slug][$eq]=${encodeURIComponent(treatment)}`);
    }

    const filters = filterParts.length ? filterParts.join('&') + '&' : '';

    // Convert sorting option to Strapi sort format
    let sortParam = 'sort=name:asc'; // default
    if (sorting) {
      switch (sorting) {
        case 'a-z':
          sortParam = 'sort=name:asc';
          break;
        case 'z-a':
          sortParam = 'sort=name:desc';
          break;
        case 'published-date-newest':
          sortParam = 'sort=publishedAt:desc';
          break;
        case 'published-date-oldest':
          sortParam = 'sort=publishedAt:asc';
          break;
        default:
          sortParam = 'sort=name:asc';
      }
    }

    // const response = await api.get(`/hospitals?${filters}populate=*&pagination[start]=${start}&pagination[limit]=${limit}&${sortParam}`);
    const response = await api.get(`/hospitals?${filters}&populate[hospitalImage][fields][0]=url&populate[about][populate][featuredImage][fields][0]=url&populate[doctors][fields][0]=first_name&populate[doctors][fields][1]=last_name&populate[address][populate][address][fields][0]=city&populate[address][populate][address][fields][1]=country&populate[contact_details]=true&pagination[start]=${start}&pagination[limit]=${limit}&${sortParam}`);
    
    return response.data;
  },

  getHospitalBySlug: async (slug) => {
    const response = await api.get(`/hospitals?filters[slug][$eq]=${slug}&populate=*`);
    return response.data.data;
  },
};

// Quick Finds API
export const quickFindsAPI = {
  getQuickFindsSection: async () => {
    const response = await api.get('/quick-finds-section?populate=*');
    return formatStrapiResponse(response.data.data);
  },

  getCountries: async () => {
    const response = await api.get('/countries?sort=country:asc');
    return response.data.data;
  },

  getSpecialties: async () => {
    const response = await api.get('/specialties?sort=name:asc');
    return response.data.data;
  },

  getTreatments: async () => {
    const response = await api.get('/treatments?sort=name:asc');
    return response.data.data;
  },
  getDiseases: async () => {
    const response = await api.get('/diseases?sort=name:asc');
    return response.data.data;
  },

  getTherapies: async () => {
    const response = await api.get('/therapies?sort=name:asc');
    return response.data.data;
  },
};

// Innovation & Insights API
export const innovationInsightsAPI = {
  getSection: async () => {
    const response = await api.get(
      '/innovation-insights-section?populate=deep'
    );
    return formatStrapiResponse(response.data.data);
  },

  getImages: async () => {
    const response = await api.get(
      '/innovation-images?populate=*&sort=order:asc'
    );
    return formatStrapiResponse(response.data.data);
  },

  getStaticImages: async () => {
    const response = await api.get('/static-images?populate=*&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },
};

// Key Factors API
export const keyFactorsAPI = {
  getSection: async () => {
    const response = await api.get('/key-factors-section?populate=deep');
    return formatStrapiResponse(response.data.data);
  },

  getFactors: async () => {
    const response = await api.get('/key-factors?populate=*&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },
};

// Doctor API
export const doctorAPI = {

  getDoctors: async ({ limit = 3, start = 0, query = '', sorting = '', country = '', treatment = '' } = {}) => {
    let filters = 'filters[isActive][$eq]=true';

    // if (query) {
    //   filters += `&filters[first_name][$containsi]=${encodeURIComponent(query)}`;
    // }

    const searchQuery = (query || '').trim();
    if (searchQuery) {
      const words = searchQuery.split(/\s+/).filter(Boolean);
      if (words.length >= 2) {
        const firstWord = encodeURIComponent(words[0]);
        const secondWord = encodeURIComponent(words[1]);
        const fullQuery = encodeURIComponent(searchQuery);
        // filters += `&filters[$or][0][$and][0][first_name][$containsi]=${firstWord}`;
        // filters += `&filters[$or][0][$and][1][last_name][$containsi]=${secondWord}`;
        // filters += `&filters[$or][1][first_name][$containsi]=${fullQuery}`;
        // filters += `&filters[$or][2][last_name][$containsi]=${fullQuery}`;
        filters += `&filters[first_name][$containsi]=${firstWord}`;
        filters += `&filters[last_name][$containsi]=${secondWord}`;
      } else {
        const single = encodeURIComponent(words[0] || searchQuery);
        filters += `&filters[$or][0][first_name][$containsi]=${single}`;
        filters += `&filters[$or][1][last_name][$containsi]=${single}`;
        // filters += `&filters[first_name][$containsi]=${single}`;
        // filters += `&filters[last_name][$containsi]=${single}`;
      }
    }
    if (country) {
      filters += `&filters[country][country][$eq]=${encodeURIComponent(country)}`;
    }
    if (treatment) {
      filters += `&filters[treatments][name][$eq]=${encodeURIComponent(treatment)}`;
    }

    // Convert sorting option to Strapi sort format
    let sortParam = 'sort=first_name:asc'; // default
    if (sorting) {
      switch (sorting) {
        case 'a-z':
          sortParam = 'sort=first_name:asc';
          break;
        case 'z-a':
          sortParam = 'sort=first_name:desc';
          break;
        case 'published-date-newest':
          sortParam = 'sort=publishedAt:desc';
          break;
        case 'published-date-oldest':
          sortParam = 'sort=publishedAt:asc';
          break;
        default:
          sortParam = 'sort=first_name:asc';
      }
    }

    // const response = await api.get(`/doctors?${filters}&populate=*&pagination[start]=${start}&pagination[limit]=${limit}&${sortParam}`);
    const response = await api.get(`/doctors?${filters}&fields[0]=first_name&fields[1]=last_name&fields[2]=slug&populate[about][populate][doctor_image][fields][0]=url&populate[specialization][populate][specialities][populate]=true&pagination[start]=${start}&pagination[limit]=${limit}&${sortParam}`);
    
    
    return response.data;
  },

  getDoctorBySlug: async (slug) => {
    const response = await api.get(`/doctors?filters[slug][$eq]=${slug}&populate=*`);
    return response.data.data;
  },

  getDoctorMediaByIds: async (ids = []) => {
    if (!Array.isArray(ids) || ids.length === 0) return [];
    // Build filters for Strapi: filters[id][$in][0]=id1&filters[id][$in][1]=id2...
    const idFilters = ids
      .map((id, idx) => `filters[id][$in][${idx}]=${encodeURIComponent(id)}`)
      .join('&');

    const response = await api.get(
      `/doctors?${idFilters}&populate[hero][populate][doctor_image][fields][0]=url`
    );
    return response.data.data || [];
  },
};

// Categories API
export const categoriesAPI = {
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data.data;
  },
};

// Treatment API
export const treatmentAPI = {
  getTreatments: async ({ limit = 3, start = 0, query = '' } = {}) => {
    let response;
    if (query) {
      response = await api.get(`/treatments?filters[isActive][$eq]=true&filters[title][$containsi]=${query}&populate=*&pagination[start]=${start}&pagination[limit]=${limit}&sort=order:asc`);
    } else{
      response = await api.get(`/treatments?filters[isActive][$eq]=true&populate=*&pagination[start]=${start}&pagination[limit]=${limit}&sort=order:asc`);
    }
    return response.data.data;
  },
  getTreatmentBySlug: async (slug) => {
    const response = await api.get(`/treatments?filters[slug][$eq]=${slug}&populate=*`);
    return response.data.data;
  },
};

// Country Treatment API
export const countryTreatmentAPI = {
  getCountryTreatmentBySlug: async (slug) => {
    // This content type returns flattened data (no attributes wrapper),
    // so we deliberately avoid formatStrapiResponse here and work with
    // the raw Strapi response.

    // Try slug-based lookup first
    try {
      const bySlugResponse = await api.get(
        `/country-treatments?filters[slug][$eq]=${slug}&populate=*`
      );
      const data = bySlugResponse.data?.data;

      if (Array.isArray(data) && data.length > 0) {
        return data[0];
      }

      if (data && !Array.isArray(data)) {
        return data;
      }
    } catch (error) {
      // Ignore and try by ID below
    }

    // Fallback: treat slug as Strapi document ID
    const byIdResponse = await api.get(
      `/country-treatments/${slug}?populate=*`
    );
    const byIdData = byIdResponse.data?.data;
    return byIdData || null;
  },
};

// Drug API
export const drugAPI = {
  getDrugs: async ({ limit = 3, start = 0, query = '', sorting = '', country = '', treatment = '', disease = '' } = {}) => {
    let filters = 'filters[isActive][$eq]=true';

    if (query) {
      filters += `&filters[name][$containsi]=${encodeURIComponent(query)}`;
    }
    if (country) {
      filters += `&filters[country][country][$eq]=${encodeURIComponent(country)}`;
    }
    if (treatment) {
      filters += `&filters[treatments][name][$eq]=${encodeURIComponent(treatment)}`;
    }
    if (disease) {
      filters += `&filters[diseases][slug][$eq]=${encodeURIComponent(disease)}`;
    }

    // Convert sorting option to Strapi sort format
    let sortParam = 'sort=name:asc'; // default
    if (sorting) {
      switch (sorting) {
        case 'a-z':
          sortParam = 'sort=name:asc';
          break;
        case 'z-a':
          sortParam = 'sort=name:desc';
          break;
        case 'published-date-newest':
          sortParam = 'sort=publishedAt:desc';
          break;
        case 'published-date-oldest':
          sortParam = 'sort=publishedAt:asc';
          break;
        default:
          sortParam = 'sort=name:asc';
      }
    }

    // const response = await api.get(`/drugs?${filters}&populate=*&pagination[start]=${start}&pagination[limit]=${limit}&${sortParam}`);
    
    const response = await api.get(`/drugs?${filters}&fields[0]=name&fields[1]=slug&populate[hero][populate][featuredImage][fields][0]=url&pagination[start]=${start}&pagination[limit]=${limit}&${sortParam}`);
    return response.data;
  },

  getDrugBySlug: async (slug) => {
    const response = await api.get(`/drugs?filters[slug][$eq]=${slug}&populate=*`);
    return response.data.data;
  },
};

// Disease API
export const diseaseAPI = {
  getDiseaseBySlug: async (slug) => {
    const response = await api.get(`/diseases?filters[slug][$eq]=${slug}&populate=*`);
    const data = response.data.data;
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  },

  getDiseasesByAgeAndGender: async (ageCriteria, genderCriteria) => {
    const params = new URLSearchParams();
    params.append('filters[age_criteria][$in][0]', ageCriteria);
    params.append('filters[age_criteria][$in][1]', 'both');
    params.append('filters[gender_criteria][$in][0]', genderCriteria);
    params.append('filters[gender_criteria][$in][1]', 'both');
    // params.append('filters[isActive][$eq]', 'true');
    
    const response = await api.get(`/diseases?${params.toString()}`);
    return response.data.data;
  },
};

// Therapy API for cost calculator
export const therapyAPI = {
  getTherapiesByDisease: async (diseaseId) => {
    const params = new URLSearchParams();
    params.append('filters[diseases][id][$eq]', diseaseId);
    params.append('populate', '*');
    
    const response = await api.get(`/therapies?${params.toString()}`);
    return response.data.data;
  },
};