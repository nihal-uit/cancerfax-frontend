import React, { useRef, useEffect, memo, useMemo } from 'react';
import styled from 'styled-components';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { formatMedia, renderRichTextWithImages } from '@/utils/strapiHelpers';
import { Link } from 'react-router-dom';

const InnovativeCareComponent = ({ data }) => {
  const carouselRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const therapyData = data;

  useEffect(() => {
    const swiperElement = swiperContainerRef.current;
    if (!swiperElement) return;

    const handleWheel = (e) => {
      const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      if (isVerticalScroll) {
        return;
      }
    };

    swiperElement.addEventListener('wheel', handleWheel, { passive: true });
    return () => swiperElement.removeEventListener('wheel', handleWheel);
  }, []);

  if (!therapyData) {
    return null;
  }

  const therapies = therapyData?.therapies || [];

  return (
    <>
      <ScrollAnimationComponent animationVariants={fadeIn}>
        <div className='commContent_wrap'>
          <Header>
            <Label className='contentLabel'>{therapyData?.heading || ''}</Label>
            <Title className='title-3'>{therapyData?.subHeading || ''}</Title>
          </Header>

          <Description className='text-16'>
            {renderRichTextWithImages(therapyData?.description_block)||therapyData?.description_text || ''}
          </Description>
        </div>
      </ScrollAnimationComponent>
      <div className='swiper__holder'>
        <Swiper
          ref={carouselRef}
          spaceBetween={24}
          slidesPerView={1}
          // loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            480: { slidesPerView: 1.2 },
            767: { slidesPerView: 1.5 },
            992: { slidesPerView: 2.1 },
            1200: { slidesPerView: 2.17 },
            // 1600: { slidesPerView: 1.8 },
            2080: { slidesPerView: 2.5 },
          }}
          modules={[Navigation]}
          navigation={{
            nextEl: '.customNext',
            prevEl: '.customPrev',
          }}
          style={{ overflow: 'visible' }}
        >
          {therapies.map((therapy, index) => {
            return (
              <SwiperSlide key={therapy?.id || therapy?.documentId || index}>
                <TherapyCard>
                  <CardImage image={formatMedia(therapy?.hero?.featuredImage)}>
                    <CardOverlay className='card-overlay'>
                      <CardTitle>{therapy?.name || ''}</CardTitle>
                      <PlusIcon>
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 20 20'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M10.3901 3.54893C10.1197 3.8155 10.0944 4.23674 10.316 4.53229L10.3826 4.60956L14.9583 9.24967L3.25 9.24967C2.83579 9.24967 2.5 9.58546 2.5 9.99967C2.5 10.382 2.78611 10.6976 3.15592 10.7438L3.25 10.7497H14.9583L10.3826 15.3898C10.116 15.6602 10.0966 16.0817 10.3224 16.3741L10.3901 16.4504C10.6605 16.717 11.082 16.7364 11.3744 16.5106L11.4507 16.4429L17.2841 10.5262C17.548 10.2586 17.57 9.84208 17.3501 9.54961L17.2841 9.47312L11.4507 3.55645C11.1599 3.26149 10.6851 3.25812 10.3901 3.54893Z'
                            fill='#36454F'
                          />
                        </svg>
                      </PlusIcon>
                    </CardOverlay>
                    <CardHoverContent className='card-hover-content'>
                      <HoverTitle>{therapy?.name || ''}</HoverTitle>
                      <HoverDescription>
                        {therapy?.description_text || ''}
                      </HoverDescription>
                      <ExploreButton to={'/therapy/' + therapy?.slug}>Explore</ExploreButton>
                    </CardHoverContent>
                  </CardImage>
                </TherapyCard>
              </SwiperSlide>
            );
          })}

          <NavButton className='customPrev'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='46'
              height='32'
              viewBox='0 0 46 32'
              fill='none'
            >
              <path
                d='M15.8656 31.7313L17.6493 30.01L4.75497 17.1156H45.0481V14.6156H4.70684L17.5868 1.72125L15.8656 0L-3.43323e-05 15.8656L15.8656 31.7313Z'
                fill='#727B81'
              />
            </svg>
          </NavButton>
          <NavButton className='customNext'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='46'
              height='32'
              viewBox='0 0 46 32'
              fill='none'
            >
              <path
                d='M29.1825 31.7313L27.3988 30.01L40.2931 17.1156H0V14.6156H40.3413L27.4613 1.72125L29.1825 0L45.0481 15.8656L29.1825 31.7313Z'
                fill='#727B81'
              />
            </svg>
          </NavButton>
        </Swiper>
      </div>
    </>
  );
};

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    margin-bottom: 28px;
  }

  @media (max-width: 768px) {
    gap: 24px;
    margin-bottom: 24px;
  }

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const Label = styled.p`
  color: ${(props) => props.theme.colors.primary};
`;

const Title = styled.h3`
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  max-width: 850px;
  margin: 0 auto 48px !important;

  @media (max-width: 1024px) {
    max-width: 700px;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    margin-bottom: 32px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    margin-bottom: 24px;
    line-height: 1.7;
  }
`;

const TherapyCard = styled.div`
  position: relative;
  width: 100%;
  height: 312px;
  background: #ffffff;
  border-radius: 40px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  flex-shrink: 0;
  scroll-snap-align: start;

  &:hover {
    transform: translateY(-4px);
  }

  &:hover .card-overlay {
    opacity: 0;
  }

  &:hover .card-hover-content {
    opacity: 1;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) =>
      props.image ? `url(${props.image})` : 'rgba(182, 181, 181, 0.33)'}
    center/cover;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 24px;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CardOverlay = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: opacity 0.3s ease;

  @media (max-width: 1024px) {
    border-radius: 24px;
    padding: 16px 20px;
  }

  @media (max-width: 768px) {
    border-radius: 20px;
    padding: 14px 18px;
  }

  @media (max-width: 480px) {
    border-radius: 16px;
    padding: 12px 16px;
  }
`;

const CardHoverContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(54, 69, 79, 0.92);
  padding: 40px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  ${TherapyCard}:hover & {
    opacity: 1;
    pointer-events: auto;
  }

  @media (max-width: 1024px) {
    padding: 32px 32px;
    gap: 24px;
  }

  @media (max-width: 480px) {
    padding: 24px 24px;
    gap: 20px;
  }
`;

const HoverTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  line-height: 1.3;

  @media (max-width: 1024px) {
    font-size: 22px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 1.35;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const HoverDescription = styled.p`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 16px;
  font-weight: 300;
  color: #ffffff;
  line-height: calc(24 / 16);
  margin: 0;

  @media (max-width: 575px) {
    font-size: 14px;
    line-height: 1.4;
  }
`;

const ExploreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  background: ${(props) => props.theme.colors.pink};
  color: #ffffff;
  border: none;
  border-radius: 20px;
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }

  @media (max-width: 1024px) {
    padding: 12px 28px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    padding: 10px 24px;
    font-size: 12px;
    border-radius: 32px;
  }

  @media (max-width: 480px) {
    padding: 8px 20px;
    font-size: 11px;
    border-radius: 28px;
  }
`;

const CardTitle = styled.h3`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
  line-height: 1.4;

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const PlusIcon = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 300;
  color: ${(props) => props.theme.colors.primary};
  flex-shrink: 0;

  @media (max-width: 1024px) {
    width: 24px;
    height: 24px;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
    font-size: 18px;
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    font-size: 16px;
  }
`;

const NavButton = styled.button`
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 28px;
    height: 20px;
    @media (max-width: 768px) {
      width: 24px;
      height: 18px;
    }
  }
`;

export default memo(InnovativeCareComponent);
