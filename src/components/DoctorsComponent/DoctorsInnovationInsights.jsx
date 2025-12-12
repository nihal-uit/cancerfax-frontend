import React from "react";
import styled from 'styled-components';
import DoctorsInnovativeGalleryMarque from './DoctorsInnovativeGalleryMarque';

const DoctorsInnovationInsights = ({ data }) => {
  return (
    <section className='innovationInsight_sec py-120'>
      <div className='containerWrapper'>
        <Header className='commContent_wrap content-gap-40'>
          <Label className='contentLabel text_theme_dark'>{data?.heading || ''}</Label>
          <Title className='title-3 text_theme_dark'>{data?.subHeading || ''}</Title>
          <Description className='text-16 text_theme_dark'>
            {data?.description_text || ''}
          </Description>
        </Header>
      </div>
      <DoctorsInnovativeGalleryMarque images={data?.media_galary || []} /> 
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
