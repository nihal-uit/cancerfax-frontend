import React from "react";
import styled from 'styled-components';

import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";

const OurValues = () => {

  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className='ourValues_sec py-120'>
      <div className='containerWrapper'>
        <div className="row g-4">
          <div className="col-lg-8 mission_left">
            <ScrollAnimationComponent animationVariants={slideLeft}>
              <div className="mission_image_wrap">
                <div className='ratio'>
                  <BackgroundVideo class="video" preload="none" autoplay="true" loop="true" muted="true" playsinline="true" poster="../videos/our-values-video-poster.jpg">
                  <source src="../videos/our-values-video.mp4" type="video/mp4" />
                  {/* <source src="../videos/our-values-video.mov" type="video/mov" />
                  <source src="../videos/our-values-video.webm" type="video/webm" />
                  <source src="../videos/our-values-video.ogv" type="video/ogv" /> */}
                  </BackgroundVideo>
                </div>

                
                <div className="mission_image_content">
                  <div className="commContent_wrap content-gap-20 max-w-600">
                    <span className="contentLabel">Our Values</span>
                    <h3 className="title-size-36">The Principles That Guide Every Patient Journey</h3>
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
                      <img src="../images/our-values-icon-1.svg" alt="" />
                    </span>
                    <h5>Integrity</h5>
                    <p>Upholding honesty and transparency in every patient interaction.</p>
                  </div>
                </div>
                </ScrollAnimationComponent>
                <ScrollAnimationComponent animationVariants={fadeIn}>
                <div className="values_card with_border">
                  <div className="values_card_content">
                    <span className="mission_icon">
                      <img src="../images/our-values-icon-2.svg" alt="" />
                    </span>
                    <h5>Compassion</h5>
                    <p>Caring deeply for every patient’s journey and well-being.</p>
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
                      <img src="../images/our-values-icon-3.svg" alt="" />
                    </span>
                    <h5>Accountability</h5>
                    <p>Taking full responsibility for outcomes and continuous improvement.</p>
                  </div>
                </div>
              </ScrollAnimationComponent>
          </div>
          <div className="col-lg-4">
              <ScrollAnimationComponent animationVariants={fadeIn}>
                <div className="values_card">
                  <div className="values_card_content">
                    <span className="mission_icon">
                      <img src="../images/our-values-icon-4.svg" alt="" />
                    </span>
                    <h5>Accountability</h5>
                    <p>Taking full responsibility for outcomes and continuous improvement.</p>
                  </div>
                </div>
              </ScrollAnimationComponent>
          </div>
          <div className="col-lg-4">
              <ScrollAnimationComponent animationVariants={fadeIn}>
                <div className="values_card with_green_bg">
                  <div className="values_card_content">
                    <span className="mission_icon">
                      <img src="../images/our-values-icon-5.svg" alt="" />
                    </span>
                    <h5>Accountability</h5>
                    <p>Taking full responsibility for outcomes and continuous improvement.</p>
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

export default OurValues;
