import React from "react";
import { Col, Image, Ratio, Row } from "react-bootstrap";
import styled from "styled-components";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const ClicicalSafety = ({data}) => {
  return (
    <>
      <section className="clinical__safety__sec py-120 pb-0 bg-white">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          // loop={true}
          modules={[Navigation, EffectFade]}
          //   effect="fade"
          navigation={{
            nextEl: ".customNext",
            prevEl: ".customPrev",
          }}
        >
          {/* {data?.map((item, index) => ( */}
          <SwiperSlide>
            <div className="clinical__safety__item position-relative py-88">
              <div className="csafetybg">
                <div className="ratio">
                  <img
                    src="./images/clinical-safety-bg.webp"
                    width={1440}
                    height={600}
                    alt="safety"
                  />
                </div>
              </div>

              <div className="containerWrapper z-2 position-relative">
                <Row className="align-items-center gy-4 gy-lg-0 justify-content-end">
                  <Col lg={6}>
                    <ContentHolder>
                      <ScrollAnimationComponent animationVariants={fadeIn}>
                        <div className="content">
                          <p className="contentLabel">
                            Spinal Muscular Atrophy (Type II)
                          </p>
                          <h3 className="title-5 text-reset">
                            Safety and Efficacy Evaluation of GC101 Gene Therapy
                            Via Intrathecal (IT) Injection in the Treatment of
                            Patients With Type 2 Spinal Muscular Atrophy (SMA) -
                            Phase III
                          </h3>
                          <div className="content__des text_theme_dark">
                            <p>
                              The clinical trial NCT06971094 is a Phase 3 study
                              evaluating the efficacy and safety of
                              sibeprenlimab, an investigational anti-APRIL
                              monoclonal antibody, for treating immunoglobulin A
                              nephropathy (IgAN). This randomized, double-blind,
                              placebo-controlled trial involves...
                            </p>
                          </div>
                          <div className="btn__holder">
                            <Link to="#" className="btn btn-pink-solid">
                              Find out more
                            </Link>
                          </div>
                        </div>
                      </ScrollAnimationComponent>
                    </ContentHolder>
                  </Col>
                </Row>
              </div>
            </div>
          </SwiperSlide>
          {/* ))} */}
        {/* <NavButtonHolder>
                  <NavButton className="customPrev">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="46"
                      height="32"
                      viewBox="0 0 46 32"
                      fill="none"
                    >
                      <path
                        d="M15.8656 31.7313L17.6493 30.01L4.75497 17.1156H45.0481V14.6156H4.70684L17.5868 1.72125L15.8656 0L-3.43323e-05 15.8656L15.8656 31.7313Z"
                        fill="#727B81"
                      />
                    </svg>
                  </NavButton>
                  <NavButton className="customNext">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="46"
                      height="32"
                      viewBox="0 0 46 32"
                      fill="none"
                    >
                      <path
                        d="M29.1825 31.7313L27.3988 30.01L40.2931 17.1156H0V14.6156H40.3413L27.4613 1.72125L29.1825 0L45.0481 15.8656L29.1825 31.7313Z"
                        fill="#727B81"
                      />
                    </svg>
                  </NavButton>
        </NavButtonHolder> */}
        </Swiper>
      </section>
    </>
  );
};

const ContentHolder = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  padding: 30px;
  border-radius: 30px;
  @media (min-width: 992px) {
    margin-left: 28px;
  }
  .content {
    .contentLabel {
      font-family: ${(props) => props.theme.fonts.primary};
      background-color: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.white};
      border-radius: 12px;
      padding: 2px 14px;
      display: inline-block;
      margin-bottom: 30px;
    }
    .title-5 {
      font-family: ${(props) => props.theme.fonts.primary};
      font-size: 20px;
      line-height: calc(30 / 20);
      font-weight: 500;
      margin: 0;
    }
    .content__des {
      margin-top: 30px;
      p {
        font-family: ${(props) => props.theme.fonts.primary};
        font-size: ${(props) => props.theme.fontSizes.sm};
        line-height: calc(24 / 14);
        margin: 0;
        font-weight: 400;
      }
    }
    .btn__holder {
      margin-top: 40px;
    }
  }
`;

const NavButtonHolder = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 40px;
`;
const NavButton = styled.button`
  width: 60px;
  height: 60px;
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
    width: calc(45 / 60 * 100%);
    height: auto;
    background-color: transparent !important;
  }
`;

export default ClicicalSafety;
