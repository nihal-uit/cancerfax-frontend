import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatMedia } from '../../utils/strapiHelpers';

const DoctorsDetailsHero = ({ data, loading }) => {
  if (loading || !data?.isActive) {
    return null;
  }

  return (
    <section className='homeHero_sec'>
      <div className='home-hero-banner hospital_details_hero'>
        <div className='ratio'>
          {data?.background_image ? (
            <BackgroundImage
              src={formatMedia(data?.background_image)}
              alt={data?.background_image?.alternativeText || data?.doctor_name || ''}
            />
          ) : null}
        </div>
      </div>
      <div className='heroContent_wrap'>
        <div className='containerWrapper'>
          <div className='commContent_wrap'>
            <HeroContentGrid>
              <TopRow>
                {/* {data?.doctor_image && (
                  <DoctorImageWrapper>
                    <DoctorImage
                      src={formatMedia(data?.doctor_image)}
                      alt={data?.doctor_image?.alternativeText || data?.doctor_name || ''}
                    />
                  </DoctorImageWrapper>
                )} */}
                <DoctorTitle className='title-1'>{data?.doctor_name || ''}</DoctorTitle>
                <SubText className="text-18">{data?.doctor_title || ''}</SubText>
              </TopRow>

              <BottomRow>
                {data?.right_side_content && (
                  <Description className='text-16'>
                    {data?.right_side_content || ''}
                  </Description>
                )}
                {data?.cta?.text && (
                  <Link 
                    className='btn btn-md btn-pink-solid' 
                    to={data?.cta?.URL || '#'} 
                    target={data?.cta?.target || '_self'}
                  >
                    {data?.cta?.text}
                  </Link>
                )}
              </BottomRow>
            </HeroContentGrid>
          </div>
        </div>
      </div>
    </section>
  );
};


const HeroContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 50px;
`;

const TopRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
`;

const DoctorTitle = styled.h1`
  color: ${props => props.theme.colors.white};
`;

const SubText = styled.p`
  color: ${props => props.theme.colors.white};
`;

const BottomRow = styled.div`
  display: flex;
  width: 100%;
  padding-top: 40px;
  gap: 80px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    gap: 40px;
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

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const DoctorImageWrapper = styled.div`
  width: 100%;
  max-width: 327px;
  height: 460px;
  margin-bottom: 20px;
  
  @media (max-width: 1200px) {
    max-width: 280px;
    height: 410px;
  }
  
  @media (max-width: 768px) {
    max-width: 270px;
    height: auto;
    margin: 0 auto 20px;
  }
`;

const DoctorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 40px;
  
  @media (max-width: 768px) {
    border-radius: 24px;
  }
`;

export default DoctorsDetailsHero;
