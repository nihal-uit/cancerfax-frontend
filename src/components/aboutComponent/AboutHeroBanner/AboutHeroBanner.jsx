import React from "react";
import styled from "styled-components";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Marquee from "react-fast-marquee";

const AboutHeroBanner = ({ sectionClass }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const content = {
    label: "Accredited Excellence",
    title: "Our Certifications and Recognitions in Healthcare Excellence",
    image: "../images/about-banner-slider-img-1.jpg",
    imageAlt: "How It Works",
  };

  return (
    <section className="hospital_slider_sec ourCertifications_sec">
      <div className="containerWrapper one_side_full_container ms-0 me-auto ps-0">
        <div className="hospital_slider_wrapper">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            // loop={true}
            modules={[EffectFade]}
            effect="fade"
          >
            <SwiperSlide>
              <ScrollAnimationComponent animationVariants={fadeIn}>
                <div className="hospital_info_slider">
                  <img
                    src="../images/about-hero-banner-img.jpg"
                    alt=""
                  />
                </div>
              </ScrollAnimationComponent>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="containerWrapper z-2 position-relative py-120">
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <CommContent className="commContent_wrap">
            <Label className="contentLabel">
              {content.label || "Accredited Excellence"}
            </Label>
            <Title className="title-3">
              {content.title || "Our Certifications and Recognitions in Healthcare Excellence"}
            </Title>
          </CommContent>
        </ScrollAnimationComponent>
        <div className='marquee_wrap mt-85'>
          <Marquee
            pauseOnHover={true}
            speed={60}
            gradient={true}
            autoFill={true}
            direction={'left'}
            gradientColor={'#36454F'}
          >
            <div className="certificate_grid">
              {Array.from({ length: 5 }).map((item, index) => (
                <div key={index} className="certificate__item">
                  <img
                    src={`./images/our_certifications_logo_${index + 1}.svg`}
                    alt="logos"
                  />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
        {/* <div className="ratio__holder">
          <div className="imageSection ratio">
            <img src={content.image} alt={content.imageAlt} />
          </div>
        </div> */}
      </div>
    </section>
  );
};


const CommContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  text-align: center;
  width: 894px;
  max-width: 100%;
  margin-inline: auto;
  @media (max-width: 1024px) {
    gap: 36px;
  }

  @media (max-width: 768px) {
    gap: 28px;
  }

  @media (max-width: 480px) {
    gap: 24px;
  }
`;

const Label = styled.p`
  color: ${(props) => props.theme.colors.white};
`;

const Title = styled.h3`
  color: ${(props) => props.theme.colors.white};
`;

export default React.memo(AboutHeroBanner);
