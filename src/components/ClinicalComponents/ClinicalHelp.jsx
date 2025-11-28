import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";
const helpList = [
  {
    id: 1,
    title: "Collect and verify complete medical documentation.",
    img: "./images/clinical-help-01.svg",
  },
  {
    id: 2,
    title: "Translate prescriptions into generic equivalents.",
    img: "./images/clinical-help-02.svg",
  },
  {
    id: 3,
    title: "Coordinate directly with hospitals to pre-validate submissions.",
    img: "./images/clinical-help-03.svg",
  },
  {
    id: 4,
    title: "Confirm hospital receipt and acceptance of each document.",
    img: "./images/clinical-help-04.svg",
  },
  {
    id: 5,
    title: "Resolve rejections or missing document issues immediately.",
    img: "./images/clinical-help-05.svg",
  },
  {
    id: 6,
    title: "Set up hospital appointments and treatment schedules.",
    img: "./images/clinical-help-06.svg",
  },
];
const ClinicalHelp = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <section className="clinical__help__sec py-120">
        <div className="containerWrapper z-2 position-relative">
          <Row>
            <Col lg={10} xl={9} className="mx-auto">
              <ScrollAnimationComponent animationVariants={fadeIn}>
                <div className="commContent_wrap commContent_new text-center">
                  <p className="contentLabel">How We Help</p>
                  <h3 className="title-3">
                    The Benefits of Choosing CancerFax Services
                  </h3>
                  <div className="content__des text_theme_dark">
                    <p>
                      CancerFax simplifies and manages the entire process of
                      enrolling in cancer clinical trials, from documentation to
                      hospital coordination, ensuring accuracy, acceptance, and
                      efficiency.
                    </p>
                  </div>
                </div>
              </ScrollAnimationComponent>
            </Col>
          </Row>
        </div>
        <div className="containerWrapper z-2 position-relative">
          <div className="list__holder bg-white">
            <div className="list">
              {helpList.map((item) => (
                <ScrollAnimationComponent
                  key={item?.id}
                  animationVariants={fadeIn}
                >
                  <div key={item?.id} className="list__item">
                    <div className="list__card h-100">
                      <div className="list__card__icon">
                        <Image
                          src={item?.img}
                          alt={item?.title}
                          width={28}
                          height={28}
                        />
                      </div>
                      <div className="list__card__content">
                        <h5 className="list__card__title">{item?.title}</h5>
                      </div>
                    </div>
                  </div>
                </ScrollAnimationComponent>
              ))}
            </div>
          </div>
          <ScrollAnimationComponent animationVariants={fadeIn}>
            <div className="btn__holder text-center">
              <Link to="#" className="btn btn-pink-solid">
                submit reports for expert review
              </Link>
            </div>
          </ScrollAnimationComponent>
        </div>
      </section>
    </>
  );
};

export default ClinicalHelp;
