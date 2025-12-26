import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatMedia } from '../../utils/strapiHelpers';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';

const Hero = ({ componentData, data }) => {
  const [isMobile, setIsMobile] = useState(false);
  const heroData = componentData || data;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const backgroundImage = formatMedia(heroData?.image) || null;

  if (!heroData) {
    return null;
  }

  const backgroundStyle = {
    backgroundImage: `linear-gradient(90deg, rgba(54, 69, 79, 0.57) 40%, rgba(54, 69, 79, 0) 70%, transparent 100%), radial-gradient(circle at 59% 40%, rgba(54, 69, 79, 0.26) 0%, rgba(54, 69, 79, 0) 100%), url('${backgroundImage}')`,
    backgroundSize: isMobile ? 'cover' : 'auto, auto, 1558px 977px',
    backgroundPosition: isMobile ? 'center' : 'center, center, -13px -124px',
    backgroundRepeat: 'no-repeat',
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className='homeHero_sec' style={backgroundStyle}>
      <div className='home-hero-banner'>
        <div className='ratio'>
          <img src={backgroundImage} alt='' />
        </div>
      </div>
      <div className='heroContent_wrap'>
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <div className='containerWrapper'>
            <div className='commContent_wrap'>
              <SurvivorLabel className='contentLabel'>
                {heroData?.heading || ''}
              </SurvivorLabel>

              <StoryTitle className='title-1'>
                {(() => {
                  const parts = heroData?.subHeading?.split(
                    /(?<=[.!?]+)\s(?!.*[.!?]+\s)/
                  );

                  return (
                    <>
                      <StoryTitleBold>{parts?.[0] || ''}</StoryTitleBold>
                      {parts?.[1] && (
                        <StoryTitleRegular>{parts[1]}</StoryTitleRegular>
                      )}
                    </>
                  );
                })()}
              </StoryTitle>

              <div className='storyCard_wrap'>
                <StoryButton
                  className='btn btn-pink-solid'
                  as='a'
                  href={heroData?.cta?.URL || '#'}
                  target={heroData?.cta?.target || '_blank'}
                >
                  {heroData?.cta?.text || ''}
                </StoryButton>
                <StoryDescription className='text-16'>
                  {heroData?.description_text || ''}
                </StoryDescription>
              </div>
            </div>
          </div>
        </ScrollAnimationComponent>
      </div>
    </section>
  );
};

const SurvivorLabel = styled.div`
  color: ${(props) => props.theme.colors.white};
`;

const StoryTitle = styled.h1`
  color: ${(props) => props.theme.colors.white};
  max-width: 680px;
`;

const StoryTitleBold = styled.span`
  font-weight: 600;
  display: block;
`;

const StoryTitleRegular = styled.span`
  font-weight: 400;
  display: block;
`;

const StoryButton = styled.button`
  background-color: ${(props) => props.theme.colors.pink};
  color: ${(props) => props.theme.colors.white};
`;

const StoryDescription = styled.p`
  color: ${(props) => props.theme.colors.white};
`;

export default Hero;
