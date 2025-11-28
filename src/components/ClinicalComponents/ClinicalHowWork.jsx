import React from "react";
import { Image } from "react-bootstrap";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";

const ClinicalHowWork = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <section className="clinical__howwork_sec py-120 pb-0">
        <div className="chowworkbg">
          <div className="ratio">
            <img
              src="./images/chowworkbg.png"
              width={1440}
              height={1024}
              alt="Clinical How Work"
            />
          </div>
        </div>
        <div className="containerWrapper">
          <ScrollAnimationComponent animationVariants={fadeIn}>
            <div className="commContent_wrap commContent_new text-center text-white">
              <p className="contentLabel">How it works</p>
              <h3 className="title-3">Understanding Clinical Trials</h3>
              <div className="content__des">
                <p>
                  Clinical trials are the bridge between scientific discovery
                  and real-world treatment.
                </p>
                <p>
                  They evaluate new therapies, from targeted drugs and cell
                  therapies to vaccines, that may offer better outcomes for
                  patients who have exhausted conventional options.
                </p>
                <p>
                  At CancerFax, we help you identify clinical trials most
                  relevant to your diagnosis, coordinate with trial centers, and
                  guide you through every step of the enrollment process.
                </p>
              </div>
            </div>
          </ScrollAnimationComponent>
          <div className="work__matter__list">
            <div className="work__matter__item">
              <div className="ratio__holder">
                <div className="ratio">
                  <img src="./images/cmatter-thumb.png" alt="Work Matter" />
                </div>
              </div>
            </div>
            <div className="work__matter__item matter__list">
              <ScrollAnimationComponent animationVariants={fadeIn}>
                <h4 className="work__matter__title">
                  Why Clinical Trials Matter
                </h4>
                <ul>
                  <li>
                    <Image
                      src="./images/ccheck-icon.svg"
                      width={28}
                      height={28}
                      alt="Clinical How Work"
                    />
                    <span>
                      Accessing breakthrough therapies not yet available through
                      standard treatment.
                    </span>
                  </li>
                  <li>
                    <Image
                      src="./images/ccheck-icon.svg"
                      width={28}
                      height={28}
                      alt="Clinical How Work"
                    />
                    <span>
                      Receiving high-quality, closely monitored medical
                      attention.
                    </span>
                  </li>
                  <li>
                    <Image
                      src="./images/ccheck-icon.svg"
                      width={28}
                      height={28}
                      alt="Clinical How Work"
                    />
                    <span>
                      Contributing to global cancer research that benefits
                      thousands of future patients.
                    </span>
                  </li>
                  <li>
                    <Image
                      src="./images/ccheck-icon.svg"
                      width={28}
                      height={28}
                      alt="Clinical How Work"
                    />
                    <span>
                      Work directly with leading cancer specialists and
                      world-class institutions.
                    </span>
                  </li>
                  <li>
                    <Image
                      src="./images/ccheck-icon.svg"
                      width={28}
                      height={28}
                      alt="Clinical How Work"
                    />
                    <span>
                      Certain trials may cover treatment expenses or provide
                      participant compensation.
                    </span>
                  </li>
                  <li>
                    <Image
                      src="./images/ccheck-icon.svg"
                      width={28}
                      height={28}
                      alt="Clinical How Work"
                    />
                    <span>
                      Clinical trials use multi-disciplinary team of specialists
                      to ensure comprehensive care.
                    </span>
                  </li>
                </ul>
              </ScrollAnimationComponent>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClinicalHowWork;
