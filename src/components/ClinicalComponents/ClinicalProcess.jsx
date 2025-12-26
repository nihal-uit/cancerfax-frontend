import React, { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";
import { formatMedia } from "../../utils/strapiHelpers";

const ClinicalProcess = ({ componentData, data }) => {
  const processData = componentData || data;

  // Hooks must be called before any early returns
  const carouselRef = useRef(null);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  const sideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  if (!processData) {
    return null;
  }

  const imageUrl = formatMedia(processData?.featured_image);
  const steps = processData?.steps || [];

  if (steps.length === 0) {
    return null;
  }

  return (
      <section className="clinical__process__sec py-120">
        <div className="containerWrapper z-2 clinical__process__inner">
          <Row className="align-items-center">
          {imageUrl && (
            <Col lg={5} xl={5}>
              <div className="ratio__holder">
                <ScrollAnimationComponent animationVariants={sideLeft}>
                  <div className="ratio object-fit-cover">
                    <img 
                      style={{ objectFit: 'cover' }}
                      src={imageUrl} 
                      alt={processData?.featured_image?.alternativeText || "Clinical Process"} 
                    />
                  </div>
                </ScrollAnimationComponent>
              </div>
            </Col>
          )}
            <Col lg={7} xl={7}>
              <div className="content__right">
                <ScrollAnimationComponent animationVariants={fadeIn}>
                  <div className="commContent_wrap commContent_new">
                  <p className="contentLabel">{processData?.heading || ''}</p>
                    <h3 className="title-3">
                    {processData?.subHeading || ''}
                    </h3>
                  </div>
                </ScrollAnimationComponent>
                <div className="swiper__holder">
                  <Swiper
                    ref={carouselRef}
                    spaceBetween={24}
                    slidesPerView={1}
                    breakpoints={{
                      0: { slidesPerView: 1 },
                      767: { slidesPerView: 1.5 },
                      992: { slidesPerView: 2.3 },
                    }}
                    modules={[Navigation]}
                    navigation={{
                      nextEl: ".processCustomNext",
                      prevEl: ".processCustomPrev",
                    }}
                    style={{ overflow: "visible" }}
                  >
                  {steps.map((step, index) => (
                    <SwiperSlide key={step?.id || index}>
                      <div className="card">
                        <div className="card__number">
                          {String(step?.step_number || index + 1).padStart(2, '0')}
                        </div>
                        <div className="card__content">
                          <h4 className="card__title">{step?.title || ''}</h4>
                          <div className="card__description">
                            <p>{step?.description || ''}</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
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
