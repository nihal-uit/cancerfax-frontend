import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { formatMedia } from '../../utils/strapiHelpers';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';
import { Link } from 'react-router-dom';

// Custom hook for counter animation
const useCounterAnimation = (targetValue, duration = 2000) => {
  const [count, setCount] = useState(0);
  const animationFrameRef = useRef(null);
  const ref = useRef(null);

  // Parse the target value (e.g., "10,000k+" -> 10000)
  const parseNumber = (value) => {
    if (typeof value !== 'string') return value;

    // Remove commas
    let numStr = value.replace(/,/g, '');

    // Check for 'k' multiplier
    const hasK = numStr.toLowerCase().includes('k');
    numStr = numStr.replace(/k/i, '');

    // Remove % and + signs for parsing
    numStr = numStr.replace(/[%+]/g, '');

    const num = parseFloat(numStr);
    return hasK ? num * 1000 : num;
  };

  const formatNumber = (value, originalValue) => {
    // Preserve the original format
    const hasComma = originalValue.includes(',');
    const hasK = originalValue.toLowerCase().includes('k');
    const hasPercent = originalValue.includes('%');
    const hasPlus = originalValue.includes('+');

    let formatted = value.toString();

    // Add commas
    if (hasK) {
      const thousandsValue = Math.floor(value / 1000);
      formatted = thousandsValue.toLocaleString() + 'k';
    } else if (hasComma) {
      formatted = value.toLocaleString();
    } else {
      formatted = value.toString();
    }

    // Add % or +
    if (hasPercent) formatted += '%';
    if (hasPlus) formatted += '+';

    return formatted;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset count and start animation every time it comes into view
          setCount(0);

          // Cancel any existing animation
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }

          const targetNum = parseNumber(targetValue);
          let startTime;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Easing function for smooth animation (easeOutQuart)
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(targetNum * easeOutQuart);
            setCount(currentCount);

            if (progress < 1) {
              animationFrameRef.current = requestAnimationFrame(animate);
            } else {
              setCount(targetNum);
              animationFrameRef.current = null;
            }
          };

          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          // Reset when leaving viewport so it can animate again
          setCount(0);
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetValue, duration]);

  return {
    displayValue: formatNumber(count, targetValue),
    ref,
  };
};

// Counter component that uses the animation hook
const AnimatedStat = ({
  number,
  label,
  isLarge = false,
  labelSize = 'small',
}) => {
  const { displayValue, ref } = useCounterAnimation(number, 2000);

  return (
    <StatCard ref={ref} className={isLarge ? 'content-large' : 'content-small'}>
      <StatNumber $size={isLarge ? 'large' : 'small'}>
        {displayValue}
      </StatNumber>
      <StatLabel $labelSize={labelSize}>{label}</StatLabel>
    </StatCard>
  );
};

const AboutSection = ({ componentData, data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

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

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error('Error playing video:', err);
      });
    }
  }, [isPlaying]);

  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const aboutData = componentData || data;

  if (!aboutData) {
    return null;
  }

  const statistics =
    aboutData?.statistic?.length > 0
      ? aboutData?.statistic
        .map((stat, index) => {
          return {
            number: stat?.value || '',
            label: stat?.label || '',
            isLarge: index === 0 ? true : false,
            labelSize: index === 0 ? 'large' : 'small',
          };
        })
        .filter((stat) => stat.number)
      : [];

  // Use formatMedia to get the complete URL with base origin
  const videoUrl = formatMedia(aboutData?.video);
  const imageUrl = formatMedia(aboutData?.image);

  return (
    <section id='about' className='about_sec py-120'>
      <div className='containerWrapper'>
        <div className='about_row'>
          <LeftSection>
            <ScrollAnimationComponent animationVariants={slideLeft}>
              <div className='commContent_wrap about_left_content'>
                <Label className='contentLabel'>
                  {aboutData?.heading || ''}
                </Label>
                <Title className='title-3'>{aboutData?.subHeading || ''}</Title>
                <Description className='text-16'>
                  {aboutData?.description_text || ''}
                </Description>
                {aboutData?.cta?.text && (
                  <CTAButton
                    className='btn btn-pink-solid'
                    to={aboutData?.cta?.URL || '#'}
                    target={aboutData?.cta?.target || '_self'}
                  >
                    {aboutData?.cta?.text}
                  </CTAButton>
                )}
              </div>

              <ImageContainer>
                {videoUrl ? (
                  <>
                    <video
                      preload='none'
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={imageUrl}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    >
                      <source src={videoUrl} type='video/mp4' />
                      Your browser does not support the video tag.
                    </video>
                    <PlayButtonWrapper>
                      <PlayButton
                        onClick={handlePlayVideo}
                        aria-label='Play video testimonials'
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
                    </PlayButtonWrapper>
                  </>
                ) : (
                  <img src={imageUrl} alt='CancerFax Care' />
                )}
              </ImageContainer>


            </ScrollAnimationComponent>
              {isPlaying && videoUrl && (
                <VideoModal onClick={handleCloseVideo}>
                  <VideoModalContent onClick={(e) => e.stopPropagation()}>
                    <CloseButton onClick={handleCloseVideo} aria-label='Close video'>
                      <CloseIcon viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M18 6L6 18M6 6l12 12'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
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
          </LeftSection>

          <RightSection>
            <ScrollAnimationComponent animationVariants={slideRight}>
              <StatisticsGrid>
                {statistics.map((stat, index) => (
                  <AnimatedStat
                    key={index}
                    number={stat.number}
                    label={stat.label}
                    isLarge={stat.isLarge}
                    labelSize={stat.labelSize}
                  />
                ))}
              </StatisticsGrid>
            </ScrollAnimationComponent>
          </RightSection>
        </div>
      </div>
    </section>
  );
};

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.p`
  color: ${(props) => props.theme.colors.primary};
`;

const Title = styled.h3`
  color: ${(props) => props.theme.colors.primary};
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.primary};
`;

const CTAButton = styled(Link)`
  background: ${(props) => props.theme.colors.pink};
  color: ${(props) => props.theme.colors.white};
  max-width: 283px;
  @media (max-width: 575px) {
    max-width: 100%;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 520px;
  height: 302px;
  border-radius: 48px;
  overflow: hidden;
  margin-top: 0;
  position: relative;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  video {
    display: block;
  }

  @media (max-width: 1024px) {
    max-width: 100%;
    height: 320px;
    border-radius: 20px;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 0;

  @media (max-width: 1024px) {
    width: 100%;
    margin-top: 0;
  }
`;

const StatisticsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const StatCard = styled.div`
  padding: 40px 0;
  border-bottom: 1px solid #d1d5db;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 32px 0;
    gap: 10px;

    &:first-child {
      padding-top: 0;
    }
  }
`;

const StatNumber = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: ${(props) => (props.$size === 'large' ? '108px' : '64px')};
  font-weight: 500;
  font-style: normal;
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
  line-height: 100%;
  letter-spacing: 0px;

  @media (max-width: 1024px) {
    font-size: ${(props) => (props.$size === 'large' ? '80px' : '56px')};
  }

  @media (max-width: 768px) {
    font-size: ${(props) => (props.$size === 'large' ? '64px' : '48px')};
  }

  @media (max-width: 480px) {
    font-size: ${(props) => (props.$size === 'large' ? '52px' : '42px')};
  }
`;

const StatLabel = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: ${(props) => (props.$labelSize === 'large' ? '24px' : '16px')};
  font-weight: 400;
  font-style: normal;
  color: ${(props) => props.theme.colors.primary};
  line-height: 100%;
  letter-spacing: 0px;
  margin: 0;

  @media (max-width: 1024px) {
    font-size: ${(props) => (props.$labelSize === 'large' ? '22px' : '15px')};
  }

  @media (max-width: 768px) {
    font-size: ${(props) => (props.$labelSize === 'large' ? '20px' : '14px')};
  }

  @media (max-width: 480px) {
    font-size: ${(props) => (props.$labelSize === 'large' ? '18px' : '13px')};
  }
`;

const PlayButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 220px;
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
  width: 60px;
  height: 60px;
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
    width: 80px;
    height: 80px;
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
  fill: #ff1493;
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

export default AboutSection;
