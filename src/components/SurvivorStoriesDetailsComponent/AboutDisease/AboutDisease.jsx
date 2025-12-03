import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";

const AboutDisease = () => {

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
      <section className='aboutDisease_sec py-120'>
        <div className='containerWrapper'>
          <ScrollAnimationComponent animationVariants={fadeIn}>
          <TopSection>
            <LeftContent className='commContent_wrap'>
              <Label className='contentLabel text_theme_dark'>Deep diving</Label>
              <Title className='title-3 text_theme_dark'>About the disease</Title>
            </LeftContent>
            
            <RightContent className='commContent_wrap'>
              <Description className='text-16'>Read the remarkable story of Chen Yan, who achieved transfusion-independence after treatment with CRISPR gene therapy for beta-thalassemia. A journey of hope and resiliency.</Description>
            </RightContent>
          </TopSection>

          <GridWrapper>
            <StepCard>
              <IconWrapper>
                <img src="../images/aboutDisease_icon-1.svg" alt="" />
              </IconWrapper>
              <StepContent>
                <StepTitle>Condition</StepTitle>
                <StepDescription>Severe beta-thalassemia (diagnosed at 8 months old)</StepDescription>
              </StepContent>
            </StepCard>
            <StepCard>
              <IconWrapper>
                <img src="../images/aboutDisease_icon-2.svg" alt="" />
              </IconWrapper>
              <StepContent>
                <StepTitle>Treatment received</StepTitle>
                <StepDescription>CRISPR/Cas9 gene therapy via ModiHSC® platform</StepDescription>
              </StepContent>
            </StepCard>
            <StepCard>
              <IconWrapper>
                <img src="../images/aboutDisease_icon-3.svg" alt="" />
              </IconWrapper>
              <StepContent>
                <StepTitle>Country</StepTitle>
                <StepDescription>China (Guilin)</StepDescription>
              </StepContent>
            </StepCard>
            <StepCard>
              <IconWrapper>
                <img src="../images/aboutDisease_icon-4.svg" alt="" />
              </IconWrapper>
              <StepContent>
                <StepTitle>Current status</StepTitle>
                <StepDescription>Transfusion-independent as of February 17, 2023</StepDescription>
              </StepContent>
            </StepCard>
            <StepCard>
              <IconWrapper>
                <img src="../images/aboutDisease_icon-5.svg" alt="" />
              </IconWrapper>
              <StepContent>
                <StepTitle>Significance</StepTitle>
                <StepDescription>First adult in this trial; groundbreaking outcome</StepDescription>
              </StepContent>
            </StepCard>
          </GridWrapper>
          </ScrollAnimationComponent>
        </div>
      </section>
  );
};

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 60px;
  margin-bottom: 60px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    margin-bottom: 50px;
  }
  
  @media (max-width: 768px) {
    gap: 32px;
    margin-bottom: 40px;
  }
`;

const LeftContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 0 0 500px;
  @media (max-width: 1024px) {
  flex: 1 1 auto;
  }
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const Label = styled.div`
`;

const Title = styled.h3`
  max-width: 500px;
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Description = styled.p`
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #E9E9E9;
  border-radius: 18px;
  overflow: hidden;
  background-color: #fff;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const StepCard = styled.div`
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
  justify-content: flex-start;
  border: 1px solid #E9E9E9;
  min-height: 200px;
  height: 100%;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
  
  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const StepTitle = styled.h6`
  font-family: "Be Vietnam Pro", sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #36454F;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StepDescription = styled.h6`
  font-family: "Be Vietnam Pro", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #36454F;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;


export default AboutDisease;
