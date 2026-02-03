import styled from 'styled-components';
import Marquee from "react-fast-marquee";
import { formatMedia } from "@/utils/strapiHelpers";

const InnovativeGalleryMarqueComponent = ( { data } ) => {

  return (
    <>
      <div className='gallery_marquee_wrap py-120'>
        <Marquee
          pauseOnHover={true}
          speed={60}
          gradient={true}
          autoFill={true}
          direction={'left'}
          gradientColor={'#F8F8F8'}
        >
          <ImagesGrid>
            <ImageCard style={{width: 288, height: 441}}>
              <InnerCard>
                <InnerCard1>
                  <Image src={formatMedia(data?.image_1)} alt={'Hospital network'} />
                </InnerCard1>
                <InnerCard2>
                  <Image src={formatMedia(data?.image_2)} alt={'Hospital network'} />
                </InnerCard2>
              </InnerCard>
            </ImageCard>
            <ImageCard style={{width: 480, height: 441}}>
                <Image src={formatMedia(data?.image_3)} alt={'Hospital network'} />
            </ImageCard>
            <ImageCard style={{width: 288, height: 441}}>
                <Image src={formatMedia(data?.image_4)} alt={'Hospital network'} />
            </ImageCard>
          </ImagesGrid>
        </Marquee>
      </div>
    </>
  );
};

const ImagesGrid = styled.div`
  display: flex;
  gap: 158px;
  width: fit-content;
  margin-right: 158px;
  @media (max-width: 1024px) {
    gap: 60px;
    margin-right: 60px;
  }
  @media (max-width: 575px) {
    gap: 40px;
    margin-right: 40px;
  }
  @media (max-width: 479px) {
    gap: 30px;
    margin-right: 30px;
  }
`;

const ImageCard = styled.div`
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  transition: all 0.4s ease;
  border-radius: 28px;  
`;

const InnerCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  border-radius: 28px;  
`;

const InnerCard1 = styled.div`
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  transition: all 0.4s ease;
  border-radius: 28px;  
`;

const InnerCard2 = styled.div`
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  transition: all 0.4s ease;
  border-radius: 28px;  
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;


export default InnovativeGalleryMarqueComponent;
