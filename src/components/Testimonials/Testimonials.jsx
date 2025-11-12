import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSectionData, formatRichText } from '../../utils/strapiHelpers';
import { hideFallbacks } from '../../utils/config';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 470px;
  
  @media (max-width: 1024px) {
    gap: 36px;
    max-width: 450px;
  }
  
  @media (max-width: 768px) {
    gap: 32px;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    gap: 28px;
  }
`;

const Label = styled.p`
  color: ${props => props.theme.colors.white};
`;

const TestimonialsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const Quote = styled.blockquote`
  font-family: ${props => props.theme.fonts.body};
  font-weight: 300;
  color: ${props => props.theme.colors.white};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* Limit to 5 lines */
  -webkit-box-orient: vertical;
`;

const Author = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 18px;
  font-weight: 500;
  color: ${props => props.theme.colors.white};
  line-height: 1.6;
  margin: 0;
  opacity: 0.95;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }

`;

const ReadButton = styled.a`
  max-width: 176px;
    @media (max-width: 575px) {
      max-width: 100%;
    }
`;

const slideLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const Testimonials = ({ componentData, pageData }) => {
  // Get data from global Strapi API
  const globalData = useSelector((state) => state.global?.data);
  const globalLoading = useSelector((state) => state.global?.loading);

  // IMPORTANT: Return null immediately while loading to prevent showing fallback data first
  if (globalLoading) {
    return null;
  }

  // Priority: Use componentData prop (for dynamic pages) > globalData (for home page)
  const testimonialsSection = componentData || getSectionData(globalData, 'testimonial-slider');
  const shouldHideMissingSection = hideFallbacks && !testimonialsSection;

  // Extract survivor story from Strapi
  const survivorStory = testimonialsSection?.survivor_story;
  const storyText = survivorStory?.story 
    ? formatRichText(survivorStory.story) || survivorStory.story
    : null;
  const authorName = survivorStory?.name || null;
  const authorLocation = survivorStory?.location || null;
  const authorText = authorName && authorLocation 
    ? `- ${authorName}, ${authorLocation}`
    : authorName 
    ? `- ${authorName}`
    : null;

  // Fallback data - only use if Strapi data doesn't exist
  const fallbackStory = hideFallbacks ? null : {
    story: "After exhausting options at home, CancerFax connected me to a CAR-T trial in the US. Today, I'm in complete remission. Their team guided my entire journey, from medical coordination to travel logistics.",
    author: "- Elena, Spain"
  };

  // Use Strapi data if available, otherwise fallback
  const displayStory = storyText || fallbackStory?.story || '';
  const displayAuthor = authorText || fallbackStory?.author || '';

  const shouldHideContent = hideFallbacks && (!displayStory || !displayAuthor);

  if (shouldHideMissingSection || shouldHideContent) {
    return null;
  }

  return (
    <section className='testimonials_single_sec py-120' id='testimonials' style={{backgroundImage: `url(${'../images/testimonial-img.jpg'})`}}>
      <div className='containerWrapper'>
        <div className='commContent_wrap z-2 position-relative'>
          <ScrollAnimationComponent animationVariants={slideLeft}>
            <Content>
              <Label className='contentLabel'>{testimonialsSection?.heading || 'Testimonials'}</Label>
              <TestimonialsBox className='pb-4'>
                <Quote className='title-4'>
                  {displayStory}
                </Quote>
                <Author>{displayAuthor}</Author>
              </TestimonialsBox>
              
              <ReadButton className='btn btn-pink-solid mt-4' href={'#'}>
                Read Full Story
              </ReadButton>
            </Content>
          </ScrollAnimationComponent>  
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

