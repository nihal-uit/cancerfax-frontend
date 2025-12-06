import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSectionData } from "../../utils/strapiHelpers";
import { fetchPageBySlug } from "../../store/slices/pageSlice";
import { formatRichText } from "../../utils/strapiHelpers";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";

const Hero = () => {
  const dispatch = useDispatch();

  const pageData = useSelector((state) => state.global.pageData);
  const pageLoading = useSelector((state) => state.global.pageLoading);

  useEffect(() => {
    dispatch(fetchPageBySlug("drug-listing"));
  }, [dispatch]);

  if (pageLoading) {
    return null;
  }

  const defaultHeroContent = {
    title: 'Explore Expert Articles, Guides, and Trusted',
    description: 'We collaborate with world-renowned oncologists and research institutions to provide doctors access to advanced treatments, clinical trials, and global medical expertise.',
  };

  const drugsHeroSection = getSectionData(pageData, "drugsHero");
  
  const heroContent = drugsHeroSection ? {
    title: drugsHeroSection.heading || defaultHeroContent.title,
    description: formatRichText(drugsHeroSection.description) || drugsHeroSection.description || defaultHeroContent.description,
  } : defaultHeroContent;

  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <div className='others_hero_content comm_hero_pt'>
        <div className='containerWrapper py-88'>
          <div className='hero_content_row align-items-center'>
            <div className='hero_content_left commContent_wrap'>
              <ScrollAnimationComponent animationVariants={slideLeft}>
              <h1 className='title-1 text_theme_dark'>
                {heroContent.title}
              </h1>
              </ScrollAnimationComponent>
            </div>
            
            <div className='hero_content_right'>
              <ScrollAnimationComponent animationVariants={slideRight}>
              <div className='commContent_wrap content-gap-40'>
                <p className='text-16 text_theme_dark'>
                  {heroContent.description}
                </p>
              </div>
              </ScrollAnimationComponent>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Hero;