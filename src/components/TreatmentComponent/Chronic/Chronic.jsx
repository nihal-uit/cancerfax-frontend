import React from "react";
import { Col, Figure, Image, Ratio, Row, Stack } from "react-bootstrap";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Chronic.scss";
import { formatMedia } from "../../../utils/strapiHelpers";

const Chronic = ({data}) => {
  if (!data || !data?.isActive) {
    return null;
  }
  
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };  

  return (
    <>
      <section className="chronic__sec py-120">
        <div className="containerWrapper z-2 position-relative">
          <Row className="gy-4 gy-lg-0">
            <Col lg={6}>
              <ScrollAnimationComponent
                animationVariants={fadeIn}
                className="h-100"
              >
                <RatioHolder>
                  <div className="commContent_wrap commContent_new">
                    <p className="contentLabel">{data?.heading}</p>
                    <h3 className="title-3">{data?.subHeading}</h3>
                  </div>
                  <div className="ratio__holder">
                    <Ratio aspectRatio={"16x9"}>
                      <Image src={formatMedia(data?.featuredImage)} />
                    </Ratio>
                    <div className="ratio__overlay">
                      <div className="ratio__overlay__content">
                        {data?.cta?.text && (
                          <Link to={data?.cta?.URL || '#'} target={data?.cta?.target || '_self'} className="btn btn-pink-solid">
                            {data?.cta?.text}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </RatioHolder>
              </ScrollAnimationComponent>
            </Col>
            <Col lg={6}>
              <ScrollAnimationComponent animationVariants={fadeIn}>
                <Description>
                  <p>
                    {data?.description_text}
                  </p>
                </Description>
              </ScrollAnimationComponent>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};
const RatioHolder = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 40px;
  @media screen and (min-width: 1200px) {
    padding-right: 12px;
  }
  @media screen and (max-width: 1023.98px) {
    gap: 30px;
  }
  @media screen and (max-width: 767.98px) {
    gap: 24px;
  }
`;
const Description = styled.div`
  @media screen and (min-width: 1200px) {
    padding-left: 12px;
  }
  p {
    color: ${(props) => props.theme.colors.primary};
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: calc(32 / 18);
    font-weight: ${(props) => props.theme.fontWeights.normal};
    font-family: ${(props) => props.theme.fonts.secondary};
    margin-bottom: 44px;
    @media screen and (max-width: 1023.98px) {
      margin-bottom: 34px;
    }
    @media screen and (max-width: 767.98px) {
      margin-bottom: 24px;
      font-size: 16px;
    }
    &:last-child {
      margin-bottom: 0;
    }
    strong {
      font-weight: ${(props) => props.theme.fontWeights.bold};
    }
  }
`;

export default Chronic;
