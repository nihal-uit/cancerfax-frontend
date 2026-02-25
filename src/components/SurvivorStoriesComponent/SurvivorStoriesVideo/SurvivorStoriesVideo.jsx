import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatMedia } from '../../../utils/strapiHelpers';
import { getMediaContent, getYouTubeEmbedUrl } from '../../../utils/mediaHelpers';

const SurvivorStoriesVideo = ({ story }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const content = useMemo(() => {
    if (!story?.hero) return { mediaType: 'image', mediaUrl: '', videoUrl: null, isYouTube: false, backgroundImage: '', title: '' };
    return getMediaContent(
      story.hero,
      {
        formatImage: (v) => (v ? formatMedia(v) : ''),
        formatVideo: (v) => (v ? formatMedia(v) : ''),
      },
      story?.hero?.story_title || story?.patient_name || ''
    );
  }, [story]);

  const handlePlayVideo = () => setIsPlaying(true);
  const handleCloseVideo = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isPlaying) handleCloseVideo();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && videoRef.current && !content.isYouTube) {
      videoRef.current.play().catch((err) => console.error('Error playing video:', err));
    }
  }, [isPlaying, content.isYouTube]);

  if (!story) {
    return null;
  }

  const renderMedia = () => {
    if (content.mediaType === 'video' && content.videoUrl) {
      return (
        <>
          {content.isYouTube ? (
            content.mediaUrl ? (
              <BackgroundImage src={content.mediaUrl} alt={content.title} className="video-poster" />
            ) : (
              <GreyGradient />
            )
          ) : (
            <>
              <BackgroundVideo
                className="video"
                preload="metadata"
                muted
                playsInline
              >
                <source src={content.videoUrl} type="video/mp4" />
              </BackgroundVideo>
              {/* {content.mediaUrl && content.mediaUrl !== content.videoUrl && (
                <PosterOverlay src={content.mediaUrl} alt={content.title} />
              )} */}
            </>
          )}
          <PlayButtonWrap>
            <PlayButton
              onClick={handlePlayVideo}
              aria-label="Play video"
              type="button"
            >
              <PlayIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <path d="M8 5v14l11-7z" fill="#FF1493" />
              </PlayIcon>
            </PlayButton>
          </PlayButtonWrap>
        </>
      );
    }
    if (content.backgroundImage) {
      return <BackgroundImage src={content.backgroundImage} alt={content.title} loading="lazy" />;
    }
    return <GreyGradient />;
  };

  const storyTitle = story?.hero?.story_title || story?.patient_name || '';
  const shortQuote = story?.short_quote || '';
  const cta = story?.hero?.cta;
  const storySlug = story?.slug;
  const hasMedia = content.mediaType === 'video' || content.backgroundImage;

  if (!hasMedia) {
    return null;
  }

  return (
    <div className='storiesVideo_wrap'>
      <div className='stories_video'>
        <div className='ratio'>
          {renderMedia()}
        </div>
      </div>
      <div className='storiesVideo_Content_wrap'>
        <div className='commContent_wrap'>
          <HeroContentGrid>
            <TopRow>
              <HospitalName className='title-3'>{storyTitle}</HospitalName>

              <ActionButtonsGroup>
                {content.videoUrl && (
                  <button type="button" className="play-btn-pulse" onClick={handlePlayVideo} aria-label="Play video">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 28 30" fill="none">
                        <path d="M5.6717 1.1394C3.05718 -0.360326 0.9375 0.868266 0.9375 3.88134V26.1165C0.9375 29.1326 3.05718 30.3596 5.6717 28.8613L25.1063 17.7156C27.7217 16.2154 27.7217 13.7848 25.1063 12.2849L5.6717 1.1394Z" fill="#727B81"></path>
                      </svg>
                    </span>
                  </button>
                )}
              </ActionButtonsGroup>
            </TopRow>

            <BottomRow>
              {(cta?.text || storySlug) && (
                <CTAButton
                  className='btn btn-md btn-pink-solid'
                  to={cta?.URL || (storySlug ? `/survivor-story/${storySlug}` : '#')}
                  target={cta?.target || '_self'}
                >
                  {cta?.text || 'Read Full Story'}
                </CTAButton>
              )}
              {shortQuote && (
                <Description className='text-16 line-2-text'>
                  {shortQuote}
                </Description>
              )}
            </BottomRow>
          </HeroContentGrid>
        </div>
      </div>

      {isPlaying && content.videoUrl && (
        <VideoModal onClick={handleCloseVideo}>
          <VideoModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseVideo} aria-label="Close video">
              <CloseIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </CloseIcon>
            </CloseButton>
            {content.isYouTube ? (
              <YouTubeIframe
                src={getYouTubeEmbedUrl(content.videoUrl)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <VideoPlayer ref={videoRef} src={content.videoUrl} controls autoPlay playsInline />
            )}
          </VideoModalContent>
        </VideoModal>
      )}
    </div>
  );
};

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  &.video-poster {
    z-index: 2;
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

const PosterOverlay = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 2;
  pointer-events: none;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0;
  }
`;

const GreyGradient = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: #f0f0f0;
`;

const PlayButtonWrap = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayButton = styled.button`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  z-index: 11;
  padding: 0;
  margin: 0;
  outline: none;
  &:hover {
    transform: scale(1.1);
    background: #fff;
  }
`;

const PlayIcon = styled.svg`
  width: 28px;
  height: 28px;
  fill: #ff1493;
  margin-left: 2px;
`;

const VideoModal = styled.div`
  position: fixed;
  inset: 0;
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
`;

const CloseButton = styled.button`
  position: absolute;
  top: -48px;
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
  z-index: 10000;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const CloseIcon = styled.svg`
  width: 24px;
  height: 24px;
  stroke: white;
`;

const YouTubeIframe = styled.iframe`
  width: 100%;
  aspect-ratio: 16 / 9;
  min-height: 360px;
  border-radius: 8px;
  border: none;
`;

const VideoPlayer = styled.video`
  width: 100%;
  max-height: 90vh;
  border-radius: 8px;
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
  flex-wrap: wrap;
  gap: 24px;
  @media (max-width: 768px) {
    gap: 45px;
  }
`;

const HospitalName = styled.h3`
  color: ${props => props.theme.colors.white};
`;

const ActionButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 90px;
  
  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const BottomRow = styled.div`
  display: flex;
  width: 100%;
  padding-top: 40px;
  gap: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);

  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }

  @media (max-width: 575px) {
    padding-top: 30px;
    gap: 24px;
    flex-direction: column;
  }
`;

const CTAButton = styled(Link)`
`;

const Description = styled.p`
  color: ${props => props.theme.colors.white};
`;

export default SurvivorStoriesVideo;
