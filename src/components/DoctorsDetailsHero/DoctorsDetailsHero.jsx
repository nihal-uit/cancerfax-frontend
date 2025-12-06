import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const DoctorsDetailsHero = ({ data }) => {

  return (
    <section className='homeHero_sec'>
      <div className='home-hero-banner hospital_details_hero'>
        <div className='ratio'>
          <BackgroundVideo className="video" preload="none" autoplay="true" loop="true" muted="true" playsinline="true" poster="../videos/doctors-video-poster.jpg">
          <source src={data?.video?.url || '../videos/doctors-video.mp4'} type="video/mp4" />
        </BackgroundVideo>
        </div>
      </div>
      <div className='heroContent_wrap'>
        <div className='containerWrapper'>
          <div className='commContent_wrap'>
       
          <HeroContentGrid>
            <TopRow>
              <DoctorTitle className='title-1'>{data?.first_name } {data?.last_name ? data?.last_name : ''}</DoctorTitle>
              <SubText className="text-18">{data?.about}</SubText>
            </TopRow>
            
            <BottomRow>
              <Button className='btn btn-md btn-pink-solid' href={data?.cta?.url || '#'} target={data?.cta?.target || '_blank'}>
                {data?.cta?.text || 'Lorem Ipsum'}
              </Button>
              <Description className='text-16'>
                {data?.about || 'Lorem Ipsum'}
              </Description>
            </BottomRow>
          </HeroContentGrid>          
         </div>
        </div>
      </div>
    </section>
  );
};


const BackgroundVideo = styled.video`
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


export default DoctorsDetailsHero;
