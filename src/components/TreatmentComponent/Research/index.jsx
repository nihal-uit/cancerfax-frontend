import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styled from "styled-components";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { Link } from "react-router-dom";

const Research = ({ data, loading }) => {
  const carouselRef = useRef(null);
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading || !data?.isActive || !data?.clinical_trials || !Array.isArray(data?.clinical_trials) || data?.clinical_trials?.length === 0) {
    return null;
  }

  return (
    <>
      <section className="research__sec py-120">
        <div className="containerWrapper">
          <ScrollAnimationComponent animationVariants={fadeIn}>
            <div className="row">
              <div className="col-lg-11 col-xl-10">
                <div className="commContent_wrap commContent_new">
                  {data?.heading && (
                    <p className="contentLabel">{data?.heading}</p>
                  )}
                  {data?.subHeading && (
                    <h3 className="title-3">
                      {data?.subHeading}
                    </h3>
                  )}
                </div>
              </div>
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
                480: { slidesPerView: 1.2 },
                767: { slidesPerView: 1.5 },
                992: { slidesPerView: 2.1 },
                1200: { slidesPerView: 3.4 },
                // 1600: { slidesPerView: 1.8 },
                2080: { slidesPerView: 2.5 },
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".customNext",
                prevEl: ".customPrev",
              }}
              style={{ overflow: "visible" }}
            >
              {data?.clinical_trials?.map((item) => {
                if (!item?.slug) return null;
                return (
                  <SwiperSlide key={item?.id || item?.documentId}>
                    <div className="card">
                      <div className="card__overlay"></div>
                      <div className="card__body">
                        {item?.name && (
                          <h4 className="card__title">{item?.name}</h4>
                        )}
                        <div className="btn__holder">
                          <Link className="btn btn-pink-solid" to={`/clinical-trial/${item?.slug}`}>
                            Explore
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}

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
    </>
  );
};
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
export default Research;
