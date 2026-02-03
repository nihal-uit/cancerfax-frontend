import React from "react";
import styled from 'styled-components';
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { formatMedia } from "../../../utils/strapiHelpers";

const LifeAfterTreatment = ({ data }) => {
  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const postTreatment = data?.post_treatment;
  if (!postTreatment || !postTreatment?.isActive) return null;

  const imageUrl = formatMedia(postTreatment?.patient_image);
  const iconUrl = formatMedia(postTreatment?.icon);

  return (
    <section className='ourValues_sec life_after_treatment_sec py-120'>
      <div className='containerWrapper'>
        <div className="row g-4">
          <div className="col-lg-8 mission_left">
            <ScrollAnimationComponent animationVariants={slideLeft}>
              <div className="mission_image_wrap">
                <div className='ratio'>
                  {imageUrl && (
                    <BackgroundImage src={imageUrl} alt={postTreatment?.patient_image?.alternativeText || 'life after treatment'} />
                  )}
                </div>             
              </div>
            </ScrollAnimationComponent>
          </div>
          <div className="col-lg-4">
              <div className="values_card_wrap h-100">
                <ScrollAnimationComponent animationVariants={fadeIn}>
                <div className="values_card with_border h-100">
                  <div className="values_card_content gap-24">
                    {iconUrl && (
                      <span className="mission_icon">
                        <img src={iconUrl} alt={postTreatment?.icon?.alternativeText || 'post treatment icon'} />
                      </span>
                    )}
                    {postTreatment?.expert_name && <h5>{postTreatment.expert_name}</h5>}
                    {postTreatment?.expert_title && <p className="text_theme_dark">{postTreatment.expert_title}</p>}
                    {postTreatment?.testimonial_text && (
                      <p className="text_theme_dark">{postTreatment.testimonial_text}</p>
                    )}
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

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export default LifeAfterTreatment;
