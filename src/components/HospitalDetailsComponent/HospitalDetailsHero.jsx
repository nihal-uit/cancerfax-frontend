import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatMedia, formatRichText } from '@/utils/strapiHelpers';

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const Tagline = styled.div`
  color: ${props => props.theme.colors.white};
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

const ActionButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 240px;
  
  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const DirectionsButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 20px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.colors.white};
  background: transparent;
  color: ${props => props.theme.colors.white};
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 48px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    flex: 1;
    padding: 14px 16px;
    font-size: 16px;
  }
`;

const IconButton = styled(Link)`
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

const BottomRow = styled.div`
  display: flex;
  width: 100%;
  padding-top: 40px;
  gap: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);

  @media (max-width: 991px) {
    flex-wrap: wrap;
  }

  @media (max-width: 575px) {
    padding-top: 30px;
    gap: 24px;
    flex-direction: column;
  }
`;

const Description = styled.p`
  color: ${props => props.theme.colors.white};
`;

const HospitalDetailsHero = ({ data, loading }) => {
  if (loading || !data?.isActive) {
    return null;
  }

  return (
    <section className='homeHero_sec'>

      <div className='home-hero-banner hospital_details_hero'>
        <div className='ratio'>
          <BackgroundImage
            src={formatMedia(data?.background_image)}
            alt={data?.hospital_name || ''}
            loading="lazy"
          />
        </div>
      </div>
      <div className='heroContent_wrap'>
        <div className='containerWrapper'>
          <div className='commContent_wrap'>
          {data?.hospital_title && <Tagline className='contentLabel'>{data?.hospital_title}</Tagline>}
        
          <HeroContentGrid>
            <TopRow>
              {data?.hospital_name && <HospitalName className='title-1'>{data?.hospital_name}</HospitalName>}
              
              <ActionButtonsGroup>
                {data?.get_directions_url && (
                  <DirectionsButton to={data?.get_directions_url} target="_blank">
                    <Icon 
                      src="../images/icon-location.svg"
                      alt=""
                    />
                    Get Directions
                  </DirectionsButton>
                )}
                
                {data?.share_url && (
                  <IconButton to={data?.share_url} target='_blank'>
                    <Icon 
                      src="../images/icon-share.svg"
                      alt=""
                    />
                  </IconButton>
                )}
              </ActionButtonsGroup>
            </TopRow>
            
            <BottomRow>
              {data?.cta?.URL && (
                <Link className='btn btn-md btn-pink-solid' to={data?.cta?.URL} target={data?.cta?.target || '_self'}>
                  {data?.cta?.text || 'Submit reports & check eligibility'}
                </Link>
              )}
              
              {data?.hospital_description && (
                <Description className='text-16'>
                  {formatRichText(data?.hospital_description)}
                </Description>
              )}
            </BottomRow>
          </HeroContentGrid>          
         </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalDetailsHero;
