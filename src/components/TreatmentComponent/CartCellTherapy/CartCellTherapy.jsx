import React from "react";
import styled from "styled-components";
import "./CartCellTherapy.scss";
import {
  Col,
  Container,
  Nav,
  Row,
  Stack,
  Tab,
} from "react-bootstrap";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { formatMedia, renderRichTextWithImages } from "../../../utils/strapiHelpers";

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartCellTherapy = ({ fadeIn, data }) => {
  if (!data || !data?.isActive) {
    return null;
  }
  
  return (
    <section
      className="cart__cell__therapy__sec py-120"
      id="expert-review-section"
    >
      <Container className="containerWrapper z-2 position-relative">
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <ScrollAnimationComponent animationVariants={fadeIn}>
              <div className="commContent_wrap commContent_new text-center">
                <p className="contentLabel">{data?.heading}</p>
                <h3 className="title-3">{data?.subHeading}</h3>
                <div className="content__des">
                  {renderRichTextWithImages(data?.description_block)||data?.description_text}
                </div>
              </div>
            </ScrollAnimationComponent>
          </Col>
        </Row>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Nav variant="tabs" className="tab__count__3">
            <Nav.Item>
              <Nav.Link eventKey="first">
                <span>{data?.whatIsTherapy?.heading}</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">
                <span>{data?.mechanismOfAction?.heading}</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="trird">
                <span>{data?.processOverview?.heading}</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <div className="tab-content__bg">
              <img src='/images/cart__cell_bg.svg' alt="Cart Cell Therapy" />
            </div>
            <Tab.Pane eventKey="first">
              <Row className="">
                <Col lg={10} xl={8}>
                  <ScrollAnimationComponent animationVariants={fadeIn}>
                    <Stack direction="vertical" className="content">
                      <ul>
                        {data?.whatIsTherapy?.points?.map((point) => (
                          <li key={point?.id}>
                            {point?.point}
                          </li>
                        ))}
                      </ul>
                    </Stack>
                  </ScrollAnimationComponent>
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <Row className="">
                <Col lg={10} xl={8}>
                  <ScrollAnimationComponent animationVariants={fadeIn}>
                    <Stack direction="vertical" className="content">
                      <ul>
                        {data?.mechanismOfAction?.points?.map((point) => (
                          <li key={point?.id}>
                            {point?.point}
                          </li>
                        ))}
                      </ul>
                    </Stack>
                  </ScrollAnimationComponent>
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="trird">
              <Row className="">
                <Col lg={10} xl={8}>
                  <ScrollAnimationComponent animationVariants={fadeIn}>
                    <Stack direction="vertical" className="content">
                      <ul>
                        {data?.processOverview?.points?.map((point) => (
                          <li key={point?.id}>
                            {point?.point}
                          </li>
                        ))}
                      </ul>
                    </Stack>
                  </ScrollAnimationComponent>
                </Col>
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </section>
  );
};

export default CartCellTherapy;
