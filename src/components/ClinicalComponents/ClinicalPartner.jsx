import React from "react";
import Marquee from "react-fast-marquee";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";

const ClinicalPartner = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <section className="clinical__partner__sec py-120 pt-0">
        <div className="containerWrapper">
          <ScrollAnimationComponent animationVariants={fadeIn}>
            <div className="commContent_wrap commContent_new mx-auto text-center">
              <p className="contentLabel">Global Partners</p>
              <h3 className="title-3">
                Collaborating with the World’s Leading Research Institutions
              </h3>
              <div className="content__des text_theme_dark">
                <p>
                  CancerFax partners with major institutions across the
                  USA,China, Singapore, India, and many other countries, giving
                  patients access to trials conducted under the strictest
                  ethical and medical standards.
                </p>
              </div>
            </div>
          </ScrollAnimationComponent>
        </div>
        <div className="partner__list__holder">
          <Marquee
            pauseOnHover={true}
            speed={60}
            gradient={false}
            autoFill={true}
            direction={"left"}
          >
            {Array.from({ length: 5 }).map((item, index) => (
              <div key={index} className="partner__item">
                <img
                  src={`./images/cpartner-0${index + 1}.svg`}
                  width={70}
                  height={70}
                  alt="icon"
                />
              </div>
            ))}
            {Array.from({ length: 5 }).map((item, index) => (
              <div key={index} className="partner__item">
                <img
                  src={`./images/cpartner-0${index + 1}.svg`}
                  width={70}
                  height={70}
                  alt="icon"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </section>
    </>
  );
};

export default ClinicalPartner;
