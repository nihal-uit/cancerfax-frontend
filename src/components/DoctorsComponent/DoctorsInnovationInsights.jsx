import React from "react";
import styled from 'styled-components';
import DoctorsInnovativeGalleryMarque from './DoctorsInnovativeGalleryMarque';
import { renderRichTextWithImages } from "@/utils/strapiHelpers";

const DoctorsInnovationInsights = ({ componentData, data }) => {
  const insightsData = componentData || data;

  if (!insightsData) {
    return null;
  }

  return (
    <section className='innovationInsight_sec py-120'>
      <div className='containerWrapper'>
        <Header className='commContent_wrap content-gap-40'>
          <Label className='contentLabel text_theme_dark'>
            {insightsData?.heading || ''}
          </Label>
          <Title className='title-3 text_theme_dark'>
            {insightsData?.subHeading || ''}
          </Title>
          <Description className='text-16 text_theme_dark'>
            {renderRichTextWithImages(insightsData?.description_block) || insightsData?.description_text || ''}
          </Description>
        </Header>
      </div>
      <DoctorsInnovativeGalleryMarque images={insightsData?.media_galary || []} /> 
    </section>
  );
};

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  @media (max-width: 1024px) {
    margin-bottom: 50px;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const Label = styled.div`
`;

const Title = styled.h3`
`;

const Description = styled.p`
`;

export default DoctorsInnovationInsights;
