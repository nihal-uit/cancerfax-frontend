import React, { useMemo } from "react";
import "./WhatWeDo.scss";
import { Link } from "react-router-dom";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";

const WhatWeDo = ({ data, loading }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const content = useMemo(()=>{
    return {
      label: data?.heading || "Lorem Ipsum",
      title: data?.subHeading || "Lorem Ipsum Text",
      description: data?.description || "Lorem Ipsum dolor sit amet",
      card_1: data?.card_1 || {},
      card_2: data?.card_2 || {},
      card_3: data?.card_3 || {},
      card_4: data?.card_4 || {},
      card_5: data?.card_5 || {},
      buttonText: data?.cta?.text || "Lorem Ipsum",
      buttonLink: data?.cta?.URL || "#",
      buttonTarget: data?.cta?.target || "_blank",
    }
  },[data])

  if(loading) return null;

  return (
    <section className="whatWeDo_sec py-120" id="what-we-do">
      <div className="containerWrapper z-2 position-relative">
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <div className="commContent_wrap commContent_new">
            <p className="contentLabel">{content.label}</p>
            <h3 className="title-3">
              {content.title}
            </h3>
            <div className="content__des text_theme_dark">
              <p>
                {content.description}
              </p>
            </div>
          </div>
        </ScrollAnimationComponent>
        <div className="card__list">
          <div className="card__item">
            <ScrollAnimationComponent animationVariants={fadeIn}>
              <div className="card">
                <div className="ratio__holder position-relative">
                  <div className="ratio h-100">
                    <img
                      src="./images/what-we-do-01.webp"
                      alt="What We Do"
                      width={586}
                      height={323}
                    />
                  </div>
                </div>
                <div className="card__overlay">
                  {/* <div className="card__overlay__bg"></div> */}
                  <div className="card__overlay__content">
                    <h5 className="card__title">
                      {content.card_1?.heading || "Lorem Ipsum"}
                    </h5>
                  </div>
                </div>
              </div>
            </ScrollAnimationComponent>
          </div>
          <div className="card__item">
            <ScrollAnimationComponent animationVariants={fadeIn}>
              <div className="card">
                <div className="ratio__holder position-relative">
                  <div className="ratio h-100">
                    <img
                      src="./images/what-we-do-02.webp"
                      alt="What We Do"
                      width={586}
                      height={323}
                    />
                  </div>
                </div>
                <div className="card__overlay">
                  <div className="card__overlay__content">
                    <h5 className="card__title">
                    {content.card_2?.heading || "Lorem Ipsum"}
                    </h5>
                  </div>
                </div>
              </div>
            </ScrollAnimationComponent>
          </div>
          <div className="card__item">
            <ScrollAnimationComponent animationVariants={fadeIn}>
              <div className="card">
                <div className="ratio__holder position-relative">
                  <div className="ratio h-100">
                    <img
                      src="./images/what-we-do-03.webp"
                      alt="What We Do"
                      width={586}
                      height={323}
                    />
                  </div>
                </div>
                <div className="card__overlay">
                  <div className="card__overlay__content">
                    <h5 className="card__title">
                    {content.card_3?.heading || "Lorem Ipsum"}
                    </h5>
                  </div>
                </div>
              </div>
            </ScrollAnimationComponent>
          </div>
          <div className="card__item">
            <ScrollAnimationComponent animationVariants={fadeIn}>
              <div className="card">
                <div className="ratio__holder position-relative">
                  <div className="ratio h-100">
                    <img
                      src="./images/what-we-do-04.webp"
                      alt="What We Do"
                      width={586}
                      height={323}
                    />
                  </div>
                </div>
                <div className="card__overlay">
                  <div className="card__overlay__content">
                    <h5 className="card__title">
                    {content.card_4?.heading || "Lorem Ipsum"}
                    </h5>
                  </div>
                </div>
              </div>
            </ScrollAnimationComponent>
          </div>
          <div className="card__item">
            <ScrollAnimationComponent animationVariants={fadeIn}>
              <div className="card">
                <div className="ratio__holder position-relative">
                  <div className="ratio h-100">
                    <img
                      src="./images/what-we-do-05.webp"
                      alt="What We Do"
                      width={586}
                      height={323}
                    />
                  </div>
                </div>
                <div className="card__overlay">
                  <div className="card__overlay__content">
                    <h5 className="card__title">
                    {content.card_5?.heading || "Lorem Ipsum"}
                    </h5>
                  </div>
                </div>
              </div>
            </ScrollAnimationComponent>
          </div>
        </div>
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <div className="btn__holder">
            <Link to={content.buttonLink} className="btn btn-pink-solid" target={content.buttonTarget}>
              {content.buttonText}
            </Link>
          </div>
        </ScrollAnimationComponent>
      </div>
    </section>
  );
};

export default React.memo(WhatWeDo);
