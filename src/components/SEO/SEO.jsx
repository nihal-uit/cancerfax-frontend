import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectPageBySlug } from '../../store/slices/pageSlice';

const SITE_NAME = 'CancerFax';

/** Format slug to title: "about-us" -> "About Us" */
const slugToTitle = (slug) => {
  if (!slug || typeof slug !== 'string') return null;
  return slug
    .trim()
    .split(/[-_/]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * SEO Component
 * Injects SEO meta tags from Strapi (page or global) or from props.
 * Priority: Props override > Page SEO (state.page.pageData) > Global SEO > Slug-based title > Defaults.
 */
const SEO = ({ data, title: propTitle, description: propDescription, keywords: propKeywords, slug: propSlug }) => {
  const location = useLocation();
  const globalData = useSelector((state) => state.global?.data);
  // Derive current page slug from route: "/" -> "home", "/about-us" -> "about-us"
  const slugFromRoute = useMemo(() => {
    const segment = location.pathname.replace(/^\/+|\/+$/g, '').split('/')[0] || '';
    return segment || 'home';
  }, [location.pathname]);
  const { pageData } = useSelector((state) => selectPageBySlug(state, propSlug ?? slugFromRoute));

  // Strapi relation can be nested: seo or seo.data.attributes
  const rawSeo = pageData?.seo || globalData?.seo;
  const seo = rawSeo?.data?.attributes
    ? { ...rawSeo.data.attributes }
    : rawSeo;

  const defaultTitle = `${SITE_NAME} - Advanced Cancer Treatments`;
  const defaultDescription = 'CancerFax - Connecting You to Global Trials and Advanced Cancer Treatments';
  const defaultKeywords = 'cancer treatment, clinical trials, cancer care, medical tourism, advanced treatments';

  // Slug for fallback title: prop > pageData.slug > first path segment
  const slug = propSlug ?? pageData?.slug ?? (location.pathname.replace(/^\/+|\/+$/g, '').split('/')[0] || null);
  const slugTitle = slug ? slugToTitle(slug) : null;
  const fallbackTitle = slugTitle ? `${slugTitle} | ${SITE_NAME}` : defaultTitle;

  // Priority: Props > Strapi SEO > Slug-based title (for title only) > Defaults
  const seoTitle = propTitle ?? seo?.metaTitle ?? seo?.title ?? fallbackTitle;
  const seoDescription = propDescription ?? seo?.metaDescription ?? seo?.description ?? defaultDescription;
  const seoKeywords = propKeywords ?? seo?.keywords ?? defaultKeywords;
  const canonicalUrl = seo?.canonicalURL || seo?.url || window.location.href;
  const ogImage = seo?.metaImage?.url || seo?.metaImage?.data?.attributes?.url || seo?.ogImage?.url || null;
  const ogTitle = seo?.ogTitle || seo?.metaTitle || seoTitle;
  const ogDescription = seo?.ogDescription || seo?.metaDescription || seoDescription;
  const ogType = seo?.ogType || 'website';
  const twitterCard = seo?.twitterCard || 'summary_large_image';
  const twitterTitle = seo?.twitterTitle || seoTitle;
  const twitterDescription = seo?.twitterDescription || seoDescription;
  const twitterImage = seo?.twitterImage?.url || seo?.twitterImage?.data?.attributes?.url || ogImage;
  const robots = seo?.robots || 'index, follow';
  const structuredData = seo?.structuredData || null;

  // Update document head directly
  useEffect(() => {
    // Update title
    document.title = seoTitle;

    // Update or create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      if (!content) return;
      
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update or create link tags
    const updateLinkTag = (rel, href) => {
      if (!href) return;
      
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Basic Meta Tags
    updateMetaTag('description', seoDescription);
    updateMetaTag('keywords', seoKeywords);
    updateMetaTag('robots', robots);
    if (canonicalUrl) updateLinkTag('canonical', canonicalUrl);

    // Open Graph / Facebook
    updateMetaTag('og:type', ogType, 'property');
    updateMetaTag('og:title', ogTitle, 'property');
    updateMetaTag('og:description', ogDescription, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:url', canonicalUrl, 'property');
    if (seo?.ogSiteName) updateMetaTag('og:site_name', seo.ogSiteName, 'property');

    // Twitter Card
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', twitterTitle);
    updateMetaTag('twitter:description', twitterDescription);
    updateMetaTag('twitter:image', twitterImage);

    // Additional Meta Tags
    if (seo?.author) updateMetaTag('author', seo.author);
    if (seo?.themeColor) updateMetaTag('theme-color', seo.themeColor);

    // Structured Data (JSON-LD)
    if (structuredData) {
      // Remove existing structured data script
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = typeof structuredData === 'string' ? structuredData : JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Note: We don't remove meta tags on unmount to avoid flickering
      // The component will update them if needed
    };
  }, [seo, seoTitle, seoDescription, seoKeywords, robots, canonicalUrl, ogType, ogTitle, ogDescription, ogImage, twitterCard, twitterTitle, twitterDescription, twitterImage, structuredData]);

  // This component doesn't render anything visible
  return null;
};

export default SEO;

