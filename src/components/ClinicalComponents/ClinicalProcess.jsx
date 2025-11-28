import React, { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";

const ClinicalProcess = () => {
  const carouselRef = useRef(null);
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  const sideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <>
      <section className="clinical__process__sec py-120">
        <div className="containerWrapper z-2 clinical__process__inner">
          <Row className="align-items-center">
            <Col lg={5} xl={5}>
              <div className="ratio__holder">
                <ScrollAnimationComponent animationVariants={sideLeft}>
                  <div className="ratio">
                    <img src="./images/cprocess.jpg" alt="Clinical Process" />
                  </div>
                </ScrollAnimationComponent>
              </div>
            </Col>
            <Col lg={7} xl={7}>
              <div className="content__right">
                <ScrollAnimationComponent animationVariants={fadeIn}>
                  <div className="commContent_wrap commContent_new">
                    <p className="contentLabel">Process</p>
                    <h3 className="title-3">
                      What Happens When You Join a Clinical Trial
                    </h3>
                  </div>
                </ScrollAnimationComponent>
                <div className="swiper__holder">
                  <Swiper
                    ref={carouselRef}
                    spaceBetween={24}
                    slidesPerView={1}
                    // loop={true}
                    breakpoints={{
                      0: { slidesPerView: 1 },
                      // 480: { slidesPerView: 1.2 },
                      767: { slidesPerView: 1.5 },
                      992: { slidesPerView: 2.3 },
                      // 1200: { slidesPerView: 3 },
                      // 1600: { slidesPerView: 1.8 },
                      // 2080: { slidesPerView: 2.5 },
                    }}
                    modules={[Navigation]}
                    navigation={{
                      nextEl: ".processCustomNext",
                      prevEl: ".processCustomPrev",
                    }}
                    style={{ overflow: "visible" }}
                  >
                    <SwiperSlide>
                      <div className="card">
                        <div className="card__number">01</div>
                        <div className="card__content">
                          <h4 className="card__title">
                            Diagnosis & Evaluation
                          </h4>
                          <div className="card__description">
                            <p>
                              Your case is evaluated based on diagnosis, stage,
                              and medical history.
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="card">
                        <div className="card__number">02</div>
                        <div className="card__content">
                          <h4 className="card__title">Informed Consent</h4>
                          <div className="card__description">
                            <p>
                              You’re provided detailed information about the
                              trial’s goals, duration, and risks.
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="card">
                        <div className="card__number">03</div>
                        <div className="card__content">
                          <h4 className="card__title">
                            Screening & Baseline Tests
                          </h4>
                          <div className="card__description">
                            <p>
                              Doctors perform initial assessments to set
                              reference points for results.
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="card">
                        <div className="card__number">04</div>
                        <div className="card__content">
                          <h4 className="card__title">
                            Diagnosis & Evaluation
                          </h4>
                          <div className="card__description">
                            <p>Medical assessment, lab tests, baseline scans</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="card">
                        <div className="card__number">05</div>
                        <div className="card__content">
                          <h4 className="card__title">
                            Diagnosis & Evaluation
                          </h4>
                          <div className="card__description">
                            <p>Medical assessment, lab tests, baseline scans</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                <NavigationContainer className="customNavigation">
                  <NavButton className="processCustomPrev">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="46"
                      height="32"
                      viewBox="0 0 46 32"
                      fill="none"
                    >
                      <path
                        d="M15.8656 31.7313L17.6493 30.01L4.75497 17.1156H45.0481V14.6156H4.70684L17.5868 1.72125L15.8656 0L-3.43323e-05 15.8656L15.8656 31.7313Z"
                        fill="#36454F"
                      />
                    </svg>
                  </NavButton>
                  <NavButton className="processCustomNext">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="46"
                      height="32"
                      viewBox="0 0 46 32"
                      fill="none"
                    >
                      <path
                        d="M29.1825 31.7313L27.3988 30.01L40.2931 17.1156H0V14.6156H40.3413L27.4613 1.72125L29.1825 0L45.0481 15.8656L29.1825 31.7313Z"
                        fill="#36454F"
                      />
                    </svg>
                  </NavButton>
                </NavigationContainer>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

const NavigationContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  z-index: 10;
  pointer-events: none;
  width: 100%;
  padding-top: 40px;
  padding-left: 36px;
  @media (max-width: 991.98px) {
    padding-left: 0;
  }

  > * {
    pointer-events: auto;
  }

  @media (max-width: 1024px) {
    gap: 32px;
    bottom: 52px;
    right: 20px;
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
    width: 46px;
    height: 32px;
    @media (max-width: 768px) {
      width: 32px;
      height: 24px;
    }
  }
`;
export default ClinicalProcess;
