import React from "react";
import "./TreatmentCost.scss";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { getMediaUrl } from "../../../services/api";

const TreatmentCost = ({ data, loading }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  
  if(loading) return null;

  return (
    <section className="riskSectionTwo_sec py-120" id="risk-section-two">
      <div className="containerWrapper z-2 position-relative">
        <div className="row">
          <div className="col-lg-7 mx-auto">
            <ScrollAnimationComponent animationVariants={fadeIn}>
              <div className="commContent_wrap commContent_new text-center">
                <p className="contentLabel">{data?.heading || "Lorem Ipsum"}</p>
                <h3 className="title-3">
                  {data?.subHeading || "Lorem Ipsum Text"}
                </h3>
              </div>
            </ScrollAnimationComponent>
          </div>
        </div>
        <div className="card__list__holder">
          <div className="card__list">
            {data?.countries?.map((item, index) => (
              <div key={index} className="card__item">
                <ScrollAnimationComponent animationVariants={fadeIn}>
                  <div className="card">
                    <div className="card__img">
                      <div className="ratio">
                        <img
                          src={`${getMediaUrl(item?.flag)}`}
                          alt="icon"
                          width={190}
                          height={127}
                        />
                      </div>
                    </div>
                    <div className="card__content">
                      <h5 className="card__title">{item?.country}</h5>
                      <p>{item?.cost}</p>
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
