import React from "react";
import styled from "styled-components";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "./AuthorSection.css";

const AuthorSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const NavigationContainer = styled.div`
    position: absolute;
    left: auto;
    right: 50px;
    bottom: 93px;
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

  return (
    <section className="hospital_slider_sec">
      <div className="containerWrapper one_side_full_container ms-0 me-auto ps-0">
        <div className="hospital_slider_wrapper">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            // loop={true}
            modules={[Navigation, EffectFade]}
            effect="fade"
            navigation={{
              nextEl: ".customNext",
              prevEl: ".customPrev",
            }}
            className="commCircle_navigation"
          >
            <SwiperSlide>
              <div className="hospital_info_slider">
                <img src="../images/resources-author.jpg" alt="" />
                <div className="hospital_info_slider_content">
                  <div className="inner_container">
                    <ScrollAnimationComponent animationVariants={fadeIn}>
                      <div className="commContent_wrap">
                        <div className="author-row">
                          <span className="flow-tag d-flex align-items-center gap-2 text-white">
                            Tag
                          </span>
                          <div className="author-thumb">
                            <img src="../images/author.jpg" alt="Author" />
                          </div>
                          <p className="m-0 author-name">
                            Author name goes here
                          </p>
                        </div>
                        <h3>
                          Atezolizumab Plus Chemotherapy Improves Survival in
                          Advanced-Stage Small-Cell Lung...
                        </h3>
                        <p>Nov 19, 2025 | 7 min read</p>
                        <a href="#" className="btn btn-pink-solid">
                          Know more
                        </a>
                      </div>
                    </ScrollAnimationComponent>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="hospital_info_slider">
                <img src="../images/doctors-slider-img-2.webp" alt="" />
                <div className="hospital_info_slider_content">
                  <div className="inner_container">
                    <ScrollAnimationComponent animationVariants={fadeIn}>
                      <div className="commContent_wrap">
                        <h3>Clinical Trial for CAR T Cell therapy</h3>
                        <p>
                          Ongoing studies evaluating the safety and
                          effectiveness of CAR T-cell therapy for patients with
                          multiple myeloma, offering new hope for those
                          resistant to conventional treatments.
                        </p>
                        <a href="#" className="btn btn-pink-solid">
                          View Details
                        </a>
                      </div>
                    </ScrollAnimationComponent>
                  </div>
                </div>
              </div>
            </SwiperSlide>
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
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;
