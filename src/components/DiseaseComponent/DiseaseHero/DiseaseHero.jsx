import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatMedia, renderRichTextWithImages } from '../../../utils/strapiHelpers';

const DiseaseHero = ({ data }) => {  
  if (!data || !data?.isActive) {
    return null;
  }

  return (
    <section className='homeHero_sec'>
      <div className='home-hero-banner hospital_details_hero'>
        <div className='ratio'>
          {data?.featuredVideo ? (
            <BackgroundVideo 
              className="video" 
              preload="none" 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src={formatMedia(data?.featuredVideo)} type="video/mp4" />
            </BackgroundVideo>
          ) : data?.featuredImage ? (
            <BackgroundImage 
              src={formatMedia(data?.featuredImage)}
              alt={data?.name}
            />
          ) : null}
        </div>
      </div>
      <div className='heroContent_wrap'>
        <div className='containerWrapper'>
          <div className='commContent_wrap'>       
            <HeroContentGrid>
              <TopRow>
                <div>
                  {data?.heading && (
                    <DiseaseTitle className='title-1 mb-3'>{data?.heading}</DiseaseTitle>
                  )}
                  {data?.subHeading && (
                    <Description className='text-16'>{data?.subHeading}</Description>
                  )}
                  {(data?.description_block || data?.description_text) && (
                    <Description className='text-16'>{renderRichTextWithImages(data?.description_block)||data?.description_text}</Description>
                  )}
                </div>
                
                {data?.cta?.text && (
                  <CTAButton 
                    className='btn btn-md btn-pink-solid'
                    to={data?.cta?.URL || '#'}
                    target={data?.cta?.target || '_self'}
                  >
                    {data?.cta?.text}
                  </CTAButton>
                )}
              </TopRow>
            </HeroContentGrid>          
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
  flex-wrap: wrap;
  gap: 24px;
`;

const CTAButton = styled(Link)`
`;

const DiseaseTitle = styled.h1`
  color: ${props => props.theme.colors.white};
`;

const Description = styled.p`
  color: ${props => props.theme.colors.white};
`;


export default DiseaseHero;
