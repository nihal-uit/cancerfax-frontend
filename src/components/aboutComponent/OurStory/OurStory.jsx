import React from "react";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";

const OurStory = () => {

  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  

  return (
    <section className='ourstory_sec py-120'>
      <div className='containerWrapper'>
        <div className="ourstory_card">
          <div className="ourstory_grid">
            <div className="ourstory_left">
              <ScrollAnimationComponent animationVariants={slideLeft}>
                <div className="commContent_wrap content-gap-24">
                  <span className="contentLabel mb-2">Our Story</span>
                  <h3 className="title-size-36">Built on Experience. Driven by Empathy.</h3>
                  <p className="text-16">
                    CancerFax began with a simple realization, that the biggest barrier in cancer treatment isn’t always medicine, but access. Over the past 15 years, we’ve helped thousands of patients and families find new possibilities through verified global collaborations, clinical trials, and ethical healthcare guidance.
                  </p>
                  <p className="">
                  What started as a support initiative has grown into a global facilitation network connecting patients, doctors, and research centers in over 25 countries.                  
                  </p>
                </div>
              </ScrollAnimationComponent>            
            </div>
            <div className="mission_right">
              <ScrollAnimationComponent animationVariants={slideRight}>
                <div className="ourstory_image_wrap">
                  <img
                    src="../images/our-story-img.jpg"
                    alt=""
                  />
                </div>
              </ScrollAnimationComponent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
