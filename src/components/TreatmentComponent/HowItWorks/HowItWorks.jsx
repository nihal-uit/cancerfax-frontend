import React from "react";
import styled from "styled-components";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import "./HowItWorks.scss";
import { formatMedia, renderRichTextWithImages } from "../../../utils/strapiHelpers";

const CommContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  text-align: center;
  width: 894px;
  max-width: 100%;
  margin-inline: auto;
  @media (max-width: 1024px) {
    gap: 36px;
  }

  @media (max-width: 768px) {
    gap: 28px;
  }

  @media (max-width: 480px) {
    gap: 24px;
  }
`;

const Label = styled.p`
  color: ${(props) => props.theme.colors.white};
`;

const Title = styled.h3`
  color: ${(props) => props.theme.colors.white};
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.white};
`;

const HowItWorks = ({ data, loading }) => {
  if (loading || !data?.isActive) {
    return null;
  }

  return (
    <section className="treatment__howwork_sec py-120" id="how-it-works">
      {data?.backgroundImage && (
        <div className="howItWork_bg">
          <img src={formatMedia(data?.backgroundImage)} alt={data?.backgroundImage?.alternativeText || ''} />
          <div className="howItWork_bg_overlay"></div>
        </div>
      )}
      <div className="containerWrapper z-2 position-relative">
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <CommContent className="commContent_wrap">
            {data?.heading && (
              <Label className="contentLabel">
                {data?.heading}
              </Label>
            )}
            {data?.subHeading && (
              <Title className="title-3">
                {data?.subHeading}
              </Title>
            )}
            {data?.description_block && (
              <Description className="text-16">
                {renderRichTextWithImages(data?.description_block) || data?.description_text}
              </Description>
            )}
          </CommContent>
        </ScrollAnimationComponent>
        {data?.featuredImage && (
          <ScrollAnimationComponent animationVariants={fadeIn}>
            <div className="ratio__holder">
              <div className="imageSection ratio">
                <img src={formatMedia(data?.featuredImage)} alt={data?.featuredImage?.alternativeText || ''} />
              </div>
            </div>
          </ScrollAnimationComponent>
        )}
      </div>
    </section>
  );
};

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default React.memo(HowItWorks);
