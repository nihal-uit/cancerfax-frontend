import styled from "styled-components";
import ScrollAnimationComponent from '../../../components/ScrollAnimation/ScrollAnimationComponent';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';
import { formatMedia, formatRichText, renderRichTextWithImages } from "@/utils/strapiHelpers";

const CancerCenterBanner = ({ data }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const section = data;
  const hospitals = Array.isArray(section?.hospital) ? section.hospital : [];

  if (!section?.isActive || hospitals.length === 0) {
    return null;
  }

  return (
      <section className='cancerCenter_slider_sec'>
          <div className='cancerCenter_slider_wrapper'>
              <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  modules={[Navigation, EffectFade]}
                  effect="fade"
                  navigation={{
                    nextEl: ".customNext",
                    prevEl: ".customPrev",
                  }}
                >
                {hospitals.map((hospital) => {
                  const imageUrl = formatMedia(hospital?.hospitalImage);
                  const title = hospital?.name;
                  const description = renderRichTextWithImages(hospital?.description_block) || formatRichText(hospital?.description);
                  const locationCta = hospital?.address?.cta;

                  if (!imageUrl && !title && !description) return null;

                  return (
                    <SwiperSlide key={hospital.id || title}>
                      <div className='cancerCenter_info_slider'>
                        {imageUrl && <img src={imageUrl} alt={title || "hospital"} />}
                        <div className='cancerCenter_info_slider_content'>
                          <div className='containerWrapper'>
                            <ScrollAnimationComponent animationVariants={fadeIn}>
                              <div className='commContent_wrap'>
                                {title && (
                                  <h3 className="title-size-36">
                                    {title}
                                  </h3>
                                )}
                                {description && <p>{description}</p>}
                                {locationCta?.text && (
                                  <ButtonGroup>
                                    <a
                                      href={locationCta.URL || "#"}
                                      target={locationCta.target || "_self"}
                                      className='btn btn-pink-solid'
                                    >
                                      {locationCta.text}
                                    </a>
                                  </ButtonGroup>
                                )}
                              </div>
                            </ScrollAnimationComponent>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
                <NavigationContainer className='customNavigation'>
                  <NavButton className='customPrev'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="32" viewBox="0 0 46 32" fill="none">
                    <path d="M15.8656 31.7313L17.6493 30.01L4.75497 17.1156H45.0481V14.6156H4.70684L17.5868 1.72125L15.8656 0L-3.43323e-05 15.8656L15.8656 31.7313Z" fill="#ffffff"/>
                    </svg>          
                  </NavButton>
                  <NavButton className="customNext">
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="32" viewBox="0 0 46 32" fill="none">
                    <path d="M29.1825 31.7313L27.3988 30.01L40.2931 17.1156H0V14.6156H40.3413L27.4613 1.72125L29.1825 0L45.0481 15.8656L29.1825 31.7313Z" fill="#ffffff"/>
                    </svg>          
                  </NavButton>
                </NavigationContainer>
              </Swiper>
          </div>
      </section>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;

const NavigationContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 120px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  z-index: 10;
  pointer-events: none;
  width: 100%;
  max-width: 1240px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
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
    width: 28px;
    height: 20px;
    @media (max-width: 768px) {
      width: 24px;
      height: 18px;
    }
  }
`;



export default CancerCenterBanner;
