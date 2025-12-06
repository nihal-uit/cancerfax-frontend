import React, { useEffect, useState } from "react";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import styled from "styled-components";

const Hero = ({
  StoriesName = "Chen Yan’s Breakthrough: Cured of Beta-Thalassemia Using CRISPR Gene Therapy",
  StoriesVideo = "../videos/survivor-stories-details-video.mp4",
  StoriesbtnLink = "Submit reports & check eligibility",
  StoriesDescription = "Read the remarkable story of Chen Yan, who achieved transfusion-independence after treatment with CRISPR gene therapy for beta-thalassemia. A journey of hope and resiliency.",
  onSubmitReports,
}) => {

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className='homeHero_sec'>

      <div className='home-hero-banner hospital_details_hero'>
        <div className='ratio'>
          <BackgroundVideo className="video" preload="none" autoplay="true" loop="true" muted="true" playsinline="true" poster="../videos/survivor-stories-details-video.jpg">
          <source src={StoriesVideo} type="video/mp4" />
          {/* <source src="../videos/doctors-video.mov" type="video/mov" />
          <source src="../videos/doctors-video.webm" type="video/webm" />
          <source src="../videos/doctors-video.ogv" type="video/ogv" /> */}
        </BackgroundVideo>
        </div>
      </div>
      <div className='heroContent_wrap'>
        <div className='containerWrapper'>
          <div className='commContent_wrap'>
            <ScrollAnimationComponent animationVariants={fadeIn}>
            <HeroContentGrid>
              <TopRow>
                <StoriesTitle className='title-1'>{StoriesName}</StoriesTitle>
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
                <SubmitButton className='btn btn-md btn-pink-solid' onClick={onSubmitReports}>
                  {StoriesbtnLink}
                </SubmitButton>
                <Description className='text-16 line-2-text'>
                  {StoriesDescription}
                </Description>
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
  color: ${props => props.theme.colors.white};
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

const SubmitButton = styled.button`
`;

const Description = styled.p`
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

export default Hero;
