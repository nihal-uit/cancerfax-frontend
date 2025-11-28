import React from "react";
import { Col, Figure, Image, Ratio, Row, Stack } from "react-bootstrap";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Chronic.scss";

const Chronic = () => {
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
                    <p className="contentLabel">Understanding CCL</p>
                    <h3 className="title-3">
                      Navigating Treatment Options for Chronic Lymphocytic
                      Leukemia
                    </h3>
                  </div>
                  <div className="ratio__holder">
                    <Ratio aspectRatio={"16x9"}>
                      <Image src="./images/chronic-thumb.png" />
                    </Ratio>
                    <div className="ratio__overlay">
                      <div className="ratio__overlay__content">
                        <Link href="#" className="btn btn-pink-solid">
                          Connect with Experts Now
                        </Link>
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
                    <strong>Chronic lymphocytic leukemia (CLL)</strong> is a
                    type of cancer that originates in the bone marrow and
                    manifests in the blood and lymphatic system. It is
                    characterized by the accumulation of{" "}
                    <strong>malignant B lymphocytes</strong>. CLL is the most
                    prevalent form of leukemia in Western countries, with an
                    incidence rate of{" "}
                    <strong>4.7 per 100,000 individuals</strong>
                    annually. However, the incidence significantly increases in
                    individuals aged 85 years and older, reaching over{" "}
                    <strong>35 per 100,000 individuals</strong>.
                  </p>
                  <p>
                    The clinical therapy of chronic lymphocytic leukemia (CLL)
                    presents challenges and is contingent upon factors such as
                    the patient’s age, presence of other medical conditions, and
                    specific characteristics of CLL cells, including
                    immunoglobulin heavy chain gene mutation, 17p deletion, TP53
                    mutation, and, as new studies have indicated, the quantity
                    and specific kind of CLL tumor clones in the patient. The
                    treatment options for asymptomatic early-stage CLL range
                    from a watch-and-wait approach to chemo-immunotherapy and
                    novel targeted treatments, such as Bruton’s tyrosine kinase
                    inhibitors
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
