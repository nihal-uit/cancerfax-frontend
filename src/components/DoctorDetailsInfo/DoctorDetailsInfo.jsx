import React, { useEffect, useRef, useState, useMemo } from "react";
import styled from 'styled-components';
import { formatMedia, formatDate, renderRichTextWithImages, formatRichText } from "@/utils/strapiHelpers";
import SectionMediaBlock from '../reusable/SectionMediaBlock';
import { Row, Col } from 'react-bootstrap';
import HospitalDetailsFacilitiesTabsComponent from '../reusable/HospitalDetailsFacilitiesTabsComponent';
import DoctorsDetailsProceduresPerformedTabsComponent from '../reusable/DoctorsDetailsProceduresPerformedTabsComponent';
import DoctorsDetailsResearchTabsComponent from '../reusable/DoctorsDetailsResearchTabsComponent';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Accordion, Card, Button } from 'react-bootstrap';

// Map section IDs to API field names
const SECTION_MAP = {
  about: 'about',
  specialization: 'specialization',
  procedures_performed: 'proceduresPerformed',
  research_publications: 'researchAndPublications',
  author: 'author',
  related_tags: 'relatedTags',
};

// Section labels
const SECTION_LABELS = {
  about: 'About the doctor',
  specialization: 'Specialization',
  procedures_performed: 'Procedures Performed',
  research_publications: 'Research & Publications',
  author: 'Author',
  related_tags: 'Related Tags',
};

const DoctorsDetailsInfo = ({ data, loading }) => {
  // All hooks must be called before any conditional returns
  const [activeId, setActiveId] = useState(null);
  const sectionRefs = useRef({});
  const address = data?.hospital?.address;
  const specializationData = data?.specialization || {};

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
        sectionData?.featuredVideo ||
        // Special case for about section - check if about data exists
        (sectionId === 'about' && data?.about) ||
        // Special case for specialization - check if specialization data exists
        (sectionId === 'specialization' && data?.specialization)
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

  if (loading || !data || !data?.isActive) {
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
    <section className='hospitalDetailsInfo_sec py-120'>
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

              // Determine section-specific className
              const sectionClassName = sectionId === 'procedures_performed'
                ? 'section bg_dark_gray pt-5 mb-5'
                : 'section';

              // Special handling for "about" section with custom UI
              if (sectionId === 'about') {
                const aboutData = sectionData || data?.about;
                return (
                  <div
                    key={sectionId}
                    id={sectionId}
                    ref={(el) => (sectionRefs.current[sectionId] = el)}
                    className="section"
                  >
                    <div className="commContent_wrap content-gap-24">
                      <span className="contentLabel">{aboutData?.heading || ''}</span>
                      <h3 className="title-3">{aboutData?.subHeading || ''}</h3>

                      <div className="doctor-about-wrap">
                        <div className="doctors-details-img doctor-about-float">
                          <img
                            src={aboutData?.doctor_image ? formatMedia(aboutData.doctor_image) : ''}
                            alt={aboutData?.doctor_name || ''}
                          />
                        </div>

                        <div className="doctor-intro-content">
                          <h4 className="f-w-600 mb-2">{aboutData?.doctor_name || ''}</h4>
                          <div className="text-16">
                            {renderRichTextWithImages(aboutData?.intro_content) || ''}
                          </div>
                        </div>
                      </div>

                      <div className="doctor-detailed-content text-16">
                        {renderRichTextWithImages(aboutData?.detailed_content) || ''}
                      </div>
                      <p className="text-16">
                        {aboutData?.extra_1 || ''}
                      </p>
                      <p className="text-16">
                        {aboutData?.extra_2 || ''}
                      </p>
                      <p className="text-16">
                        {aboutData?.extra_3 || ''}
                      </p>
                      <p className="text-16">
                        {aboutData?.extra_4 || ''}
                      </p>
                      <GridWrapper>
                        <StepCard>
                          <IconWrapper>
                            <img src="../images/doctors-details-icon-1.svg" alt="" />
                          </IconWrapper>
                          <StepContent>
                            <StepTitle>{aboutData?.totalExperience || ''} Years</StepTitle>
                            <StepDescription>Total experience</StepDescription>
                          </StepContent>
                        </StepCard>
                        <StepCard>
                          <IconWrapper>
                            <img src="../images/doctors-details-icon-2.svg" alt="" />
                          </IconWrapper>
                          <StepContent>
                            <StepTitle>{aboutData?.registeredNumbered || ''}</StepTitle>
                            <StepDescription>Registered numbered</StepDescription>
                          </StepContent>
                        </StepCard>
                        <StepCard>
                          <IconWrapper>
                            <img src="../images/doctors-details-icon-3.svg" alt="" />
                          </IconWrapper>
                          <StepContent>
                            <StepTitle>{aboutData?.patientsTreated || ''}</StepTitle>
                            <StepDescription>Patients treated</StepDescription>
                          </StepContent>
                        </StepCard>
                        <StepCard>
                          <IconWrapper>
                            <img src="../images/doctors-details-icon-4.svg" alt="" />
                          </IconWrapper>
                          <StepContent>
                            <StepTitle>Visiting days</StepTitle>
                            <ul className="day-list">
                              {(aboutData?.visitingDays || []).map((day, i) => (
                                <li key={i}>{day.charAt(0).toUpperCase()}</li>
                              ))}
                            </ul>
                          </StepContent>
                        </StepCard>
                      </GridWrapper>
                      <div className="row g-4">
                        <div className="col-lg-7">
                          {aboutData?.hospitals && aboutData?.hospitals?.length > 0 && (
                          <div className='doctorsDetails_slider_wrapper'>
                            <Swiper
                              spaceBetween={0}
                              slidesPerView={1}
                              modules={[Navigation, EffectFade]}
                              effect="fade"
                              navigation={{
                                nextEl: ".customNext",
                                prevEl: ".customPrev",
                              }}
                              className="commCircle_navigation"
                            >
                              {(aboutData?.hospitals || []).map((desc, idx) => (
                                <SwiperSlide key={idx}>
                                  <div className='doctorsDetails_info_slider'>
                                    <img src={(desc?.hospitalImage || desc?.about?.featuredImage) ? formatMedia(desc?.hospitalImage ||desc?.about?.featuredImage) : ''} alt={desc?.about?.heading || ''} />
                                    <div className='doctorsDetails_info_slider_content'>
                                      <div className='inner_container'>
                                        <div className='commContent_wrap'>
                                          <h5>{desc?.about?.heading || ''}</h5>
                                          <p className="text-14">
                                            {desc?.address?.address?.flatNo + ', ' || ''}
                                            {desc?.address?.address?.locality + ', ' || ''} 
                                            {desc?.address?.address?.landmark + ', ' || ''} 
                                            {desc?.address?.address?.streetAddress + ', ' || ''} 
                                            {desc?.address?.address?.city + ', ' || ''} 
                                            {desc?.address?.address?.country || ''} 
                                            {desc?.address?.address?.pinCode? ' -' + desc?.address?.address?.pinCode : ''}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </SwiperSlide>
                              ))}
                              <NavButton className='customPrev'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 46 32" fill="none">
                                  <path d="M15.8656 31.7313L17.6493 30.01L4.75497 17.1156H45.0481V14.6156H4.70684L17.5868 1.72125L15.8656 0L-3.43323e-05 15.8656L15.8656 31.7313Z" fill="#727B81" />
                                </svg>
                              </NavButton>
                              <NavButton className="customNext">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 46 32" fill="none">
                                  <path d="M29.1825 31.7313L27.3988 30.01L40.2931 17.1156H0V14.6156H40.3413L27.4613 1.72125L29.1825 0L45.0481 15.8656L29.1825 31.7313Z" fill="#727B81" />
                                </svg>
                              </NavButton>
                            </Swiper>
                          </div>
                          )}
                        </div>
                        <div className="col-lg-5">
                          {aboutData?.hospitals_description && (<SingleCard>
                            <SingleCardIcon>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="19" viewBox="0 0 24 19" fill="none">
                                <path d="M9.46741 1.57712e-05C9.26029 0.00104109 9.09315 0.169203 9.09315 0.376332V2.61575H5.81901C5.71852 2.61575 5.62316 2.65472 5.55242 2.72547C5.48167 2.79622 5.44168 2.89261 5.4427 2.99206C5.4427 3.09152 5.48269 3.18688 5.55345 3.25661C5.6242 3.32736 5.71956 3.36632 5.81901 3.3653H6.1174V8.5281H0.376309C0.276846 8.5281 0.180462 8.56707 0.109716 8.63782C0.0389652 8.70857 0 8.80495 0 8.90441C0 9.00387 0.039989 9.09923 0.110743 9.16998C0.181494 9.2397 0.276854 9.27969 0.376312 9.27867H0.672645V18.38H0.67367C0.67367 18.5871 0.842858 18.7543 1.04999 18.7543H22.9541H22.9531C23.1592 18.7532 23.3263 18.5861 23.3263 18.38V9.27867H23.6257C23.8318 9.27867 23.999 9.11153 24 8.9044C24 8.80494 23.961 8.70958 23.8903 8.63883C23.8206 8.56808 23.7252 8.52809 23.6257 8.52809H17.8846V3.36528H18.1841C18.3902 3.36528 18.5563 3.19815 18.5573 2.99204C18.5583 2.89257 18.5183 2.79721 18.4486 2.72647C18.3789 2.65572 18.2835 2.61573 18.1841 2.61573H14.9089V0.376309C14.9099 0.276846 14.8699 0.180462 14.7992 0.109716C14.7284 0.0389651 14.6331 0 14.5326 0L9.46741 1.57712e-05ZM9.84373 0.749578H14.1587V4.13737L9.84373 4.1384V2.99202V2.97254V0.749578ZM12.0001 1.12078C11.794 1.1218 11.6269 1.28894 11.6258 1.49505V2.07028H11.0506V2.07131C10.8445 2.07131 10.6773 2.23845 10.6773 2.44455C10.6763 2.65168 10.8435 2.81985 11.0506 2.82087H11.6258V3.39406V3.39304C11.6258 3.4925 11.6648 3.58888 11.7345 3.65861C11.8053 3.72936 11.9006 3.76935 12.0001 3.77037C12.0995 3.77037 12.1959 3.73038 12.2667 3.65963C12.3374 3.5899 12.3764 3.49352 12.3764 3.39304V2.81985H12.9496V2.82087C13.0501 2.82087 13.1454 2.78191 13.2162 2.71116C13.2869 2.6404 13.3269 2.54402 13.3259 2.44456C13.3259 2.3451 13.2859 2.24974 13.2152 2.18002C13.1444 2.10927 13.049 2.0703 12.9496 2.07133H12.3764V1.49507C12.3764 1.3956 12.3364 1.30024 12.2656 1.2295C12.1949 1.15977 12.0996 1.12078 12.0001 1.12078ZM6.86512 3.36432H9.0943V4.51377L9.09327 4.51479C9.0943 4.7209 9.26144 4.88701 9.46754 4.88804H14.534H14.533C14.7401 4.88906 14.9093 4.72193 14.9093 4.51479V3.36534H17.1344V18.0038H14.5935V15.0641H15.0006C15.2067 15.0641 15.3738 14.8969 15.3748 14.6908C15.3748 14.5914 15.3359 14.496 15.2662 14.4253C15.1954 14.3545 15.1 14.3145 15.0006 14.3145H9.00199C8.90252 14.3135 8.80614 14.3535 8.73539 14.4242C8.66464 14.495 8.62568 14.5903 8.62568 14.6908C8.62568 14.7903 8.66567 14.8857 8.73642 14.9554C8.80717 15.0251 8.90253 15.0651 9.00199 15.0641H9.40907V18.0038H6.8651L6.86512 3.36432ZM9.09635 5.75347V5.75449C8.99688 5.75449 8.9005 5.79346 8.82975 5.86421C8.759 5.93496 8.72004 6.03134 8.72004 6.1308V8.83269C8.72004 8.93318 8.759 9.02854 8.82975 9.09928C8.90051 9.17003 8.99689 9.21002 9.09635 9.209H11.0425C11.143 9.21002 11.2384 9.17003 11.3091 9.09928C11.3799 9.02853 11.4199 8.93317 11.4188 8.83269V6.1308C11.4199 6.03134 11.3799 5.93495 11.3091 5.86421C11.2384 5.79346 11.143 5.75449 11.0425 5.75449L9.09635 5.75347ZM12.958 5.75347V5.75449C12.7508 5.75552 12.5837 5.92368 12.5847 6.13081V8.8327C12.5837 9.03982 12.7508 9.20901 12.958 9.20901H14.9072C15.0067 9.21004 15.1031 9.17005 15.1738 9.0993C15.2435 9.02855 15.2835 8.93319 15.2835 8.8327V6.13082C15.2835 6.03135 15.2435 5.93497 15.1738 5.86422C15.103 5.79347 15.0067 5.75451 14.9072 5.75451L12.958 5.75347ZM9.47067 6.50303H10.6693V8.4574H9.47067V6.50303ZM13.3344 6.50303H14.533V8.4574H13.3344V6.50303ZM1.42354 9.27763H6.11779V18.0025H1.42354V9.27763ZM17.8861 9.27763H22.5782V18.0025H17.8861V9.27763ZM9.09766 9.85287L9.09663 9.85492C8.88951 9.85389 8.72134 10.021 8.72032 10.2282V12.9332C8.72032 13.0327 8.75928 13.129 8.83003 13.1998C8.90078 13.2705 8.99717 13.3095 9.09663 13.3095H11.0428C11.1433 13.3095 11.2387 13.2705 11.3094 13.1998C11.3802 13.129 11.4201 13.0327 11.4191 12.9332V10.2282C11.4181 10.021 11.2499 9.85389 11.0428 9.85492L9.09766 9.85287ZM12.9593 9.85287L12.9582 9.85492C12.7521 9.85594 12.585 10.0221 12.585 10.2282V12.9332C12.584 13.1403 12.7511 13.3085 12.9582 13.3095H14.9075C15.007 13.3095 15.1033 13.2706 15.1741 13.1998C15.2438 13.129 15.2838 13.0327 15.2838 12.9332V10.2282C15.2828 10.021 15.1146 9.8539 14.9075 9.85492L12.9593 9.85287ZM2.79772 10.4783L2.79567 10.4804C2.59059 10.4804 2.42344 10.6475 2.42242 10.8536V12.8665C2.42344 13.0726 2.59058 13.2387 2.79567 13.2397H4.74492C4.95102 13.2387 5.11817 13.0726 5.11817 12.8665V10.8536C5.11817 10.6475 4.95103 10.4804 4.74492 10.4804L2.79772 10.4783ZM19.2603 10.4783L19.2582 10.4804C19.0511 10.4794 18.8829 10.6465 18.8819 10.8536V12.8665C18.8829 13.0736 19.0511 13.2407 19.2582 13.2397H21.2075C21.4136 13.2387 21.5797 13.0726 21.5807 12.8665V10.8536C21.5797 10.6475 21.4136 10.4804 21.2075 10.4804L19.2603 10.4783ZM9.47303 10.6024H10.6717V12.5568H9.47303V10.6024ZM13.3367 10.6024H14.5354V12.5568H13.3367V10.6024ZM3.17204 11.2279H4.37071V12.4901H3.17204V11.2279ZM19.6346 11.2279H20.8332V12.4901H19.6346V11.2279ZM2.79877 14.0406L2.79569 14.0426C2.59061 14.0436 2.42347 14.2097 2.42244 14.4159V16.4287C2.42142 16.6358 2.58958 16.804 2.79569 16.805H4.74495C4.95207 16.804 5.11921 16.6358 5.11819 16.4287V14.4159C5.11819 14.2098 4.95105 14.0436 4.74495 14.0426L2.79877 14.0406ZM19.2613 14.0406L19.2582 14.0426C19.0511 14.0416 18.8829 14.2087 18.8819 14.4159V16.4287C18.8809 16.5282 18.9209 16.6245 18.9916 16.6953C19.0624 16.766 19.1588 16.806 19.2582 16.805H21.2075C21.4146 16.804 21.5817 16.6358 21.5807 16.4287V14.4158C21.5797 14.2097 21.4136 14.0436 21.2075 14.0426L19.2613 14.0406ZM3.17309 14.7901H4.37176V16.0524H3.17309V14.7901ZM19.6356 14.7901H20.8343V16.0524H19.6356V14.7901ZM10.1631 15.0619H13.8473V18.0016L10.16 18.0036L10.1631 15.0619Z" fill="white" />
                              </svg>
                            </SingleCardIcon>
                            <SingleCardTitle className='title-5 text_theme_dark mb-3'>{renderRichTextWithImages(aboutData?.hospitals_description) || ''}</SingleCardTitle>
                            {/* <SingleCardDescription className='text-16 text_theme_dark'>
                              {aboutData?.intro_content || ''}
                            </SingleCardDescription> */}
                          </SingleCard>)}
                        </div>
                      </div>
                    </div>
                  </div>

                );
              }

              if (sectionId === 'specialization') {
                return (
                <div
                  id="specialization"
                  ref={(el) => (sectionRefs.current["specialization"] = el)}
                  className="section"
                >
                  <div className="commContent_wrap content-gap-24">
                    {/* <div className="row g-6 align-items-end"> */}
                    <div className="row g-6">
                      <div className="col-lg-6">
                        <div className="content-gap-20">
                          <span className="contentLabel">{specializationData?.heading || ''}</span>
                          <h3 className="title-size-36">{specializationData?.subHeading || ''}</h3>
                          <p>{specializationData?.description_block || ''}</p>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className='bg_doctors_box'>
                          { specializationData?.featured_image && (
                            <BackgroundImageHolder>
                              <img src={specializationData?.featured_image ? formatMedia(specializationData.featured_image) : ''} alt={specializationData?.heading || ''} />
                            </BackgroundImageHolder>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <div className="content-gap-20">
                      <h4 className="title-4 f-w-600">{specializationData?.heading || ''}</h4>
                      <p className="text-18">{specializationData?.subHeading || ''}</p>
                    </div> */}
                    <div className="plus-accodion-wrap">
                      <Accordion>
                        {(specializationData?.specialities?.[0]?.specialties || []).map((spec, idx) => (
                          <Accordion.Item eventKey={String(idx)} key={spec.id || idx}>
                            <Accordion.Header>{spec.title}</Accordion.Header>
                            <Accordion.Body>
                              <ul>
                                {(spec.points || []).map((point, i) => (
                                  <li key={point.id || i}>{point.point}</li>
                                ))}
                              </ul>
                            </Accordion.Body>
                          </Accordion.Item>
                        ))}
                      </Accordion>
                    </div>
                    <div className="content-gap-20">
                      <h4 className="title-4 f-w-600">{specializationData?.specialities?.[1]?.heading || ''}</h4>
                      <p className="text-18">{renderRichTextWithImages(specializationData?.specialities?.[1]?.description_block) || specializationData?.specialities?.[1]?.description || ''}</p>
                    </div>
                    <div className="plus-accodion-wrap">
                      <Accordion defaultActiveKey="0">
                        {(specializationData?.specialities?.[1]?.specialties || []).map((spec, idx) => (
                          <Accordion.Item eventKey={String(idx)} key={spec.id || idx}>
                            <Accordion.Header>{spec.title}</Accordion.Header>
                            <Accordion.Body>
                              <ul>
                                {(spec.points || []).map((point, i) => (
                                  <li key={point.id || i}>{point.point}</li>
                                ))}
                              </ul>
                            </Accordion.Body>
                          </Accordion.Item>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                </div>
              )}

              // Standard dynamic rendering for other sections
              return (
                <div
                  key={sectionId}
                  id={sectionId}
                  ref={(el) => (sectionRefs.current[sectionId] = el)}
                  className={sectionClassName}
                >
                  <div className={`commContent_wrap content-gap-24 ${sectionId === 'procedures_performed' ? 'text-white' : ''}`}>
                    {heading && <span className="contentLabel">{heading}</span>}
                    {subHeading && <h3 className="title-size-36">{subHeading}</h3>}

                    <SectionMediaBlock sectionData={sectionData} title={heading || SECTION_LABELS[sectionId]} />

                    {descriptionBlock && descriptionBlock.length > 0 && (
                      <div className="content-gap-20">
                        {renderRichTextWithImages(descriptionBlock)}
                      </div>
                    )}

                    {/* Special handling for procedures_performed section - render tabs component */}
                    {sectionId === 'procedures_performed' && sectionData?.procedures_cards && Array.isArray(sectionData?.procedures_cards) && sectionData?.procedures_cards?.length > 0 && (
                      <DoctorsDetailsProceduresPerformedTabsComponent data={sectionData} />
                    )}

                    {/* Special handling for research_publications section - render tabs component */}
                    {sectionId === 'research_publications' && sectionData?.cards && Array.isArray(sectionData?.cards) && sectionData?.cards?.length > 0 && (
                      <DoctorsDetailsResearchTabsComponent data={sectionData} />
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

const NavigationContainer = styled.div`
  position: absolute;
  left: auto;
  right: 30px;
  bottom: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  z-index: 10;
  pointer-events: none;
  width: 100%;
  padding-top: 40px;
  
  > * {
    pointer-events: auto;
  }
  
  @media (max-width: 1024px) {
    gap: 20px;
    bottom: 52px;
    right: 20px;
  }
  
  @media (max-width: 768px) {
    gap: 16px;
    padding-top: 24px;
  }  
`;

const NavButton = styled.button`
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
   
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  
  svg {
    width: 30px;
    height: 30px;   
    @media (max-width: 768px) {
      width: 32px;
      height: 24px;
    }
    
  }
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #E9E9E9;
  border-radius: 18px;
  overflow: hidden;
  background-color: #fff;
 

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, auto);
      
  }

  @media (max-width: 480px) {
      .services-grid {
          grid-template-columns: 1fr;
          grid-template-rows: repeat(10, auto);
      }
  }
`;

const StepCard = styled.div`
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid #E9E9E9;
  min-height: 134px;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
  
  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const StepTitle = styled.h6`
  font-family: "Be Vietnam Pro", sans-serif;
  font-weight: 500;
  font-size: 20px;
  color: #36454F;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StepDescription = styled.h6`
  font-family: "Be Vietnam Pro", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: rgba(54, 69, 79, 0.6);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SingleCard = styled.div`
  padding: 26px 26px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
  border: 1px solid #E5E7EB;
  border-radius: 40px;
  height: 100%;
  justify-content: center;

  @media (max-width: 1024px) {
    padding: 24px 24px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 20px;
  }
`;

const SingleCardIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #4B5563;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
  
  svg {
    width: 28px;
    height: 28px;
    color: white;
    stroke-width: 2;
  }
  
  @media (max-width: 1024px) {
    width: 48px;
    height: 48px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
   
  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const SingleCardTitle = styled.h5`
    max-width: 330px;
    @media (max-width: 1024px) {
        max-width: 100%;
    }
`;

const SingleCardDescription = styled.p`
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


export default DoctorsDetailsInfo;

