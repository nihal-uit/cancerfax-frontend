import React from 'react';
import ScrollAnimationComponent from '../../ScrollAnimation/ScrollAnimationComponent';
import styled from 'styled-components';
import { formatMedia } from '../../../utils/strapiHelpers';
import { Link } from 'react-router-dom';

const Hero = ({ data }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const videoUrl = formatMedia(data?.featuredVideo);
  const imageUrl = formatMedia(data?.featuredImage);

  if (!data) return null;

  return (
    <section className='homeHero_sec'>
      <div className='home-hero-banner hospital_details_hero'>
        <div className='ratio'>
          {videoUrl ? (
            <BackgroundVideo
              className='video'
              preload='none'
              autoPlay
              loop
              muted
              playsInline
              poster={imageUrl || undefined}
            >
              <source src={videoUrl} type='video/mp4' />
            </BackgroundVideo>
          ) : (
            imageUrl && (
              <BackgroundImage
                src={imageUrl}
                alt={
                  data?.featuredImage?.alternativeText ||
                  data?.story_title ||
                  'story hero'
                }
                loading='lazy'
              />
            )
          )}
        </div>
      </div>
      <div className='heroContent_wrap'>
        <div className='containerWrapper'>
          <div className='commContent_wrap'>
            <ScrollAnimationComponent animationVariants={fadeIn}>
              <HeroContentGrid>
                <TopRow>
                  {data?.story_title && (
                    <StoriesTitle className='title-1'>
                      {data?.story_title}
                    </StoriesTitle>
                  )}
                  {data?.featuredVideo && (
                    <ActionButtonsGroup>
                      <span className='play-btn-pulse' aria-hidden='true'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='18'
                          viewBox='0 0 28 30'
                          fill='none'
                        >
                          <path
                            d='M5.6717 1.1394C3.05718 -0.360326 0.9375 0.868266 0.9375 3.88134V26.1165C0.9375 29.1326 3.05718 30.3596 5.6717 28.8613L25.1063 17.7156C27.7217 16.2154 27.7217 13.7848 25.1063 12.2849L5.6717 1.1394Z'
                            fill='#727B81'
                          ></path>
                        </svg>
                      </span>
                    </ActionButtonsGroup>
                  )}
                </TopRow>

                <BottomRow>
                  {data?.cta?.text && (
                    <Link
                      className='btn btn-md btn-pink-solid'
                      to={data?.cta?.URL || '#'}
                      target={data?.cta?.target || '_self'}
                    >
                      {data?.cta?.text}
                    </Link>
                  )}
                  {data?.story_description && (
                    <Description className='text-16 line-2-text'>
                      {data?.story_description}
                    </Description>
                  )}
                </BottomRow>
              </HeroContentGrid>
            </ScrollAnimationComponent>
          </div>
        </div>
      </div>
    </section>
  );
};

const BackgroundVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const HeroContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 50px;
`;

const TopRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  @media (max-width: 768px) {
    gap: 45px;
    flex-wrap: wrap;
  }
`;

const StoriesTitle = styled.h1`
  color: ${(props) => props.theme.colors.white};
  max-width: 750px;
`;

const BottomRow = styled.div`
  display: flex;
  width: 100%;
  padding-top: 40px;
  gap: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    gap: 40px;
  }

  @media (max-width: 575px) {
    padding-top: 30px;
    gap: 24px;
    flex-direction: column;
  }
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.white};
`;

const ActionButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 90px;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

export default Hero;
