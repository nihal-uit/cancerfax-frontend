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
   * @param {Object} params - { search, country, specialty, treatment, start, limit }
   * @returns {Array} List of trial records (same shape as trialData.json).
   */
  getClinicalTrials: async ({
    search = '',
    country = '',
    specialty = '',
    treatment = '',
    start = 0,
    limit = 12,
  } = {}) => {
    const params = new URLSearchParams();
    params.append('populate', '*');
    params.append('filters[isActive][$eq]', 'true');
    params.append('pagination[start]', String(start));
    params.append('pagination[limit]', String(limit));

    if (search && search.trim()) {
      params.append('filters[name][$containsi]', search.trim());
    }
    if (country) {
      params.append('filters[countries][slug][$eq]', country);
    }
    if (specialty) {
      params.append('filters[diseases][slug][$eq]', specialty);
    }
    if (treatment) {
      params.append('filters[therapies][slug][$eq]', treatment);
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
    const response = await api.get(
      `/resources?${filters}&populate=*&pagination[start]=${start}&pagination[limit]=${limit}&${sortParam}`
    );
    return response.data;
  },

  getBlogById: async (id) => {
    const response = await api.get(`/resources/${id}?populate=*`);
    return response.data.data;
  },

  getRelatedBlogs: async (id) => {
    const response = await api.get(`/resources/${id}?filters[isActive][$eq]=true&populate[related_posts][populate][related_posts][populate]=*&sort=publishedDate:desc`);
    return response.data.data;
  },

  getBlogBySlug: async (slug) => {
    // Use populate=* for resources endpoint (works fine)
    // The error was only when trying to populate subcategories on resource_category directly
    const response = await api.get(
      `/resources?filters[slug][$eq]=${slug}&populate=*`
    );
    return response.data.data;
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

  getHospitals: async ({ limit = 3, start = 0, query = '', sorting = '' } = {}) => {
    let filters = '';
    
    if (query) {
      filters = `filters[name][$containsi]=${query}`;
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
    
    const queryString = filters ? `${filters}&` : '';
    const response = await api.get(`/hospitals?${queryString}populate=*&pagination[start]=${start}&pagination[limit]=${limit}&${sortParam}`);
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
    const response = await api.get('/countries?populate=*&sort=name:asc');
    return formatStrapiResponse(response.data.data);
  },

  getSpecialties: async () => {
    const response = await api.get('/specialties?populate=*&sort=name:asc');
    return formatStrapiResponse(response.data.data);
  },

  getTreatments: async () => {
    const response = await api.get('/treatments?populate=*&sort=name:asc');
    return formatStrapiResponse(response.data.data);
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

  getDoctors: async ({ limit = 3, start = 0, query = '', sorting = '' } = {}) => {
    let filters = 'filters[isActive][$eq]=true';
    
    if (query) {
      filters += `&filters[first_name][$containsi]=${query}`;
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
    
    const response = await api.get(`/doctors?${filters}&populate=*&pagination[start]=${start}&pagination[limit]=${limit}&${sortParam}`);
    return response.data;
  },

  getDoctorBySlug: async (slug) => {
    const response = await api.get(`/doctors?filters[slug][$eq]=${slug}&populate=*`);
    return response.data.data;
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
  getDrugs: async ({ limit = 3, start = 0, query = '', sorting = '' } = {}) => {
    let filters = 'filters[isActive][$eq]=true';
    
    if (query) {
      filters += `&filters[name][$containsi]=${query}`;
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
    
    const response = await api.get(`/drugs?${filters}&populate=*&pagination[start]=${start}&pagination[limit]=${limit}&${sortParam}`);
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