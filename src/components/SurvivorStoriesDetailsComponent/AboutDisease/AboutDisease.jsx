import React from 'react';
import styled from 'styled-components';
import ScrollAnimationComponent from '../../ScrollAnimation/ScrollAnimationComponent';
import { formatMedia } from '../../../utils/strapiHelpers';

const AboutDisease = ({ data }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const diseaseInfo = data?.disease_info;
  if (!diseaseInfo) return null;

  const cards = [
    diseaseInfo?.condition && {
      key: 'condition',
      title: diseaseInfo?.condition?.title,
      description: diseaseInfo?.condition?.description_text,
      icon: formatMedia(diseaseInfo?.condition?.icon),
    },
    diseaseInfo?.treatment && {
      key: 'treatment',
      title: diseaseInfo?.treatment?.title,
      description: diseaseInfo?.treatment?.description_text,
      icon: formatMedia(diseaseInfo?.treatment?.icon),
    },
    diseaseInfo?.country && {
      key: 'country',
      title: diseaseInfo?.country?.title,
      description: diseaseInfo?.country?.description_text,
      icon: formatMedia(diseaseInfo?.country?.icon),
    },
    diseaseInfo?.current_status && {
      key: 'current_status',
      title: diseaseInfo?.current_status?.title,
      description: diseaseInfo?.current_status?.description_text,
      icon: formatMedia(diseaseInfo?.current_status?.icon),
    },
    diseaseInfo?.significance && {
      key: 'significance',
      title: diseaseInfo?.significance?.title,
      description: diseaseInfo?.significance?.description_text,
      icon: formatMedia(diseaseInfo?.significance?.icon),
    },
  ].filter(Boolean);

  if (cards.length === 0) return null;

  return (
    <section className='aboutDisease_sec py-120'>
      <div className='containerWrapper'>
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <TopSection>
            <LeftContent className='commContent_wrap'>
              {diseaseInfo?.heading && (
                <Label className='contentLabel text_theme_dark'>
                  {diseaseInfo?.heading}
                </Label>
              )}
              {diseaseInfo?.subHeading && (
                <Title className='title-3 text_theme_dark'>
                  {diseaseInfo?.subHeading}
                </Title>
              )}
            </LeftContent>

            {diseaseInfo?.description_text && (
              <RightContent className='commContent_wrap'>
                <Description className='text-16'>
                  {diseaseInfo?.description_text}
                </Description>
              </RightContent>
            )}
          </TopSection>

          <GridWrapper>
            {cards.map((card) => (
              <StepCard key={card.key}>
                {card.icon && (
                  <IconWrapper>
                    <img src={card.icon} alt={card.title || 'disease detail'} />
                  </IconWrapper>
                )}
                <StepContent>
                  {card.title && <StepTitle>{card.title}</StepTitle>}
                  {card.description && (
                    <StepDescription>{card.description}</StepDescription>
                  )}
                </StepContent>
              </StepCard>
            ))}
          </GridWrapper>
        </ScrollAnimationComponent>
      </div>
    </section>
  );
};

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 60px;
  margin-bottom: 60px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    margin-bottom: 50px;
  }

  @media (max-width: 768px) {
    gap: 32px;
    margin-bottom: 40px;
  }
`;

const LeftContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 0 0 500px;
  @media (max-width: 1024px) {
    flex: 1 1 auto;
  }
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const Label = styled.div``;

const Title = styled.h3`
  max-width: 500px;
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Description = styled.p``;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #e9e9e9;
  border-radius: 18px;
  overflow: hidden;
  background-color: #fff;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const StepCard = styled.div`
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
  justify-content: flex-start;
  border: 1px solid #e9e9e9;
  min-height: 200px;
  height: 100%;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const StepTitle = styled.h6`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #36454f;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StepDescription = styled.h6`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #36454f;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default AboutDisease;
