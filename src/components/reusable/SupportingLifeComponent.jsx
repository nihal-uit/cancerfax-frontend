import { Link } from "react-router-dom";
import styled from "styled-components";
import ScrollAnimationComponent from "../../components/ScrollAnimation/ScrollAnimationComponent";
import { formatMedia, renderRichTextWithImages } from "../../utils/strapiHelpers";

const SupportingLifeComponent = ({ data }) => {
  if (!data || !data?.isActive) return null;

  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <section className="supportingLife_sec py-120">
    <div className="containerWrapper">
      <TopSection>
        <LeftContent className="commContent_wrap">
          <ScrollAnimationComponent animationVariants={slideLeft}>
            <div className="content-gap-20">
              <div className="contentLabel text_theme_dark">
                  {data?.heading }
              </div>
                <Title className="title-3 text_theme_dark">
                  {data?.subHeading }
                </Title>
              <p className="text-16">
                  {renderRichTextWithImages(data?.description_block)||data?.description_text }
              </p>
                {data?.cta?.text && (
              <CTAButton
                className="btn btn-pink-solid"
                    to={data?.cta?.URL || '#'}
                    target={data?.cta?.target || '_self'}
              >
                    {data?.cta?.text}
              </CTAButton>
                )}
            </div>
          </ScrollAnimationComponent>
        </LeftContent>

        <RightContent className="commContent_wrap">
          <ScrollAnimationComponent animationVariants={slideRight}>
            <div className="img-wrapper">
                  <img 
                    src={formatMedia(data?.featuredImage || data?.media )} 
                    alt={data?.featuredImage?.alternativeText || data?.media?.alternativeText } 
                    className="img-clip" 
                  />
            </div>
          </ScrollAnimationComponent>
        </RightContent>

      </TopSection>
    </div>
    </section>
  );
};

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
  }

  @media (max-width: 768px) {
    gap: 32px;
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

const Title = styled.h3`
  max-width: 500px;
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const CTAButton = styled(Link)`
  background: ${(props) => props.theme.colors.pink};
  color: ${(props) => props.theme.colors.white};
  max-width: 283px;
  @media (max-width: 575px) {
    max-width: 100%;
  }
`;

export default SupportingLifeComponent;
