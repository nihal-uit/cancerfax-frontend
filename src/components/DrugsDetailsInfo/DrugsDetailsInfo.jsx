import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import HospitalDetailsFacilitiesTabsComponent from '../reusable/HospitalDetailsFacilitiesTabsComponent';
import DoctorsDetailsProceduresPerformedTabsComponent from '../reusable/DoctorsDetailsProceduresPerformedTabsComponent';
import DoctorsDetailsResearchTabsComponent from '../reusable/DoctorsDetailsResearchTabsComponent';
import { Accordion } from 'react-bootstrap';

const SECTIONS = [
  { id: "about", label: "Drug Description" },
  { id: "specialization", label: "Composition Details" },
  { id: "procedures_performed", label: "Clinical Trials" },
  { id: "research_publications", label: "Full Prescribing Information" },
  { id: "author", label: "Indications and Contraindicationss" },
  { id: "related_tags", label: "Side Effects and Interactions" },
];

const DrugsDetailsInfo = () => {

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

  // ##################

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
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="hospitalDetails_info doctorsDetails_info">
            {/* ABOUT Doctors */}
            <div
              id="about"
              ref={(el) => (sectionRefs.current["about"] = el)}
              className="section"
            >

             <div className="commContent_wrap content-gap-24">

                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="content-gap-20">
                      <h3 className="title-size-36">Prof. Shuhand Wang – Specialization</h3>
                      <p>Prof. Shuhang Wang is an accomplished oncologist, clinical researcher, and clinical trial specialist affiliated with the Chinese Academy of Medical Sciences (CAMS) Cancer Center in Beijing, one of China’s most prestigious cancer treatment and research institutions.</p>
                      <p>Her dual roles as Associate Chief Physician and GCP (Good Clinical Practice) Center Secretary highlight his expertise in both clinical oncology and the management of cutting-edge cancer trials. Below is a detailed breakdown of his specialty and contributions to the field.</p>
                    </div>
                  </div>
                </div>

                <div className="row g-4">
                  <div className="col-lg-7">
                      <div className="doctors-details-img">
                        <img
                          src="../images/doctors-details-img.jpg"
                          alt="doctors"
                        />
                      </div>
                  </div>
                  <div className="col-lg-5">
                      <div className="doctors-details-img">
                        <img
                          src="../images/doctors-details-img.jpg"
                          alt="doctors"
                        />
                      </div>
                  </div>
                </div>
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="content-gap-20">
                      <h6 className="text-24">Prof. Shuhand Wang – Specialization</h6>
                      <p>Prof. Shuhang Wang is an accomplished oncologist, clinical researcher, and clinical trial specialist affiliated with the Chinese Academy of Medical Sciences (CAMS) Cancer Center in Beijing, one of China’s most prestigious cancer treatment and research institutions.</p>
                      <p>Her dual roles as Associate Chief Physician and GCP (Good Clinical Practice) Center Secretary highlight his expertise in both clinical oncology and the management of cutting-edge cancer trials. Below is a detailed breakdown of his specialty and contributions to the field.</p>
                    </div>
                  </div>
                </div>

                <div className="read-more-wrap">
                  <button className="readMore_btn">
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M14.8057 9.3511C14.5658 9.10776 14.1866 9.08493 13.9207 9.28441L13.8511 9.34433L9.675 13.4625L9.675 2.925C9.675 2.55221 9.37279 2.25 9 2.25C8.65588 2.25 8.37191 2.5075 8.33026 2.84033L8.325 2.925V13.4625L4.1489 9.34433C3.90556 9.10441 3.52616 9.08697 3.26302 9.2902L3.19433 9.3511C2.95441 9.59444 2.93697 9.97384 3.1402 10.237L3.2011 10.3057L8.5261 15.5557C8.76701 15.7932 9.14184 15.813 9.40506 15.615L9.4739 15.5557L14.7989 10.3057C15.0644 10.0439 15.0674 9.61657 14.8057 9.3511Z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>
             </div>
            </div>

            {/* Doctors Specialization */}
            <div
              id="specialization"
              ref={(el) => (sectionRefs.current["specialization"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <div className="row g-6 align-items-end">
                  <div className="col-lg-6">
                    <div className="content-gap-20">
                      <span className="contentLabel">Specialization</span>
                      <h3 className="title-size-36">Prof. Shuhand Wang – Specialization</h3>
                      <p>Prof. Shuhang Wang is an accomplished oncologist, clinical researcher, and clinical trial specialist affiliated with the Chinese Academy of Medical Sciences (CAMS) Cancer Center in Beijing, one of China’s most prestigious cancer treatment and research institutions.</p>
                      <p>Her dual roles as Associate Chief Physician and GCP (Good Clinical Practice) Center Secretary highlight his expertise in both clinical oncology and the management of cutting-edge cancer trials. Below is a detailed breakdown of his specialty and contributions to the field.</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className='bg_doctors_box'>
                      <BackgroundImageHolder>
                          <img src="../images/background.png" alt="Background" />
                      </BackgroundImageHolder>
                        <ForegroundImage>
                          <img src="../images/Attached_image.png" alt="" />
                        </ForegroundImage>
                    </div>
                  </div>
                </div>
                <div className="content-gap-20">
                  <h4 className="title-4 f-w-600">Clinical Oncology Specialty</h4>
                  <p className="text-18">Prof. Wang’s clinical work likely focuses on medical oncology, with a subspecialty in one or more of the following areas:</p>
                </div>
                <div className="plus-accodion-wrap">
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>A. Solid Tumor Oncology</Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>B. Hematologic Malignancies (Possible Involvement)</Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>C. Multidisciplinary Tumor Boards</Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                <div className="content-gap-20">
                  <h4 className="title-4 f-w-600">Clinical Trials & Drug Development (GCP Leadership)</h4>
                  <p className="text-18">As Secretary of the GCP Center, Prof. Wang plays a pivotal role in designing, approving, and supervising cancer clinical trials, ensuring compliance with international (ICH-GCP) and Chinese regulatory standards.</p>
                </div>
                <div className="plus-accodion-wrap">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Key Areas of Trial Expertise:</Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>

            {/* Procedures Performed */}
            <div
              id="procedures_performed"
              ref={(el) => (sectionRefs.current["procedures_performed"] = el)}
              className="section bg_dark_gray pt-5 mb-5"
            >

              <div className="commContent_wrap content-gap-20 text-white">
                  <span className="contentLabel">Procedures Performed</span>
                  <h3 className="title-3">Overview of Procedures Performed</h3>
                  <p className="text-16">Since Dr. Shuhang Wang (王书航) is primarily known for his role as an Associate Chief Physician and GCP Center Secretary at the Chinese Academy of Medical Sciences (CAMS) Cancer Center, his work focuses more on clinical research, trial oversight, and systemic cancer therapies rather than surgical procedures.</p>

                  <DoctorsDetailsProceduresPerformedTabsComponent />
              </div>
            </div>

            {/* Research Publications */}
            <div
              id="research_publications"
              ref={(el) => (sectionRefs.current["research_publications"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-20">
                  <span className="contentLabel">Advancing Knowledge</span>
                  <h3 className="title-3">Research & Publications</h3>
                  <p className="text-16">Dr. Zhang Wei is a leading neurosurgeon and researcher at Tsinghua University, recognized for her groundbreaking work in treating Diffuse Midline Glioma (DMG), a highly aggressive central nervous system tumor. Her research integrates clinical neurosurgery with advanced molecular and epigenetic studies, aiming to develop innovative therapies for DMG patients.</p>

                  <DoctorsDetailsResearchTabsComponent />
              </div>
            </div>

            {/* Author */}
            <div
              id="author"
              ref={(el) => (sectionRefs.current["author"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">

                <h3 className="title-3">Author & Specialties</h3>

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

            {/* Related tags */}
            <div
              id="related_tags"
              ref={(el) => (sectionRefs.current["related_tags"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">

                <h3 className="title-3">Related Tags</h3>

                <div className="text-14">
                  <p>The Cancer Hospital of the Chinese Academy of Medical Sciences (CAMS), comprising its Beijing main campus and Langfang (Hedian) branch, boasts state-of-the-art infrastructure designed to support advanced cancer treatment, research, and patient care.</p>
                </div>

                <div>
                  <HospitalDetailsFacilitiesTabsComponent />
                </div>
              </div>
            </div>

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
