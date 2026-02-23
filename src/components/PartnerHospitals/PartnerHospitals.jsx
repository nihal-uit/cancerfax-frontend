import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Marquee from "react-fast-marquee";
import { renderRichTextWithImages } from '@/utils/strapiHelpers';
import { formatMedia } from '@/utils/strapiHelpers';
import { fetchPartners } from '../../store/slices/partnerHospitalsSlice';

const PartnerHospitals = ({ data }) => {
  const dispatch = useDispatch();
  const { partners, loading } = useSelector((state) => state.partnerHospitals);

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);

  const partnersList = Array.isArray(partners) ? partners : [];
  const getPartnerLogo = (partner) => {
    const logo = partner?.attributes?.logo ?? partner?.logo;
    return formatMedia(logo);
  };
  const getPartnerName = (partner) =>
    partner?.attributes?.name ?? partner?.name ?? partner?.attributes?.alternativeText ?? 'Partner';
  const getPartnerId = (partner, index) =>
    partner?.id ?? partner?.documentId ?? index;

  return (
    <SectionWrapper>
      <ContentWrapper className='containerWrapper'>
        <HeaderSection className='commContent_wrap'>
          <LeftColumn>
            <span className='contentLabel'>{data?.heading}</span>
            <h3 className='title-3'>{data?.subHeading}</h3>
          </LeftColumn>
          <RightColumn>
            <p className='text-16 line-2-text'>{renderRichTextWithImages(data?.description_block) || data?.description_text}</p>
          </RightColumn>
        </HeaderSection>

        <div className='marquee_wrap'>
          {loading ? (
            <MarqueePlaceholder>Loading partners...</MarqueePlaceholder>
          ) : partnersList.length > 0 ? (
            <Marquee
              pauseOnHover={true}
              speed={60}
              gradient={false}
              autoFill={true}
              direction="left"
            >
              {partnersList.map((partner, index) => {
                const logoUrl = getPartnerLogo(partner);
                if (!logoUrl) return null;
                return (
                  <LogoItem key={getPartnerId(partner, index)}>
                    <img
                      src={logoUrl}
                      alt={getPartnerName(partner)}
                      loading="lazy"
                    />
                  </LogoItem>
                );
              })}
            </Marquee>
          ) : null}
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

const LogoItem = styled.div`
  flex: 0 0 auto;
  margin: 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 24px;
    width: auto;
    max-width: 120px;
    object-fit: contain;
  }
`;

const MarqueePlaceholder = styled.div`
  text-align: center;
  padding: 24px;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  color: #36454F;
`;

export default memo(PartnerHospitals);

