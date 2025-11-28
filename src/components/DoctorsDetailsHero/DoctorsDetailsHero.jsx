import React from 'react';
import styled from 'styled-components';

const DoctorsDetailsHero = ({ 
  DoctorName = "Prof. Shuhang Wang",
  DoctorText = "Associate Chief Physician & GCP center secretary , Experience: 25 Years",
  DoctorVideo = "../videos/doctors-video.mp4",
  onSubmitReports
}) => {
  return (
    <section className='homeHero_sec'>

      <div className='home-hero-banner hospital_details_hero'>
        <div className='ratio'>
          <BackgroundVideo class="video" preload="none" autoplay="true" loop="true" muted="true" playsinline="true" poster="../videos/doctors-video-poster.jpg">
          <source src={DoctorVideo} type="video/mp4" />
          {/* <source src="../videos/doctors-video.mov" type="video/mov" />
          <source src="../videos/doctors-video.webm" type="video/webm" />
          <source src="../videos/doctors-video.ogv" type="video/ogv" /> */}
        </BackgroundVideo>
        </div>
      </div>
      <div className='heroContent_wrap'>
        <div className='containerWrapper'>
          <div className='commContent_wrap'>
       
          <HeroContentGrid>
            <TopRow>
              <DoctorTitle className='title-1'>{DoctorName}</DoctorTitle>
              <SubText className="text-18">{DoctorText}</SubText>
            </TopRow>
            
            <BottomRow>
              <SubmitButton className='btn btn-md btn-pink-solid' onClick={onSubmitReports}>
                Check availability & book a slot
              </SubmitButton>
              <Description className='text-16'>
                Read the remarkable story of Chen Yan, who achieved transfusion-independence after treatment with CRISPR gene therapy for beta-thalassemia. A journey of hope and resiliency.
              </Description>
            </BottomRow>
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
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
`;

const DoctorTitle = styled.h1`
  color: ${props => props.theme.colors.white};
`;

const SubText = styled.p`
  color: ${props => props.theme.colors.white};
`;

const BottomRow = styled.div`
  display: flex;
  width: 100%;
  padding-top: 40px;
  gap: 80px;
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

const SubmitButton = styled.button`
`;

const Description = styled.p`
  color: ${props => props.theme.colors.white};
`;


export default DoctorsDetailsHero;
