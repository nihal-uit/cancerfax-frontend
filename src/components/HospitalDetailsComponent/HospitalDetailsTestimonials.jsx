import VideoTestimonialComponents from '../reusable/VideoTestimonialComponent';
import styled from 'styled-components';

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

const HospitalDetailsTestimonials = () => {
  return (
    <section className='joyOffSuccess_sec'>
        <div className='containerWrapper'>
          <TopSection>
            <LeftContent className='commContent_wrap'>
              <Label className='contentLabel text_theme_dark'>Joy of success</Label>
              <Title className='title-3 text_theme_dark'>Stories of Strength and Healing</Title>
            </LeftContent>
            
            <RightContent className='commContent_wrap'>
              <Description className='text-16'>Discover the journeys of courage, resilience, and hope from patients and families whose lives have been touched by our care and innovative treatments</Description>
            </RightContent>
          </TopSection>

          <VideoTestimonialComponents/>
        </div>
      </section>
  );
};

export default HospitalDetailsTestimonials;