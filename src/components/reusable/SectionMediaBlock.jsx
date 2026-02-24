import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { formatMedia } from '@/utils/strapiHelpers';
import { getMediaContent, getYouTubeEmbedUrl } from '@/utils/mediaHelpers';

/**
 * Renders a single section media block (image, or video with poster + play button + modal).
 * Uses renderMedia logic: priority featuredVideoExternal → featuredVideo → featuredImage.
 * Use in HospitalDetailsInfo, DrugsDetailsInfo, DiseaseInfo, DoctorDetailsInfo sections.
 */
const SectionMediaBlock = ({ sectionData, title = '', className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const content = React.useMemo(() => {
    return getMediaContent(
      sectionData,
      {
        formatImage: (v) => (v ? formatMedia(v) : ''),
        formatVideo: (v) => (v ? formatMedia(v) : ''),
      },
      title || sectionData?.heading || sectionData?.featuredImage?.alternativeText
    );
  }, [sectionData, title]);

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

  const renderMedia = () => {
    if (content.mediaType === 'video' && content.videoUrl) {
      return (
        <>
          {content.isYouTube ? (
            content.mediaUrl ? (
              <SectionImg src={content.mediaUrl} alt={content.title} className="video-poster" />
            ) : (
              <GreyBlock />
            )
          ) : (
            <>
              <SectionVideo
                preload="metadata"
                muted
                playsInline
                poster={content.mediaUrl && content.mediaUrl !== content.videoUrl ? content.mediaUrl : undefined}
              >
                <source src={content.videoUrl} type="video/mp4" />
              </SectionVideo>
              {content.mediaUrl && content.mediaUrl !== content.videoUrl && (
                <PosterOverlay src={content.mediaUrl} alt={content.title} />
              )}
            </>
          )}
          <PlayButtonWrap>
            <PlayBtn onClick={handlePlayVideo} aria-label="Play video" type="button">
              <PlayIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <path d="M8 5v14l11-7z" fill="#FF1493" />
              </PlayIcon>
            </PlayBtn>
          </PlayButtonWrap>
        </>
      );
    }
    if (content.backgroundImage) {
      return <SectionImg src={content.backgroundImage} alt={content.title} loading="lazy" />;
    }
    return null;
  };

  const hasMedia = content.mediaType === 'video' || content.backgroundImage;
  if (!hasMedia) return null;

  return (
    <>
      <MediaWrap className={`details-img ${className}`.trim()} $isVideo={content.mediaType === 'video'}>
        {renderMedia()}
      </MediaWrap>
      {isPlaying && content.videoUrl && (
        <ModalBackdrop onClick={handleCloseVideo}>
          <ModalInner onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={handleCloseVideo} aria-label="Close video">
              <CloseIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </CloseIcon>
            </CloseBtn>
            {content.isYouTube ? (
              <YouTubeIframe
                src={getYouTubeEmbedUrl(content.videoUrl)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <ModalVideo ref={videoRef} src={content.videoUrl} controls autoPlay playsInline />
            )}
          </ModalInner>
        </ModalBackdrop>
      )}
    </>
  );
};

const MediaWrap = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  ${(p) => p.$isVideo && 'aspect-ratio: 16 / 9; min-height: 200px;'}
`;

const SectionImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  &.video-poster {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SectionVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PosterOverlay = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
  pointer-events: none;
  &:hover {
    opacity: 0;
  }
  transition: opacity 0.3s ease;
`;

const GreyBlock = styled.div`
  position: absolute;
  inset: 0;
  background: #f0f0f0;
`;

const PlayButtonWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const PlayBtn = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  margin: 0;
  outline: none;
  &:hover {
    transform: scale(1.05);
    background: #fff;
  }
`;

const PlayIcon = styled.svg`
  width: 28px;
  height: 28px;
  fill: #ff1493;
  margin-left: 2px;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: pointer;
`;

const ModalInner = styled.div`
  position: relative;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  cursor: default;
`;

const CloseBtn = styled.button`
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

const ModalVideo = styled.video`
  width: 100%;
  max-height: 90vh;
  border-radius: 8px;
`;

export default SectionMediaBlock;
