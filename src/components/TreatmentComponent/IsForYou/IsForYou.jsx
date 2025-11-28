import React, { useMemo } from "react";
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

  const fallbackCriteria = {
    heading: "Lorem Ipsum",
    image: null,
    points: [{ id: 1, point: "Lorem ipsum dolor sit amet" }],
    cta: { URL: "#", target: "_blank", text: "Learn More" },
  };

  const content = useMemo(() => {
    const criteria = data?.criteria || [];
    const inclusion = criteria[0] || fallbackCriteria;
    const exclusion = criteria[1] || fallbackCriteria;

    return {
      label: data?.heading || "Lorem Ipsum",
      title: data?.subHeading || data?.subHeading || "Lorem Ipsum",
      description: data?.description || "Lorem Ipsum",
      inclusionCriteria: {
        heading: inclusion.heading || fallbackCriteria.heading,
        image: inclusion.image || fallbackCriteria.image,
        points: Array.isArray(inclusion.points) && inclusion.points.length > 0
          ? inclusion.points
          : fallbackCriteria.points,
        cta: inclusion.cta || fallbackCriteria.cta,
      },
      exclusionCriteria: {
        heading: exclusion.heading || fallbackCriteria.heading,
        image: exclusion.image || fallbackCriteria.image,
        points: Array.isArray(exclusion.points) && exclusion.points.length > 0
          ? exclusion.points
          : fallbackCriteria.points,
        cta: exclusion.cta || fallbackCriteria.cta,
      },
    };
  }, [data]);

  if (loading) return null;

  return (
    <section
      className="expertReviewSection_sec py-120"
      id="expert-review-section"
    >
      <Container className="containerWrapper z-2 position-relative">
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <div className="commContent_wrap commContent_new">
            <p className="contentLabel">{content.label}</p>
            <h3 className="title-3">
              {content.title}
            </h3>
            <div className="content__des">
              {content.description}
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
                <span>{content.inclusionCriteria.heading}</span>
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
                <span>{content.exclusionCriteria.heading}</span>
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
                          src={getMediaUrl(content.inclusionCriteria.image)}
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
                        {content.inclusionCriteria.points.map((item) => (
                          <li key={item.id}>
                            {item.point}
                          </li>
                        ))}
                      </ul>
                      <div className="btn__holder">
                        <a href={content.inclusionCriteria.cta.URL} target={content.inclusionCriteria.cta.target} className="btn btn-pink-solid">
                          {content.inclusionCriteria.cta.text}
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
                          src={getMediaUrl(content.exclusionCriteria.image)}
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
                        {content.exclusionCriteria.points.map((item) => (
                          <li key={item.id}>
                            {item.point}
                          </li>
                        ))}
                      </ul>
                      <div className="btn__holder">
                        <a href={content.exclusionCriteria.cta.URL} target={content.exclusionCriteria.cta.target} className="btn btn-pink-solid">
                          {content.exclusionCriteria.cta.text}
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

