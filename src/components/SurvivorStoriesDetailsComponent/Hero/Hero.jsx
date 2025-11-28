import React, { useEffect, useState } from "react";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import styled from "styled-components";
import SurvivorStoriesVideo from "../../SurvivorStoriesComponent/SurvivorStoriesVideo/SurvivorStoriesVideo"

const Hero = ({ sectionClass }) => {
   const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const defaultHeroContent = {
    title: `Cancer Survivor Stories : Real People. Real Hope. Real Healing. Every Story Inspires Hope.`,
    description: `Discover inspiring cancer survivor stories from around the world. Learn how patients overcame cancer through advanced treatments, resilience, and hope. Read their journeys on CancerFax. Discover how patients from across the globe have fought cancer and emerged stronger.`,
  };

  const heroContent = defaultHeroContent;

  return (
    <div className={`others_hero_content comm_hero_pt ${sectionClass}`}>
      <div className="containerWrapper pt-60 pb-120">
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <div className="hero_content_row">
            <div className="text-center commContent_wrap content-gap-32">
                <h1 className="title-1 text_theme_dark">{heroContent.title}</h1>
                <p className="text-16 text_theme_dark">
                  {heroContent.description}
                </p>
            </div>
          </div>
        </ScrollAnimationComponent>
        <SurvivorStoriesVideo />
      </div>
    </div>
  );
};

export default Hero;
