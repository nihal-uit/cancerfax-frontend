import React from 'react';
import styled from 'styled-components';

const DiseaseHero = ({ 
  DiseaseName = "Liver cancer",
  DiseaseText = "Associate Chief Physician & GCP center secretary , Experience: 25 Years",
  DiseaseVideo = "../videos/disease-video.mp4",
  onSubmitReports
}) => {
  return (
    <section className='homeHero_sec'>
      <div className='home-hero-banner hospital_details_hero'>
        <div className='ratio'>
          <BackgroundVideo className="video" preload="none" autoplay="true" loop="true" muted="true" playsinline="true" poster="../videos/disease-video-poster.jpg">
          <source src={DiseaseVideo} type="video/mp4" />
          {/* <source src="../videos/disease-video.mov" type="video/mov" />
          <source src="../videos/d.webm" type="video/webm" />
          <source src="../videos/doctors-video.ogv" type="video/ogv" /> */}
        </BackgroundVideo>
        </div>
      </div>
      <div className='heroContent_wrap'>
        <div className='containerWrapper'>
          <div className='commContent_wrap'>       
          <HeroContentGrid>
            <TopRow>
              <div>
                <DiseaseTitle className='title-1 mb-3'>{DiseaseName}</DiseaseTitle>
                <Description className='text-16'>{DiseaseText}</Description>
              </div>
              
              <SubmitButton className='btn btn-md btn-pink-solid' onClick={onSubmitReports}>
                Know more about liver cancer
              </SubmitButton>

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

const SubmitButton = styled.button`
`;

const DiseaseTitle = styled.h1`
  color: ${props => props.theme.colors.white};
`;

const Description = styled.p`
  color: ${props => props.theme.colors.white};
`;


export default DiseaseHero;
