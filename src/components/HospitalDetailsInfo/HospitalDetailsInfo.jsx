import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import HospitalDetailsFacilitiesTabsComponent from '../reusable/HospitalDetailsFacilitiesTabsComponent';
import HospitalDetailsMediaComponent from '../reusable/HospitalDetailsMediaComponent';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';

const SECTIONS = [
  { id: "about", label: "About", icon: "../images/hospita-sidebar-icon-1.svg" },
  { id: "hospital_address", label: "Hospital Address", icon: "../images/hospita-sidebar-icon-2.svg" },
  { id: "direction", label: "Direction", icon: "../images/hospita-sidebar-icon-3.svg" },
  { id: "infrastructure", label: "Infrastructure", icon: "../images/hospita-sidebar-icon-4.svg" },
  { id: "team", label: "Team & Specialities", icon: "../images/hospita-sidebar-icon-5.svg" },
  { id: "facilities", label: "Facilities", icon: "../images/hospita-sidebar-icon-6.svg" },
  { id: "media", label: "Media", icon: "../images/hospita-sidebar-icon-7.svg" },
];

const HospitalDetailsInfo = () => {

  const [activeId, setActiveId] = useState("about");
  const sectionRefs = useRef({});

  // Scroll spy – highlight active section
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // center-ish
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    SECTIONS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className='hospitalDetailsInfo_sec py-120'>
      <div className="containerWrapper">
        <div className="hospitalDetailsInfo_wrap">
          <aside className="sidebar">
            <ul>
              {SECTIONS.map((item) => (
                <li
                  key={item.id}
                  className={item.id === activeId ? "active" : ""}
                  onClick={() => handleClick(item.id)}
                >
                  <img src={item.icon} alt={item.label} />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="hospitalDetails_info">
            {/* ABOUT */}
            <div
              id="about"
              ref={(el) => (sectionRefs.current["about"] = el)}
              className="section"
            >

             <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Fudan University Shanghai Cancer Center</h3>
                <div className="details-img">
                  <img
                    src="../images/hospital-details-about-img.jpg"
                    alt="Hospital"
                  />
                </div>
                <p className="text-14">(FUSCC, https://english.shca.org.cn/english), is engaged in clinical practice, medical education, oncological research and cancer prevention in China. Historically, it can be traced back to Sino-Belgian Radium Institute established on March 1, 1931, the earliest specialized hospital of oncology in China.</p>
                <p className="text-14">
                  The Cancer Hospital of the Chinese Academy of Medical Sciences (CAMS), including both its Beijing main campus and Hedian Branch in Langfang, has a combined total of approximately 1,500 inpatient beds.
                </p>
                <p className="text-14">- Beijing Main Campus (Chaoyang District): ~1,000 beds</p>
                <p className="text-14">- Hedian Branch (Langfang, Hebei Province): ~500 beds</p>
                <p>The Langfang campus (opened in 2019) significantly expanded capacity to alleviate patient overflow and support advanced treatment facilities, including proton therapy.</p>

                <h5 className="title-5">Overview</h5>
                <div className="text-14">
                  <strong>Full Name:</strong>
                  <p>Cancer Hospital, Chinese Academy of Medical Sciences (中国医学科学院肿瘤医院). Also Known As: National Cancer Center (NCC) of China</p>
                </div>
                <div className="text-14">
                  <strong>Location:</strong>
                  <p>- Main Campus: Panjiayuan, Chaoyang District, Beijing, China</p>
                  <p>- Hedian Campus: Langfang, Hebei Province (a newer branch for expanded services)</p>
                </div>
                <div className="text-14">
                  <strong>Affiliation::</strong>
                  <p>- Directly under the Chinese Academy of Medical Sciences (CAMS) and Peking Union Medical College (PUMC).</p>
                  <p>- Recognized as the National Cancer Center (NCC) by the Chinese government.</p>
                </div>
             </div>
            </div>

            {/* HOSPITAL ADDRESS */}
            <div
              id="hospital_address"
              ref={(el) => (sectionRefs.current["hospital_address"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">

                <h3 className="title-3">Hospital Address</h3>

                <div className="address-card">
                  <div className="address-content content-gap-12">
                    <h5>National Cancer Center, Beijing, China <br/> &#x2022; Beijing Main Campus (Chaoyang District)</h5>
                    <div className="text-14">
                      <strong>English Address:</strong>
                      <p>No. 17 Panjiayuan Nanli, Chaoyang District, Beijing, China</p>
                    </div>
                    <div className="text-14">
                      <strong>Chinese Address (for taxi/didi):</strong>
                      <p>北京市朝阳区潘家园南里17号</p>
                      <p>(Zhōngguó Běijīng Shì Cháoyáng Qū Pānjiāyuán Nánlǐ 17 Hào)</p>
                    </div>
                    <div className="text-14">
                      <strong>Landmark:</strong>
                      <p>北京市朝阳区潘家园南里17号</p>
                      <p>(Zhōngguó Běijīng Shì Cháoyáng Qū Pānjiāyuán Nánlǐ 17 Hào)</p>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "290px",
                      borderRadius: '20px',
                      overflow: "hidden",
                    }}
                  >
                    <iframe
                      title="San Francisco Map"
                      src="https://www.google.com/maps?q=San+Francisco,CA&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>

                <div className="address-card">
                  <div className="address-content content-gap-12">
                    <h5>National Cancer Center, Beijing, China <br/> &#x2022; Beijing Main Campus (Chaoyang District)</h5>
                    <div className="text-14">
                      <strong>English Address:</strong>
                      <p>No. 17 Panjiayuan Nanli, Chaoyang District, Beijing, China</p>
                    </div>
                    <div className="text-14">
                      <strong>Chinese Address (for taxi/didi):</strong>
                      <p>北京市朝阳区潘家园南里17号</p>
                      <p>(Zhōngguó Běijīng Shì Cháoyáng Qū Pānjiāyuán Nánlǐ 17 Hào)</p>
                    </div>
                    <div className="text-14">
                      <strong>Landmark:</strong>
                      <p>北京市朝阳区潘家园南里17号</p>
                      <p>(Zhōngguó Běijīng Shì Cháoyáng Qū Pānjiāyuán Nánlǐ 17 Hào)</p>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "290px",
                      borderRadius: '20px',
                      overflow: "hidden",
                    }}
                  >
                    <iframe
                      title="San Francisco Map"
                      src="https://www.google.com/maps?q=San+Francisco,CA&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* DIRECTION */}
            <div
              id="direction"
              ref={(el) => (sectionRefs.current["direction"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">

                <h3 className="title-3">Direction</h3>

                <div className="address-card">
                  <div className="address-content content-gap-12">
                    <h5>National Cancer Center, Beijing, China <br/> &#x2022; Beijing Main Campus (Chaoyang District)</h5>
                    <div className="text-14">
                      <strong>By Metro (Subway):</strong>
                      <p>- Line 10: Get off at Panjiayuan Station (潘家园站), Exit B</p>
                      <p>- Line 14: Alternative option – Fangzhuang Station (方庄站), then take a taxi (10 mins)</p>
                    </div>
                    <div className="text-14">
                      <strong>By Bus:</strong>
                      <p>- Bus Routes: 51, 91, 300, 368, 627, 954, 998</p>
                      <p>- Nearest stops: Panjiayuan (潘家园) or Shilihe (十里河)</p>
                    </div>
                    <div className="text-14">
                      <strong>By Taxi/Ride-Hailing:</strong>
                      <p>- From Beijing Capital Airport (PEK): ~1 hour (¥120–150)</p>
                      <p>- From Beijing South Railway Station: ~30 mins (¥40–60)</p>
                      <p>- From Beijing West Railway Station: ~40 mins (¥60–80)</p>
                    </div>
                    <div className="text-14">
                      <strong>By Car:</strong>
                      <p>- Parking: Limited on-site parking (¥10–20/hour). Nearby lots available at Panjiayuan Market</p>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "468px",
                      borderRadius: '20px',
                      overflow: "hidden",
                    }}
                  >
                    <iframe
                      title="San Francisco Map"
                      src="https://www.google.com/maps?q=San+Francisco,CA&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* INFRASTRUCTURE */}
            <div
              id="infrastructure"
              ref={(el) => (sectionRefs.current["infrastructure"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">

                <h3 className="title-3">Infrastructure</h3>

                <div className="text-14">
                  <p>The Cancer Hospital of the Chinese Academy of Medical Sciences (CAMS), comprising its Beijing main campus and Langfang (Hedian) branch, boasts state-of-the-art infrastructure designed to support advanced cancer treatment, research, and patient care. Below is a detailed breakdown of the facilities, technology, and architectural features of both campuses.</p>
                </div>

                <div className="infrastructure-slider-wrap">
                  <Swiper
                      spaceBetween={16}
                      slidesPerView={1}
                      // loop={true}
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
                      style={{overflow: 'hidden'}}
                      className="commCircle_navigation"
                    >
                      <SwiperSlide>
                        <TherapyCard>
                          <img src={'../images/infrastructure-slider-img-1.jpg'} alt="" />
                            <CardOverlay className="card-overlay">
                              <CardTitle>Good machineries</CardTitle>
                            </CardOverlay>
                        </TherapyCard>
                      </SwiperSlide>
                      <SwiperSlide>
                        <TherapyCard>
                          <img src={'../images/infrastructure-slider-img-2.jpg'} alt="" />
                            <CardOverlay className="card-overlay">
                              <CardTitle>Treatment & Clinical Trial Matching</CardTitle>
                            </CardOverlay>
                        </TherapyCard>
                      </SwiperSlide>
                      <SwiperSlide>
                        <TherapyCard>
                          <img src={'../images/infrastructure-slider-img-3.jpg'} alt="" />
                            <CardOverlay className="card-overlay">
                              <CardTitle>Expert Doctors</CardTitle>
                            </CardOverlay>
                        </TherapyCard>
                      </SwiperSlide>
                      <SwiperSlide>
                        <TherapyCard>
                          <img src={'../images/infrastructure-slider-img-1.jpg'} alt="" />
                            <CardOverlay className="card-overlay">
                              <CardTitle>Good machineries</CardTitle>
                            </CardOverlay>
                        </TherapyCard>
                      </SwiperSlide>
                    <NavButton className='customPrev left-0'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="32" viewBox="0 0 46 32" fill="none">
                      <path d="M15.8656 31.7313L17.6493 30.01L4.75497 17.1156H45.0481V14.6156H4.70684L17.5868 1.72125L15.8656 0L-3.43323e-05 15.8656L15.8656 31.7313Z" fill="#727B81"/>
                      </svg>          
                    </NavButton>
                    <NavButton className="customNext right-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="32" viewBox="0 0 46 32" fill="none">
                      <path d="M29.1825 31.7313L27.3988 30.01L40.2931 17.1156H0V14.6156H40.3413L27.4613 1.72125L29.1825 0L45.0481 15.8656L29.1825 31.7313Z" fill="#727B81"/>
                      </svg>          
                    </NavButton>
                  </Swiper>
                </div>

              </div>
            </div>

            {/* TEAM */}
            <div
              id="team"
              ref={(el) => (sectionRefs.current["team"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">

                <h3 className="title-3">Team & Specialties</h3>

                <div className="text-14">
                  <p>The Cancer Hospital of the Chinese Academy of Medical Sciences (CAMS), comprising its Beijing main campus and Langfang (Hedian) branch, boasts state-of-the-art infrastructure designed to support advanced cancer treatment, research, and patient care.</p>
                </div>

                <div className="team-specialties-wrap">
                  <Row className="g-4">
                    <Col xl={4} lg={6} md={6} sm={6}>
                        <TeamSpecialtiesCard>
                          <img src={'../images/team-specialties-img-1.jpg'} alt="" />
                            <TeamSpecialtiesCardOverlay className="card-overlay">
                              <CardTitle>Doctor name goes here</CardTitle>
                              <CardSubTitle>Doctor’s specialty</CardSubTitle>
                            </TeamSpecialtiesCardOverlay>
                        </TeamSpecialtiesCard>
                    </Col>
                    <Col xl={4} lg={6} md={6} sm={6}>
                        <TeamSpecialtiesCard>
                          <img src={'../images/team-specialties-img-2.jpg'} alt="" />
                            <TeamSpecialtiesCardOverlay className="card-overlay">
                              <CardTitle>Doctor name goes here</CardTitle>
                              <CardSubTitle>Doctor’s specialty</CardSubTitle>
                            </TeamSpecialtiesCardOverlay>
                        </TeamSpecialtiesCard>
                    </Col>
                    <Col xl={4} lg={6} md={6} sm={6}>
                        <TeamSpecialtiesCard>
                          <img src={'../images/team-specialties-img-3.jpg'} alt="" />
                            <TeamSpecialtiesCardOverlay className="card-overlay">
                              <CardTitle>Doctor name goes here</CardTitle>
                              <CardSubTitle>Doctor’s specialty</CardSubTitle>
                            </TeamSpecialtiesCardOverlay>
                        </TeamSpecialtiesCard>
                    </Col>
                    <Col xl={4} lg={6} md={6} sm={6}>
                        <TeamSpecialtiesCard>
                          <img src={'../images/team-specialties-img-4.jpg'} alt="" />
                            <TeamSpecialtiesCardOverlay className="card-overlay">
                              <CardTitle>Doctor name goes here</CardTitle>
                              <CardSubTitle>Doctor’s specialty</CardSubTitle>
                            </TeamSpecialtiesCardOverlay>
                        </TeamSpecialtiesCard>
                    </Col>
                    <Col xl={4} lg={6} md={6} sm={6}>
                        <TeamSpecialtiesCard>
                          <img src={'../images/team-specialties-img-5.jpg'} alt="" />
                            <TeamSpecialtiesCardOverlay className="card-overlay">
                              <CardTitle>Doctor name goes here</CardTitle>
                              <CardSubTitle>Doctor’s specialty</CardSubTitle>
                            </TeamSpecialtiesCardOverlay>
                        </TeamSpecialtiesCard>
                    </Col>
                    <Col xl={4} lg={6} md={6} sm={6}>
                        <TeamSpecialtiesCard>
                          <img src={'../images/team-specialties-img-6.jpg'} alt="" />
                            <TeamSpecialtiesCardOverlay className="card-overlay">
                              <CardTitle>Doctor name goes here</CardTitle>
                              <CardSubTitle>Doctor’s specialty</CardSubTitle>
                            </TeamSpecialtiesCardOverlay>
                        </TeamSpecialtiesCard>
                    </Col>  
                    <Col xl={4} lg={6} md={6} sm={6}>
                        <TeamSpecialtiesCard>
                          <img src={'../images/team-specialties-img-7.jpg'} alt="" />
                            <TeamSpecialtiesCardOverlay className="card-overlay">
                              <CardTitle>Doctor name goes here</CardTitle>
                              <CardSubTitle>Doctor’s specialty</CardSubTitle>
                            </TeamSpecialtiesCardOverlay>
                        </TeamSpecialtiesCard>
                    </Col>
                    <Col xl={4} lg={6} md={6} sm={6}>
                        <TeamSpecialtiesCard>
                          <img src={'../images/team-specialties-img-8.jpg'} alt="" />
                            <TeamSpecialtiesCardOverlay className="card-overlay">
                              <CardTitle>Doctor name goes here</CardTitle>
                              <CardSubTitle>Doctor’s specialty</CardSubTitle>
                            </TeamSpecialtiesCardOverlay>
                        </TeamSpecialtiesCard>
                    </Col>
                    <Col xl={4} lg={6} md={6} sm={6}>
                        <TeamSpecialtiesCard>
                          <img src={'../images/team-specialties-img-9.jpg'} alt="" />
                            <TeamSpecialtiesCardOverlay className="card-overlay">
                              <CardTitle>Doctor name goes here</CardTitle>
                              <CardSubTitle>Doctor’s specialty</CardSubTitle>
                            </TeamSpecialtiesCardOverlay>
                        </TeamSpecialtiesCard>
                    </Col>              
                  </Row>
                </div>

              </div>
            </div>

            {/* FACILITIES */}
            <div
              id="facilities"
              ref={(el) => (sectionRefs.current["facilities"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">

                <h3 className="title-3">Facilities</h3>

                <div className="text-14">
                  <p>The Cancer Hospital of the Chinese Academy of Medical Sciences (CAMS), comprising its Beijing main campus and Langfang (Hedian) branch, boasts state-of-the-art infrastructure designed to support advanced cancer treatment, research, and patient care.</p>
                </div>

                <div>
                  <HospitalDetailsFacilitiesTabsComponent />
                </div>
              </div>
            </div>

            {/* MEDIA */}
            <div
              id="media"
              ref={(el) => (sectionRefs.current["media"] = el)}
              className="section"
            >
              <HospitalDetailsMediaComponent />
            </div>
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
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    width: 28px;
    height: 20px;   

    @media (max-width: 768px) {
      width: 24px;
      height: 18px;
    }
    
  } 
`;

export default HospitalDetailsInfo;
