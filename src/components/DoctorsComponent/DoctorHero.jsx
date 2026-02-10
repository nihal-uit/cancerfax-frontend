import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ScrollAnimationComponent from '../ScrollAnimation/ScrollAnimationComponent';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { renderRichTextWithImages } from '@/utils/strapiHelpers';

const DoctorHero = ({ componentData, data }) => {
  const heroData = componentData || data;

  if (!heroData) {
    return null;
  }

  return (
    <div className='others_hero_content comm_hero_pt'>
      <div className='containerWrapper py-88'>
        <div className='hero_content_row'>
          <div className='hero_content_left commContent_wrap'>
            <ScrollAnimationComponent animationVariants={slideLeft}>
              <h1 className='title-1 text_theme_dark'>
                {heroData?.heading || ''}
              </h1>
            </ScrollAnimationComponent>
          </div>

          <div className='hero_content_right'>
            <ScrollAnimationComponent animationVariants={slideRight}>
              <div className='commContent_wrap content-gap-40'>
                <p className='text-16 text_theme_dark'>
                  {renderRichTextWithImages(heroData?.description_block)||heroData?.description_text || ''}
                </p>
                {heroData?.cta?.text && (
                  <ExploreButton
                    className='btn btn-pink-solid'
                    to={heroData?.cta?.URL || '#'}
                    target={heroData?.cta?.target || '_self'}
                  >
                    {heroData?.cta?.text}
                  </ExploreButton>
                )}
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

const ExploreButton = styled(Link)`
  max-width: 276px;
  @media (max-width: 575px) {
    max-width: 100%;
  }
`;

export default React.memo(DoctorHero);
