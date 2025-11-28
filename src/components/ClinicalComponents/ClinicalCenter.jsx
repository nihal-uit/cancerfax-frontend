import React from "react";
import { Link } from "react-router-dom";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";

const defaultList = [
  {
    id: 1,
    title: "Spinal Muscular Atrophy (Type II)",
  },
  {
    id: 2,
    title: "Spinal Muscular Atrophy (Type III)",
  },
  {
    id: 3,
    title: "Macular Degeneration",
  },
  {
    id: 4,
    title: "Colorectal Cancer",
  },
];
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
const ClinicalCenter = () => {
  return (
    <section className="clinical__center__sec py-120">
      <div className="ccenterbg">
        <div className="ratio">
          <img
            src="./images/centerbg.png"
            width={1440}
            height={1024}
            alt="Center Background"
          />
        </div>
      </div>
      <div className="containerWrapper">
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <div className="commContent_wrap commContent_new">
            <p className="contentLabel">Trials Recruitment</p>
            <h3 className="title-3">
              Currently Recruiting Cancer Clinical Trials Across Leading Centers
            </h3>
            <div className="content__des text_theme_dark">
              <p>
                Discover global clinical trials now open for enrollment in
                advanced cancer research. Find active studies evaluating
                breakthrough therapies and innovative treatment approaches.
              </p>
            </div>
          </div>
        </ScrollAnimationComponent>
        <div className="center__list__holder">
          <div className="center__list">
            {defaultList?.map((item) => (
              <ScrollAnimationComponent
                key={item?.id}
                animationVariants={fadeIn}
              >
                <div className="center__card">
                  <div className="center__card__body">
                    <div className="ratio">
                      <img
                        src={`./images/ccenter-0${item?.id}.jpg`}
                        width={540}
                        height={270}
                        alt="Center Thumb"
                      />
                    </div>

                    <div className="center__card__overlay">
                      <div className="center__card__overlay__content">
                        <h5 className="center__card__title">{item?.title}</h5>
                        <div className="btn__holder">
                          <Link to="#" className="btn btn-pink-solid">
                            Explore
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimationComponent>
            ))}
          </div>
          <ScrollAnimationComponent animationVariants={fadeIn}>
            <div className="btn__holder text-center">
              <Link to="#" className="btn btn-pink-solid">
                Explore
              </Link>
            </div>
          </ScrollAnimationComponent>
        </div>
      </div>
    </section>
  );
};

export default ClinicalCenter;
