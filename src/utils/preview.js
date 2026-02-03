/**
 * Preview Mode Utilities
 * 
 * Handles preview mode detection and validation for Strapi 5 preview feature.
 * Adapted from Strapi 5 + Next.js 15 preview setup for React.
 */

/**
 * Get preview parameters from URL
 * @returns {Object|null} Preview parameters or null if not in preview mode
 */
export const getPreviewParams = () => {
  if (typeof window === 'undefined') return null;

  const urlParams = new URLSearchParams(window.location.search);
  const preview = urlParams.get('preview');
  const documentId = urlParams.get('documentId');
  const secret = urlParams.get('secret');
  const status = urlParams.get('status');

  if (preview === 'true' && documentId) {
    return {
      isPreview: true,
      documentId,
      secret,
      status,
    };
  }

  return null;
};

/**
 * Check if current page is in preview mode
 * @returns {boolean}
 */
export const isPreviewMode = () => {
  const params = getPreviewParams();
  return params !== null && params.isPreview === true;
};

/**
 * Validate preview secret
 * @param {string} secret - Secret from URL
 * @returns {boolean}
 */
export const validatePreviewSecret = (secret) => {
  const expectedSecret = process.env.REACT_APP_PREVIEW_SECRET;
  
  if (!expectedSecret) {
    console.warn('REACT_APP_PREVIEW_SECRET is not set in environment variables');
    return false;
  }

  return secret === expectedSecret;
};

/**
 * Get preview query parameters for API calls
 * @param {string} documentId - Document ID for preview
 * @returns {Object} Query parameters object
 */
export const getPreviewQueryParams = (documentId) => {
  const params = getPreviewParams();
  
  if (!params || !params.isPreview) {
    return {};
  }

  // Validate secret if provided
  if (params.secret && !validatePreviewSecret(params.secret)) {
    console.warn('Invalid preview secret');
    return {};
  }

  return {
    publicationState: 'preview',
    documentId: documentId || params.documentId,
  };
};

/**
 * Remove preview parameters from URL
 * @param {boolean} replace - Whether to replace current history entry
 */
export const exitPreviewMode = (replace = true) => {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  url.searchParams.delete('preview');
  url.searchParams.delete('documentId');
  url.searchParams.delete('secret');
  url.searchParams.delete('status');

  if (replace) {
    window.history.replaceState({}, '', url.toString());
  } else {
    window.history.pushState({}, '', url.toString());
  }
};

/**
 * Get preview banner message
 * @returns {string}
 */
export const getPreviewBannerMessage = () => {
  return 'You are viewing a draft version of this page. Changes may not be published yet.';
};
