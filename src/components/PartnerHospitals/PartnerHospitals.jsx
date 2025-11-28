import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Marquee from "react-fast-marquee";
import { fetchPartnerHospitals } from '../../store/slices/partnerHospitalsSlice';

// Default fallback data (defined outside component to prevent recreating on each render)
const defaultSectionData = {
  subtitle: 'HAND IN HAND',
  title: 'Our Partner Hospitals',
  description: 'Dr. Wang is skilled in individualized targeted and immunotherapy for rare tumors and lung cancer, as well as multidisciplinary comprehensive treatment',
};

const partnersData = [
  { 
    id: 1, 
    name: 'ABInBev',
    logo: '../images/partner-logo-1.svg',
  },
  { 
    id: 2, 
    name: 'Nestlé Purina',
    logo: '../images/partner-logo-3.svg',
  },
  { 
    id: 3, 
    name: 'Colgate',
    logo: '../images/partner-logo-4.svg',
  },
  { 
    id: 4, 
    name: 'Merck',
    logo: '../images/partner-logo-5.svg',
  },
  { 
    id: 5, 
    name: 'Sanofi',
    logo: '../images/partner-logo-6.svg',
  },
  { 
    id: 6, 
    name: 'Tata Steel',
    logo: '../images/partner-logo-7.svg',
  },
];

const PartnerHospitals = () => {
  const dispatch = useDispatch();
  const { sectionData, partners } = useSelector((state) => state.partnerHospitals);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    dispatch(fetchPartnerHospitals());
  }, [dispatch]);

  // Extract section data with fallbacks
  const sectionAttributes = sectionData?.attributes || {};
  const subtitle = sectionAttributes.subtitle || defaultSectionData.subtitle;
  const title = sectionAttributes.title || defaultSectionData.title;
  const description = sectionAttributes.description || defaultSectionData.description;

  // Memoize duplicated logos to prevent recreation
  return (
    <SectionWrapper>
      <ContentWrapper className='containerWrapper'>
        <HeaderSection className='commContent_wrap'>
          <LeftColumn>
            <span className='contentLabel'>{subtitle}</span>
            <h3 className='title-3'>{title}</h3>
          </LeftColumn>
          <RightColumn>
            <p className='text-16 line-2-text'>{description}</p>
          </RightColumn>
        </HeaderSection>

      <div className='marquee_wrap'>
        <Marquee
          pauseOnHover={true}
          speed={60}
          gradient={false}
          autoFill={true}
          direction={'left'}
        >
            {partnersData.map((partners, index) => {
              return (
                <div key={partners.id} style={{ flex: "0 0 auto", margin: "0 30px" }}>
                  <img
                    src={partners.logo}
                    alt={partners.name}
                    style={{ height: "24px", objectFit: "contain" }}
                  />
                </div>
              );
            })}
        </Marquee>
      </div>    
      </ContentWrapper>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section`
  background: #F8F8F8;
  padding: 100px 0;
  @media (max-width: 1024px) {
    padding: 60px 0;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  
  @media (max-width: 1024px) {
    gap: 60px;
  }
`;

const HeaderSection = styled.div`
  display: grid;
  grid-template-columns: 472px 1fr;
  gap: 110px;
  align-items: flex-end;
  
  @media (max-width: 1024px) {
    gap: 60px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightColumn = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  
  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

export default memo(PartnerHospitals);

