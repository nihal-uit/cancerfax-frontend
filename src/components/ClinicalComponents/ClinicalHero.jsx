import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ScrollAnimationComponent from '../ScrollAnimation/ScrollAnimationComponent';

const ClinicalHero = ({ componentData, data, sectionClass }) => {
  const heroData = componentData || data;

  if (!heroData) {
    return null;
  }

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

  return (
    <div className={`others_hero_content comm_hero_pt ${sectionClass || ''}`}>
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
                  {heroData?.description_text || ''}
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

export default ClinicalHero;
