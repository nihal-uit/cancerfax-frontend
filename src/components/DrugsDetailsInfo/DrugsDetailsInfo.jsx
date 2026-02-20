import React, { useEffect, useRef, useState, useMemo } from "react";
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import HospitalDetailsFacilitiesTabsComponent from '../reusable/HospitalDetailsFacilitiesTabsComponent';
import DoctorsDetailsProceduresPerformedTabsComponent from '../reusable/DoctorsDetailsProceduresPerformedTabsComponent';
import DoctorsDetailsResearchTabsComponent from '../reusable/DoctorsDetailsResearchTabsComponent';
import { Accordion } from 'react-bootstrap';
import { formatMedia, renderRichTextWithImages } from '../../utils/strapiHelpers';

// Map section IDs to API field names
const SECTION_MAP = {
  about: 'drug_description',
  specialization: 'composition_details',
  procedures_performed: 'clinical_trials',
  research_publications: 'full_prescribing_information',
  author: 'indications_and_contraindications',
  side_effects: 'side_effects_and_interactions',
  dosage_forms: 'dosage_forms_and_packaging',
  storage: 'storage_conditions',
  regulatory: 'regulatory_information',
  manufacturer: 'manufacturer_information',
  identifiers: 'unique_identifiers',
  public_data: 'public_data_and_accessibility',
  certificates: 'self_certificates_and_updates',
};


// Section labels
const SECTION_LABELS = {
  about: 'Drug Description',
  specialization: 'Composition Details',
  procedures_performed: 'Clinical Trials',
  research_publications: 'Full Prescribing Information',
  author: 'Indications and Contraindications',
  side_effects: 'Side Effects and Interactions',
  dosage_forms: 'Dosage Forms and Packaging',
  storage: 'Storage Conditions',
  regulatory: 'Regulatory Information',
  manufacturer: 'Manufacturer Information',
  identifiers: 'Unique Identifiers',
  public_data: 'Public Data and Accessibility',
  certificates: 'Self Certificates and Updates',
};


const DrugsDetailsInfo = ({ data }) => {
  // All hooks must be called before any conditional returns
  const [activeId, setActiveId] = useState(null);
  const sectionRefs = useRef({});

  // Build available sections from API data
  const availableSections = useMemo(() => {
    if (!data) return [];
    return Object.keys(SECTION_MAP).filter((sectionId) => {
      const apiField = SECTION_MAP[sectionId];
      const sectionData = data[apiField];
      return sectionData && (
        sectionData?.heading ||
        sectionData?.subHeading ||
        sectionData?.description_block ||
        sectionData?.featuredImage ||
        sectionData?.featuredVideo
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
      rootMargin: "-45% 0px -45% 0px",
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
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (availableSections.length === 0) {
    return null;
  }

  return (
    <section className='hospitalDetailsInfo_sec drug__details__info__sec py-120'>
      <div className="containerWrapper">
        <div className="hospitalDetailsInfo_wrap">
          <aside className="sidebar">
            <ul>
              {availableSections.map((sectionId) => (
                <li
                  key={sectionId}
                  className={sectionId === activeId ? "active" : ""}
                  onClick={() => handleClick(sectionId)}
                >
                  <span>{SECTION_LABELS[sectionId]}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="hospitalDetails_info doctorsDetails_info">
            {availableSections.map((sectionId) => {
              const apiField = SECTION_MAP[sectionId];
              const sectionData = data[apiField];
              
              if (!sectionData) return null;

              const heading = sectionData?.heading || '';
              const subHeading = sectionData?.subHeading || '';
              const descriptionBlock = sectionData?.description_block || [];
              const imageUrl = formatMedia(sectionData?.featuredImage);
              const videoUrl = formatMedia(sectionData?.featuredVideo);

              // Determine section-specific className
              const sectionClassName = sectionId === 'procedures_performed' 
                ? 'section bg_dark_gray pt-5 mb-5' 
                : 'section';

              return (
                <div
                  key={sectionId}
                  id={sectionId}
                  ref={(el) => (sectionRefs.current[sectionId] = el)}
                  className={sectionClassName}
                >
                  <div className={`commContent_wrap content-gap-24 ${sectionId === 'procedures_performed' ? 'text-white' : ''}`}>
                    {heading && <h3 className="title-3">{heading}</h3>}
                    {subHeading && <h4 className="f-w-600">{subHeading}</h4>}
                    
                    {imageUrl && (
                      <div className="details-img">
                        <img
                          src={imageUrl}
                          alt={sectionData?.featuredImage?.alternativeText || heading || SECTION_LABELS[sectionId]}
                        />
                      </div>
                    )}

                    {videoUrl && (
                      <div className="details-img">
                        <video
                          preload="none"
                          autoPlay
                          loop
                          muted
                          playsInline
                          style={{ width: '100%', borderRadius: '8px' }}
                        >
                          <source src={videoUrl} type="video/mp4" />
                        </video>
                      </div>
                    )}

                    {descriptionBlock && descriptionBlock.length > 0 && (
                      <div className="content-gap-20">
                        {renderRichTextWithImages(descriptionBlock)}
                      </div>
                    )}

                    {/* Special handling for procedures_performed section - render tabs component if needed */}
                    {sectionId === 'procedures_performed' && sectionData?.showTabsComponent && (
                      <DoctorsDetailsProceduresPerformedTabsComponent />
                    )}

                    {/* Special handling for research_publications section - render tabs component if needed */}
                    {sectionId === 'research_publications' && sectionData?.showTabsComponent && (
                      <DoctorsDetailsResearchTabsComponent />
                    )}

                    {/* Special handling for related_tags section - render tabs component if needed */}
                    {sectionId === 'related_tags' && sectionData?.showTabsComponent && (
                      <HospitalDetailsFacilitiesTabsComponent />
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

const TeamSpecialtiesCard = styled.div`
  position: relative;
  width: 100%;
  height: 237px;
  background: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  flex-shrink: 0;
  scroll-snap-align: start;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TeamSpecialtiesCardOverlay = styled.div`
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 10px 12px;
  height:57px;
  display: flex;
  justify-content: center;
  flex-direction: column;  
  transition: opacity 0.3s ease;
  width: 100%;
  max-width: calc(100% - 32px);
  margin: 0 auto;
`;

const CardTitle = styled.h6`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  margin: 0;
  line-height: 1.4;
`;

const CardSubTitle = styled.span`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: #008080;
  margin: 0;
  line-height: 1.4;
`;

const BackgroundImageHolder = styled.div`
  border-radius: 40px;
  opacity: 1;
  transform: rotate(0deg);
  overflow: hidden;
  background: #36454F;
  @media (max-width: 575px) {
    border-radius: 24px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 40px;
  }
`;

const ForegroundImage = styled.div`
  position: absolute;
  width: 327px;
  height: 460px;
  top: -67px;
  left: 45px;
  opacity: 1;
  transform: rotate(0deg);
  overflow: hidden;
  z-index: 2;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 1200px) {
    width: 280px;
    height: 410px;
    top: -56px;
    left: 40px;
  }
  @media (max-width: 768px) {
    width: auto;
    height: auto;
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 270px;
    margin: 0 auto;
  } 
`;


export default DrugsDetailsInfo;
