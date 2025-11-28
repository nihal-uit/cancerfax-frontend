import React from "react";
import styled from "styled-components";
import { formatRichText } from "../../utils/strapiHelpers";
import ScrollAnimationComponent from "../../components/ScrollAnimation/ScrollAnimationComponent";
import "swiper/css";
import "swiper/css/effect-fade";

const ExploreButton = styled.button`
  max-width: 276px;
  @media (max-width: 575px) {
    max-width: 100%;
  }
`;

const HospitalHero = ( { data: hospitalHeroSection, loading }) => {
  const defaultHeroContent = {
    title:
      "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a est velit. In ut eros dapibus, consectetur metus nec, dictum metus.",
    buttonText: "Lorem Ipsum",
    buttonLink: "#hospitals",
  };

  const heroContent = hospitalHeroSection
    ? {
        title: hospitalHeroSection.heading,
        description:
          formatRichText(hospitalHeroSection.description) ||
          hospitalHeroSection.description,
        buttonText:
          hospitalHeroSection.CTAs?.[0]?.text || hospitalHeroSection.cta?.text,
        buttonLink:
          hospitalHeroSection.CTAs?.[0]?.URL ||
          hospitalHeroSection.CTAs?.[0]?.url ||
          hospitalHeroSection.cta?.URL ||
          hospitalHeroSection.cta?.url,
      }
    : defaultHeroContent;

    if (loading) {
      return null;
    }

  return (
    <div className='others_hero_content comm_hero_pt'>
    <div className='containerWrapper py-88'>
      <div className='hero_content_row'>
        <div className='hero_content_left commContent_wrap'>
          <ScrollAnimationComponent animationVariants={slideLeft}>
            <h1 className='title-1 text_theme_dark'>{heroContent.title}</h1>
          </ScrollAnimationComponent>
        </div>

        <div className='hero_content_right'>
          <ScrollAnimationComponent animationVariants={slideRight}>
            <div className='commContent_wrap content-gap-40'>
              <p className='text-16 text_theme_dark'>
                {heroContent.description}
              </p>
              <ExploreButton
                className='btn btn-pink-solid'
                as={heroContent.buttonLink ? 'a' : 'button'}
                href={heroContent.buttonLink}
              >
                {heroContent.buttonText}
              </ExploreButton>
            </div>
          </ScrollAnimationComponent>
        </div>
      </div>
    </div>
  </div>
  );
};

const slideLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const slideRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export default React.memo(HospitalHero);
