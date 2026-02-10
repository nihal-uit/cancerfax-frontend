import React from "react";
import styled from "styled-components";
import "./Hero.css";
import { renderRichTextWithImages } from "@/utils/strapiHelpers";

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeroSection = () => {

  const heroContent = {
    title: 'Explore Expert Articles, Guides, and Resources',
    description: 'We collaborate with world-renowned oncologists and research institutions to provide doctors access to advanced treatments, clinical trials, and global medical expertise.',
  };

  return (
    <div className='others_hero_content comm_hero_pt'>
        <div className='containerWrapper py-88'>
          <div className='hero_content_row'>
            <div className='hero_content_left commContent_wrap'>
              <h1 className='title-1 text_theme_dark'>
                {heroContent.title}
              </h1>
            </div>
            
            <div className='hero_content_right'>
              <div className='commContent_wrap content-gap-40'>
                <p className='text-16 text_theme_dark'>
                  {renderRichTextWithImages(heroContent.description_block)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HeroSection;