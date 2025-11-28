import React from "react";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";

const MissionVision = () => {

  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <section className='mission_sec py-120'>
      <div className='containerWrapper'>
        <div className="mission_grid">
          <div className="mission_left">
            <ScrollAnimationComponent animationVariants={slideLeft}>
              <div className="mission_image_wrap">
                <img
                  src="../images/mission-vision-img.jpg"
                  alt=""
                />
                <div className="mission_image_content">
                  <div className="commContent_wrap content-gap-20">
                    <span className="contentLabel mb-2">Values</span>
                    <h3>Our Purpose is Personal</h3>
                    <p className="text-16">
                      At CancerFax, we believe that no patient should be limited by geography when it comes to hope or treatment.                    
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimationComponent>
          </div>
          <div className="mission_right">
            <ScrollAnimationComponent animationVariants={slideRight}>
              <ul className="mission_vision_list">
                <li>
                  <div className="mission_vision_content">
                    <span className="mission_icon">
                      <img src="../images/mission_icon.svg" alt="" />
                    </span>
                    <h5>
                      Mission
                    </h5>
                    <p>Connecting patients worldwide with top cancer centers and innovations, empowering them with knowledge, choice, and hope for accessible, transparent, and compassionate care.</p>
                  </div>
                </li>
                <li>
                  <div className="mission_vision_content">
                    <span className="mission_icon">
                      <img src="../images/vision_icon.svg" alt="" />
                    </span>
                    <h5>
                      Mission
                    </h5>
                    <p>Connecting patients worldwide with top cancer centers and innovations, empowering them with knowledge, choice, and hope for accessible, transparent, and compassionate care.</p>
                  </div>
                </li>
              </ul>
            </ScrollAnimationComponent>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
