import React from "react";
import styled from 'styled-components';

import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";

const LifeAfterTreatment = () => {

  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className='ourValues_sec life_after_treatment_sec py-120'>
      <div className='containerWrapper'>
        <div className="row g-4">
          <div className="col-lg-8 mission_left">
            <ScrollAnimationComponent animationVariants={slideLeft}>
              <div className="mission_image_wrap">
                <div className='ratio'>
                  <BackgroundVideo src="../images/life-after-treatment-img.jpg" alt="" />
                </div>             
              </div>
            </ScrollAnimationComponent>
          </div>
          <div className="col-lg-4">
              <div className="values_card_wrap h-100">
                <ScrollAnimationComponent animationVariants={fadeIn}>
                <div className="values_card with_border h-100">
                  <div className="values_card_content gap-24">
                    <span className="mission_icon">
                      <img src="../images/our-values-icon-2.svg" alt="" />
                    </span>
                    <h5>Life After Treatment: Beyond Survival: A New Beginning</h5>
                    <p className="text_theme_dark">Now living without the burden of regular transfusions, Chen Yan is embracing new experiences: continuing his university studies, engaging in community awareness, and mentoring others living with haemoglobin disorders.
His story is not just about survival, it’s about thriving.</p>
                  </div>
                </div>
                </ScrollAnimationComponent>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BackgroundVideo = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export default LifeAfterTreatment;
