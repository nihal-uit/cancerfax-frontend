import React, { useMemo } from "react";
import Marquee from "react-fast-marquee";
import { Accordion } from "react-bootstrap";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import "./TreatmentRisk.scss";

const TreatmentRisk = ({ data, loading }) => {
  const defaultContent = {
    heading: "Lorem Ipsum",
    subHeading: "Lorem Ipsum Text",
    description: "Lorem Ipsum dolor sit amet",
    approved_by_text: "Lorem Ipsum dolor sit amet",
    side_effects: [
      {
        title: "Sample Side Effect",
        description: "Lorem Ipsum dolor sit amet",
      },
    ],
  };

  const content = useMemo(() => {
    if (loading) return defaultContent;

    if (!data || typeof data !== "object") return defaultContent;

    return {
      heading: data.heading || defaultContent.heading,
      subHeading: data.subHeading || defaultContent.subHeading,
      description: data.description || defaultContent.description,
      approved_by_text:
        data.approved_by_text || defaultContent.approved_by_text,

      side_effects:
        Array.isArray(data.side_effects) && data.side_effects.length > 0
          ? data.side_effects
          : defaultContent.side_effects,
    };
  }, [data, loading]);

  return (
    <section className="riskSectionOne_sec py-120" id="risk-section-one">
      <div className="containerWrapper z-2 position-relative">
        <div className="row">
          <div className="col-lg-6">
            <div className="content__holder d-flex flex-column h-100 justify-content-between">
              <div className="content">
                <ScrollAnimationComponent animationVariants={sideLeft}>
                  <div className="commContent_wrap commContent_new">
                    <p className="contentLabel">{content.heading}</p>
                    <h3 className="title-3">{content.subHeading}</h3>
                    <div className="content__des">{content.description}</div>
                  </div>
                </ScrollAnimationComponent>
              </div>

              {/* Certificates */}
              <div className="certificate__holder">
                <ScrollAnimationComponent animationVariants={fadeIn}>
                  <h4>{content.approved_by_text}</h4>
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
                  {content.side_effects.map((item, index) => {
                    return (
                      <Accordion.Item eventKey={index} key={index}>
                        <Accordion.Header>{item?.title}</Accordion.Header>
                        <Accordion.Body>
                          <p>
                            {item?.description || "Lorem Ipsum dolor sit amet"}
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
