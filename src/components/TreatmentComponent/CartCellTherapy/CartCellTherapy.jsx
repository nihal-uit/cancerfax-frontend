import React from "react";
import styled from "styled-components";
import "./CartCellTherapy.scss";
import {
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Nav,
  Row,
  Stack,
  Tab,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartCellTherapy = ({ fadeIn }) => {
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
                <p className="contentLabel">Super Title</p>
                <h3 className="title-3">Understanding CAR-T Cell Therapy</h3>
                <div className="content__des">
                  Each clinical trial progresses through specific stages
                  designed to ensure safety, efficacy, and long-term
                  reliability.
                </div>
              </div>
            </ScrollAnimationComponent>
          </Col>
        </Row>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Nav variant="tabs" className="tab__count__3">
            <Nav.Item>
              <Nav.Link eventKey="first">
                <span>What is CAR-T Cell Therapy?</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">
                <span>Mechanism of Action</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="trird">
                <span>Process Overview</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <div className="tab-content__bg">
              <img src="./images/cart__cell_bg.svg" alt="Cart Cell Therapy" />
            </div>
            <Tab.Pane eventKey="first">
              <Row className="">
                <Col lg={10} xl={8}>
                  <ScrollAnimationComponent animationVariants={fadeIn}>
                    <Stack direction="vertical" className="content">
                      <ul>
                        <li>
                          <strong>T-cell Extraction:</strong> Collecting T-cells
                          from the patient's blood.
                        </li>
                        <li>
                          <strong>Genetic Modification:</strong> Engineering the
                          T-cells to express specific receptors targeting cancer
                          antigens.
                        </li>
                        <li>
                          <strong>Expansion:</strong> Cultivating the modified
                          T-cells to increase their numbers.
                        </li>
                        <li>
                          <strong>Re-infusion:</strong> Administering the
                          engineered T-cells back into the patient's body to
                          target and eliminate cancer cells.
                        </li>
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
                        <li>
                          <strong>T-cell Extraction:</strong> Collecting T-cells
                          from the patient's blood.
                        </li>
                        <li>
                          <strong>Genetic Modification:</strong> Engineering the
                          T-cells to express specific receptors targeting cancer
                          antigens.
                        </li>
                        <li>
                          <strong>Expansion:</strong> Cultivating the modified
                          T-cells to increase their numbers.
                        </li>
                        <li>
                          <strong>Re-infusion:</strong> Administering the
                          engineered T-cells back into the patient's body to
                          target and eliminate cancer cells.
                        </li>
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
                        <li>
                          <strong>T-cell Extraction:</strong> Collecting T-cells
                          from the patient's blood.
                        </li>
                        <li>
                          <strong>Genetic Modification:</strong> Engineering the
                          T-cells to express specific receptors targeting cancer
                          antigens.
                        </li>
                        <li>
                          <strong>Expansion:</strong> Cultivating the modified
                          T-cells to increase their numbers.
                        </li>
                        <li>
                          <strong>Re-infusion:</strong> Administering the
                          engineered T-cells back into the patient's body to
                          target and eliminate cancer cells.
                        </li>
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
