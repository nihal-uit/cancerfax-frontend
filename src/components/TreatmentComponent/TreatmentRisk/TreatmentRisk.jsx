import React from "react";
import Marquee from "react-fast-marquee";
import { Accordion } from "react-bootstrap";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import "./TreatmentRisk.scss";

const TreatmentRisk = ({ data, loading }) => {
  if (loading) {
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
                    <p className="contentLabel">{data?.heading}</p>
                    <h3 className="title-3">{data?.subHeading}</h3>
                    <div className="content__des">{data?.description_text}</div>
                  </div>
                </ScrollAnimationComponent>
              </div>

              {/* Certificates */}
              <div className="certificate__holder">
                <ScrollAnimationComponent animationVariants={fadeIn}>
                  <h4>{data?.approved_by_text}</h4>
                  <div className="certificate__list__holder">
                    <Marquee
                      pauseOnHover={true}
                      speed={160}
                      gradient={false}
                      autoFill={true}
                      direction={"left"}
                    >
                      {Array.from({ length: 5 }).map((item, index) => (
                        <div key={index} className="certificate__item">
                          <img
                            src={`./images/certificate-0${index + 1}.svg`}
                            width={70}
                            height={70}
                            alt="icon"
                          />
                        </div>
                      ))}
                      {Array.from({ length: 5 }).map((item, index) => (
                        <div key={index} className="certificate__item">
                          <img
                            src={`./images/certificate-0${index + 1}.svg`}
                            width={70}
                            height={70}
                            alt="icon"
                          />
                        </div>
                      ))}
                    </Marquee>
                  </div>
                </ScrollAnimationComponent>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="accordion__holder">
              <ScrollAnimationComponent animationVariants={fadeIn}>
                <Accordion defaultActiveKey={0} flush>
                  {data?.side_effects.map((item, index) => {
                    return (
                      <Accordion.Item eventKey={index} key={index}>
                        <Accordion.Header>{item?.title}</Accordion.Header>
                        <Accordion.Body>
                          <p>
                            {item?.description_text || "Lorem Ipsum dolor sit amet"}
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                  })}
                </Accordion>
              </ScrollAnimationComponent>
            </div>
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
