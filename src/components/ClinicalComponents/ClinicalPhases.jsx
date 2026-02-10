import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";
import { renderRichTextWithImages } from "@/utils/strapiHelpers";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const ClinicalPhases = ({ componentData, data }) => {
  const phasesData = componentData || data;
  const phases = phasesData?.phases || [];
  
  // Hooks must be called before any early returns
  const [activeId, setActiveId] = useState(() => {
    if (phases.length > 0) {
      return `phase-${phases[0]?.id || 0}`;
    }
    return 'phase-0';
  });
  const sectionRefs = useRef({});

  // Scroll spy – highlight active section
  useEffect(() => {
    if (phases.length === 0) return;
    const options = {
      root: null,
      rootMargin: "10% 0px -90% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    phases.forEach((phase) => {
      const id = `phase-${phase.id}`;
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [phases]);

  const handleClick = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!phasesData) {
    return null;
  }

  if (phases.length === 0) {
    return null;
  }

  return (
      <section className="clinical__phase__sec py-120">
        <div className="containerWrapper z-2 ">
          <Row>
            <Col lg={6}>
              <div className="content__holder">
                <div className="commContent_wrap commContent_new ">
                <p className="contentLabel">{phasesData?.heading || ''}</p>
                  <h3 className="title-3">
                  {phasesData?.subHeading || ''}
                  </h3>
                  <div className="content__des text_theme_dark">
                  <p>{renderRichTextWithImages(phasesData?.description_block)||phasesData?.description_text || ''}</p>
                </div>
              </div>
                <div className="list__holder">
                  <div className="list">
                    <ul>
                    {phases.map((phase, index) => {
                      const id = `phase-${phase.id}`;
                      return (
                        <li
                          key={phase.id}
                          className={id === activeId ? "active" : ""}
                          onClick={() => handleClick(id)}
                        >
                          <span className="list__counter">
                            <span className="list__counter__dot"></span>
                            {phases.length - 1 !== index && (
                              <span className="list__counter__line"></span>
                            )}
                          </span>
                          <span className="list__des">
                            {phase?.title || ''}
                          </span>
                        </li>
                      );
                    })}
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="card__list__holder">
              {phases.map((phase) => {
                const id = `phase-${phase.id}`;
                return (
                  <div
                    key={phase.id}
                    className="card__list"
                    id={id}
                    ref={(el) => (sectionRefs.current[id] = el)}
                  >
                    <div className="card">
                      <div className="card__header">
                        <h3 className="card__header__title">
                          Phase {phases.indexOf(phase) + 1}
                        </h3>
                      </div>
                      <div className="card__content">
                        <h4 className="card__title">{phase?.title || ''}</h4>
                        <div className="card__description">
                          <p>{renderRichTextWithImages(phase?.description_block) ||phase?.description_text || ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </Col>
          </Row>
        </div>
      </section>
  );
};

export default ClinicalPhases;
