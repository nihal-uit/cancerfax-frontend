import React, { useEffect, useState } from "react";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import styled from "styled-components";

const Hero = ({ sectionClass }) => {
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
    title: `Making Advanced Cancer Care Accessible to Every Patient, Everywhere`,
    description: `CancerFax bridges patients with the world’s most advanced cancer hospitals and research programs, empowering them with guidance, transparency, and access to life-saving innovation.`,
    buttonText: "Find relevant clinical trials",
    buttonLink: "#about-us",
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

export default Hero;
