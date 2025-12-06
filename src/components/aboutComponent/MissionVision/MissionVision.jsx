import React from "react";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { getMediaUrl } from "@/services/api";

const MissionVision = ( { data } ) => {
  return (
    <section className='mission_sec py-120'>
      <div className='containerWrapper'>
        <div className="mission_grid">
          <div className="mission_left">
            <ScrollAnimationComponent animationVariants={slideLeft}>
              <div className="mission_image_wrap">
                <img
                  src={getMediaUrl(data?.featuredImage)}
                  alt="featured image"
                />
                <div className="mission_image_content">
                  <div className="commContent_wrap content-gap-20">
                    <span className="contentLabel mb-2">{data?.heading || "Lorem Ipsum"}</span>
                    <h3>{data?.subHeading || "Lorem Ipsum Text"}</h3>
                    <p className="text-16">
                      {data?.description_text || "Lorem Ipsum dolor sit amet"}
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
                      <img src={getMediaUrl(data?.card_1?.icon)} alt="mission icon" />
                    </span>
                    <h5>
                      {data?.card_1?.title || "Lorem Ipsum"}
                    </h5>
                    <p>{data?.card_1?.description_text || "Lorem Ipsum dolor sit amet"}</p>
                  </div>
                </li>
                <li>
                  <div className="mission_vision_content">
                    <span className="mission_icon">
                      <img src={getMediaUrl(data?.card_2?.icon)} alt="vision icon" />
                    </span>
                    <h5>
                      {data?.card_2?.title || "Lorem Ipsum"}
                    </h5>
                    <p>{data?.card_2?.description_text || "Lorem Ipsum dolor sit amet"}</p>
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

const slideLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const slideRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export default MissionVision;
