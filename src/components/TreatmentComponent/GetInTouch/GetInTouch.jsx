import React from "react";
import styled from "styled-components";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { Link } from "react-router-dom";

const GetInTouch = ({ data, loading }) => {
  if (loading || !data?.isActive) {
    return null;
  }

  return (
    <section className="getInTouch_sec py-120" id="get-in-touch">
      <div className="containerWrapper z-2 position-relative">
        <ContentWrapper>
          <div>
            <ScrollAnimationComponent animationVariants={slideLeft}>
              <CommContent className="commContent_wrap">
                {data?.heading && (
                  <Label className="contentLabel">{data?.heading}</Label>
                )}
                {data?.subHeading && (
                  <Title className="title-3">{data?.subHeading}</Title>
                )}
              </CommContent>
            </ScrollAnimationComponent>
          </div>

          <div>
            <ScrollAnimationComponent animationVariants={slideRight}>
              <CommContentRight className="commContent_wrap">
                {data?.description_text && (
                  <Description className="text-16">
                    {data?.description_text}
                  </Description>
                )}
                {data?.cta?.text && (
                  <CTAButton
                    className="btn btn-pink-solid"
                    target={data?.cta?.target || '_blank'}
                    to={data?.cta?.URL || ''}
                  >
                    {data?.cta?.text}
                  </CTAButton>
                )}
              </CommContentRight>
            </ScrollAnimationComponent>
          </div>
        </ContentWrapper>
      </div>
    </section>
  );
};

const slideLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const slideRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 52% 1fr;
  gap: 120px;
  align-items: center;

  @media (max-width: 1199.98px) {
    gap: 60px;
  }

  @media (max-width: 991.98px) {
    gap: 30px;
    grid-template-columns: auto;
  }

  @media (max-width: 767.98px) {
    gap: 24px;
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

export default React.memo(GetInTouch);
