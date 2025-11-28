import React from "react";
import styled from "styled-components";
import { formatMedia } from "../../utils/strapiHelpers";
import ScrollAnimationComponent from "../../components/ScrollAnimation/ScrollAnimationComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const DoctorsSlider = ({ data: doctorsSliderSection, loading }) => {
  if (loading) {
    return null;
  }

  const defaultSliderContent = [
    {
      id: 1,
      heading: "Doctors name 1",
      description: "CancerFax helps patients find cutting-edge treatments and ongoing clinical trials across top medical centers. From report review to travel support, weguide you every step of the way.",
      backgroundImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600",
    },
    {
      id: 2,
      heading: "Doctors name 2",
      description: "CancerFax helps patients find cutting-edge treatments and ongoing clinical trials across top medical centers. From report review to travel support, weguide you every step of the way.",
      backgroundImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600",
    },
  ];

  const sliderContent = doctorsSliderSection?.doctors?.length > 0 ? doctorsSliderSection.doctors.map((slide, index) => ({
    heading: `${slide.first_name} ${slide.last_name ? slide.last_name : ''}` || defaultSliderContent[index].heading,
    description: slide.about || defaultSliderContent[index].description,
    backgroundImage: formatMedia(slide.profilePicture) || defaultSliderContent[index].backgroundImage,
  })) : defaultSliderContent;


  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
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
          >
            {sliderContent.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="hospital_info_slider">
                <img src={slide.backgroundImage} alt={slide.heading} />
                <div className="hospital_info_slider_content">
                  <div className="inner_container">
                    <ScrollAnimationComponent animationVariants={fadeIn}>
                      <div className="commContent_wrap">
                        <h3>{slide.heading}</h3>
                        <p>{slide.description}</p>
                        <a href={slide.buttonLink} className="btn btn-pink-solid">
                          View Details
                        </a>
                      </div>
                    </ScrollAnimationComponent>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            ))}
            <NavigationContainer className="customNavigation">
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
                    fill="#ffffff"
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
                    fill="#ffffff"
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

export default DoctorsSlider;
