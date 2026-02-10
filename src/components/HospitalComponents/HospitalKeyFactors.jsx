import React from 'react';
import styled from 'styled-components';
import { formatMedia, renderRichTextWithImages } from '../../utils/strapiHelpers';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 60px;
  
  @media (max-width: 1024px) {
    margin-bottom: 50px;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
`;

const Label = styled.p`
  color: #36454F;
`;

const Title = styled.h3`
  color: #36454F;
  max-width: 700px;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 254px;
  gap: 0;
  border: 1px solid #E5E7EB;
  border-bottom: 0;
  border-radius: 24px 24px 0 0;
  overflow: hidden;
  min-height: 254px;

  @media (max-width: 1200px) {
    grid-template-rows: auto;
  }
  
  @media (max-width: 991px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: auto;
  }
`;

const ImageSection = styled.div`
  overflow: hidden;
  border-radius: 24px 0 0 24px;
  min-height: 254px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  @media (max-width: 767px) {
    height: auto;
    width: 100%;
    min-height: 300px;
    border-radius: 24px 24px 0 0;
  }
  
  @media (max-width: 480px) {
    min-height: 250px;
  }
`;

const StepCard = styled.div`
  padding: 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: flex-start;
  border-left: ${props => props.$showLeftBorder ? '1px solid #E5E7EB' : 'none'};
  border-right: ${props => props.$showRightBorder ? '1px solid #E5E7EB' : 'none'};
  border-bottom: ${props => props.$showBottomBorder ? '1px solid #E5E7EB' : 'none'};
  
  /* Row 1 cards (Steps 1, 2): 222px */
  /* Row 2 cards (Steps 3, 4, 5): 212px */
  height: ${props => props.$gridRow === '1' ? '254px' : '254px'};
  
  ${props => props.$gridRow && `grid-row: ${props.$gridRow};`}
  ${props => props.$gridColumn && `grid-column: ${props.$gridColumn};`}
  
  /* Top-right corner for Step 2 */
  ${props => props.$topRightCorner && `
    border-radius: 0 24px 0 0;
  `}
  
  /* Bottom-left corner for Step 3 */
  ${props => props.$bottomLeftCorner && `
    border-radius: 0 0 0 24px;
    border-left: none;
  `}
  
  /* Bottom-right corner for Step 5 */
  ${props => props.$bottomRightCorner && `
    border-radius: 0 0 24px 0;
  `}

  @media (max-width: 1024px) {
    padding: 24px 24px;
    gap: 40px;
  }
   
  @media (max-width: 991px) {
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #E5E7EB;
    padding: 32px 24px;
    height: auto;
    grid-row: auto;
    grid-column: 1;
    gap: 30px;

    &:last-child {
      border-bottom: none;
    }
  }
  
  @media (max-width: 480px) {
    padding: 28px 20px;
    gap: 24px;
  }
`;

const IconWrapper = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #4B5563;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 8px;
    display: block;
  }
  
  svg {
    width: 28px;
    height: 28px;
    color: white;
    stroke-width: 2;
  }
  
  @media (max-width: 1024px) {
    width: 48px;
    height: 48px;

    img {
      padding: 6px;
    }
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
   
  @media (max-width: 480px) {
    width: 44px;
    height: 44px;

    img {
      padding: 5px;
    }
    
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

// Default icon component (fallback when no icon from API)
const DefaultIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    />
  </svg>
);

// Icon component with error handling
const StepIcon = ({ iconUrl, alt }) => {
  const [hasError, setHasError] = React.useState(false);

  if (!iconUrl || hasError) {
    return <DefaultIcon />;
  }

  return (
    <img
      src={iconUrl}
      alt={alt || 'Step icon'}
      onError={() => setHasError(true)}
      loading='lazy'
    />
  );
};

const StepTitle = styled.h5`
    max-width: 330px;
    @media (max-width: 991px) {
        max-width: 100%;
    }

`;

const StepDescription = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const HospitalKeyFactors = ({ componentData, data }) => {
  const keyFactorsData = componentData || data;

  if (!keyFactorsData) {
    return null;
  }
  
  const steps = keyFactorsData?.steps || [];

  if (steps.length === 0) {
        return null;
    }

  const featuredImageUrl = formatMedia(keyFactorsData?.featuredImage);

  const getStepPositioning = (index, total) => {
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    
    // For 2x3 grid layout (image in row 1, col 1)
    let gridRow, gridColumn;
    
    if (index === 0 || index === 1) {
      // First row cards (positions 1,2)
      gridRow = '1';
      gridColumn = (index + 2).toString(); // columns 2, 3
    } else {
      // Second row cards (positions 3,4,5)
      gridRow = '2';
      gridColumn = ((index - 2) + 1).toString(); // columns 1, 2, 3
    }

    return {
      gridRow,
      gridColumn,
      showLeftBorder: gridColumn === '2' || (gridRow === '2' && gridColumn === '1'),
      showRightBorder: gridColumn === '2',
      showBottomBorder: gridRow === '1',
      topRightCorner: index === 1, // Step 2
      bottomLeftCorner: index === 2, // Step 3
      bottomRightCorner: index === total - 1 && gridRow === '2' && gridColumn === '3' // Last step in row 2, col 3
    };
  };

  return (
    <section className='keyFactors_sec py-120 pb-5'>
      <div className='containerWrapper'>
        <Header className='commContent_wrap'>
          <Label className='contentLabel'>
            {keyFactorsData?.heading || ''}
          </Label>
          <TopHeader>
            <Title className='title-3'>
              {keyFactorsData?.subHeading || ''}
            </Title>
            {keyFactorsData?.cta?.text && (
              <a
                href={keyFactorsData?.cta?.URL || '#'}
                target={keyFactorsData?.cta?.target || '_self'}
                className='btn btn-pink-solid'
              >
                {keyFactorsData?.cta?.text}
            </a>
            )}
          </TopHeader>
        </Header>

        <ContentWrapper className='commContent_wrap'>
          {featuredImageUrl && (
          <ImageSection>
              <img
                src={featuredImageUrl}
                alt={keyFactorsData?.featuredImage?.alternativeText || ''}
              />
          </ImageSection>
          )}

          {steps.map((step, index) => {
            const posConfig = getStepPositioning(index, steps.length);
            const iconUrl = formatMedia(step?.icon);

            return (
              <StepCard
                key={step?.id || index}
                $gridRow={posConfig.gridRow}
                $gridColumn={posConfig.gridColumn}
                $showLeftBorder={posConfig.showLeftBorder}
                $showRightBorder={posConfig.showRightBorder}
                $showBottomBorder={posConfig.showBottomBorder}
                $topRightCorner={posConfig.topRightCorner}
                $bottomLeftCorner={posConfig.bottomLeftCorner}
                $bottomRightCorner={posConfig.bottomRightCorner}
              >
                <IconWrapper>
                  <StepIcon
                    iconUrl={iconUrl}
                    alt={
                      step?.icon?.alternativeText ||
                      step?.title ||
                      'Step icon'
                    }
                  />
                </IconWrapper>
                <StepTitle className='title-5 text_theme_dark'>
                  {step?.title || ''}
                </StepTitle>
                {(step?.description_block || step?.description_text) && (
                  <StepDescription className='text-16 text_theme_dark'>
                    {renderRichTextWithImages(step?.description_block)||step?.description_text}
                  </StepDescription>
                )}
              </StepCard>
            );
          })}
        </ContentWrapper>
      </div>
    </section>
  );
};

export default HospitalKeyFactors;

    