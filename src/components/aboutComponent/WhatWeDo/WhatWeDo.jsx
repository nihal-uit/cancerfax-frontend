import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";
import { formatMedia, renderRichTextWithImages } from "@/utils/strapiHelpers";

const WhatWeDo = ( { data } ) => {

  const carouselRef = useRef(null);

  return (
    <section className='WhatWeDo_sec with_border py-120'>
      <div className='containerWrapper'>
        <HeaderSection className="commContent_wrap">
          <HeaderContent>
            <Label className="contentLabel">{data?.heading || ''}</Label>
            <Title className="title-3">{data?.subHeading || ''}</Title>
            <Description className='text-16'>{renderRichTextWithImages(data?.description_block) || data?.description_text || ''}</Description>
          </HeaderContent>
          {data?.cta?.text && (
            <Link
              className="btn btn-pink-solid"
              to={data?.cta?.URL || "#"}
              target={data?.cta?.target || "_blank"}
            >
              {data?.cta?.text}
            </Link>
          )}
        </HeaderSection>        
        <div className="swiper__holder">
          <Swiper
            ref={carouselRef}
            spaceBetween={24}
            slidesPerView={1}
            // loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              480: { slidesPerView: 1.2 },
              767: { slidesPerView: 1.5 },
              992: { slidesPerView: 2.1 },
              1200: { slidesPerView: 2.17 },
              // 1600: { slidesPerView: 1.8 },
              2080: { slidesPerView: 2.5 },
            }}
            modules={[Navigation]}
            navigation={{
              nextEl: ".customNext",
              prevEl: ".customPrev",
            }}
            style={{ overflow: "visible" }}
            className="commCircle_navigation"
          >
            {data?.cards?.map((item) => {
              return (
                <SwiperSlide
                  key={item.id}
                >
                  <TherapyCard $hasUrl={!!item?.url}>
                    <CardImage image={formatMedia(item.image)}>
                      <CardOverlay className="card-overlay">
                        <CardTitle>{item.title}</CardTitle>
                        <PlusIcon>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.3901 3.54893C10.1197 3.8155 10.0944 4.23674 10.316 4.53229L10.3826 4.60956L14.9583 9.24967L3.25 9.24967C2.83579 9.24967 2.5 9.58546 2.5 9.99967C2.5 10.382 2.78611 10.6976 3.15592 10.7438L3.25 10.7497H14.9583L10.3826 15.3898C10.116 15.6602 10.0966 16.0817 10.3224 16.3741L10.3901 16.4504C10.6605 16.717 11.082 16.7364 11.3744 16.5106L11.4507 16.4429L17.2841 10.5262C17.548 10.2586 17.57 9.84208 17.3501 9.54961L17.2841 9.47312L11.4507 3.55645C11.1599 3.26149 10.6851 3.25812 10.3901 3.54893Z"
                              fill="#36454F"
                            />
                          </svg>
                        </PlusIcon>
                      </CardOverlay>
                      <CardHoverContent className="card-hover-content">
                        <CardLink to={item?.url || '#'} $hasUrl={!!item?.url}>
                          <HoverTitle>{item?.title || ''}</HoverTitle>
                          <HoverDescription>{renderRichTextWithImages(item?.description_block) || item?.description_text || ''}</HoverDescription>
                        </CardLink>
                      </CardHoverContent>
                    </CardImage>
                  </TherapyCard>
                </SwiperSlide>
              );
            })}

            <NavButton className="customPrev">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="32"
                viewBox="0 0 46 32"
                fill="none"
              >
                <path
                  d="M15.8656 31.7313L17.6493 30.01L4.75497 17.1156H45.0481V14.6156H4.70684L17.5868 1.72125L15.8656 0L-3.43323e-05 15.8656L15.8656 31.7313Z"
                  fill="#727B81"
                />
              </svg>
            </NavButton>
            <NavButton className="customNext">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="32"
                viewBox="0 0 46 32"
                fill="none"
              >
                <path
                  d="M29.1825 31.7313L27.3988 30.01L40.2931 17.1156H0V14.6156H40.3413L27.4613 1.72125L29.1825 0L45.0481 15.8656L29.1825 31.7313Z"
                  fill="#727B81"
                />
              </svg>
            </NavButton>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 60px;
  gap: 40px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 40px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 700px;

  @media (max-width: 768px) {
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 16px;
    max-width: 100%;
  }
`;

const Label = styled.p`
  color: #36454f;
`;

const Title = styled.h3`
  color: #36454f;
`;

const Description = styled.p`
  color: #36454f;
`;

const TherapyCard = styled.div`
  position: relative;
  width: 100%;
  height: 520px;
  background: #ffffff;
  border-radius: 40px;
  overflow: hidden;
  cursor: ${(props) => (props.$hasUrl ? 'pointer' : 'default')};
  transition: transform 0.3s ease;
  flex-shrink: 0;
  scroll-snap-align: start;
  @media (max-width: 1024px) {
    height: 420px;
  }
  &:hover {
    transform: translateY(-4px);
  }

  &:hover .card-overlay {
    opacity: 0;
  }

  &:hover .card-hover-content {
    opacity: 1;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) =>
      props.image ? `url(${props.image})` : "rgba(182, 181, 181, 0.33)"}
    center/cover;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 24px;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CardOverlay = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: opacity 0.3s ease;

  @media (max-width: 1024px) {
    border-radius: 24px;
    padding: 16px 20px;
  }

  @media (max-width: 768px) {
    border-radius: 20px;
    padding: 14px 18px;
  }

  @media (max-width: 480px) {
    border-radius: 16px;
    padding: 12px 16px;
  }
`;

const CardLink = styled(Link)`
  cursor: ${(props) => (props.$hasUrl ? 'pointer' : 'default')};
  text-decoration: none;
  color: inherit;
`;

const CardHoverContent = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(0deg, rgba(54, 69, 79, 1) 0%, rgba(54, 69, 79, 0) 100%);
  padding: 40px 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 24px;
  opacity: 0;
  transition: all 0.3s ease;
  pointer-events: none;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 210px;
    -webkit-mask-image: -webkit-gradient(linear, left bottom, left top, color-stop(60%, rgb(0, 0, 0)), to(transparent));
    -webkit-mask-image: linear-gradient(to top, rgb(0, 0, 0) 60%, transparent 90%);
    mask-image: -webkit-gradient(linear, left bottom, left top, color-stop(60%, rgb(0, 0, 0)), to(transparent));
    mask-image: linear-gradient(to top, rgb(0, 0, 0) 60%, transparent 90%);
    backdrop-filter: blur(30px);
    transition: all 0.3s ease;
    opacity: 0;
  }

  ${TherapyCard}:hover & {
    &:after {
      opacity: 1;
    }
  }

  ${TherapyCard}:hover & {
    opacity: 1;
    pointer-events: auto;
  }

  @media (max-width: 1024px) {
    padding: 32px 32px;
    gap: 24px;
  }

  @media (max-width: 480px) {
    padding: 24px 24px;
    gap: 20px;
  }
`;

const HoverTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  line-height: 1.3;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    font-size: 22px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 1.35;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const HoverDescription = styled.p`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 16px;
  font-weight: 300;
  color: #ffffff;
  line-height: calc(24 / 16);
  margin: 0;
  position: relative;
  z-index: 2;

  @media (max-width: 575px) {
    font-size: 14px;
    line-height: 1.4;
  }
`;

const CardTitle = styled.h3`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
  line-height: 1.4;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const PlusIcon = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 300;
  color: ${(props) => props.theme.colors.primary};
  flex-shrink: 0;

  @media (max-width: 1024px) {
    width: 24px;
    height: 24px;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
    font-size: 18px;
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    font-size: 16px;
  }
`;

const NavButton = styled.button`
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 28px;
    height: 20px;
    @media (max-width: 768px) {
      width: 24px;
      height: 18px;
    }
  }
`;



export default WhatWeDo;
