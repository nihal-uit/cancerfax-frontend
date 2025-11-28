import React from "react";
import styled from 'styled-components';
import DoctorsInnovativeGalleryMarque from './DoctorsInnovativeGalleryMarque';

const DoctorsInnovationInsights = ({ data: doctorsInnovationInsightsSection, loading }) => {

  if (loading) {
    return null;
  }

  const defaultInnovationInsightsContent = {
    label: "Lorem Ipsum",
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a est velit. In ut eros dapibus, consectetur metus nec, dictum metus.",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800",
        alt: "Patient consultation",
        shape: "rounded-left",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800",
        alt: "Medical team",
        shape: "rounded-center",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=800",
        alt: "Doctor with patient",
        shape: "rounded-right",
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800",
        alt: "Doctor with patient",
        shape: "rounded-right",
      },
    ],
  };

  const content = doctorsInnovationInsightsSection ? {
    label: doctorsInnovationInsightsSection.heading || defaultInnovationInsightsContent.label,
    title: doctorsInnovationInsightsSection.subHeading || defaultInnovationInsightsContent.title,
    description: doctorsInnovationInsightsSection.description || defaultInnovationInsightsContent.description,
    images: doctorsInnovationInsightsSection.media_galary || defaultInnovationInsightsContent.images,
  } : defaultInnovationInsightsContent;

  return (
    <section className='innovationInsight_sec py-120'>
      <div className='containerWrapper'>
        <Header className='commContent_wrap content-gap-40'>
          <Label className='contentLabel text_theme_dark'>{content.label}</Label>
          <Title className='title-3 text_theme_dark'>{content.title}</Title>
          <Description className='text-16 text_theme_dark'>
            {content.description}
          </Description>
        </Header>
      </div>
      <DoctorsInnovativeGalleryMarque images={content.images} /> 
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
