import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";

const TherapyInfo = () => {

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
      <section className='therapyInfo_sec py-120'>
        <div className='containerWrapper'>
          <ScrollAnimationComponent animationVariants={fadeIn}>
          <TopSection>
            <LeftContent className='commContent_wrap'>
              <h3 className='title-3 text_theme_dark'>Understanding CRISPR Gene Therapy for Beta-Thalassemia</h3>
            </LeftContent>
            
            <RightContent className='commContent_wrap'>
              <p className='text-16'>
                Here’s a simplified explanation of what happened:
              </p>
            </RightContent>
          </TopSection>

          <div className="row g-4">
            <div className="col-sm-6 col-md-6 col-lg-3">
              <TherapyInfoCard>
                <StepContent>
                  <StepTitle>Targeting the Genetic Switch</StepTitle>
                  <StepDescription>CRISPR precisely edits the BCL11A enhancer in blood stem cells — the key gene controlling fetal hemoglobin production.</StepDescription>
                </StepContent>
              </TherapyInfoCard>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3">
              <TherapyInfoCard>
                <StepContent>
                  <StepTitle>Boosting Fetal Hemoglobin (HbF)</StepTitle>
                  <StepDescription>
                    Once edited, the body naturally produces more fetal hemoglobin, which carries oxygen efficiently and replaces faulty adult hemoglobin.
                  </StepDescription>
                </StepContent>
              </TherapyInfoCard>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3">
              <TherapyInfoCard>
                <StepContent>
                  <StepTitle>Ending Dependence on Transfusions</StepTitle>
                  <StepDescription>
                    Higher HbF levels mean patients can maintain healthy blood counts without regular transfusions — a life-changing milestone.
                  </StepDescription>
                </StepContent>
              </TherapyInfoCard>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3">
              <TherapyInfoCard>
                <StepContent>
                  <StepTitle>Ending Dependence on Transfusions</StepTitle>
                  <StepDescription>
                    This breakthrough offers a curative path for beta-thalassemia and sickle-cell patients, even without a matched stem cell donor.                  </StepDescription>
                </StepContent>
              </TherapyInfoCard>
            </div>
          </div>
          </ScrollAnimationComponent>
        </div>
      </section>
  );
};

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  flex: 0 0 700px;
  @media (max-width: 1024px) {
  flex: 1 1 auto;
  }
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;


const TherapyInfoCard = styled.div`
  padding: 30px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border: 1px solid rgba(233, 233, 233, 1);
  background: #F8F8F8;
  min-height: 200px;
  height: 100%;
  border-radius: 20px;
  transition: all 300ms ease-in-out;
  &:hover {
    background: #008080;
    h6,
    p {
      color: #fff;
    }
  }
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;
`;

const StepTitle = styled.h6`
  font-family: "Be Vietnam Pro", sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: #36454F;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StepDescription = styled.p`
  font-family: "Be Vietnam Pro", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: #727B81;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;


export default TherapyInfo;
