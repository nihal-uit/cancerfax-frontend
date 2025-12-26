import React from 'react';
import styled from 'styled-components';
import { getMediaUrl } from '../../services/api';

const DrugsDetailsHero = ({ data}) => {
  return (
    <section className='homeHero_sec'>

      <div className='home-hero-banner hospital_details_hero'>
        <div className='ratio'>
          <BackgroundImage
            src={getMediaUrl(data?.featuredImage)}
            alt={data?.heading || ''}
            loading="lazy"
          />
        </div>
      </div>
      <div className='heroContent_wrap'>
        <div className='containerWrapper'>
          <div className='commContent_wrap'>       
          <HeroContentGrid>
            <TopRow>
              <div>
                <HospitalName className='title-1 mb-3'>{data?.heading}</HospitalName>
                <Description className='text-16'>{data?.subHeading}</Description>
              </div>
              
              <IconButton >
                <Icon 
                  src="../images/icon-share.svg"
                  alt=""
                />
              </IconButton>
            </TopRow>
            
          </HeroContentGrid>          
         </div>
        </div>
      </div>
    </section>
  );
};


const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const HeroContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 50px;
`;

const TopRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
`;

const HospitalName = styled.h1`
  color: ${props => props.theme.colors.white};
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 48px;
  padding: 16px 20px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.colors.white};
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    width: 52px;
  }
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.white};
`;

export default DrugsDetailsHero;