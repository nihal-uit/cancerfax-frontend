import React from 'react';
import { getMediaUrl } from '../services/api';

/**
 * Extract a component from dynamic_zone array by component type
 * @param {object} globalData - The global data object with dynamicZone array
 * @param {string} componentType - The component type to find (e.g., 'dynamic-zone.hero')
 * @returns {object|null} The component data or null
 */
export const getDynamicZoneComponent = (globalData, componentType) => {
  if (!globalData || !globalData.dynamicZone) return null;

  const component = globalData.dynamicZone.find(
    (item) => item.__component === componentType
  );

  return component || null;
};

/**
 * Helper function to extract section data from global Strapi response
 * Tries multiple possible data structure paths (legacy support + new dynamic_zone)
 */
export const getSectionData = (globalData, sectionKey) => {
  if (!globalData) return null;

  // First try dynamic zone structure (new)
  const componentTypeMap = {
    hero: 'dynamic-zone.hero',
    about: 'dynamic-zone.about',
    innovativeCare: 'dynamic-zone.therapy-section',
    therapySection: 'dynamic-zone.therapy-section',
    testimonials: 'dynamic-zone.testimonials',
    testimonialSlider: 'dynamic-zone.testimonial-slider',
    videoTestimonials: 'dynamic-zone.video-testimonials',
    clinicalTrialsShowcase: 'dynamic-zone.slider-section',
    sliderSection: 'dynamic-zone.slider-section',
    getInTouch: 'dynamic-zone.get-in-touch',
    location: 'dynamic-zone.location',
    howItWorks: 'dynamic-zone.how-it-works',
    resources: 'dynamic-zone.resources',
    clinicalTrials: 'dynamic-zone.trials-section',
    statistics: 'dynamic-zone.statistics',
    doctorsHero: 'doctor-listing.hero-section',
    doctorsSlider: 'doctor-listing.slider-section',
    doctorsQuickFinds: 'doctor-listing.quick-links-section',
    doctorsInnovationInsights: 'doctor-listing.innovation-insights-section',
    hospitalHero: 'hospital-listing.hero-section',
    hospitalTestimonials: 'hospital-listing.testimonial-section',
    hospitalSlider: 'hospital-listing.slider-section',
    hospitalQuickFinds: 'hospital-listing.quick-links-section',
    hospitalKeyFactors: 'hospital-listing.key-factors-section',
    hospitalInnovationInsights: 'hospital-listing.innovation-insights-section',
    blogHero: 'resource-listing.hero-section',
    blogSlider: 'resource-listing.slider-section',
    blogKnowledgeChest: 'resource-listing.knowledge-chest-section',
    blogSubscribe: 'resource-listing.subscribe-section',
    drugHero: 'drug-listing.hero-section',
    drugSlider: 'drug-listing.slider-section',
    drugKnowledgeChest: 'drug-listing.knowledge-chest-section',
    drugSupport: 'drug-listing.supporting-section',
    treatmentHero: 'treatment.hero-section',
    treatmentSlider: 'treatment.slider-section',
    treatmentHowItWorks: 'treatment.how-it-works-section',
    treatmentWhyOpt: 'treatment.why-section',
    treatmentEvidance: 'treatment.evidance-section',
    treatmentJourney: 'treatment.journey-section',
    treatmentIsForYou: 'treatment.is-for-you-section',
    treatmentTestimonials: 'treatment.testimonial-section',
    treatmentInnovativeCare: 'treatment.treatment-different-section',
    treatmentGetInTouch: 'treatment.get-in-touch',
    treatmentRisk: 'treatment.treatment-risk-section',
    treatmentCost: 'treatment.treatment-cost-section',
    treatmentWhatWeDo: 'treatment.treatment-we-do-therapy',
    treatmentFAQ: 'treatment.faq-section',
    treatmentResources: 'treatment.resources-section',
    countryTreatmentHero: 'country-treatment.hero-section',
    countryTreatmentWhyOpt: 'country-treatment.why-section',
    countryTreatmentDoctors: 'country-treatment.doctors-section',
    countryTreatmentHospitals: 'country-treatment.hospital-section',
    countryTreatmentProcess: 'country-treatment.process-section',
  };

  const componentType = componentTypeMap[sectionKey];
  if (componentType && globalData.dynamicZone) {
    const component = getDynamicZoneComponent(globalData, componentType);
    if (component) return component;
  }

  // Fallback to legacy structure
  const section =
    globalData[`${sectionKey}Section`]?.data?.attributes ||
    globalData[sectionKey]?.data?.attributes ||
    globalData[`${sectionKey}Section`] ||
    globalData[sectionKey] ||
    null;

  return section;
};

/**
 * Helper function to extract collection data from global Strapi response
 * Works with both dynamic_zone components and legacy structure
 */
export const getCollectionData = (globalData, collectionKey) => {
  if (!globalData) return [];

  // Map collection keys to dynamic zone component properties
  const collectionMap = {
    therapies: { component: 'dynamic-zone.therapy-section', prop: 'Therapy' },
    statistics: { component: 'dynamic-zone.statistics', prop: 'Statistics' },
    clinicalTrialsShowcase: {
      component: 'dynamic-zone.slider-section',
      prop: 'Slide',
    },
    testimonials: {
      component: 'dynamic-zone.testimonials',
      prop: 'Testimonials',
    },
    testimonialSlider: {
      component: 'dynamic-zone.testimonial-slider',
      prop: 'Testimonials',
    },
    hospitalImage: {
      component: 'hospital-listing.slider-section',
      prop: 'hospitalImage',
    },
    doctors: { component: 'doctor-listing.slider-section', prop: 'doctors' },
  };

  // Try dynamic zone structure first
  if (globalData.dynamicZone && collectionMap[collectionKey]) {
    const { component: componentType, prop } = collectionMap[collectionKey];
    const component = getDynamicZoneComponent(globalData, componentType);
    if (component && component[prop]) {
      return Array.isArray(component[prop]) ? component[prop] : [];
    }
  }

  // Fallback to legacy structure
  const collection =
    globalData[collectionKey]?.data || globalData[collectionKey] || [];

  return Array.isArray(collection) ? collection : [];
};

/**
 * Helper function to format media/image from Strapi response
 */
export const formatMedia = (media) => {
  if (!media) return null;
  return getMediaUrl(media);
};

/**
 * Format RichText array from Strapi to plain text
 * Handles Strapi's RichText format: [{ type: 'paragraph', children: [{ text: '...', type: 'text' }] }]
 * @param {Array|string} richText - RichText array or plain string
 * @returns {string} Plain text string
 */
export const formatRichText = (richText) => {
  if (!richText) return '';

  // If it's already a string, return it
  if (typeof richText === 'string') return richText;

  // If it's an array (RichText format), extract text
  if (Array.isArray(richText)) {
    return richText
      .map((block) => {
        if (block.children) {
          return block.children
            .filter((child) => child.type === 'text')
            .map((child) => child.text)
            .join('');
        }
        return block.text || '';
      })
      .filter(Boolean)
      .join('\n');
  }

  return '';
};

/**
 * Helper function to format Strapi component data
 * Handles both direct attributes and nested data.attributes
 */
export const formatComponent = (component) => {
  if (!component) return null;

  if (Array.isArray(component)) {
    return component.map((item) => formatComponent(item));
  }

  // If it has attributes, extract them
  if (component.attributes) {
    return {
      id: component.id,
      ...component.attributes,
    };
  }

  return component;
};

/**
 * Helper function to get nested relationship data
 */
export const getRelatedData = (section, relationKey) => {
  if (!section) return null;

  const relation = section[relationKey]?.data || section[relationKey];

  if (Array.isArray(relation)) {
    return relation.map((item) => ({
      id: item.id,
      ...(item.attributes || item),
    }));
  }

  if (relation) {
    return {
      id: relation.id,
      ...(relation.attributes || relation),
    };
  }

  return null;
};

export const formatDate = (value) => {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const renderRichTextWithImages = (description = []) => {
  if (!Array.isArray(description)) return null;

  const renderTextNodes = (children) => {
    if (!Array.isArray(children)) return null;
    
    return children.map((child, idx) => {
      // Handle link nodes
      if (child?.type === "link" && child?.url) {
        const linkText = renderTextNodes(child.children);
        if (!linkText || linkText.length === 0) return null;
        return (
          <a key={idx} href={child.url} target="_blank" rel="noopener noreferrer" className="link-css">
            {linkText}
          </a>
        );
      }
      
      // Handle text nodes with formatting
      // if (child?.type === "text" && typeof child?.text === "string") {
      //   if (child.bold) {
      //     return <strong key={idx}>{child.text}</strong>;
          
      //   }
      //   return child.text;
      // }

      if (child?.type === "text" && typeof child?.text === "string") {
        const parts = child.text.split("\n");
      
        const content = parts.map((part, i) => (
          <React.Fragment key={`${idx}-${i}`}>
            {child.bold ? <strong>{part}</strong> : part}
            {i < parts.length - 1 && <br />}
          </React.Fragment>
        ));
      
        return content;
      }
      
      
      // Handle nested children
      if (Array.isArray(child?.children)) {
        return <span key={idx}>{renderTextNodes(child.children)}</span>;
      }
      
      // Fallback for other text formats
      if (typeof child?.text === "string") {
        return child.text;
      }
      
      return null;
    }).filter(Boolean);
  };

  const extractText = (children) => {
    if (!Array.isArray(children)) return '';
    return children
      .map((child) => {
        if (typeof child?.text === 'string') return child.text;
        if (Array.isArray(child?.children)) return extractText(child.children);
        return '';
      })
      .join('');
  };

  return description.map((block, index) => {
    if (!block || typeof block !== 'object') return null;

    const { type } = block;

    switch (type) {
      case "paragraph": {
        const renderedContent = renderTextNodes(block.children);
        if (!renderedContent || renderedContent.length === 0) return null;
        const textContent = extractText(block.children);
        if (!textContent.trim()) return null;
        return <p key={index} className="text-16">{renderedContent}</p>;
      }

      case "heading": {
        const renderedContent = renderTextNodes(block.children);
        if (!renderedContent || renderedContent.length === 0) return null;
        return <h4 key={index} className="f-w-600">{renderedContent}</h4>;
      }

      case 'image': {
        const img = block.image;
        if (!img) return null;
        const imageUrl = formatMedia(img);
        if (!imageUrl) return null;
        return (
          <div key={index} className='blog-details-img'>
            <img src={imageUrl} alt={img.alternativeText || 'blog image'} loading="lazy" />
          </div>
        );
      }

      case 'list': {
        const isOrdered = block.format === 'ordered';
        const Wrapper = isOrdered ? 'ol' : 'ul';

        return (
          <Wrapper key={index} className='content-gap-20'>
            {(block.children || []).map((li, i) => {
              const renderedContent = renderTextNodes(li?.children);
              if (!renderedContent || renderedContent.length === 0) return null;
              return <li key={i}>{renderedContent}</li>;
            })}
          </Wrapper>
        );
      }

      default:
        return null;
    }
  });
};
