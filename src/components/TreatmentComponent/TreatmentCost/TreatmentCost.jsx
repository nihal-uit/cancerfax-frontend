import React from "react";
import "./TreatmentCost.scss";
import { getMediaUrl } from "../../../services/api";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";

const TreatmentCost = ({ data, loading }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  
  if(loading || !data?.isActive) return null;

  const countries = data?.countries || [];
  
  if (countries.length === 0) {
    return null;
  }

  return (
    <section className="riskSectionTwo_sec py-120" id="risk-section-two">
      <div className="containerWrapper z-2 position-relative">
        <div className="row">
          <div className="col-lg-7 mx-auto">
            <ScrollAnimationComponent animationVariants={fadeIn}>
              <div className="commContent_wrap commContent_new text-center">
                {data?.heading && (
                  <p className="contentLabel">{data?.heading}</p>
                )}
                {data?.subHeading && (
                  <h3 className="title-3">
                    {data?.subHeading}
                  </h3>
                )}
              </div>
            </ScrollAnimationComponent>
          </div>
        </div>
        <div className="card__list__holder">
          <div className="card__list">
            {countries.map((item, index) => (
              <div key={item?.id || index} className="card__item">
                <ScrollAnimationComponent animationVariants={fadeIn}>
                  <div className="card">
                    {item?.flag && (
                      <div className="card__img">
                        <div className="ratio">
                          <img
                            src={getMediaUrl(item?.flag)}
                            alt={item?.flag?.alternativeText || item?.country || 'flag'}
                            width={190}
                            height={127}
                          />
                        </div>
                      </div>
                    )}
                    <div className="card__content">
                      {item?.country && (
                        <h5 className="card__title">{item?.country}</h5>
                      )}
                      {item?.cost && (
                        <p>{item?.cost}</p>
                      )}
                    </div>
                  </div>
                </ScrollAnimationComponent>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(TreatmentCost);
