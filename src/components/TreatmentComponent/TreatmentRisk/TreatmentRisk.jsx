import React from "react";
import Marquee from "react-fast-marquee";
import { Accordion } from "react-bootstrap";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import "./TreatmentRisk.scss";
import { formatMedia } from "../../../utils/strapiHelpers";

const TreatmentRisk = ({ data, loading }) => {
  if (loading || !data?.isActive) {
    return null;
  }

  return (
    <section className="riskSectionOne_sec py-120" id="risk-section-one">
      <div className="containerWrapper z-2 position-relative">
        <div className="row">
          <div className="col-lg-6">
            <div className="content__holder d-flex flex-column h-100 justify-content-between">
              <div className="content">
                <ScrollAnimationComponent animationVariants={sideLeft}>
                  <div className="commContent_wrap commContent_new">
                    {data?.heading && (
                      <p className="contentLabel">{data?.heading}</p>
                    )}
                    {data?.subHeading && (
                      <h3 className="title-3">{data?.subHeading}</h3>
                    )}
                    {data?.description_text && (
                      <div className="content__des">{data?.description_text}</div>
                    )}
                  </div>
                </ScrollAnimationComponent>
              </div>

              {/* Certificates */}
              {data?.approved_by_text && (
                <div className="certificate__holder">
                  <ScrollAnimationComponent animationVariants={fadeIn}>
                    <h4>{data?.approved_by_text}</h4>
                    {data?.trust_badges && data?.trust_badges?.length > 0 && (
                      <div className="certificate__list__holder">
                        <Marquee
                          pauseOnHover={true}
                          speed={160}
                          gradient={false}
                          autoFill={true}
                          direction={"left"}
                        >
                          {data?.trust_badges.map((badge, index) => (
                            <div key={badge?.id || index} className="certificate__item">
                              <img
                                src={formatMedia(badge)}
                                alt={badge?.alternativeText || badge?.name || 'certificate'}
                                width={badge?.width || 70}
                                height={badge?.height || 70}
                              />
                            </div>
                          ))}
                          {data?.trust_badges.map((badge, index) => (
                            <div key={`duplicate-${badge?.id || index}`} className="certificate__item">
                              <img
                                src={formatMedia(badge)}
                                alt={badge?.alternativeText || badge?.name || 'certificate'}
                                width={badge?.width || 70}
                                height={badge?.height || 70}
                              />
                            </div>
                          ))}
                        </Marquee>
                      </div>
                    )}
                  </ScrollAnimationComponent>
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-6">
            {data?.side_effects && data?.side_effects?.length > 0 && (
              <div className="accordion__holder">
                <ScrollAnimationComponent animationVariants={fadeIn}>
                  <Accordion defaultActiveKey={0} flush>
                    {data?.side_effects.map((item, index) => {
                      return (
                        <Accordion.Item eventKey={index} key={item?.id || index}>
                          {item?.title && (
                            <Accordion.Header>{item?.title}</Accordion.Header>
                          )}
                          {item?.description_text && (
                            <Accordion.Body>
                              <p>
                                {item?.description_text}
                              </p>
                            </Accordion.Body>
                          )}
                        </Accordion.Item>
                      );
                    })}
                  </Accordion>
                </ScrollAnimationComponent>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
const sideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};
const sideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

export default React.memo(TreatmentRisk);
