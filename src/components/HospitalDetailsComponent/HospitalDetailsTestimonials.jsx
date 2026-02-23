import { renderRichTextWithImages } from '@/utils/strapiHelpers';
import VideoTestimonialComponents from '../reusable/VideoTestimonialComponent';
import styled from 'styled-components';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

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

const HospitalDetailsTestimonials = ({data, loading}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!data?.testimonial?.testimonial_card && !data?.testimonial?.testimonial?.testimonial_card) {
    return null;
  }

  const testimonial = data?.testimonial;
  
  return (
    <section className='joyOffSuccess_sec'>
        <div className='containerWrapper'>
          <TopSection>
            <LeftContent className='commContent_wrap'>
              {testimonial?.heading && <Label className='contentLabel text_theme_dark'>{testimonial.heading}</Label>}
              {testimonial?.subHeading && <Title className='title-3 text_theme_dark'>{testimonial.subHeading}</Title>}
            </LeftContent>
            
            <RightContent className='commContent_wrap'>
              {(testimonial?.description_block ||testimonial?.description_text) && <Description className='text-16'>{renderRichTextWithImages(testimonial.description_block)||testimonial.description_text}</Description>}
            </RightContent>
          </TopSection>

          <VideoTestimonialComponents data={testimonial?.testimonial_card || testimonial?.testimonial} />
        </div>
      </section>
  );
};

export default HospitalDetailsTestimonials;