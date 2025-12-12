import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatRichText } from '../../utils/strapiHelpers';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';
import 'swiper/css';
import 'swiper/css/effect-fade';

const ExploreButton = styled(Link)`
  max-width: 276px;
  @media (max-width: 575px) {
    max-width: 100%;
  }
`;

const HospitalHero = ({ data: hospitalHeroSection }) => {
  const heroContent = hospitalHeroSection
    ? {
        title: hospitalHeroSection.heading || '',
        description: formatRichText(hospitalHeroSection.description_text) || '',
        buttonText: hospitalHeroSection.CTAs?.text || '',
        buttonLink: hospitalHeroSection.CTAs?.URL || '',
        buttonTarget: hospitalHeroSection.CTAs?.target || '',
      }
    : {};

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
                  to={heroContent.buttonLink}
                  target={heroContent.buttonTarget}
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
