import React from 'react';
import ScrollAnimationComponent from '../../ScrollAnimation/ScrollAnimationComponent';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TreatmentHero = ({ sectionClass, data, loading }) => {
  if (loading || !data?.isActive) {
    return null;
  }

  return (
    <div className={`others_hero_content comm_hero_pt ${sectionClass}`}>
      <div className='containerWrapper py-88'>
        <div className='hero_content_row'>
          <div className='hero_content_left commContent_wrap'>
            <ScrollAnimationComponent animationVariants={slideLeft}>
              {data?.heading && (
                <h1 className='title-1 text_theme_dark'>{data?.heading}</h1>
              )}
            </ScrollAnimationComponent>
          </div>

          <div className='hero_content_right'>
            <ScrollAnimationComponent animationVariants={slideRight}>
              <div className='commContent_wrap content-gap-40'>
                {data?.description_text && (
                  <p className='text-16 text_theme_dark'>
                    {data?.description_text}
                  </p>
                )}
                {data?.cta?.text && (
                  <ExploreButton
                    className='btn btn-pink-solid'
                    to={data?.cta?.URL || ''}
                    target={data?.cta?.target || '_blank'}
                  >
                    {data?.cta?.text}
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

export default React.memo(TreatmentHero);
