import React from "react";
import { Col, Row } from "react-bootstrap";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { formatMedia } from "../../../utils/strapiHelpers";

const FdaTherapy = ({ fadeIn, sideLeft, sideRight, data }) => {  
  if (!data || !data?.isActive) {
    return null;
  }
  
  return (
    <>
      <div className="fda__therapy__sec py-120">
        <div className="fda__therapy__bg">
          <img
            src={formatMedia(data?.backgroundImage)}
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
                  <p className="contentLabel">{data?.heading}</p>
                  <h3 className="title-3">{data?.subHeading}</h3>
                  <div className="content__des">
                    {data?.description_text}
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
                        src={formatMedia(data?.proofs[0]?.icon)}
                        width={23}
                        height={23}
                        alt="icon"
                      />
                    </div>
                    <h4 className="therapy__item__title">{data?.proofs[0]?.title}</h4>
                    <div className="therapy__item__des">
                      <p>
                        {data?.proofs[0]?.description_text}
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
                        src={formatMedia(data?.proofs[1]?.icon)}
                        width={23}
                        height={23}
                        alt="icon"
                      />
                    </div>
                    <h4 className="therapy__item__title">{data?.proofs[1]?.title}</h4>
                    <div className="therapy__item__des">
                      <p>
                        {data?.proofs[1]?.description_text}
                      </p>
                    </div>
                  </div>
                </ScrollAnimationComponent>
              </div>
            </div>
            <div className="ratio__holder">
              <div className="ratio">
                <ScrollAnimationComponent animationVariants={fadeIn}>
                  <img src={formatMedia(data?.foregroundImage)} alt="icon" />
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
