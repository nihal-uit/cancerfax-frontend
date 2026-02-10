import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";
import { formatMedia, renderRichTextWithImages } from "../../utils/strapiHelpers";

const ClinicalHelp = ({ componentData, data }) => {
  const benefitsData = componentData || data;

  if (!benefitsData) {
    return null;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const benefits = benefitsData?.benefits || [];

  if (benefits.length === 0) {
    return null;
  }

  return (
      <section className="clinical__help__sec py-120">
        <div className="containerWrapper z-2 position-relative">
          <Row>
            <Col lg={10} xl={9} className="mx-auto">
              <ScrollAnimationComponent animationVariants={fadeIn}>
                <div className="commContent_wrap commContent_new text-center">
                <p className="contentLabel">{benefitsData?.heading || ''}</p>
                  <h3 className="title-3">
                  {benefitsData?.subHeading || ''}
                  </h3>
                  <div className="content__des text_theme_dark">
                  <p>{renderRichTextWithImages(benefitsData?.description_block)||benefitsData?.description_text || ''}</p>
                  </div>
                </div>
              </ScrollAnimationComponent>
            </Col>
          </Row>
        </div>
        <div className="containerWrapper z-2 position-relative">
          <div className="list__holder bg-white">
            <div className="list">
            {benefits.map((benefit) => {
              const iconUrl = formatMedia(benefit?.icon);
              return (
                <ScrollAnimationComponent
                  key={benefit?.id}
                  animationVariants={fadeIn}
                >
                  <div className="list__item">
                    <div className="list__card h-100">
                      {iconUrl && (
                      <div className="list__card__icon">
                        <Image
                            src={iconUrl}
                            alt={benefit?.icon?.alternativeText || renderRichTextWithImages(benefit?.description_block) || benefit?.description_text || "Benefit icon"}
                          width={28}
                          height={28}
                        />
                      </div>
                      )}
                      <div className="list__card__content">
                        <h5 className="list__card__title">{renderRichTextWithImages(benefit?.description_block) || benefit?.description_text || ''}</h5>
                      </div>
                    </div>
                  </div>
                </ScrollAnimationComponent>
              );
            })}
          </div>
        </div>
        {benefitsData?.cta?.text && (
          <ScrollAnimationComponent animationVariants={fadeIn}>
            <div className="btn__holder text-center">
              <Link 
                to={benefitsData?.cta?.URL || '#'} 
                target={benefitsData?.cta?.target || '_self'}
                className="btn btn-pink-solid"
              >
                {benefitsData.cta.text}
              </Link>
            </div>
          </ScrollAnimationComponent>
        )}
        </div>
      </section>
  );
};

export default ClinicalHelp;
