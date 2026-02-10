import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchKeyFactorsSection, fetchKeyFactors } from '../../store/slices/keyFactorsSlice';
import { getMediaUrl } from '../../services/api';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';
import { renderRichTextWithImages } from '@/utils/strapiHelpers';

const KeyFactors = () => {

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const dispatch = useDispatch();
  const { sectionContent, factors } = useSelector((state) => state.keyFactors);

  useEffect(() => {
    dispatch(fetchKeyFactorsSection());
    dispatch(fetchKeyFactors());
  }, [dispatch]);

  const defaultContent = {
    label: 'KEY FACTORS',
    title: 'Our Criteria for Partner Hospital Selection',
    buttonText: 'Connect with our Experts',
    factors: [
      {
        id: 1,
        title: 'International accreditation and certifications (JCI, NCI, etc.)',
        description: '',
        icon: 'certificate',
      },
      {
        id: 2,
        title: 'Specialized cancer / oncology departments & advanced therapy capability',
        description: '',
        icon: 'brain',
      },
      {
        id: 3,
        title: 'Experience with clinical trials & research infrastructure',
        description: '',
        icon: 'research',
      },
      {
        id: 4,
        title: 'Strong patient outcome metrics & ethical practices',
        description: '',
        icon: 'chart',
      },
      {
        id: 5,
        title: 'Multidisciplinary teams and language / logistical support',
        description: '',
        icon: 'team',
      },
    ],
    image: {
      url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800',
      alt: 'Healthcare partnership handshake',
    },
  };

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'certificate':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <path d="M7 7h10M7 12h10M7 17h6" />
            <circle cx="17" cy="17" r="3" />
            <path d="M17 14v6" />
          </svg>
        );
      case 'brain':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a3 3 0 0 0-3 3c0 1.657-1.343 3-3 3H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2c1.657 0 3 1.343 3 3a3 3 0 0 0 6 0c0-1.657 1.343-3 3-3h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2c-1.657 0-3-1.343-3-3a3 3 0 0 0-3-3z" />
            <path d="M12 8v8M8 12h8" />
          </svg>
        );
      case 'research':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 3v18M9 3a3 3 0 0 1 6 0M9 3a3 3 0 0 0-6 0v18a3 3 0 0 0 6 0M9 21a3 3 0 0 0 6 0M9 21a3 3 0 0 1-6 0M15 3a3 3 0 0 1 6 0v18a3 3 0 0 1-6 0" />
            <path d="M3 9h18M3 15h18" />
          </svg>
        );
      case 'chart':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18" />
            <path d="M18 17V9M13 17v-6M8 17v-4" />
            <circle cx="18" cy="7" r="2" />
            <path d="M18 9l-5 4-3-3-4 4" />
          </svg>
        );
      case 'team':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Use Strapi data or fallback
  const content = sectionContent || defaultContent;
  const factorsList = Array.isArray(factors) && factors.length > 0 ? factors : defaultContent.factors;
  
  // Handle image URL - getMediaUrl now handles all cases
  const imageUrl = content.image ? getMediaUrl(content.image) : defaultContent.image.url;
  const imageAlt = content.imageAlt || defaultContent.image.alt;

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
        <ScrollAnimationComponent animationVariants={fadeIn}>
        <Header className='commContent_wrap'>
          <Label className='contentLabel'>{content.label || defaultContent.label}</Label>
          <TopHeader>
            <Title className='title-3'>{content.title || defaultContent.title}</Title>
            <a href='#' className='btn btn-pink-solid' onClick={() => console.log('Connect with experts')}>
              {content.buttonText || defaultContent.buttonText}
            </a>
          </TopHeader>
        </Header>

        <ContentWrapper className='commContent_wrap'>
          <ImageSection>
            <img src={imageUrl} alt={imageAlt} />
          </ImageSection>

          {factorsList.map((factor, index) => {
            // const gridPosition = {
            //   1: { row: '1', column: '2', showLeftBorder: true },
            //   2: { row: '1', column: '3', showLeftBorder: true, topRightCorner: true },
            //   3: { row: '2', column: '1', showRightBorder: true, bottomLeftCorner: true },
            //   4: { row: '2', column: '2', showLeftBorder: true },
            //   5: { row: '2', column: '3', showLeftBorder: true, bottomRightCorner: true },
            // };

            // const position = factor.order || factor.id || (index + 1);
            // const posConfig = gridPosition[position] || gridPosition[1];
            const posConfig = getStepPositioning(index, factorsList.length);

            return (
              <StepCard
                key={factor.id || index}
                gridRow={posConfig.gridRow}
                gridColumn={posConfig.gridColumn}
                $showLeftBorder={posConfig.showLeftBorder}
                $showRightBorder={posConfig.showRightBorder}
                $showBottomBorder={posConfig.showBottomBorder}
                $topRightCorner={posConfig.topRightCorner}
                $bottomLeftCorner={posConfig.bottomLeftCorner}
                $bottomRightCorner={posConfig.bottomRightCorner}
              >
                <IconWrapper>{getIcon(factor.icon)}</IconWrapper>
                <StepTitle className='title-5 text_theme_dark'>{factor.title}</StepTitle>
                {factor.description_block && <StepDescription className='text-16 text_theme_dark'>{renderRichTextWithImages(factor.description_block)}</StepDescription>}
              </StepCard>
            );
          })}
        </ContentWrapper>
        </ScrollAnimationComponent>
      </div>
    </section>
  );
};

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
   
  @media (max-width: 1024px) {
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
  
  svg {
    width: 28px;
    height: 28px;
    color: white;
    stroke-width: 2;
  }
  
  @media (max-width: 1024px) {
    width: 48px;
    height: 48px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
   
  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const StepTitle = styled.h5`
    max-width: 330px;
    @media (max-width: 1024px) {
        max-width: 100%;
    }

`;

const StepDescription = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default KeyFactors;

    