import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatMedia } from "@/utils/strapiHelpers";
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';


const VideoTestimonialComponents = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Extract background image from featuredVideo field (actual structure from Strapi)
  // featuredVideo can be a direct media object with url field, or nested in data.attributes
  const getBackgroundImage = () => {
    if (!data) return null;

    if (data?.testimonial_card?.featuredVideo) {
      if (data?.testimonial_card?.featuredVideo?.url) {
        return formatMedia(data?.testimonial_card?.featuredVideo?.url);
      }
      if (data?.testimonial_card?.featuredVideo?.data?.attributes?.url) {
        return formatMedia(data?.testimonial_card?.featuredVideo);
      }
      if (typeof data?.testimonial_card?.featuredVideo === 'string') {
        return formatMedia(data?.featuredVideo);
      }
    }

    if (data?.backgroundImage || data?.featuredImage) {
      return formatMedia(data?.backgroundImage || data?.featuredImage);
    }
    return null;
  };

  // Get video URL for playback
  const getVideoUrl = () => {
    if (!data) return null;

    if (data?.testimonial_card?.featuredVideo) {
      if (data?.testimonial_card?.featuredVideo?.url) {
        return formatMedia(data?.testimonial_card?.featuredVideo?.url);
      }
      if (data?.testimonial_card?.featuredVideo?.data?.attributes?.url) {
        return formatMedia(data?.testimonial_card?.featuredVideo);
      }
      if (typeof data?.testimonial_card?.featuredVideo === 'string') {
        return formatMedia(data?.testimonial_card?.featuredVideo);
      }
    }

    if (data?.featuredVideo) {
      if (data?.featuredVideo?.url) {
        return formatMedia(data?.featuredVideo?.url);
      }
      if (data?.featuredVideo?.data?.attributes?.url) {
        return formatMedia(data?.featuredVideo);
      }
      if (typeof data?.featuredVideo === 'string') {
        return formatMedia(data?.featuredVideo);
      }
    }

    return null;
  };

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
        setIsPlaying(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isPlaying]);

  // Auto-play video when modal opens
  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error('Error playing video:', err);
      });
    }
  }, [isPlaying]);

  const videoUrl = getVideoUrl();

  console.log("data - ", data);

  return (
    <>
      <div className='videoTestimonials_wrap'>
        <BackgroundImage image={getBackgroundImage()} />
        <ScrollAnimationComponent animationVariants={slideLeft}>
          <Content className='commContent_wrap'>
            <Label className='contentLabel'>{data?.heading || ''}</Label>
            <Title>{data?.subHeading || ''}</Title>
            {
              data?.testimonial_card?.cta?.URL && (
                <ExploreButton className='btn btn-pink-solid' to={data?.testimonial_card?.cta?.URL || '#'} target={data?.testimonial_card?.cta?.target || '_blank'}>
                  {data?.testimonial_card?.cta?.text || ''}
                </ExploreButton>
              )
            }
          </Content>
        </ScrollAnimationComponent>

        <PlayButtonWrapper>
          <PlayButton onClick={handlePlayVideo} aria-label="Play video testimonials" type="button">
            <PlayIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <path d="M8 5v14l11-7z" fill="#FF1493" />
            </PlayIcon>
          </PlayButton>
        </PlayButtonWrapper>
      </div>

      {isPlaying && videoUrl && (
        <VideoModal onClick={handleCloseVideo}>
          <VideoModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseVideo} aria-label="Close video">
              <CloseIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
    </>
  );
};

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 24px;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(0deg, rgba(54, 69, 79, 0.63) 0%, rgba(54, 69, 79, 0) 100%);
    border-radius: 24px;
    backdrop-filter: blur(53px);
    -webkit-mask-image: -webkit-gradient(linear, left bottom, left top, color-stop(50%, rgba(54, 69, 79, 0.7)), to(rgba(54, 69, 79, 0)));
    -webkit-mask-image: linear-gradient(to right, rgba(54, 69, 79, 0.7) 50%, rgba(54, 69, 79, 0) 100%);
    mask-image: -webkit-gradient(linear, left bottom, left top, color-stop(50%, rgba(54, 69, 79, 0.7)), to(rgba(54, 69, 79, 0)));
    mask-image: linear-gradient(to right, rgba(54, 69, 79, 0.7) 50%, rgba(54, 69, 79, 0) 100%);
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

const Content = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 80px;
  gap: 32px;
  max-width: 680px;
  @media (max-width: 768px) {
    padding: 60px 60px;
    align-items: center;
    text-align: center;
    justify-content: flex-start;
  }
  
  @media (max-width: 480px) {
    padding: 32px 32px;
  }
`;

const Label = styled.p`
  color: rgba(255, 255, 255, 0.9);
`;

const Title = styled.h4`
  font-size: 36px !important;
  font-weight: 600;
  color: white;
  line-height: 48px !important;
  letter-spacing: -0.5px;
  margin: 0;
  @media (max-width: 1200px) {
  font-size: 32px !important;
  line-height: 44px !important;
  }
  @media (max-width: 767px) {
  font-size: 28px !important;
  line-height: 38px !important;
  }
  `;

const ExploreButton = styled(Link)`
    max-width: 178px;
    @media (max-width: 575px) {
     max-width: 100%;
    }
`;

const PlayButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 200px;
  transform: translateY(-50%);
  z-index: 10;
  
  @media (max-width: 1200px) {
    right: 150px;
  }
  
  @media (max-width: 1024px) {
    right: 100px;
  }
  
  @media (max-width: 768px) {
    position: absolute;
    top: auto;
    bottom: 60px;
    right: 50%;
    transform: translateX(50%);
    margin: 0;
    display: flex;
    justify-content: center;
    z-index: 10;
  }
  
  @media (max-width: 480px) {
    bottom: 40px;
    right: 50%;
    transform: translateX(50%);
  }
`;

const PlayButton = styled.button`
  width: 98px;
  height: 98px;
  border-radius: 50%;
  background: white;
  border: 2px dashed rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    width: 146px;
    height: 146px;
    border: 2px dashed rgba(255, 255, 255, 1);
    border-radius: 50%;
    animation: rotate 20s linear infinite;
  }
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 1024px) {
    width: 80px;
    height: 80px;
    
    &::before {
      width: 130px;
      height: 130px;
    }
  }
    
  @media (max-width: 575px) {
    width: 70px;
    height: 70px;
    border-width: 3px;
    
    &::before {
      width: 100px;
      height: 100px;
    }
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const PlayIcon = styled.svg`
  width: 36px;
  height: 36px;
  margin-left: 4px;
  fill: #FF1493;
  display: block;
  z-index: 1;
  position: relative;
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
  
  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
  }
  
  @media (max-width: 360px) {
    width: 24px;
    height: 24px;
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

const slideLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export default VideoTestimonialComponents;

