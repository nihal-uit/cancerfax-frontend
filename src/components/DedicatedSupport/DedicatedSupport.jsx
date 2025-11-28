import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchDedicatedSupport } from '../../store/slices/dedicatedSupportSlice';
import { getMediaUrl } from '../../services/api';

// Default fallback data
const defaultData = {
  subtitle: 'CONTACT US',
  title: 'More Dedicated Support',
  cards: [
    {
      id: 1,
      title: 'Press Inquiry',
      description: 'For any press-related inquiry, please write to us on the below email directly.',
      email: 'pressinfo@email.com',
      icon: '../images/dedicated_support_img-1.svg', // Fallback emoji
    },
    {
      id: 2,
      title: 'Business Inquiry',
      description: 'For any press-related inquiry, please write to us on the below email directly.',
      email: 'business@email.com',
      icon: '../images/dedicated_support_img-2.svg', // Fallback emoji
    },
  ],
};

const DedicatedSupport = () => {
  const dispatch = useDispatch();
  const { sectionData, cards } = useSelector((state) => state.dedicatedSupport);

  useEffect(() => {
    dispatch(fetchDedicatedSupport());
  }, [dispatch]);

  // Extract data with fallbacks
  const subtitle = sectionData?.attributes?.subtitle || defaultData.subtitle;
  const title = sectionData?.attributes?.title || defaultData.title;
  const supportCards = cards.length > 0 ? cards : defaultData.cards;

  return (
    <section className='dedicatedSupport_sec py-120'>
      <div className='containerWrapper'>
        <HeaderSection className='commContent_wrap'>
          <span className='contentLabel'>{subtitle}</span>
          <h3 className='title-3'>{title}</h3>
        </HeaderSection>

        <CardsGrid>
          {supportCards.map((card, index) => {
            const cardData = card.attributes || card;
            const cardTitle = cardData.title;
            const cardDescription = cardData.description;
            const cardEmail = cardData.email;
            const isRightAligned = index % 2 === 1; // Right-align every second card
            
            // Get icon/image URL
            let iconUrl = null;
            if (cardData.icon?.data?.attributes?.url) {
              iconUrl = getMediaUrl(cardData.icon.data.attributes.url);
            }

            const iconElement = (
              <IconContainer>
                {iconUrl ? (
                  <IconImage src={iconUrl} alt={cardTitle} />
                ) : (
                  <IconImage src={cardData.icon} alt={cardTitle} />
                )}
              </IconContainer>
            );

            return (
              <Card key={card.id || index}>
                <CardContent isRightAligned={isRightAligned}>
                  {!isRightAligned && iconElement}
                  
                  <TextContent>
                    <CardTitle>{cardTitle}</CardTitle>
                    <CardDescription>{cardDescription}</CardDescription>
                    
                    <EmailButton className='btn btn-pink-solid' href={`mailto:${cardEmail}`}>
                      {cardEmail}
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
  display: flex;
  gap: 27px;
  align-items: center;
  
  @media (max-width: 1200px) {
    gap: 24px;
  }
  
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
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
