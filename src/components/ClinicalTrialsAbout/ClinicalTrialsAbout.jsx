import React from 'react';
import styled from 'styled-components';
import { formatMedia, renderRichTextWithImages } from '../../utils/strapiHelpers';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';
import { Link } from 'react-router-dom';

const Label = styled.p`
  color: ${props => props.theme.colors.primary};
`;

const Title = styled.h3`
  color: ${props => props.theme.colors.primary};
`;

const BackgroundImageHolder = styled.div`
  border-radius: 40px;
  opacity: 1;
  transform: rotate(0deg);
  overflow: hidden;
  background: #36454F;
  @media (max-width: 575px) {
    border-radius: 24px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 40px;
  }
`;

const ForegroundImage = styled.div`
  position: absolute;
  width: 327px;
  height: 474px;
  top: -56px;
  left: 45px;
  opacity: 1;
  transform: rotate(0deg);
  overflow: hidden;
  z-index: 2;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 1200px) {
    width: 280px;
    height: 410px;
    top: -56px;
    left: 40px;
  }
  @media (max-width: 768px) {
    width: auto;
    height: auto;
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 270px;
    margin: 0 auto;
  } 
`;

const Description = styled.p`
  color: ${props => props.theme.colors.primary};
`;

const ExploreButton = styled(Link)`
    max-width: 259px;
    @media (max-width: 575px) {
     max-width: 100%;
    }
`;

const ClinicalTrialsAbout = ({ componentData, data }) => {
  const statsData = componentData || data;

  if (!statsData) {
    return null;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <section className='aboutclinicalTrials_sec sec_bg_white py-120'>
      <div className='containerWrapper commContent_wrap'>
        <div className='clinical_row'>
          <div className='clinical_left'>
            <Label className='contentLabel'>{statsData?.heading || ''}</Label>
            <Title className='title-3'>{statsData?.subHeading || ''}</Title>
          </div>
          
          <div className='clinical_mid'>
            <BackgroundImageHolder>
              {statsData?.backgroundImage && (
                <img src={formatMedia(statsData?.backgroundImage)} alt="Background" />
              )}
            </BackgroundImageHolder>
              <ForegroundImage>
                <ScrollAnimationComponent animationVariants={fadeIn}>
                {statsData?.foregroundImage && (
                  <img src={formatMedia(statsData?.foregroundImage)} alt={statsData?.subHeading || ''} />
                )}
                </ScrollAnimationComponent>
              </ForegroundImage>
          </div>
          
          <div className='clinical_right'>
            <Description className='text-16'>
              {renderRichTextWithImages(statsData?.description_block) || statsData?.description_text || ''}
            </Description>
            {statsData?.cta?.text && (
              <ExploreButton className='btn btn-pink-solid' to={statsData?.cta?.URL || '#'} target={statsData?.cta?.target || '_blank'}>
                {statsData?.cta?.text}
            </ExploreButton>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ClinicalTrialsAbout;

