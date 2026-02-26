import React, { useState, useRef, useEffect, useMemo } from 'react';
import ScrollAnimationComponent from '../../ScrollAnimation/ScrollAnimationComponent';
import styled from 'styled-components';
import { formatMedia } from '../../../utils/strapiHelpers';
import { getMediaUrl } from '../../../services/api';
import { Link } from 'react-router-dom';

// Helper function to convert YouTube URL to embed format
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;

  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  // If already an embed URL, return as is
  if (url.includes('youtube.com/embed/')) {
    return url;
  }

  return null;
};

// Helper function to get YouTube thumbnail URL
const getYouTubeThumbnailUrl = (url) => {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
    }
  }

  return null;
};

// Helper function to check if URL is YouTube
const isYouTubeUrl = (url) => {
  if (!url) return false;
  return /youtube\.com|youtu\.be/.test(url);
};

const Hero = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const content = useMemo(() => {
    if (!data) return {};

    // Priority: externalVideo || featuredVideo || featuredImage
    const externalVideo = data.featuredVideoExternal || '';
    const featuredVideo = data.featuredVideo ? formatMedia(data.featuredVideo) : null;
    const featuredImage = data.featuredImage ? getMediaUrl(data.featuredImage) : '/images/default-image.jpg';

    // Determine media type and URL
    let mediaType = 'image';
    let mediaUrl = featuredImage;
    let videoUrl = null;
    let isYouTube = false;

    if (externalVideo) {
      mediaType = 'video';
      videoUrl = externalVideo;
      isYouTube = isYouTubeUrl(externalVideo);
      // For videos, prioritize video thumbnail over featured image
      // For YouTube: use YouTube thumbnail, fallback to featuredImage
      // Priority: video thumbnail > featuredImage
      if (isYouTube) {
        mediaUrl = getYouTubeThumbnailUrl(externalVideo) || featuredImage || '';
      } else {
        // For non-YouTube external videos, use featuredImage as poster if available
        mediaUrl = featuredImage || '';
      }
    } else if (featuredVideo) {
      mediaType = 'video';
      videoUrl = featuredVideo;
      // For uploaded videos, use featuredImage as poster if available, otherwise video will show its own frame
      // Priority: featuredImage (as poster) > video's own frame
      mediaUrl = featuredImage || featuredVideo;
    }

    return {
      mediaType,
      mediaUrl,
      videoUrl,
      isYouTube,
      backgroundImage: featuredImage, // Fallback for image display
      blogTitle: data?.story_title || data?.title || '',
    };
  }, [data]);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Close video on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isPlaying) {
        handleCloseVideo();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isPlaying]);

  // Auto-play video when modal opens (for non-YouTube videos)
  useEffect(() => {
    if (isPlaying && videoRef.current && !content.isYouTube) {
      videoRef.current.play().catch((err) => {
        console.error('Error playing video:', err);
      });
    }
  }, [isPlaying, content.isYouTube]);

  const renderMedia = () => {
    if (content.mediaType === 'video' && content.videoUrl) {
      return (
        <>
          {content.isYouTube ? (
            // For YouTube videos, show video thumbnail (YouTube thumbnail or featuredImage as fallback)
            content.mediaUrl ? (
              <BackgroundImage
                src={content.mediaUrl}
                alt={content.blogTitle}
                className='video-poster'
              />
            ) : (
              <GreyGradientBackground />
            )
          ) : (
            // For uploaded videos, show video with poster (featuredImage as poster if available)
            <BackgroundVideoWrapper>
              <BackgroundVideo
                className='video'
                preload='metadata'
                muted
                playsInline
                // poster={
                //   content.mediaUrl && content.mediaUrl !== content.videoUrl
                //     ? content.mediaUrl
                //     : undefined
                // }
              >
                <source src={content.videoUrl} type='video/mp4' />
              </BackgroundVideo>
              {/* Show poster overlay if we have featuredImage as poster */}
              {/* {content.mediaUrl && content.mediaUrl !== content.videoUrl && (
                <PosterOverlay
                  src={content.mediaUrl}
                  alt={content.blogTitle}
                  className='video-poster-overlay'
                />
              )} */}
            </BackgroundVideoWrapper>
          )}
          {/* <PlayButtonWrapper>
            <PlayButton
              onClick={handlePlayVideo}
              aria-label='Play video'
              type='button'
            >
              <PlayIcon
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                width='100%'
                height='100%'
              >
                <path d='M8 5v14l11-7z' fill='#FF1493' />
              </PlayIcon>
            </PlayButton>
          </PlayButtonWrapper> */}
        </>
      );
    }

    // Fallback to image (only when no video exists)
    if (content.backgroundImage) {
      return (
        <BackgroundImage
          src={content.backgroundImage}
          alt={content.blogTitle}
          loading='lazy'
        />
      );
    }

    return <GreyGradientBackground />;
  };

  if (!data || !data?.isActive) return null;

  return (
    <>
      <section className='homeHero_sec'>
        <div className='home-hero-banner hospital_details_hero'>
          <div className='ratio'>
            {renderMedia()}
            <GradientOverlay />
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
                  {content.videoUrl && (
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
      </section>

      {/* Video Modal */}
      {isPlaying && content.videoUrl && (
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
            {content.isYouTube ? (
              <YouTubeIframe
                src={getYouTubeEmbedUrl(content.videoUrl)}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            ) : (
              <VideoPlayer
                ref={videoRef}
                src={content.videoUrl}
                controls
                autoPlay
                playsInline
              />
            )}
          </VideoModalContent>
        </VideoModal>
      )}
    </>
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
  z-index: 1;

  &.video-poster {
    z-index: 2;
    transition: opacity 0.3s ease;
  }
`;

const PosterOverlay = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 2;
  transition: opacity 0.5s ease;
  pointer-events: none;

  &:hover {
    opacity: 0;
  }
`;

const GreyGradientBackground = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.45) 25%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.15) 75%,
    rgba(0, 0, 0, 0.05) 90%,
    transparent 100%
  );
  z-index: 4;
  pointer-events: none;

  @media (max-width: 768px) {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.55) 25%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.2) 75%,
      rgba(0, 0, 0, 0.1) 90%,
      transparent 100%
    );
  }
`;

const PlayButtonWrapper = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const PlayButton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
  z-index: 11;
  padding: 0;
  margin: 0;
  outline: none;

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: 2px solid rgba(255, 20, 147, 0.5);
    outline-offset: 2px;
  }

  @media (max-width: 1024px) {
    width: 70px;
    height: 70px;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

const PlayIcon = styled.svg`
  width: 32px;
  height: 32px;
  fill: #ff1493;
  display: block;
  position: relative;
  margin-left: 2px;
  pointer-events: none;
  user-select: none;

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
  }
`;

const YouTubeIframe = styled.iframe`
  width: 100%;
  aspect-ratio: 16 / 9;
  min-height: 400px;
  border-radius: 8px;
  outline: none;
  border: none;

  @media (max-width: 768px) {
    min-height: 300px;
  }
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
