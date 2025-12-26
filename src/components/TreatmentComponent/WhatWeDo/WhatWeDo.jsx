import React from "react";
import "./WhatWeDo.scss";
import { Link } from "react-router-dom";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { formatMedia } from "../../../utils/strapiHelpers";

const WhatWeDo = ({ data, loading }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  if(loading || !data?.isActive) return null;

  const cards = [
    data?.card_1,
    data?.card_2,
    data?.card_3,
    data?.card_4,
    data?.card_5
  ].filter(card => card);

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="whatWeDo_sec py-120" id="what-we-do">
      <div className="containerWrapper z-2 position-relative">
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <div className="commContent_wrap commContent_new">
            {data?.heading && (
              <p className="contentLabel">{data?.heading}</p>
            )}
            {data?.subHeading && (
              <h3 className="title-3">
                {data?.subHeading}
              </h3>
            )}
            {data?.description_text && (
              <div className="content__des text_theme_dark">
                <p>
                  {data?.description_text}
                </p>
              </div>
            )}
          </div>
        </ScrollAnimationComponent>
        <div className="card__list">
          {cards.map((card, index) => (
            <div key={card?.id || index} className="card__item">
              <ScrollAnimationComponent animationVariants={fadeIn}>
                <div className="card">
                  {card?.image && (
                    <div className="ratio__holder position-relative">
                      <div className="ratio h-100">
                        <img
                          src={formatMedia(card?.image)}
                          alt={card?.image?.alternativeText || card?.title || ''}
                          width={586}
                          height={323}
                        />
                      </div>
                    </div>
                  )}
                  <div className="card__overlay">
                    <div className="card__overlay__content">
                      {card?.title && (
                        <h5 className="card__title">
                          {card?.title}
                        </h5>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollAnimationComponent>
            </div>
          ))}
        </div>
        {data?.cta?.URL && (
          <ScrollAnimationComponent animationVariants={fadeIn}>
            <div className="btn__holder">
              <Link to={data?.cta?.URL || ''} className="btn btn-pink-solid" target={data?.cta?.target || '_blank'}>
                {data?.cta?.text || ''}
              </Link>
            </div>
          </ScrollAnimationComponent>
        )}
      </div>
    </section>
  );
};

export default React.memo(WhatWeDo);
