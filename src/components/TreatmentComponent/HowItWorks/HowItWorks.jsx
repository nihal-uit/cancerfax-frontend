import React from "react";
import styled from "styled-components";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import "./HowItWorks.scss";
import { getMediaUrl } from "../../../services/api";

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
  if (loading) {
    return null;
  }

  const content = {
    label: data?.heading || 'Lorem Ipsum',
    title: data?.subHeading || 'Lorem Ipsum',
    description: data?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a est velit. In ut eros dapibus, consectetur metus nec, dictum metus.',
    image: getMediaUrl(data?.backgroundImage) || '../images/about-banner-slider-img-1.jpg',
    imageAlt: data?.backgroundImage?.alternativeText || 'How It Works',
  } ;

  return (
    <section className="treatment__howwork_sec py-120" id="how-it-works">
      <div className="howItWork_bg">
        <img src="./images/how-work-bg.svg" alt="How It Works" />
      </div>
      <div className="containerWrapper z-2 position-relative">
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <CommContent className="commContent_wrap">
            <Label className="contentLabel">
              {content.label || "HOW IT WORKS"}
            </Label>
            <Title className="title-3">
              {content.title || "Understanding CAR T-Cell Therapy"}
            </Title>
            <Description className="text-16">
              {content.description ||
                `CAR T-Cell therapy (Chimeric Antigen Receptor T-Cell therapy) is a groundbreaking form of immunotherapy. It involves reprogramming a patient’s own T cells to detect and destroy cancer cells by expressing engineered receptors (CARs).
            This therapy has revolutionized treatment for certain blood cancers, offering deep remissions and durable responses for patients who’ve exhausted conventional options.`}
            </Description>
          </CommContent>
        </ScrollAnimationComponent>
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <div className="ratio__holder">
            <div className="imageSection ratio">
              <img src={content.image} alt={content.imageAlt} />
            </div>
          </div>
        </ScrollAnimationComponent>
      </div>
    </section>
  );
};

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default React.memo(HowItWorks);
