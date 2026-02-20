import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchDedicatedSupport } from '../../store/slices/dedicatedSupportSlice';
import { getMediaUrl } from '../../services/api';

const DedicatedSupport = ({ data }) => {

  // const contactInfo = [];
  // contactInfo.push(...data?.contact_info_1);
  // contactInfo.push(...data?.contact_info_2);

  const contactInfo = Object.entries(data || {})
  .filter(([key, value]) => key.startsWith("contact_info_") && Array.isArray(value))
  .flatMap(([_, value]) => value);

  return (
    <section className='dedicatedSupport_sec py-120'>
      <div className='containerWrapper'>
        <HeaderSection className='commContent_wrap'>
          <span className='contentLabel'>{data?.heading}</span>
          <h3 className='title-3'>{data?.subHeading}</h3>
        </HeaderSection>

        <CardsGrid>
          {contactInfo.map((card, index) => {
            const isRightAligned = index % 2 === 1; // Right-align every second card
            const iconElement = (
              <IconContainer>
                <IconImage src={getMediaUrl(card.icon)} alt={card.label} />
              </IconContainer>
            );

            return (
              <Card key={card.id}>
                <CardContent isRightAligned={isRightAligned}>
                  {!isRightAligned && iconElement}
                  
                  <TextContent>
                    <CardTitle>{card.label}</CardTitle>
                    <CardDescription>{card.value}</CardDescription>
                    
                    <EmailButton className='btn btn-pink-solid' href={`mailto:${card.email}`}>
                      {card.email}
                    </EmailButton>
                  </TextContent>
                  
                  {isRightAligned && iconElement}
                </CardContent>
              </Card>
              
            );
          })}
        </CardsGrid>
      </div>
    </section>
  );
};

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 27px;
  align-items: center;
  
  @media (max-width: 1200px) {
    gap: 24px;
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: auto;
  }
`;

const Card = styled.div`
  background: #FFFFFF;
  border-radius: 24px;
  padding: 25px 30px;
  border: 1px solid #E3E2E2;
  transition: all 0.3s ease;
  min-height: 215px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
    
  @media (max-width: 768px) {
  }
`;

const CardContent = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  height: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
  }
`;

const IconContainer = styled.div`
  flex-shrink: 0;
  width: 165px;
  height: 165px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
  
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    gap: 15px;
  }
`;

const CardTitle = styled.h3`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #36454F;
  margin: 0;
  line-height: 28px;
`;

const CardDescription = styled.p`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
  color: #454140;
  margin: 0;
`;

const EmailButton = styled.a`
`;

export default memo(DedicatedSupport);
