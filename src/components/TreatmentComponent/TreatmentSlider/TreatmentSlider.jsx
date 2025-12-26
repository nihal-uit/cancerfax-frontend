import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ScrollAnimationComponent from '../../ScrollAnimation/ScrollAnimationComponent';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { formatMedia } from '../../../utils/strapiHelpers';

const TreatmentSlider = ({ sectionClass, data }) => {
  if (!data?.isActive) {
    return null;
  }

  const slides = data?.therapies || [];
  
  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <section className={`hospital_slider_sec ${sectionClass}`}>
      <div className='containerWrapper one_side_full_container ms-0 me-auto ps-0'>
        <div className='hospital_slider_wrapper'>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            // loop={true}
            modules={[Navigation, EffectFade]}
            effect='fade'
            navigation={{
              nextEl: '.customNext',
              prevEl: '.customPrev',
            }}
          >
            {slides.map((therapy) => (
                <SwiperSlide key={therapy?.id || therapy?.documentId}>
                  <div className='hospital_info_slider'>
                    {therapy?.hero?.featuredImage && (
                      <img
                        src={formatMedia(therapy?.hero?.featuredImage)}
                        alt={therapy?.hero?.featuredImage?.alternativeText || ''}
                      />
                    )}
                    <div className='hospital_info_slider_content'>
                      <div className='inner_container'>
                        <ScrollAnimationComponent animationVariants={fadeIn}>
                          <div className='commContent_wrap'>
                            {therapy?.hero?.heading && (
                              <h3>{therapy?.hero?.heading}</h3>
                            )}
                            {therapy?.hero?.subHeading && (
                              <p>{therapy?.hero?.subHeading}</p>
                            )}
                            {therapy?.hero?.cta?.URL && (
                              <Link
                                to={therapy?.hero?.cta?.URL || ''}
                                target={therapy?.hero?.cta?.target || '_blank'}
                                className='btn btn-pink-solid'
                              >
                                {therapy?.hero?.cta?.text || ''}
                              </Link>
                            )}
                          </div>
                        </ScrollAnimationComponent>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            <NavigationContainer className='customNavigation'>
              <NavButton className='customPrev'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='46'
                  height='32'
                  viewBox='0 0 46 32'
                  fill='none'
                >
                  <path
                    d='M15.8656 31.7313L17.6493 30.01L4.75497 17.1156H45.0481V14.6156H4.70684L17.5868 1.72125L15.8656 0L-3.43323e-05 15.8656L15.8656 31.7313Z'
                    fill='#ffffff'
                  />
                </svg>
              </NavButton>
              <NavButton className='customNext'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='46'
                  height='32'
                  viewBox='0 0 46 32'
                  fill='none'
                >
                  <path
                    d='M29.1825 31.7313L27.3988 30.01L40.2931 17.1156H0V14.6156H40.3413L27.4613 1.72125L29.1825 0L45.0481 15.8656L29.1825 31.7313Z'
                    fill='#ffffff'
                  />
                </svg>
              </NavButton>
            </NavigationContainer>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

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

export default React.memo(TreatmentSlider);
