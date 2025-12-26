import React from "react";
import styled from 'styled-components';
import Marquee from "react-fast-marquee";
import { formatMedia } from '@/utils/strapiHelpers';

const HospitalDetailsMediaComponent = ({ data, loading }) => {
  if (loading || !data) {
    return null;
  }

  const mediaGallery = data?.media_galary || [];
  
  if (mediaGallery.length === 0) {
    return null;
  }

  // Duplicate images for infinite scroll effect
  const duplicatedImages = [...mediaGallery, ...mediaGallery];
  
  const shapeClasses = ['rounded-left', 'rounded-center', 'rounded-right'];

  return (
    <div className="commContent_wrap content-gap-24">
      {data?.heading && <h3 className="title-3">{data.heading}</h3>}

      {data?.description_text && (
        <div className="text-14">
          <p>{data.description_text}</p>
        </div>
      )}

      {duplicatedImages.length > 0 && (
        <div className='marquee_wrap'>
          <Marquee
            pauseOnHover={true}
            speed={60}
            gradient={true}
            autoFill={true}
            direction={'right'}
            gradientColor={'#F8F8F8'}
          >
            <ImagesGrid>
              {duplicatedImages.map((image, index) => {
                const imageUrl = formatMedia(image);
                const shapeClass = shapeClasses[index % 3] || 'rounded-center';
                return (
                  <ImageCard key={`${image?.id || image?.documentId || index}-${index}`} className={shapeClass}>
                    {imageUrl ? (
                      <Image src={imageUrl} alt={image?.alternativeText || 'Hospital media'} />
                    ) : null}
                  </ImageCard>
                );
              })}
            </ImagesGrid>
          </Marquee>
        </div>
      )}
    </div> 
  );
};


const ImagesGrid = styled.div`
  display: flex;
  gap: 24px;
  width: fit-content;
  margin-right: 24px;
  @media (max-width: 768px) {
    gap: 20px;
    margin-right: 20px;
  }
`;

const ImageCard = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 453px;
  height: 300px;
  overflow: hidden;
  background: #E0E0E0;
  transition: all 0.4s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  /* Different rounded shapes */
  &.rounded-left {
    border-radius: 40px;
  }
  
  &.rounded-center {
    border-radius: 100px;
    width: 503px;
  }
  
  &.rounded-right {
    border-radius: 40px;
    width: 401px;
  }

  @media (max-width: 768px) {
    width: 320px;
    height: 280px;
    
    &.rounded-left {
      border-radius: 30px;
    }
    
    &.rounded-center {
      border-radius: 80px;
      width: 340px;
    }
    
    &.rounded-right {
      border-radius: 30px;
      width: 310px;
    }
  }
  @media (max-width: 479px) {
    height: 280px;
    width: 300px;

    &.rounded-left {
      border-radius: 30px;
    }
    
    &.rounded-center {
      border-radius: 80px;
      width: 270px;
    }
    
    &.rounded-right {
      border-radius: 80px;
      width: 270px;
    }
  }  
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #E0E0E0 0%, #C0C0C0 100%);
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #999;
`;

const StaticCard = styled.div`
  position: relative;
  width: 728px;
  height: 300px;
  overflow: hidden;
  background: #E0E0E0;
  transition: all 0.4s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  /* Different rounded shapes */
  &.rounded-left {
    border-radius: 40px;
  }
  
  &.rounded-center {
    width: 378px;
    border-radius: 100px;
  }
  
  &.rounded-right {
    width: 378px;
    border-radius: 100px;
  }
   
  @media (max-width: 768px) {
    height: 280px;
    width: 360px;

    &.rounded-left {
      border-radius: 30px;
    }
    
    &.rounded-center {
      border-radius: 80px;
      width: 300px;
    }
    
    &.rounded-right {
      border-radius: 80px;
      width: 300px;
    }
  }
  
  @media (max-width: 479px) {
    height: 280px;
    width: 300px;

    &.rounded-left {
      border-radius: 30px;
    }
    
    &.rounded-center {
      border-radius: 80px;
      width: 270px;
    }
    
    &.rounded-right {
      border-radius: 80px;
      width: 270px;
    }
  }
`;

export default HospitalDetailsMediaComponent;

