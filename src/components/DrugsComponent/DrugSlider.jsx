import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import { formatRichText, formatMedia } from "../../utils/strapiHelpers";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";
import "swiper/css";
import "swiper/css/effect-fade";

const DrugSlider = ({ data: drugSliderSection, loading }) => {
  if (loading) {
    return null;
  }

  const defaultSliderContent = [
    {
      id: 1,
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a est velit. In ut eros dapibus, consectetur metus nec, dictum metus.",
      buttonLink: "#",
      buttonText: "Click Here",
      buttonTarget: "_blank",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600",
    },
    {
      id: 2,
      title: "Lorem Ipsum 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a est velit. In ut eros dapibus, consectetur metus nec, dictum metus.",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600",
      buttonLink: "#",
      buttonText: "Click Here",
      buttonTarget: "_blank",
    },
  ];

  const sliderContent =
    drugSliderSection?.drugs?.length > 0
      ? drugSliderSection.drugs.map((slide, index) => ({
          id: slide.id || defaultSliderContent[index % 2].id,
          title: slide.name || defaultSliderContent[index % 2].title,
          description:
            formatRichText(slide.description) ||
            slide.description ||
            defaultSliderContent[index % 2].description,
          image:
            formatMedia(slide.featuredImage) ||
            defaultSliderContent[index % 2].image,
          buttonLink:
            slide.cta?.URL || defaultSliderContent[index % 2].buttonLink,
          buttonText:
            slide.cta?.text || defaultSliderContent[index % 2].buttonText,
          buttonTarget:
            slide.cta?.target || defaultSliderContent[index % 2].buttonTarget,
        }))
      : defaultSliderContent;

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
            {sliderContent.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="hospital_info_slider">
                  <img src={slide.image} alt={slide.title} />
                  <div className="hospital_info_slider_content">
                    <div className="inner_container">
                      <ScrollAnimationComponent animationVariants={fadeIn}>
                        <div className="commContent_wrap">
                          <h3>{slide.title}</h3>
                          <p>{slide.description}</p>
                          <a
                            href={slide.buttonLink}
                            className="btn btn-pink-solid"
                            target={slide.buttonTarget}
                          >
                            {slide.buttonText}
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

export default DrugSlider;
