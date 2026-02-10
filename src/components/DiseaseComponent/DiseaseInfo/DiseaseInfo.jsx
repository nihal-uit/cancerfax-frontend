import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  formatMedia,
  renderRichTextWithImages,
} from '../../../utils/strapiHelpers';

// Map section IDs to API field names
const SECTION_MAP = {
  about: 'about',
  overview: 'overview',
  causes: 'causes',
  symptoms: 'symptoms',
  diagnosis: 'diagnosis',
  treatmentManagement: 'treatmentAndManagement',
  prevention: 'prevention',
  complications: 'complications',
  prognosis: 'prognosis',
  livingWithDisease: 'livingWithDisease',
  lifeStyleNutrition: 'lifestyleAndNutrition',
  researchAdvancements: 'researchAndAdvancements',
  supportResources: 'supportAndResources',
  clinicalTrials: 'clinicalTrials',
  healthcareInsurance: 'healthcareAndInsurance',
};

// Section labels
const SECTION_LABELS = {
  about: 'About',
  overview: 'Overview',
  causes: 'Causes',
  symptoms: 'Symptoms',
  diagnosis: 'Diagnosis',
  treatmentManagement: 'Treatment & Management',
  prevention: 'Prevention',
  complications: 'Complications',
  prognosis: 'Prognosis',
  livingWithDisease: 'Living with Disease',
  lifeStyleNutrition: 'Life style & Nutrition',
  researchAdvancements: 'Research & Advancements',
  supportResources: 'Support & Resources',
  clinicalTrials: 'Clinical Trials',
  healthcareInsurance: 'Healthcare & Insurance',
};

// Section icons (fallback to default if not in API)
const SECTION_ICONS = {
  about: '../images/disease-icon-1.svg',
  overview: '../images/disease-icon-2.svg',
  causes: '../images/disease-icon-3.svg',
  symptoms: '../images/disease-icon-4.svg',
  diagnosis: '../images/disease-icon-5.svg',
  treatmentManagement: '../images/disease-icon-6.svg',
  prevention: '../images/disease-icon-7.svg',
  complications: '../images/disease-icon-8.svg',
  prognosis: '../images/disease-icon-9.svg',
  livingWithDisease: '../images/disease-icon-10.svg',
  lifeStyleNutrition: '../images/disease-icon-11.svg',
  researchAdvancements: '../images/disease-icon-12.svg',
  supportResources: '../images/disease-icon-13.svg',
  clinicalTrials: '../images/disease-icon-14.svg',
  healthcareInsurance: '../images/disease-icon-15.svg',
};

const DiseaseInfo = ({ data }) => {
  // All hooks must be called before any conditional returns
  const [activeId, setActiveId] = useState(null);
  const sectionRefs = useRef({});

  // Build available sections from API data
  const availableSections = useMemo(() => {
    if (!data) return [];
    return Object.keys(SECTION_MAP).filter((sectionId) => {
      const apiField = SECTION_MAP[sectionId];
      const sectionData = data[apiField];
      return (
        sectionData &&
        (sectionData?.heading ||
          sectionData?.subHeading ||
          sectionData?.description_block ||
          sectionData?.featuredImage ||
          sectionData?.featuredVideo)
      );
    });
  }, [data]);

  // Set first available section as active
  useEffect(() => {
    if (availableSections.length > 0 && !activeId) {
      setActiveId(availableSections[0]);
    }
  }, [availableSections, activeId]);

  // Scroll spy – highlight active section
  useEffect(() => {
    if (availableSections.length === 0) return;

    const options = {
      root: null,
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    availableSections.forEach((id) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [availableSections]);

  if (!data || !data?.isActive) {
    return null;
  }

  const handleClick = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (availableSections.length === 0) {
    return null;
  }

  return (
    <section className='hospitalDetailsInfo_sec py-120'>
      <div className='containerWrapper'>
        <div className='hospitalDetailsInfo_wrap'>
          <aside className='sidebar disease-sidebar'>
            <ul>
              {availableSections.map((sectionId) => (
                <li
                  key={sectionId}
                  className={sectionId === activeId ? 'active' : ''}
                  onClick={() => handleClick(sectionId)}
                >
                  <img
                    src={SECTION_ICONS[sectionId]}
                    alt={SECTION_LABELS[sectionId]}
                  />
                  <span>{SECTION_LABELS[sectionId]}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className='hospitalDetails_info'>
            {availableSections.map((sectionId) => {
              const apiField = SECTION_MAP[sectionId];
              const sectionData = data[apiField];

              if (!sectionData) return null;

              const heading = sectionData?.heading || '';
              const subHeading = sectionData?.subHeading || '';
              const descriptionBlock = sectionData?.description_block || [];
              const imageUrl = formatMedia(sectionData?.featuredImage);
              const videoUrl = formatMedia(sectionData?.featuredVideo);

              return (
                <div
                  key={sectionId}
                  id={sectionId}
                  ref={(el) => (sectionRefs.current[sectionId] = el)}
                  className='section'
                >
                  <div className='commContent_wrap content-gap-24'>
                    {heading && <h3 className='title-3'>{heading}</h3>}
                    {subHeading && <h4 className='f-w-600'>{subHeading}</h4>}

                    {imageUrl && (
                      <div className='details-img'>
                        <img
                          src={imageUrl}
                          alt={
                            sectionData?.featuredImage?.alternativeText ||
                            heading ||
                            SECTION_LABELS[sectionId]
                          }
                        />
                      </div>
                    )}

                    {videoUrl && (
                      <div className='details-img'>
                        <video
                          preload='none'
                          autoPlay
                          loop
                          muted
                          playsInline
                          style={{ width: '100%', borderRadius: '8px' }}
                        >
                          <source src={videoUrl} type='video/mp4' />
                        </video>
                      </div>
                    )}

                    {descriptionBlock && descriptionBlock.length > 0 && (
                      <div className='content-gap-20'>
                        {renderRichTextWithImages(descriptionBlock)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiseaseInfo;
