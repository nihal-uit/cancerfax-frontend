import styled from "styled-components";
import Marquee from "react-fast-marquee";
import { formatMedia } from "../../utils/strapiHelpers";

const DoctorsInnovativeGalleryMarque = ({ images }) => {
  const imagesList = Array.isArray(images) && images.length > 0 ? images : [];

  if (imagesList.length === 0) {
    return null;
  }

  const duplicatedImages = [...imagesList, ...imagesList];

  return (
      <div className="gallery_marquee_wrap">
        <Marquee
          pauseOnHover={true}
          speed={60}
          gradient={true}
          autoFill={true}
          direction={"left"}
          gradientColor={"#F8F8F8"}
        >
          <ImagesGrid>
          {duplicatedImages.map((image, index) => {
            const imageUrl = formatMedia(image);
            return (
              <ImageCard key={`${image?.id || index}`} style={{ width: 288, height: 441 }}>
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={image?.alternativeText || "Doctor network"}
                  />
                ) : null}
            </ImageCard>
            );
          })}
          </ImagesGrid>
        </Marquee>
      </div>
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

export default DoctorsInnovativeGalleryMarque;
