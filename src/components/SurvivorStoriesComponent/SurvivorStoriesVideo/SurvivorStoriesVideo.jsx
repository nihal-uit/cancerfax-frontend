import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatMedia } from '../../../utils/strapiHelpers';

const SurvivorStoriesVideo = ({ story }) => {
  if (!story) {
    return null;
  }

  console.log(story);

  const videoUrl = formatMedia(story?.hero?.featuredVideo);
  const storyTitle = story?.hero?.story_title || story?.patient_name || '';
  const shortQuote = story?.short_quote || '';
  const cta = story?.hero?.cta;
  const storySlug = story?.slug;

  if (!videoUrl) {
    return null;
  }

  return (
    <div className='storiesVideo_wrap'>
      <div className='stories_video'>
        <div className='ratio'>
          <BackgroundVideo 
            className="video" 
            preload="none" 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
        </BackgroundVideo>
        </div>
      </div>
      <div className='storiesVideo_Content_wrap'>
          <div className='commContent_wrap'>      
          <HeroContentGrid>
            <TopRow>
              <HospitalName className='title-3'>{storyTitle}</HospitalName>
              
              <ActionButtonsGroup>
                <a href="#" className="play-btn-pulse">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 28 30" fill="none">
                            <path d="M5.6717 1.1394C3.05718 -0.360326 0.9375 0.868266 0.9375 3.88134V26.1165C0.9375 29.1326 3.05718 30.3596 5.6717 28.8613L25.1063 17.7156C27.7217 16.2154 27.7217 13.7848 25.1063 12.2849L5.6717 1.1394Z" fill="#727B81"></path>
                        </svg>
                    </span>
                </a>
              </ActionButtonsGroup>
            </TopRow>
            
            <BottomRow>
              {(cta?.text || storySlug) && (
                <CTAButton 
                  className='btn btn-md btn-pink-solid'
                  to={cta?.URL || (storySlug ? `/survivor-story/${storySlug}` : '#')}
                  target={cta?.target || '_self'}
                >
                  {cta?.text || 'Read Full Story'}
                </CTAButton>
              )}
              {shortQuote && (
              <Description className='text-16 line-2-text'>
                  {shortQuote}
              </Description>
              )}
            </BottomRow>
          </HeroContentGrid>          
          </div>
      </div>
    </div>
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
  flex-wrap: wrap;
  gap: 24px;
  @media (max-width: 768px) {
    gap: 45px;
  }
`;

const HospitalName = styled.h3`
  color: ${props => props.theme.colors.white};
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

const BottomRow = styled.div`
  display: flex;
  width: 100%;
  padding-top: 40px;
  gap: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);

  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }

  @media (max-width: 575px) {
    padding-top: 30px;
    gap: 24px;
    flex-direction: column;
  }
`;

const CTAButton = styled(Link)`
`;

const Description = styled.p`
  color: ${props => props.theme.colors.white};
`;

export default SurvivorStoriesVideo;
