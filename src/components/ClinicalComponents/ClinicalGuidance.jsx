import React from "react";
import { Col, Image, Ratio, Row } from "react-bootstrap";
import styled from "styled-components";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";
import { Link } from "react-router-dom";
import { formatMedia, renderRichTextWithImages } from "@/utils/strapiHelpers";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const sideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const ClinicalGuidance = ({data}) => {
  console.log(data);
  return (
    <>
      <section className="clinical__guidance__sec py-120 bg-white">
        <div className="containerWrapper z-2 position-relative">
          <Row className="align-items-center gy-4 gy-lg-0">
            <Col lg={6}>
              <ContentHolder>
                <ScrollAnimationComponent animationVariants={fadeIn}>
                  <div className="commContent_wrap commContent_new">
                    <p className="contentLabel">
                      {data?.heading}
                    </p>
                    <h3 className="title-3">
                      {data?.subHeading}
                    </h3>
                    <div className="content__des text_theme_dark">
                      <p>
                        {renderRichTextWithImages(data?.description_block)||data?.description_text}
                      </p>
                    </div>
                    {data?.cta?.text && (
                      <div className="btn__holder">
                        <Link to={data?.cta?.URL || '#'} target={data?.cta?.target || '_self'} className="btn btn-pink-solid">
                          {data?.cta?.text}
                        </Link>
                      </div>
                    )}
                  </div>
                </ScrollAnimationComponent>
              </ContentHolder>
            </Col>
            <Col lg={6}>
              <FigureHolder>
                <ScrollAnimationComponent animationVariants={sideRight}>
                  <Ratio aspectRatio={"16x9"}>
                    <Image src={formatMedia(data?.featuredImage)} alt="guidance" />
                  </Ratio>
                </ScrollAnimationComponent>
              </FigureHolder>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};
const ContentHolder = styled.div`
  @media (min-width: 992px) {
    padding-right: 85px;
  }
  .commContent_new {
    @media (min-width: 992px) {
    }
    .contentLabel {
      margin-bottom: 40px;
    }
    .content__des {
      margin-top: 30px;
    }
    .btn__holder {
      margin-top: 40px;
    }
  }
`;
const FigureHolder = styled.div`
  @media (min-width: 992px) {
    margin-left: -24px;
  }
  .ratio {
    --bs-aspect-ratio: ${(372 / 611) * 100}%;
    border-radius: 30px;
    overflow: hidden;
    img {
      object-position: top;
      object-fit: cover;
    }
  }
`;
export default ClinicalGuidance;
