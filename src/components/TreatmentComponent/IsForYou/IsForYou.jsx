import React from "react";
import "./IsForYou.scss";
import {
  Col,
  Container,
  Nav,
  Row,
  Stack,
  Tab,
} from "react-bootstrap";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { getMediaUrl } from "../../../services/api";

const IsForYou = ({ data, loading }) => {
  if (loading) return null;

  const inclusionCriteria = data?.criteria[0];
  const exclusionCriteria = data?.criteria[1];

  return (
    <section
      className="expertReviewSection_sec py-120"
      id="expert-review-section"
    >
      <Container className="containerWrapper z-2 position-relative">
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <div className="commContent_wrap commContent_new">
            <p className="contentLabel">{data?.heading}</p>
            <h3 className="title-3">
              {data?.subHeading}
            </h3>
            <div className="content__des">
              {data?.description_text}
            </div>
          </div>
        </ScrollAnimationComponent>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Nav variant="tabs" className="tab__count__3">
            <Nav.Item>
              <Nav.Link eventKey="first">
                <svg
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5138 0C6.15481 0 1.37378 4.0143 0.252746 9.48065C-0.307329 12.212 0.0699666 15.1164 1.3195 17.5878C2.52209 19.9663 4.49365 21.8886 6.85248 22.9781C9.30608 24.1115 12.1229 24.309 14.7018 23.5361C17.1897 22.7906 19.3956 21.1545 20.8975 18.9582C24.0376 14.3667 23.6178 7.917 19.9234 3.80272C17.7583 1.39151 14.683 0 11.5138 0ZM17.038 12.6422L13.8988 15.9927C13.104 16.8412 11.8477 15.5558 12.6392 14.7113L14.2232 13.0207H6.71664C6.18356 13.0207 5.73879 12.5569 5.73879 12.0016C5.73879 11.4464 6.18385 10.9825 6.71664 10.9825H14.1857L12.5703 9.29934C11.7676 8.46278 13.0121 7.16545 13.8148 8.00201L17.0307 11.3531C17.3716 11.7081 17.3748 12.2829 17.038 12.6422Z"
                    fill="#FF69B4"
                  />
                </svg>
                <span>{data?.criteria[0]?.heading}</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">
                <svg
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5138 0C6.15481 0 1.37378 4.0143 0.252746 9.48065C-0.307329 12.212 0.0699666 15.1164 1.3195 17.5878C2.52209 19.9663 4.49365 21.8886 6.85248 22.9781C9.30608 24.1115 12.1229 24.309 14.7018 23.5361C17.1897 22.7906 19.3956 21.1545 20.8975 18.9582C24.0376 14.3667 23.6178 7.917 19.9234 3.80272C17.7583 1.39151 14.683 0 11.5138 0ZM17.038 12.6422L13.8988 15.9927C13.104 16.8412 11.8477 15.5558 12.6392 14.7113L14.2232 13.0207H6.71664C6.18356 13.0207 5.73879 12.5569 5.73879 12.0016C5.73879 11.4464 6.18385 10.9825 6.71664 10.9825H14.1857L12.5703 9.29934C11.7676 8.46278 13.0121 7.16545 13.8148 8.00201L17.0307 11.3531C17.3716 11.7081 17.3748 12.2829 17.038 12.6422Z"
                    fill="#FF69B4"
                  />
                </svg>
                <span>{exclusionCriteria?.heading}</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="first">
              <Row className="align-items-center gy-4 gy-lg-0">
                <Col lg={6}>
                  <ScrollAnimationComponent animationVariants={sideLeft}>
                    <div className="ratio__holder">
                      <div className="ratio">
                        <img
                          src={getMediaUrl(inclusionCriteria?.image)}
                          alt="Expert Review"
                        />
                      </div>
                    </div>
                  </ScrollAnimationComponent>
                </Col>
                <Col lg={6}>
                  <ScrollAnimationComponent animationVariants={sideRight}>
                    <Stack direction="vertical" className="content">
                      <ul>
                        {inclusionCriteria?.points.map((item) => (
                          <li key={item.id}>
                            {item.point}
                          </li>
                        ))}
                      </ul>
                      <div className="btn__holder">
                        <a href={inclusionCriteria?.cta?.URL} target={inclusionCriteria?.cta?.target} className="btn btn-pink-solid">
                          {inclusionCriteria?.cta?.text}
                        </a>
                      </div>
                    </Stack>
                  </ScrollAnimationComponent>
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <Row className="align-items-center gy-4 gy-lg-0">
                <Col lg={6}>
                  <ScrollAnimationComponent animationVariants={sideLeft}>
                    <div className="ratio__holder">
                      <div className="ratio">
                        <img
                          src={getMediaUrl(exclusionCriteria?.image)}
                          alt="Expert Review"
                        />
                      </div>
                    </div>
                  </ScrollAnimationComponent>
                </Col>
                <Col lg={6}>
                  <ScrollAnimationComponent animationVariants={sideRight}>
                    <Stack direction="vertical" className="content">
                      <ul>
                        {exclusionCriteria?.points.map((item) => (
                          <li key={item.id}>
                            {item.point}
                          </li>
                        ))}
                      </ul>
                      <div className="btn__holder">
                        <a href={exclusionCriteria?.cta?.URL} target={exclusionCriteria?.cta?.target} className="btn btn-pink-solid">
                          {exclusionCriteria?.cta?.text}
                        </a>
                      </div>
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


const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
const sideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};
const sideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

export default React.memo(IsForYou);

