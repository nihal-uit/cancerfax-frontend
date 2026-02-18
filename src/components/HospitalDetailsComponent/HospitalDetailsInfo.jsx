import React, { useEffect, useRef, useState, useMemo } from "react";
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import HospitalDetailsFacilitiesTabsComponent from '../reusable/HospitalDetailsFacilitiesTabsComponent';
import HospitalDetailsMediaComponent from '../reusable/HospitalDetailsMediaComponent';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import { formatMedia, renderRichTextWithImages, formatRichText } from '@/utils/strapiHelpers';

// Map section IDs to API field names
const SECTION_MAP = {
  about: 'about',
  hospital_address: 'address',
  direction: 'direction',
  infrastructure: 'infrastructure',
  team: 'doctors',
  facilities: 'facilities',
  media: 'media',
};

// Section labels
const SECTION_LABELS = {
  about: 'About',
  hospital_address: 'Hospital Address',
  direction: 'Direction',
  infrastructure: 'Infrastructure',
  team: 'Team & Specialities',
  facilities: 'Facilities',
  media: 'Media',
};

// Section icons
const SECTION_ICONS = {
  about: '../images/hospita-sidebar-icon-1.svg',
  hospital_address: '../images/hospita-sidebar-icon-2.svg',
  direction: '../images/hospita-sidebar-icon-3.svg',
  infrastructure: '../images/hospita-sidebar-icon-4.svg',
  team: '../images/hospita-sidebar-icon-5.svg',
  facilities: '../images/hospita-sidebar-icon-6.svg',
  media: '../images/hospita-sidebar-icon-7.svg',
};

const HospitalDetailsInfo = ({ data, loading }) => {
  // All hooks must be called before any conditional returns
  const [activeId, setActiveId] = useState(null);
  const sectionRefs = useRef({});

  // Build available sections from API data
  const availableSections = useMemo(() => {
    if (!data) return [];
    return Object.keys(SECTION_MAP).filter((sectionId) => {
      const apiField = SECTION_MAP[sectionId];
      
      // Special cases for sections that might have different data structures
      if (sectionId === 'about') {
        return data?.about && (data?.about?.heading || data?.about?.description_block || data?.about?.featuredImage || data?.about?.featuredVideo);
      }
      if (sectionId === 'hospital_address') {
        return data?.address && (data?.address?.isActive !== false) && (data?.address?.address || data?.address?.map_embed_url);
      }
      if (sectionId === 'direction') {
        return data?.direction && (data?.direction?.isActive !== false) && (data?.direction?.directions?.length > 0 || data?.direction?.map_embed_url);
      }
      if (sectionId === 'infrastructure') {
        return data?.infrastructure && data?.infrastructure?.infrastructures && Array.isArray(data?.infrastructure?.infrastructures);
      }
      if (sectionId === 'team') {
        return data?.team && data?.team?.doctors && Array.isArray(data?.team?.doctors);
      }
      if (sectionId === 'facilities') {
        return data?.facilities && Array.isArray(data?.facilities);
      }
      if (sectionId === 'media') {
        return data?.media && (data?.media?.media_galary?.length > 0 || data?.media?.heading || renderRichTextWithImages(data?.media?.description_block) ||data?.media?.description_text);
      }
      
      // Default check for standard sections
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

  // Helper function to build Google Maps URL
  const buildMapUrl = (address) => {
    if (!address) return "https://www.google.com/maps?q=San+Francisco,CA&output=embed";
    const parts = [
      address.flatNo,
      address.streetAddress,
      address.locality,
      address.city,
      address.state,
      address.country
    ].filter(Boolean);
    const query = parts.join(',+');
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  };

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
                  <img src={SECTION_ICONS[sectionId]} alt={SECTION_LABELS[sectionId]} />
                  <span>{SECTION_LABELS[sectionId]}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="hospitalDetails_info">
            {availableSections.map((sectionId) => {
              // Special handling for "about" section
              if (sectionId === 'about') {
                const aboutData = data?.about;
                if (!aboutData) return null;
                
                return (
                  <div
                    key={sectionId}
                    id={sectionId}
                    ref={(el) => (sectionRefs.current[sectionId] = el)}
                    className="section"
                  >
                    <div className="commContent_wrap content-gap-24">
                      {aboutData?.heading && <h3 className="title-3">{aboutData.heading}</h3>}
                      {aboutData?.featuredImage && (
                        <div className="details-img">
                          <img
                            src={formatMedia(aboutData.featuredImage)}
                            alt={aboutData?.featuredImage?.alternativeText || aboutData?.heading || 'Hospital'}
                          />
                        </div>
                      )}
                      {aboutData?.featuredVideo && (
                        <div className="details-img">
                          <video
                            preload="none"
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{ width: '100%', borderRadius: '8px' }}
                          >
                            <source src={formatMedia(aboutData.featuredVideo)} type="video/mp4" />
                          </video>
                        </div>
                      )}
                      {aboutData?.description_block && (
                        <div className="text-14">
                          {Array.isArray(aboutData.description_block) 
                            ? renderRichTextWithImages(aboutData.description_block)
                            : <p>{formatRichText(aboutData.description_block)}</p>
                          }
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              // Special handling for "hospital_address" section
              if (sectionId === 'hospital_address') {
                const addressData = data?.address;
                if (!addressData) return null;
                
                const address = addressData?.address;
                const mapUrl = addressData?.map_embed_url || (address ? buildMapUrl(address) : null);
                
                return (
                  <div
                    key={sectionId}
                    id={sectionId}
                    ref={(el) => (sectionRefs.current[sectionId] = el)}
                    className="section"
                  >
                    <div className="commContent_wrap content-gap-24">
                      {addressData?.heading && <h3 className="title-3">{addressData.heading}</h3>}
                      {(address || mapUrl) && (
                        <div className="address-card">
                          {address && (
                            <div className="address-content content-gap-12">
                              <div className="text-14">
                                <p>
                                  {[address?.flatNo, address?.streetAddress, address?.locality, address?.city, address?.state, address?.country]
                                    .filter(Boolean)
                                    .join(', ')}
                                </p>
                              </div>
                            </div>
                          )}
                          {mapUrl && (
                            <div
                              style={{
                                width: "100%",
                                height: "290px",
                                borderRadius: '20px',
                                overflow: "hidden",
                              }}
                            >
                              <iframe
                                title="Hospital Location Map"
                                src={mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              // Special handling for "direction" section
              if (sectionId === 'direction') {
                const directionData = data?.direction;
                if (!directionData) return null;
                
                const mapUrl = directionData?.map_embed_url || (directionData?.map_latitude && directionData?.map_longitude 
                  ? `https://www.google.com/maps?q=${directionData.map_latitude},${directionData.map_longitude}&output=embed`
                  : null);
                
                return (
                  <div
                    key={sectionId}
                    id={sectionId}
                    ref={(el) => (sectionRefs.current[sectionId] = el)}
                    className="section"
                  >
                    <div className="commContent_wrap content-gap-24">
                      {directionData?.heading && <h3 className="title-3">{directionData.heading}</h3>}
                      {directionData?.directions && Array.isArray(directionData.directions) && directionData.directions.length > 0 && (
                        <div className="content-gap-20">
                          {directionData.directions.map((direction, index) => (
                            <div key={direction?.id || index} className="content-gap-12">
                              {direction?.transportMethod && (
                                <h5 className="f-w-600">{direction.transportMethod}</h5>
                              )}
                              {direction?.details && (
                                <div className="text-14">{renderRichTextWithImages(direction.details)}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {mapUrl && (
                        <div
                          style={{
                            width: "100%",
                            height: "468px",
                            borderRadius: '20px',
                            overflow: "hidden",
                          }}
                        >
                          <iframe
                            title="Direction Map"
                            src={mapUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              // Special handling for "infrastructure" section
              if (sectionId === 'infrastructure') {
                const infrastructureData = data?.infrastructure;
                if (!infrastructureData || !infrastructureData?.infrastructures || !Array.isArray(infrastructureData.infrastructures)) {
                  return null;
                }
                
                return (
                  <div
                    key={sectionId}
                    id={sectionId}
                    ref={(el) => (sectionRefs.current[sectionId] = el)}
                    className="section"
                  >
                    <div className="commContent_wrap content-gap-24">
                      {infrastructureData?.heading && <h3 className="title-3">{infrastructureData.heading}</h3>}
                      {infrastructureData?.description_block && (
                        <div className="text-14">
                          {Array.isArray(infrastructureData.description_block) 
                            ? renderRichTextWithImages(infrastructureData.description_block)
                            : <p>{formatRichText(infrastructureData.description_block)}</p>
                          }
                        </div>
                      )}
                      {infrastructureData?.infrastructures?.length > 0 && 
                      (
                        <div className="infrastructure-slider-wrap">
                          <Swiper
                            spaceBetween={16}
                            slidesPerView={1}
                            breakpoints={{
                              0: { slidesPerView: 1 },
                              480: { slidesPerView: 1 },
                              767: { slidesPerView: 2 },
                              992: { slidesPerView: 2 },
                              1200: { slidesPerView: 3 },
                            }}
                            modules={[Navigation]}
                            navigation={{
                              nextEl: ".customNext",
                              prevEl: ".customPrev",
                            }}
                          >
                            {infrastructureData?.infrastructures?.map((item, index) => (
                              <SwiperSlide key={item?.id || index}>
                                <TherapyCard>
                                  {item?.image && (
                                    <img 
                                      src={formatMedia(item.image)} 
                                      alt={item?.name || item?.image?.alternativeText || 'Infrastructure'} 
                                    />
                                  )}
                                  {item?.name && (
                                    <CardOverlay className="card-overlay">
                                      <CardTitle>{item.name}</CardTitle>
                                      <CardSubTitle>{item?.details && renderRichTextWithImages(item?.details)}</CardSubTitle>
                                    </CardOverlay>
                                  )}
                                </TherapyCard>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                          <NavigationContainer className='customNavigation'>
                            <NavButton className='customPrev'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="46" height="32" viewBox="0 0 46 32" fill="none">
                                <path d="M15.8656 31.7313L17.6493 30.01L4.75497 17.1156H45.0481V14.6156H4.70684L17.5868 1.72125L15.8656 0L-3.43323e-05 15.8656L15.8656 31.7313Z" fill="#727B81"/>
                              </svg>
                            </NavButton>
                            <NavButton className="customNext">
                              <svg xmlns="http://www.w3.org/2000/svg" width="46" height="32" viewBox="0 0 46 32" fill="none">
                                <path d="M29.1825 31.7313L27.3988 30.01L40.2931 17.1156H0V14.6156H40.3413L27.4613 1.72125L29.1825 0L45.0481 15.8656L29.1825 31.7313Z" fill="#727B81"/>
                              </svg>
                            </NavButton>
                          </NavigationContainer>
                      </div>
                    )}
                    </div>
                  </div>
                );
              }

              // Special handling for "team" section
              if (sectionId === 'team') {
                const teamData = data?.team;
                if (!teamData || !teamData?.doctors || !Array.isArray(teamData.doctors)) {
                  return null;
                }
                
                return (
                  <div
                    key={sectionId}
                    id={sectionId}
                    ref={(el) => (sectionRefs.current[sectionId] = el)}
                    className="section"
                  >
                    <div className="commContent_wrap content-gap-24">
                      {teamData?.heading && <h3 className="title-3">{teamData.heading}</h3>}
                      {teamData?.description_block && (
                        <div className="text-14">
                          {Array.isArray(teamData.description_block) 
                            ? renderRichTextWithImages(teamData.description_block)
                            : <p>{formatRichText(teamData.description_block)}</p>
                          }
                        </div>
                      )}
                      {teamData?.doctors?.length > 0 && (
                        <div className="team-specialties-wrap">
                        <Row className="g-4">
                          {teamData.doctors.map((doctor, index) => (
                            <Col key={doctor?.id || doctor?.documentId || index} xl={4} lg={6} md={6} sm={6}>
                              <TeamSpecialtiesCard>
                                {doctor?.profilePicture && (
                                  <img src={formatMedia(doctor.profilePicture)} alt={`${doctor?.first_name || ''} ${doctor?.last_name || ''}`.trim() || 'Doctor'} />
                                )}
                                <TeamSpecialtiesCardOverlay className="card-overlay">
                                  <CardTitle>{[doctor?.first_name, doctor?.last_name].filter(Boolean).join(' ') || ''}</CardTitle>
                                  {doctor?.qualification && (
                                    <CardSubTitle>{doctor.qualification}</CardSubTitle>
                                  )}
                                </TeamSpecialtiesCardOverlay>
                              </TeamSpecialtiesCard>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    )}
                    </div>
                  </div>
                );
              }

              // Special handling for "facilities" section
              if (sectionId === 'facilities') {
                const facilitiesData = data?.facilities;
                if (!facilitiesData || !Array.isArray(facilitiesData)) {
                  return null;
                }
                
                return (
                  <div
                    key={sectionId}
                    id={sectionId}
                    ref={(el) => (sectionRefs.current[sectionId] = el)}
                    className="section"
                  >
                    <div className="commContent_wrap content-gap-24">
                      <h3 className="title-3">Facilities</h3>
                      <div>
                        <HospitalDetailsFacilitiesTabsComponent data={facilitiesData} loading={loading} />
                      </div>
                    </div>
                  </div>
                );
              }

              // Special handling for "media" section
              if (sectionId === 'media') {
                const mediaData = data?.media;
                if (!mediaData) return null;
                
                return (
                  <div
                    key={sectionId}
                    id={sectionId}
                    ref={(el) => (sectionRefs.current[sectionId] = el)}
                    className="section"
                  >
                    <HospitalDetailsMediaComponent data={mediaData} loading={loading} />
                  </div>
                );
              }

              // Standard dynamic rendering for other sections
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
                  className="section"
                >
                  <div className="commContent_wrap content-gap-24">
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

const TherapyCard = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background: #FFFFFF;
  border-radius: 24px;
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

const CardOverlay = styled.div`
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 10px 12px;
  height:50px;
  display: flex;
  justify-content: center;
  flex-direction: column;  
  transition: opacity 0.3s ease;
  width: 100%;
  max-width: calc(100% - 32px);
  margin: 0 auto;
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
  position: relative;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
  z-index: 10;
  pointer-events: none;
  width: 100%;
  padding-top: 40px;
  
  > * {
    pointer-events: auto;
  }
  
  @media (max-width: 1024px) {
    gap: 32px;
  }
  
  @media (max-width: 768px) {
    gap: 24px;
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
  
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
  
  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
  
  
  svg {
    width: 46px;
    height: 32px;   
    @media (max-width: 768px) {
      width: 32px;
      height: 24px;
    }
    
  } 
`;

export default HospitalDetailsInfo;
