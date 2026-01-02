import React, { useState, useRef, useEffect, useCallback } from 'react';
import ScrollAnimationComponent from '../../ScrollAnimation/ScrollAnimationComponent';
import styled from 'styled-components';
import { formatMedia } from '../../../utils/strapiHelpers';
import { Link } from 'react-router-dom';

const Hero = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const videoUrl = formatMedia(data?.featuredVideo);
  const imageUrl = formatMedia(data?.featuredImage);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const handleCloseVideo = useCallback(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  // Close video on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isPlaying) {
        handleCloseVideo();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isPlaying, handleCloseVideo]);

  // Auto-play video when modal opens
  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error('Error playing video:', err);
      });
    }
  }, [isPlaying]);

  if (!data) return null;

  return (
    <section className='homeHero_sec'>
      <div className='home-hero-banner hospital_details_hero'>
        <div className='ratio'>
          {videoUrl ? (
            <BackgroundVideoWrapper>
              <BackgroundVideo
                className='video'
                preload='none'
                autoPlay
                loop
                muted
                playsInline
                poster={imageUrl || undefined}
              >
                <source src={videoUrl} type='video/mp4' />
              </BackgroundVideo>
            </BackgroundVideoWrapper>
          ) : (
            imageUrl && (
              <BackgroundImage
                src={imageUrl}
                alt={
                  data?.featuredImage?.alternativeText ||
                  data?.story_title ||
                  'story hero'
                }
                loading='lazy'
              />
            )
          )}
        </div>
      </div>
      <div className='heroContent_wrap'>
        <div className='containerWrapper'>
          <div className='commContent_wrap'>
            <ScrollAnimationComponent animationVariants={fadeIn}>
              <HeroContentGrid>
                <TopRow>
                  {data?.story_title && (
                    <StoriesTitle className='title-1'>
                      {data?.story_title}
                    </StoriesTitle>
                  )}
                  {data?.featuredVideo && (
                    <ActionButtonsGroup>
                      <button
                        onClick={handlePlayVideo}
                        className="play-btn-pulse"
                        aria-label="Play video"
                        type="button"
                      >
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 28 30" fill="none">
                            <path d="M5.6717 1.1394C3.05718 -0.360326 0.9375 0.868266 0.9375 3.88134V26.1165C0.9375 29.1326 3.05718 30.3596 5.6717 28.8613L25.1063 17.7156C27.7217 16.2154 27.7217 13.7848 25.1063 12.2849L5.6717 1.1394Z" fill="#727B81"></path>
                          </svg>
                        </span>
                      </button>
                    </ActionButtonsGroup>
                  )}
                </TopRow>

                <BottomRow>
                  {data?.cta?.text && (
                    <Link
                      className='btn btn-md btn-pink-solid'
                      to={data?.cta?.URL || '#'}
                      target={data?.cta?.target || '_self'}
                    >
                      {data?.cta?.text}
                    </Link>
                  )}
                  {data?.story_description && (
                    <Description className='text-16 line-2-text'>
                      {data?.story_description}
                    </Description>
                  )}
                </BottomRow>
              </HeroContentGrid>
            </ScrollAnimationComponent>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isPlaying && videoUrl && (
        <VideoModal onClick={handleCloseVideo}>
          <VideoModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseVideo} aria-label="Close video">
              <CloseIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </CloseIcon>
            </CloseButton>
            <VideoPlayer
              ref={videoRef}
              src={videoUrl}
              controls
              autoPlay
              playsInline
            />
          </VideoModalContent>
        </VideoModal>
      )}
    </section>
  );
};

const BackgroundVideoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(54, 69, 79, 0.63) 0%,
      rgba(54, 69, 79, 0) 100%
    );
    border-radius: 24px;
    backdrop-filter: blur(53px);
    -webkit-mask-image: -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(50%, rgba(54, 69, 79, 0.7)),
      to(rgba(54, 69, 79, 0))
    );
    -webkit-mask-image: linear-gradient(
      to right,
      rgba(54, 69, 79, 0.7) 50%,
      rgba(54, 69, 79, 0) 100%
    );
    mask-image: -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(50%, rgba(54, 69, 79, 0.7)),
      to(rgba(54, 69, 79, 0))
    );
    mask-image: linear-gradient(
      to right,
      rgba(54, 69, 79, 0.7) 50%,
      rgba(54, 69, 79, 0) 100%
    );
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    border-radius: 20px;
    
    &::before {
      border-radius: 20px;
    }
  }
  
  @media (max-width: 480px) {
    border-radius: 16px;
    
    &::before {
      border-radius: 16px;
    }
  }
`;

const BackgroundVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const HeroContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 50px;
`;

const TopRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  @media (max-width: 768px) {
    gap: 45px;
    flex-wrap: wrap;
  }
`;

const StoriesTitle = styled.h1`
  color: ${(props) => props.theme.colors.white};
  max-width: 750px;
`;

const BottomRow = styled.div`
  display: flex;
  width: 100%;
  padding-top: 40px;
  gap: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    gap: 40px;
  }

  @media (max-width: 575px) {
    padding-top: 30px;
    gap: 24px;
    flex-direction: column;
  }
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.white};
`;

const ActionButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 90px;

  @media (max-width: 768px) {
    min-width: 100%;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }
`;

const VideoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: pointer;
`;

const VideoModalContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  cursor: default;

  @media (max-width: 768px) {
    width: 95%;
    max-height: 85vh;
  }
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: auto;
  max-height: 90vh;
  border-radius: 8px;
  outline: none;

  @media (max-width: 768px) {
    max-height: 85vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10000;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.8);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    top: -45px;
    width: 36px;
    height: 36px;
  }
`;

const CloseIcon = styled.svg`
  width: 24px;
  height: 24px;
  stroke: white;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

export default Hero;
