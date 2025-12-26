import React, { useRef } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { formatMedia } from "@/utils/strapiHelpers";

const CancerTreatmentTopOncologists = ({ data }) => {
  const section = data;
  const doctors = Array.isArray(section?.doctors) ? section.doctors : [];
  const carouselRef = useRef(null);

  if (!section?.isActive || doctors.length === 0) {
    return null;
  }

  return (
    <section className='topOncologists_sec pb-120'>
      <div className='containerWrapper' style={{overflow: 'hidden'}}>
        <HeaderSection className="commContent_wrap">
          <HeaderContent>
            {section?.heading && (
              <Title className="title-3">{section.heading}</Title>
            )}
            {(section?.subHeading || section?.description_text) && (
              <Description className='text-16'>
                {section.subHeading || section.description_text}
              </Description>
            )}
          </HeaderContent>
        </HeaderSection>        
        <div className="swiper__holder">
          <Swiper
            ref={carouselRef}
            spaceBetween={24}
            slidesPerView={1}
            // loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              767: { slidesPerView: 2 },
              992: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            modules={[Navigation]}
            navigation={{
              nextEl: ".customNext",
              prevEl: ".customPrev",
            }}
            style={{ overflow: "visible" }}
            className="commCircle_navigation"
          >
            {doctors.map((doctor) => {
              const name = [doctor?.first_name, doctor?.last_name]
                .filter(Boolean)
                .join(" ");
              const specialty =
                doctor?.specialization || doctor?.hospital?.name || "";
              const doctorImage =
                formatMedia(doctor?.profilePicture) ||
                formatMedia(doctor?.hospital?.hospitalImage);

              if (!name && !doctorImage) return null;

              return (
                <SwiperSlide key={doctor.id || name}>
                  <TherapyCard>
                    <CardImage image={doctorImage}>
                      <CardContent>
                        <div className='doctors-text'>
                          {name && <HospitalName>{name}</HospitalName>}
                          {specialty && <span>{specialty}</span>}
                        </div>
                        <ArrowIcon>
                          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </ArrowIcon>
                      </CardContent>
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

const Title = styled.h3`
  color: #36454f;
`;

const Description = styled.p`
  color: #36454f;
`;

const TherapyCard = styled.div`
  position: relative;
  width: 100%;
  height: 309px;
  background: #ffffff;
  border-radius: 40px;
  overflow: hidden;
  cursor: pointer;
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

const CardContent = styled.div`
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 28px);
  height: 64px;
  padding: 0 12px;
  z-index: 2;
  background: white;
  border-radius: 12px;
  transition: all 0.4s ease;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  .doctors-text {
    display: flex;
    justify-content: flex-start;
    gap: 2px;
    flex-direction: column;
    color: #008080;
    font-size: 14px;
  }
`;

const HospitalName = styled.h5`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #36454F;
  margin: 0;
  line-height: 1.4;
  flex: 1;
  transition: all 0.3s ease;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  @media (max-width: 1200px) {
    font-size: 16px;
  }
`;

const ArrowIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;
  cursor: pointer;
  
  svg {
    width: 20px;
    height: 20px;
    stroke: #36454F;
    transition: all 0.3s ease;
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



export default CancerTreatmentTopOncologists;
