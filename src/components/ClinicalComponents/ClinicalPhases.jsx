import { label } from "framer-motion/client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";

const defaultList = [
  {
    id: "phase-01",
    labelPrefix: "Phase I",
    label: "Establishing Safety and Defining the Right Dosage",
  },
  {
    id: "phase-02",
    labelPrefix: "Phase II",
    label: "Measuring Efficacy and Understanding Patient Response",
  },
  {
    id: "phase-03",
    labelPrefix: "Phase III",
    label: " Comparing New Treatments to Established Standards",
  },
  {
    id: "phase-04",
    labelPrefix: "Phase IV",
    label: "Monitoring Long-Term Safety and Real-World Performance",
  },
];
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
const ClinicalPhases = () => {
  const [activeId, setActiveId] = useState("phase-01");
  const sectionRefs = useRef({});

  // Scroll spy – highlight active section
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "10% 0px -90% 0px", // center-ish
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    defaultList.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id) => {
    const el = sectionRefs.current[id];
    console.log(el);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <>
      <section className="clinical__phase__sec py-120">
        <div className="containerWrapper z-2 ">
          <Row>
            <Col lg={6}>
              <div className="content__holder">
                {/* <ScrollAnimationComponent
                  animationVariants={fadeIn}
                  style={{ height: "auto" }}
                > */}
                <div className="commContent_wrap commContent_new ">
                  <p className="contentLabel">Global Breakthroughs</p>
                  <h3 className="title-3">
                    Understanding the Four Phases of Clinical Trials
                  </h3>
                  <div className="content__des text_theme_dark">
                    <p>
                      Each clinical trial progresses through specific stages
                      designed to ensure safety, efficacy, and long-term
                      reliability.
                    </p>
                  </div>
                </div>
                {/* </ScrollAnimationComponent> */}
                <div className="list__holder">
                  <div className="list">
                    <ul>
                      {defaultList.map((item, index) => (
                        <li
                          key={item.id}
                          className={item.id === activeId ? "active" : ""}
                          onClick={() => handleClick(item.id)}
                        >
                          <span className="list__counter">
                            <span className="list__counter__dot"></span>
                            {defaultList.length - 1 !== index && (
                              <span className="list__counter__line"></span>
                            )}
                          </span>
                          <span className="list__des">
                            <span>{item.labelPrefix}</span> - {item.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="card__list__holder">
                {defaultList.map((item) => (
                  <div
                    key={item.id}
                    className="card__list"
                    id={item.id}
                    ref={(el) => (sectionRefs.current[item.id] = el)}
                  >
                    <div className="card">
                      <div className="card__header">
                        <h3 className="card__header__title">
                          {item.labelPrefix}
                        </h3>
                      </div>
                      <div className="card__content">
                        <h4 className="card__title">{item.label}</h4>
                        <div className="card__description">
                          <p>
                            Conducted after the treatment is approved and
                            available to the public. Researchers monitor
                            long-term benefits, rare side effects, and patient
                            outcomes.This phase ensures ongoing safety,
                            effectiveness, and optimization of real-world use.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default ClinicalPhases;
