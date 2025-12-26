import React from "react";
import styled from 'styled-components';
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { getMediaUrl } from "@/services/api";

const OurValues = ( { data } ) => {
  return (
    <section className='ourValues_sec py-120'>
      <div className='containerWrapper'>
        <div className="row g-4">
          <div className="col-lg-8 mission_left">
            <ScrollAnimationComponent animationVariants={slideLeft}>
              <div className="mission_image_wrap">
                <div className='ratio'>
                  <BackgroundVideo 
                    className="video" 
                    preload="none" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    poster="../videos/our-values-video-poster.jpg"
                  >
                  <source src="../videos/our-values-video.mp4" type="video/mp4" />
                  </BackgroundVideo>
                </div>

                
                <div className="mission_image_content">
                  <div className="commContent_wrap content-gap-20 max-w-600">
                    <span className="contentLabel">{data?.heading || "Lorem Ipsum"}</span>
                    <h3 className="title-size-36">{data?.subHeading || "Lorem Ipsum Text"}</h3>
                  </div>
                </div>
              </div>
            </ScrollAnimationComponent>
          </div>
          <div className="col-lg-4">
              <div className="values_card_wrap">
                <ScrollAnimationComponent animationVariants={fadeIn}>
                <div className="values_card">
                  <div className="values_card_content">
                    <span className="mission_icon">
                      <img src={getMediaUrl(data?.card_1?.icon)} alt="our values icon" />
                    </span>
                    <h5>{data?.card_1?.title || "Lorem Ipsum"}</h5>
                    <p>{data?.card_1?.description_text || "Lorem Ipsum dolor sit amet"}</p>
                  </div>
                </div>
                </ScrollAnimationComponent>
                <ScrollAnimationComponent animationVariants={fadeIn}>
                <div className="values_card with_border">
                  <div className="values_card_content">
                    <span className="mission_icon">
                      <img src={getMediaUrl(data?.card_2?.icon)} alt="our values icon" />
                    </span>
                    <h5>{data?.card_2?.title || "Lorem Ipsum"}</h5>
                    <p>{data?.card_2?.description_text || "Lorem Ipsum dolor sit amet"}</p>
                  </div>
                </div>
                </ScrollAnimationComponent>
              </div>
          </div>
          <div className="col-lg-4">
              <ScrollAnimationComponent animationVariants={fadeIn}>
                <div className="values_card with_border">
                  <div className="values_card_content">
                    <span className="mission_icon">
                      <img src={getMediaUrl(data?.card_3?.icon)} alt="our values icon" />
                    </span>
                    <h5>{data?.card_3?.title || "Lorem Ipsum"}</h5>
                    <p>{data?.card_3?.description_text || "Lorem Ipsum dolor sit amet"}</p>
                  </div>
                </div>
              </ScrollAnimationComponent>
          </div>
          <div className="col-lg-4">
              <ScrollAnimationComponent animationVariants={fadeIn}>
                <div className="values_card">
                  <div className="values_card_content">
                    <span className="mission_icon">
                      <img src={getMediaUrl(data?.card_4?.icon)} alt="our values icon" />
                    </span>
                    <h5>{data?.card_4?.title || "Lorem Ipsum"}</h5>
                    <p>{data?.card_4?.description_text || "Lorem Ipsum dolor sit amet"}</p>
                  </div>
                </div>
              </ScrollAnimationComponent>
          </div>
          <div className="col-lg-4">
              <ScrollAnimationComponent animationVariants={fadeIn}>
                <div className="values_card with_green_bg">
                  <div className="values_card_content">
                    <span className="mission_icon">
                      <img src={getMediaUrl(data?.card_5?.icon)} alt="our values icon" />
                    </span>
                    <h5>{data?.card_5?.title || "Lorem Ipsum"}</h5>
                    <p>{data?.card_5?.description_text || "Lorem Ipsum dolor sit amet"}</p>
                  </div>
                </div>
              </ScrollAnimationComponent>
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

const slideLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const slideRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default OurValues;
