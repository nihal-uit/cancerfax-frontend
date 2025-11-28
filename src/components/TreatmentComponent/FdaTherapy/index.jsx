import React from "react";
import { Col, Row } from "react-bootstrap";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";

const FdaTherapy = ({ fadeIn, sideLeft, sideRight }) => {
  return (
    <>
      <div className="fda__therapy__sec py-120">
        <div className="fda__therapy__bg">
          <img
            src="./images/fda-bg.svg"
            width={1400}
            height={1200}
            alt="Fda Therapy"
          />
        </div>
        <div className="containerWrapper z-2 position-relative">
          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <ScrollAnimationComponent animationVariants={fadeIn}>
                <div className="commContent_wrap commContent_new text-center">
                  <p className="contentLabel">Clinically Proven</p>
                  <h3 className="title-3">FDA-Approved Therapy</h3>
                  <div className="content__des">
                    With a 100% track record in successful clinical trial
                    placement, CancerFax ensures complete transparency and
                    accountability.
                  </div>
                </div>
              </ScrollAnimationComponent>
            </Col>
          </Row>
          <div className="therapy__list__holder">
            <div className="therapy__list">
              <div className="therapy__item">
                <ScrollAnimationComponent animationVariants={sideLeft}>
                  <div className="therapy__item__content">
                    <div className="icon">
                      <img
                        src="./images/fda-icon-01.svg"
                        width={23}
                        height={23}
                        alt="icon"
                      />
                    </div>
                    <h4 className="therapy__item__title">FDA Approval</h4>
                    <div className="therapy__item__des">
                      <p>
                        In March 2024, the FDA granted accelerated approval for
                        lisocabtagene maraleucel (Breyanzi) for adult patients
                        with relapsed or refractory CLL.
                      </p>
                    </div>
                  </div>
                </ScrollAnimationComponent>
              </div>
              <div className="therapy__item">
                <ScrollAnimationComponent animationVariants={sideRight}>
                  <div className="therapy__item__content">
                    <div className="icon">
                      <img
                        src="./images/fda-icon-01.svg"
                        width={23}
                        height={23}
                        alt="icon"
                      />
                    </div>
                    <h4 className="therapy__item__title">Success Rates</h4>
                    <div className="therapy__item__des">
                      <p>
                        Studies show up to 60% complete remission in eligible
                        patients with relapsed/refractory CLL.
                      </p>
                    </div>
                  </div>
                </ScrollAnimationComponent>
              </div>
            </div>
            <div className="ratio__holder">
              <div className="ratio">
                <ScrollAnimationComponent animationVariants={fadeIn}>
                  <img src="./images/approved-thumb.png" alt="icon" />
                </ScrollAnimationComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FdaTherapy;
