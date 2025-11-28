import React, { useEffect, useState } from "react";

import styled from "styled-components";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";

const ClinicalHero = ({ sectionClass }) => {
  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const ExploreButton = styled.button`
    max-width: 276px;
    @media (max-width: 575px) {
      max-width: 100%;
    }
  `;

  const defaultHeroContent = {
    title: `Global Access to the Most Innovative Cancer Clinical Trials Today`,
    description: `CancerFax connects you to leading oncology research programs worldwide, guiding your path to experimental therapies, breakthrough options, and hope beyond standard care.`,
    buttonText: "find relevant clinical trials",
    buttonLink: "#",
  };

  const heroContent = defaultHeroContent;

  return (
    <div className={`others_hero_content comm_hero_pt ${sectionClass}`}>
      <div className="containerWrapper py-88">
        <div className="hero_content_row">
          <div className="hero_content_left commContent_wrap">
            <ScrollAnimationComponent animationVariants={slideLeft}>
              <h1 className="title-1 text_theme_dark">{heroContent.title}</h1>
            </ScrollAnimationComponent>
          </div>

          <div className="hero_content_right">
            <ScrollAnimationComponent animationVariants={slideRight}>
              <div className="commContent_wrap content-gap-40">
                <p className="text-16 text_theme_dark">
                  {heroContent.description}
                </p>
                <ExploreButton
                  className="btn btn-pink-solid"
                  as={heroContent.buttonLink ? "a" : "button"}
                  href={heroContent.buttonLink}
                >
                  {heroContent.buttonText}
                </ExploreButton>
              </div>
            </ScrollAnimationComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalHero;
