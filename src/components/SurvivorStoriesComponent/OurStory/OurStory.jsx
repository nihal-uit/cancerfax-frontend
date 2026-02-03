import React, { useRef } from 'react';
import styled from 'styled-components';
import ScrollAnimationComponent from '../../ScrollAnimation/ScrollAnimationComponent';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { formatMedia, formatRichText } from '../../../utils/strapiHelpers';
import 'swiper/css';

const OurStory = ({ componentData, data }) => {
  const sliderData = componentData || data;

  // Hooks must be called before any early returns
  const carouselRef = useRef(null);

  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  if (!sliderData || !sliderData?.isActive) {
    return null;
  }

  const stories = sliderData?.stories || sliderData?.related_stories?.stories || [];
  const backgroundImageUrl = formatMedia(sliderData?.backgroundImage);

  return (
    <section
      className='ourstory_sec ourStory_slider_sec py-120'
      style={
        backgroundImageUrl
          ? {
              backgroundImage: `url(${backgroundImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
          : {}
      }
    >
      <div className='containerWrapper'>
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <CommContent className='commContent_wrap'>
            <Label className='contentLabel'>{sliderData?.heading || sliderData?.related_stories?.heading || ''}</Label>
            <div className='content-gap-12'>
              <Title className='title-3'>{sliderData?.subHeading || sliderData?.related_stories?.subHeading || ''}</Title>
              <Description>{sliderData?.description_text || sliderData?.related_stories?.description_text || ''}</Description>
            </div>
          </CommContent>
        </ScrollAnimationComponent>

        <div className='swiper__holder'>
          <Swiper
            ref={carouselRef}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              1024: { spaceBetween: 30 },
              1200: { spaceBetween: 50 },
            }}
            modules={[Navigation]}
            navigation={{
              nextEl: '.customNext',
              prevEl: '.customPrev',
            }}
            style={{ overflow: 'visible' }}
            className='commCircle_navigation'
          >
            {stories.map((story) => {
              const storyImageUrl = formatMedia(story?.hero?.featuredImage);
              const storyVideoUrl = formatMedia(story?.hero?.featuredVideo);
              const hasMedia = storyImageUrl || storyVideoUrl;

              return (
                <SwiperSlide key={story?.id || story?.slug}>
                  <div className='ourstory_card'>
                    <div className='ourstory_grid align-start'>
                      <div className='ourstory_left'>
                        <div className='commContent_wrap content-gap-24'>
                          <h3 className='title-size-36'>
                            {story?.hero?.story_title ||
                              story?.patient_name ||
                              ''}
                          </h3>
                          {story?.short_quote && (
                            <p className='text-16'>{story.short_quote}</p>
                          )}
                          {story?.slug && (
                            <ButtonLink
                              to={`/survivor-stories/${story.slug}`}
                              className='btn btn-pink-solid mt-3'
                            >
                              Read Full Story
                            </ButtonLink>
                          )}
                        </div>
                      </div>
                      {hasMedia && (
                        <div className='mission_right'>
                          <div className='ourstory_image_wrap'>
                            {storyVideoUrl ? (
                              <video
                                muted
                                loop
                                playsInline
                                autoPlay
                                preload='none'
                              >
                                <source src={storyVideoUrl} type='video/mp4' />
                              </video>
                            ) : storyImageUrl ? (
                              <img
                                src={storyImageUrl}
                                alt={
                                  story?.hero?.featuredImage?.alternativeText ||
                                  story?.patient_name ||
                                  'Survivor story'
                                }
                              />
                            ) : null}
                            {storyVideoUrl && (
                              <PlayButtons>
                                <a href='#' className='play-btn-pulse'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='18'
                                      viewBox='0 0 28 30'
                                      fill='none'
                                    >
                                      <path
                                        d='M5.6717 1.1394C3.05718 -0.360326 0.9375 0.868266 0.9375 3.88134V26.1165C0.9375 29.1326 3.05718 30.3596 5.6717 28.8613L25.1063 17.7156C27.7217 16.2154 27.7217 13.7848 25.1063 12.2849L5.6717 1.1394Z'
                                        fill='#727B81'
                                      ></path>
                                    </svg>
                                  </span>
                                </a>
                              </PlayButtons>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
      </div>
    </section>
  );
};

const CommContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  text-align: center;
  margin-inline: auto;
  margin-bottom: 55px;
  @media (max-width: 1024px) {
    gap: 24px;
    margin-bottom: 30px;
  }
`;

const Label = styled.p`
  color: ${(props) => props.theme.colors.white};
`;

const Title = styled.h3`
  color: ${(props) => props.theme.colors.white};
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.white};
`;

const ButtonLink = styled(Link)`
  max-width: 190px;
  @media (max-width: 575px) {
    max-width: 100%;
  }
`;

const PlayButtons = styled.div`
  inset: 0;
  position: absolute;
  z-index: 2;
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

export default OurStory;
