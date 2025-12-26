import styled from 'styled-components';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';
import { Link } from 'react-router-dom';

const GetInTouch = ({ componentData, data, sectionClass }) => {
  const getInTouchData = componentData || data;

  if (!getInTouchData) {
    return null;
  }

  if (!data || !data?.isActive) {
    return null;
  }

  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <section
      className={`getInTouch_sec py-120 ${sectionClass || ''}`}
      id='get-in-touch'
    >
      <div className='containerWrapper z-2 position-relative'>
        <ContentWrapper>
          <LeftContent>
            <ScrollAnimationComponent animationVariants={slideLeft}>
              <CommContent className='commContent_wrap'>
                <Label className='contentLabel'>
                  {getInTouchData?.heading || ''}
                </Label>
                <Title className='title-3'>
                  {getInTouchData?.subHeading || ''}
                </Title>
              </CommContent>
            </ScrollAnimationComponent>
          </LeftContent>

          <RightContent>
            <ScrollAnimationComponent animationVariants={slideRight}>
              <CommContentRight className='commContent_wrap'>
                <Description className='text-16'>
                  {getInTouchData?.description_text || ''}
                </Description>
                {getInTouchData?.cta?.text && (
                  <CTAButton
                    className='btn btn-pink-solid'
                    to={getInTouchData?.cta?.URL || '#'}
                    target={getInTouchData?.cta?.target || '_self'}
                  >
                    {getInTouchData?.cta?.text}
                  </CTAButton>
                )}
              </CommContentRight>
            </ScrollAnimationComponent>
          </RightContent>
        </ContentWrapper>
      </div>
    </section>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  gap: 92px;
  align-items: center;

  @media (max-width: 1200px) {
    gap: 60px;
  }

  @media (max-width: 992px) {
    gap: 50px;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  @media (max-width: 480px) {
    gap: 28px;
  }
`;

const LeftContent = styled.div`
  flex: 0 0 648px;
  @media (max-width: 992px) {
    flex: 0 0 100%;
  }
`;

const CommContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1024px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    gap: 18px;
  }

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const Label = styled.p`
  color: ${(props) => props.theme.colors.white};
`;

const Title = styled.h3`
  color: ${(props) => props.theme.colors.white};
`;

const RightContent = styled.div`
  flex: 1 1 auto;
`;

const CommContentRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 1024px) {
    gap: 28px;
  }

  @media (max-width: 768px) {
    gap: 24px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.white};
`;

const CTAButton = styled(Link)`
  max-width: 324px;
  @media (max-width: 575px) {
    max-width: 100%;
  }
`;

export default GetInTouch;
