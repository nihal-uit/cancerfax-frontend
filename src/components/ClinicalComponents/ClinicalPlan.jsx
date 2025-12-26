import React from "react";
import { Col, Image, Ratio, Row } from "react-bootstrap";
import styled from "styled-components";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";
import { formatMedia, formatRichText, renderRichTextWithImages } from "../../utils/strapiHelpers";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const sideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const ClinicalPlan = ({ componentData, data }) => {
  const pricingData = componentData || data;

  if (!pricingData) {
    return null;
  }

  const features = pricingData?.features || [];
  const imageUrl = formatMedia(pricingData?.image);

  return (
      <section className="clinical__plan__sec py-120 bg-white">
        <div className="containerWrapper z-2 position-relative">
          <Row>
            <Col lg={6}>
              <ContentHolder>
                <ScrollAnimationComponent animationVariants={fadeIn}>
                  <div className="commContent_wrap commContent_new">
                  <p className="contentLabel">{pricingData?.heading || ''}</p>
                    <h3 className="title-3">
                    {pricingData?.subHeading || ''}
                    </h3>
                    <div className="content__des text_theme_dark">
                    <p>{pricingData?.description_text || ''}</p>
                    </div>
                  </div>
                </ScrollAnimationComponent>
              {features.length > 0 && (
                <ScrollAnimationComponent animationVariants={fadeIn}>
                  <div className="list__holder">
                    <ul>
                      {features.map((feature) => (
                        <li key={feature?.id}>
                          <h5 className="list__title">{feature?.title || ''}</h5>
                          <p>{feature?.description_text || ''}</p>
                      </li>
                      ))}
                    </ul>
                  </div>
                </ScrollAnimationComponent>
              )}
              {pricingData?.policyMessage_block && (
                <ScrollAnimationComponent animationVariants={fadeIn}>
                  <div className="note__holder">
                    {renderRichTextWithImages(pricingData?.policyMessage_block)}
                  </div>
                </ScrollAnimationComponent>
              )}
              </ContentHolder>
            </Col>
          {imageUrl && (
            <Col lg={6}>
              <FigureHolder>
                <ScrollAnimationComponent animationVariants={sideRight}>
                  <Ratio aspectRatio={"16x9"}>
                    <Image
                      src={imageUrl}
                      alt={pricingData?.image?.alternativeText || "Clinical Plan"}
                    />
                  </Ratio>
                </ScrollAnimationComponent>
              </FigureHolder>
            </Col>
          )}
          </Row>
        </div>
      </section>
  );
};
const ContentHolder = styled.div`
  @media (min-width: 992px) {
    padding-right: 55px;
  }
  .commContent_new {
    @media (min-width: 992px) {
      width: 480px;
    }
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 48px;
    li {
      font-size: 18px;
      line-height: calc(27 / 18);
      font-weight: 400;
      color: #727b81;
      margin-bottom: 40px;
      position: relative;
      padding-left: 31px;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 10px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: var(--dark-gray);
      }
      &:last-child {
        margin-bottom: 0;
      }
      .list__title {
        font-family: ${(props) => props.theme.fonts.primary};
        font-size: 20px;
        line-height: calc(30 / 20);
        font-weight: 500;
        color: var(--dark-gray);
        margin-bottom: 5px;
      }
    }
  }
  .note__holder {
    border: 1px solid #c2cbd1;
    padding: 20px 24px;
    box-shadow: 0px 4px 4px 0px #36454f0a;
    border-radius: 16px;
    margin-top: 40px;
    p {
      color: #727b81;
    }
  }
`;
const FigureHolder = styled.div`
  @media (min-width: 992px) {
    padding-left: 17px;
  }
  .ratio {
    --bs-aspect-ratio: ${(596 / 571) * 100}%;
    border-radius: 40px;
    overflow: hidden;
    img {
      object-position: top;
      object-fit: cover;
    }
  }
`;
export default ClinicalPlan;
