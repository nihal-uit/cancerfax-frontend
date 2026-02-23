import React from 'react';
import styled from 'styled-components';
import { formatMedia, renderRichTextWithImages } from '../../utils/strapiHelpers';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';
import { Link } from 'react-router-dom';

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
  align-items: flex-end;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
`;

const Label = styled.p`
  color: #36454f;
`;

const Title = styled.h3`
  color: #36454f;
  max-width: 680px;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 254px;
  gap: 0;
  border: 1px solid #e5e7eb;
  border-bottom: 0;
  border-radius: 24px 24px 0 0;
  overflow: hidden;
  min-height: 254px;

  @media (max-width: 1200px) {
    grid-template-rows: auto;
  }

  @media (max-width: 1024px) {
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
  gap: 20px;
  align-items: flex-start;
  justify-content: space-between;
  border-left: ${props => props.$showLeftBorder ? '1px solid #E5E7EB' : 'none'};
  border-right: ${props => props.$showRightBorder ? '1px solid #E5E7EB' : 'none'};
  border-bottom: ${props => props.$showBottomBorder ? '1px solid #E5E7EB' : 'none'};
  
  /* Row 1 cards (Steps 1, 2): 222px */
  /* Row 2 cards (Steps 3, 4, 5): 212px */
  height: ${(props) => (props.$gridRow === '1' ? '254px' : '254px')};

  ${(props) => props.$gridRow && `grid-row: ${props.$gridRow};`}
  ${(props) => props.$gridColumn && `grid-column: ${props.$gridColumn};`}
  
  /* Top-right corner for Step 2 */
  ${(props) =>
    props.$topRightCorner &&
    `
    border-radius: 0 24px 0 0;
  `}
  
  /* Bottom-left corner for Step 3 */
  ${(props) =>
    props.$bottomLeftCorner &&
    `
    border-radius: 0 0 0 24px;
    border-left: none;
  `}
  
  /* Bottom-right corner for Step 5 */
  ${(props) =>
    props.$bottomRightCorner &&
    `
    border-radius: 0 0 24px 0;
  `}

  @media (max-width: 1024px) {
    padding: 24px 24px;
  }

  @media (max-width: 1024px) {
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    padding: 32px 24px;
    height: auto;
    grid-row: auto;
    grid-column: 1;

    &:last-child {
      border-bottom: none;
    }
  }

  @media (max-width: 480px) {
    padding: 28px 20px;
    gap: 16px;
  }
`;

const IconWrapper = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #4b5563;
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

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const StepTitle = styled.h5`
  color: #36454f;
`;

const StepDescription = styled.p`
  font-weight: 400;
  color: #727b81;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

const HowItWorks = ({ componentData, data }) => {
  const howItWorksData = componentData || data;

  if (!howItWorksData) {
    return null;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // const getStepPositioning = (index, total) => {
  //   let gridRow, gridColumn;

  //   if (index === 0 || index === 1) {
  //     // First row cards (positions 1,2)
  //     gridRow = '1';
  //     gridColumn = (index + 2).toString(); // columns 2, 3
  //   } else {
  //     // Second row cards (positions 3,4,5)
  //     gridRow = '2';
  //     gridColumn = (index - 2 + 1).toString(); // columns 1, 2, 3
  //   }

  //   return {
  //     gridRow,
  //     gridColumn,
  //     showLeftBorder:
  //       gridColumn === '2' || (gridRow === '2' && gridColumn === '1'),
  //     showRightBorder: gridColumn === '2',
  //     showBottomBorder: gridRow === '1',
  //     topRightCorner: index === 1, // Step 2
  //     bottomLeftCorner: index === 2, // Step 3
  //     bottomRightCorner:
  //       index === total - 1 && gridRow === '2' && gridColumn === '3', // Last step in row 2, col 3
  //   };
  // };

  const getStepPositioning = (index, total) => {
    const columnsPerRow = 3;
    let row, column;
  
    if (index < 2) {
      row = 1;
      column = index + 2;
    } else {
      const adjustedIndex = index - 2;
      row = Math.floor(adjustedIndex / columnsPerRow) + 2;
      column = (adjustedIndex % columnsPerRow) + 1;
    }
  
    const gridRow = row.toString();
    const gridColumn = column.toString();
  
    const totalAfterFirstRow = Math.max(total - 2, 0);
    const lastRow =
      total > 2
        ? Math.ceil(totalAfterFirstRow / columnsPerRow) + 1
        : 1;
  
    const isLastRow = row === lastRow;
    const isLastColumn = column === columnsPerRow;
  
    return {
      gridRow,
      gridColumn,
  
      showLeftBorder: column !== 1,
      showRightBorder: column === 2,
      showBottomBorder: !isLastRow,
  
      topRightCorner: index === 1,
      bottomLeftCorner: index === 2,
      bottomRightCorner: index === total - 1 && isLastColumn,
    };
  };

  const steps = howItWorksData?.steps || [];

  if (steps.length === 0) {
    return null;
  }

  return (
    <section className='howItWork_sec py-120' id='how-it-works'>
      <div className='containerWrapper commContent_wrap'>
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <Header>
            <Label className='contentLabel'>
              {howItWorksData?.heading || ''}
            </Label>
            <TopHeader>
              <Title className='title-3'>
                {howItWorksData?.subHeading || ''}
              </Title>
              {howItWorksData?.cta?.text && (
                <Link
                  to={howItWorksData?.cta?.URL || '#'}
                  target={howItWorksData?.cta?.target || '_self'}
                  className='btn btn-pink-solid'
                >
                  {howItWorksData?.cta?.text}
                </Link>
              )}
            </TopHeader>
          </Header>

          <ContentWrapper>
            {howItWorksData?.featuredImage && (
              <ImageSection>
                <img
                  src={formatMedia(howItWorksData?.featuredImage)}
                  alt={howItWorksData?.featuredImage?.alternativeText || ''}
                />
              </ImageSection>
            )}

            {steps.map((step, index) => {
              const positioning = getStepPositioning(index, steps.length);
              const iconUrl = formatMedia(step?.icon);

              return (
                <StepCard
                  key={step?.id || index}
                  $gridRow={positioning.gridRow}
                  $gridColumn={positioning.gridColumn}
                  $showLeftBorder={positioning.showLeftBorder}
                  $showRightBorder={positioning.showRightBorder}
                  $showBottomBorder={positioning.showBottomBorder}
                  $topRightCorner={positioning.topRightCorner}
                  $bottomLeftCorner={positioning.bottomLeftCorner}
                  $bottomRightCorner={positioning.bottomRightCorner}
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
                  <StepContent>
                    <StepTitle className='title-5'>
                      {index + 1 + '. ' + step?.title || ''}
                    </StepTitle>
                    <StepDescription className='text-16'>
                      {renderRichTextWithImages(step?.description_block)||step?.description_text || ''}
                    </StepDescription>
                  </StepContent>
                </StepCard>
              );
            })}
          </ContentWrapper>
        </ScrollAnimationComponent>
      </div>
    </section>
  );
};

export default HowItWorks;
