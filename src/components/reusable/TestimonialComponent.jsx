import styled from 'styled-components';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 44px;
  max-width: 440px;

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
  color: ${(props) => props.theme.colors.white};
`;

const TestimonialsBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 24px;
  }
`;
const QuoteIcon = styled.img`
  width: 40px;
  height: auto;
`;
const TestimonialContent = styled.div`
  flex-grow: 1;
`;
const Quote = styled.blockquote`
  font-style: italic;
  font-weight: 300;
  color: ${(props) => props.theme.colors.white};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  font-style: italic !important;
`;

const Author = styled.p`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.white};
  line-height: 1.6;
  margin: 0;
  margin-top: 24px !important;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ReadButton = styled.a`
  max-width: 300px;
  @media (max-width: 575px) {
    max-width: 100%;
  }
`;

const slideLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const TestimonialsComponent = ({ data }) => {
  if (!data) {
    return null;
  }

  const survivorStory = data?.survivor_story;
  const storyContent = survivorStory?.story_content;
  const quote =
    survivorStory?.short_quote ||
    storyContent?.quote ||
    storyContent?.content?.[0]?.children?.[0]?.text ||
    '';
  const author = survivorStory?.patient_name || survivorStory?.first_name || '';
  const ctaUrl = survivorStory?.slug
    ? `/survivor-stories/${survivorStory?.slug}`
    : data?.cta?.URL || '#';

  return (
    <ScrollAnimationComponent animationVariants={slideLeft}>
      <Content>
        <Label className='contentLabel'>{data?.heading || ''}</Label>
        <TestimonialsBox>
          <QuoteIcon src='../images/format_quote.svg' alt='quote icon' />
          <TestimonialContent>
            <Quote className='title-4'>{quote || ''}</Quote>
            {author && <Author>- {author}</Author>}
          </TestimonialContent>
        </TestimonialsBox>

        {ctaUrl && ctaUrl !== '#' && (
          <ReadButton className='btn btn-pink-solid' href={ctaUrl}>
            {data?.cta?.text || survivorStory?.hero?.cta?.text || 'Read Full Story'}
          </ReadButton>
        )}
      </Content>
    </ScrollAnimationComponent>
  );
};

export default TestimonialsComponent;
