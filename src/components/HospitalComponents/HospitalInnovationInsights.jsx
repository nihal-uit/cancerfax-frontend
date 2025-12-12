import React from "react";
import styled from "styled-components";
import { getMediaUrl } from "../../services/api";
import Marquee from "react-fast-marquee";

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;

  @media (max-width: 1024px) {
    margin-bottom: 50px;
  }

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const Label = styled.div``;

const Title = styled.h3``;

const Description = styled.p``;

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
  background: #e0e0e0;
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
  background: linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%);
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  color: #999;
`;

const StaticCard = styled.div`
  position: relative;
  width: 728px;
  height: 300px;
  overflow: hidden;
  background: #e0e0e0;
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

const HospitalInnovationInsights = ( { data: hospitalInnovationInsightsSection }) => {
  const shape = ["rounded-left", "rounded-center", "rounded-right"];

  const content = hospitalInnovationInsightsSection ? {
    label: hospitalInnovationInsightsSection.heading || '',
    title: hospitalInnovationInsightsSection.subHeading || '',
    description: hospitalInnovationInsightsSection.description || '',
    images: hospitalInnovationInsightsSection.media_galary || [],
  } : {};

  const imagesList = Array.isArray(content.images) && content.images.length > 0 ? content.images : [];
  const staticImagesList = Array.isArray(content.staticImages) && content.staticImages.length > 0 ? content.staticImages : [];

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image?.image) return getMediaUrl(image.image);
    return getMediaUrl(image);
  };

  const duplicatedImages = [...imagesList, ...imagesList];

  return (
    <section className="innovationInsight_sec py-120">
      <div className="containerWrapper">
        <Header className="commContent_wrap content-gap-40">
          <Label className="contentLabel text_theme_dark">
            {content.label}
          </Label>
          <Title className="title-3 text_theme_dark">{content.title}</Title>
          <Description className="text-16 text_theme_dark">
            {content.description}
          </Description>
        </Header>
      </div>
      <div className="marquee_wrap">
        <Marquee
          pauseOnHover={true}
          speed={60}
          gradient={true}
          autoFill={true}
          direction={"right"}
          gradientColor={"#F8F8F8"}
        >
          <ImagesGrid>
            {duplicatedImages.map((image, index) => {
              const imageUrl = getImageUrl(image);
              const shapeClass = shape[index % 3] || "rounded-center";
              return (
                <ImageCard key={`${image.id}-${index}`} className={shapeClass}>
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={image.alt || "Hospital network"}
                    />
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
            direction={"left"}
            gradientColor={"#F8F8F8"}
          >
            <ImagesGrid>
              {staticImagesList.map((image, index) => {
                const imageUrl = getImageUrl(image);
                const shapeClass = shape[index % 3] || "rounded-center";
                return (
                  <StaticCard key={image.id} className={shapeClass}>
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={image.alt || "Hospital network"}
                      />
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
    </section>
  );
};

export default HospitalInnovationInsights;
