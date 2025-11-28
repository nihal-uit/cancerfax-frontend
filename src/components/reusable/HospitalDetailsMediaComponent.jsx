import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchInnovationInsightsSection, fetchInnovationImages, fetchStaticImages } from '../../store/slices/innovationInsightsSlice';
import { getMediaUrl } from '../../services/api';
import styled from 'styled-components';
import Marquee from "react-fast-marquee";

const HospitalDetailsMediaComponent = () => {
  const dispatch = useDispatch();
  const { sectionContent, images, staticImages, loading, error } = useSelector((state) => state.innovationInsights);

  useEffect(() => {
    dispatch(fetchInnovationInsightsSection());
    dispatch(fetchInnovationImages());
    dispatch(fetchStaticImages());
  }, [dispatch]);

  // Fallback content
  const defaultContent = {
    label: 'INNOVATION & INSIGHTS',
    title: 'Why Our Hospital Network Matters',
    description: 'At CancerFax, our strength lies not just in what we recommend, but with whom we partner. We carefully vet and collaborate with leading cancer hospitals and research institutions around the globe, ensuring your care is built on credibility, safety, and excellence.',
    images: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800',
        alt: 'Patient consultation',
        shape: 'rounded-left',
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800',
        alt: 'Medical team',
        shape: 'rounded-center',
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800',
        alt: 'Doctor with patient',
        shape: 'rounded-right',
      },
    ],
    staticImages: [
      {
        id: 4,
        url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
        alt: 'Healthcare professionals',
        shape: 'rounded-left',
      },
      {
        id: 5,
        url: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800',
        alt: 'Patient care',
        shape: 'rounded-center',
      },
      {
        id: 6,
        url: 'https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=800',
        alt: 'Medical consultation',
        shape: 'rounded-right',
      },
    ],
  };

  // Use Strapi data or fallback
  const content = sectionContent || defaultContent;
  const imagesList = Array.isArray(images) && images.length > 0 ? images : defaultContent.images;
  const staticImagesList = Array.isArray(staticImages) && staticImages.length > 0 ? staticImages : defaultContent.staticImages || [];

  const getImageUrl = (image) => {
    if (!image) return null;
    // Check if image is nested in an 'image' property (common Strapi pattern)
    if (image?.image) return getMediaUrl(image.image);
    // Otherwise pass directly to getMediaUrl which handles all cases
    return getMediaUrl(image);
  };

  // Duplicate images for infinite scroll effect
  const duplicatedImages = [...imagesList, ...imagesList];

  return (
    <div className="commContent_wrap content-gap-24">

      <h3 className="title-3">Media</h3>

      <div className="text-14">
        <p>The Cancer Hospital of the Chinese Academy of Medical Sciences (CAMS), comprising its Beijing main campus and Langfang (Hedian) branch, boasts state-of-the-art infrastructure designed to support advanced cancer treatment, research, and patient care.</p>
      </div>

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
              const imageUrl = getImageUrl(image);
              const shapeClass = image.shape || 'rounded-center';
              return (
                <ImageCard key={`${image.id}-${index}`} className={shapeClass}>
                  {imageUrl ? (
                    <Image src={imageUrl} alt={image.alt || 'Hospital network'} />
                  ) : (
                    <ImagePlaceholder>Image Placeholder</ImagePlaceholder>
                  )}
                </ImageCard>
              );
            })}
          </ImagesGrid>
        </Marquee>

        {staticImagesList.length > 0 && (
        <Marquee
          pauseOnHover={true}
          speed={60}
          gradient={true}
          autoFill={true}
          direction={'left'}
          gradientColor={'#F8F8F8'}
        >
          <ImagesGrid>
            {staticImagesList.map((image) => {
              const imageUrl = getImageUrl(image);
              const shapeClass = image.shape || 'rounded-center';
              return (
                <StaticCard key={image.id} className={shapeClass}>
                  {imageUrl ? (
                    <Image src={imageUrl} alt={image.alt || 'Hospital network'} />
                  ) : (
                    <ImagePlaceholder>Image Placeholder</ImagePlaceholder>
                  )}
                </StaticCard>
              );
            })}
          </ImagesGrid>
        </Marquee>
        )}
      </div>  

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

