import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSectionData, formatMedia, formatRichText, renderRichTextWithImages } from '../../utils/strapiHelpers';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';
import { hideFallbacks } from '../../utils/config';
import { Link } from 'react-router-dom';

const extractMediaUrl = (media) => {
  if (!media) return null;

  if (Array.isArray(media)) {
    for (const item of media) {
      const url = extractMediaUrl(item);
      if (url) return url;
    }
    return null;
  }

  if (media?.data) {
    const dataItems = Array.isArray(media.data) ? media.data : [media.data];
    for (const item of dataItems) {
      const url = extractMediaUrl(item);
      if (url) return url;
    }
  }

  return formatMedia(media);
};

const resolveSlideBackgroundImage = (slide, section, defaultSlides, index) => {
  const fallbackImage = defaultSlides?.[index]?.backgroundImage
    || defaultSlides?.[0]?.backgroundImage
    || null;

  const candidates = [
    slide?.featuredImage,
    slide?.backgroundImage,
    slide?.background_image,
    slide?.image,
    slide?.images,
    slide?.media,
    slide?.backgroundMedia,
    slide?.background?.image,
    slide?.background?.backgroundImage,
    slide?.background?.media,
    slide?.gallery,
    section?.backgroundImage,
    section?.background_image,
  ];

  for (const candidate of candidates) {
    const url = extractMediaUrl(candidate);
    if (url) return url;
  }

  return fallbackImage;
};

const ClinicalTrialsShowcase = ({ componentData, data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderSection = componentData || data;
  
  // Extract slides from the Slide array in slider-section component
  const globalSlides = sliderSection?.Slide || [];
  
  // Format global slides if available
  const formattedGlobalSlides =
    globalSlides.length > 0
      ? globalSlides
          .map((slide) => {
            // Handle nested structure - slide might be in attributes or direct
            const slideData = slide?.attributes || slide;
            const description =
              renderRichTextWithImages(slideData?.description_block) ??
              formatRichText(slideData?.description) ??
              slideData?.description_block ??
              slideData?.description ??
              '';
            return {
              label: slideData?.heading ?? slideData?.label ?? '',
              title: slideData?.subHeading ?? slideData?.title ?? '',
              description,
              buttonText: slideData?.cta?.text ?? slideData?.buttonText ?? '',
              buttonLink:
                slideData?.cta?.URL ??
                slideData?.buttonLink ??
                slideData?.cta?.link ??
                '#',
              buttonTarget: slideData?.cta?.target ?? '_blank',
              backgroundImage: formatMedia(slideData?.featuredImage) || resolveSlideBackgroundImage(
                slideData,
                sliderSection,
                [],
                0
              ),
            };
          })
          .filter((slide) => slide.title) // Filter out empty slides
      : [];

  const slidesData = formattedGlobalSlides;

  // IMPORTANT: All hooks must be called before any early returns
  // Auto-play slider
  useEffect(() => {
    if (slidesData.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
      }, 6000); // Change slide every 6 seconds

      return () => clearInterval(interval);
    }
  }, [slidesData.length]);

  if (!sliderSection || slidesData.length === 0) {
    return null;
  }

  const handlePrevious = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (slidesData.length <= 1) return;
    setActiveIndex((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (slidesData.length <= 1) return;
    setActiveIndex((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className='clinicalTrials_sec'>
      <SlideContainer className='clinicalTrials_sliderWrap' activeIndex={activeIndex}>
        {slidesData.map((slide, index) => {
          const backgroundImage = slide?.backgroundImage || formatMedia(slide?.featuredImage) || resolveSlideBackgroundImage(slide, sliderSection, [], index);
            return (
              <Slide 
                key={`slide-${index}-${slide.title || index}`} 
                backgroundImage={backgroundImage}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${slidesData.length}`}
                aria-hidden={index !== activeIndex}
                className='clinicalTrials_slide'
              >
              <div className='containerWrapper'>
                <div className='clinicalTrials_slide_content'>
                  <ScrollAnimationComponent animationVariants={fadeIn}>
                  <Content className='commContent_wrap content-gap-32'>
                    <Label className='contentLabel'>{slide?.label || ''}</Label>
                    <Title className='title-2'>{slide?.title || ''}</Title>
                    <Description className='text-16'>{slide?.description || ''}</Description>
                    {slide?.buttonText && (
                      <Button className='btn btn-dark-solid' to={slide?.buttonLink || '#'} target={slide?.buttonTarget || '_blank'}>
                        {slide?.buttonText}
                    </Button>
                    )}
                  </Content>
                  </ScrollAnimationComponent>
                </div>
                  <div className='slider-nav-wrap'>
                    <NavButton
                      className='slider-nav-button'
                      onClick={handlePrevious}
                      disabled={slidesData.length <= 1}
                      aria-label="Previous slide"
                      type="button"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="32" viewBox="0 0 46 32" fill="none">
                    <path d="M15.8656 31.7313L17.6493 30.01L4.75497 17.1156H45.0481V14.6156H4.70684L17.5868 1.72125L15.8656 0L-3.43323e-05 15.8656L15.8656 31.7313Z" fill="white"/>
                    </svg>
                    </NavButton>
                    <NavButton
                      className='slider-nav-button'
                      onClick={handleNext}
                      disabled={slidesData.length <= 1}
                      aria-label="Next slide"
                      type="button"
                    >
                    <svg width="46" height="32" viewBox="0 0 46 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.1825 31.7313L27.3988 30.01L40.2931 17.1156H0V14.6156H40.3413L27.4613 1.72125L29.1825 0L45.0481 15.8656L29.1825 31.7313Z" fill="white"/>
                    </svg>
                    </NavButton>
                  </div>
                </div>
              </Slide>
            );
        })}
      </SlideContainer>

      {slidesData.length > 1 && (
          <DotsContainer>
            {slidesData.map((_, index) => (
              <Dot
                key={index}
                active={index === activeIndex}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </DotsContainer>
      )}
    </section>
  );
};

const SlideContainer = styled.div`
  transform: translateX(${props => -props.activeIndex * 100}%);
`;

const Slide = styled.div`
  background-image: ${props => props.backgroundImage ? `url('${props.backgroundImage}')` : 'none'}; 
`;

const Content = styled.div`
  max-width: 750px;
  position: relative;
  z-index: 3;
  animation: fadeInUp 0.8s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Label = styled.div`
  color: ${props => props.theme.colors.white};
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.white};
`;

const Description = styled.p`
  color: ${props => props.theme.colors.white};
`;

const Button = styled(Link)`
  background: ${props => props.theme.colors.primary || '#1E40AF'};
  color: ${props => props.theme.colors.white};
  max-width: 273px;
  @media (max-width: 575px) {
    max-width: 100%;
  }
  &:hover {
    background: ${props => props.theme.colors.primaryDark || '#1E3A8A'};
  }
`;

const NavButton = styled.button`
  &:hover:not(:disabled) svg {
    transform: ${props => props['aria-label']?.includes('Previous') ? 'translateX(-2px)' : 'translateX(2px)'};
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 40px;
  left: 120px;
  display: flex;
  gap: 12px;
  z-index: 10;

  @media (max-width: 1024px) {
    left: 60px;
    bottom: 30px;
  }

  @media (max-width: 768px) {
    left: 24px;
    bottom: 20px;
    gap: 8px;
  }

  @media (max-width: 480px) {
    left: 20px;
    bottom: 15px;
    gap: 6px;
  }

  @media (max-width: 360px) {
    left: 16px;
    bottom: 12px;
    gap: 5px;
  }
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
  }

  @media (max-width: 480px) {
    width: 8px;
    height: 8px;
  }

  @media (max-width: 360px) {
    width: 7px;
    height: 7px;
  }
`;

export default ClinicalTrialsShowcase;

