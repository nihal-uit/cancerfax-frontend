import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ScrollAnimationComponent from "../../components/ScrollAnimation/ScrollAnimationComponent";
import { getSectionData } from "../../utils/strapiHelpers";

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
  max-width: 176px;
  @media (max-width: 575px) {
    max-width: 100%;
  }
`;

const slideLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const TestimonialsComponent = ({ componentData, loading }) => {  
  const globalData = useSelector((state) => state.global?.data);
  const globalLoading = useSelector(state => state.global?.loading);

  if (globalLoading) {
    return null;
  }

  const fallbackSection = {
    heading: 'Lorem Ipsum',
    subHeading: 'Lorem Ipsum dolor sit amet',
    author: 'Lorem Ipsum',
  };

  const testimonialsSection = componentData || getSectionData(globalData, 'testimonials');

  const section = testimonialsSection ? {
    heading: testimonialsSection.heading || fallbackSection.heading,
    subHeading: testimonialsSection.subHeading || fallbackSection.subHeading,
    image: testimonialsSection.image || fallbackSection.image,
    author: testimonialsSection.author || fallbackSection.author,
  } : fallbackSection;

  return (
    <ScrollAnimationComponent animationVariants={slideLeft}>
      <Content>
        <Label className="contentLabel">{section.heading}</Label>
        <TestimonialsBox>
          <QuoteIcon src="../images/format_quote.svg" alt="quote icon" />
          <TestimonialContent>
            <Quote className="title-4">
              {section.subHeading}
            </Quote>
            <Author>- {section.author}</Author>
          </TestimonialContent>
        </TestimonialsBox>

        <ReadButton className="btn btn-pink-solid" href={"#"}>
          Read Full Story
        </ReadButton>
      </Content>
    </ScrollAnimationComponent>
  );
};

export default TestimonialsComponent;
