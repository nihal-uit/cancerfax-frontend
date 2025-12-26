import React, { useEffect, useRef, useState, useMemo } from "react";
import styled from 'styled-components';
import { Image, Ratio } from "react-bootstrap";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { Link } from "react-router-dom";
import "./BuiltExperience.scss";
import { formatMedia, renderRichTextWithImages } from "@/utils/strapiHelpers";

const BuiltExperience = ({ data }) => {
  const about = data?.about;
  const contentSection = data?.content_section1;
  const sections = useMemo(
    () => (Array.isArray(contentSection?.content) ? contentSection.content : []),
    [contentSection]
  );
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const [activeId, setActiveId] = useState(
    sections[0] ? `builtExperience_${sections[0].id}` : null
  );
  const sectionRefs = useRef({});

  // Scroll spy – highlight active section
  useEffect(() => {
    if (!sections.length) return;

    const options = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // center-ish
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => {
      const id = `builtExperience_${section.id}`;
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (sections[0]) {
      setActiveId(`builtExperience_${sections[0].id}`);
    }
  }, [sections]);

  const handleClick = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const aboutImageUrl = formatMedia(about?.featuredImage);

  if (!about && !sections.length) {
    return null;
  }

  return (
    <section className='builtExperience_sec hospitalDetailsInfo_sec py-120'>
      <div className="containerWrapper">

        <div className="builtExperience_row">
          <div>
            <ScrollAnimationComponent
              animationVariants={fadeIn}
              className="h-100"
            >
              <RatioHolder>
                {about?.heading && (
                  <div className="commContent_wrap commContent_new">
                    <h3 className="title-3">
                      {about.heading}
                    </h3>
                  </div>
                )}
                {aboutImageUrl && (
                  <div className="ratio__holder">
                    <Ratio aspectRatio={"16x9"}>
                      <Image
                        src={aboutImageUrl}
                        alt={about?.heading || "About section image"}
                      />
                    </Ratio>
                  </div>
                )}
              </RatioHolder>
            </ScrollAnimationComponent>
          </div>
          <div>
            <ScrollAnimationComponent animationVariants={fadeIn}>
              <Description className="commContent_wrap">
                {Array.isArray(about?.description_block) &&
                  renderRichTextWithImages(about.description_block)}
                {about?.cta?.text && about?.cta?.URL && (
                  <Link
                    to={about.cta.URL}
                    target={about.cta.target || "_self"}
                    className="btn btn-pink-solid"
                  >
                    {about.cta.text}
                  </Link>
                )}
              </Description>
            </ScrollAnimationComponent>
          </div>
        </div>

        <div className="hospitalDetailsInfo_wrap cancer_sidebar_wrap">
          <aside className="sidebar cancer-sidebar">
            <ul>
              {sections.map((section) => {
                const id = `builtExperience_${section.id}`;
                const label =
                  section.section_name || section.heading || "";
                if (!label) return null;
                return (
                  <li
                    key={id}
                    className={id === activeId ? "active" : ""}
                    onClick={() => handleClick(id)}
                  >
                    <span>{label}</span>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="hospitalDetails_info">
            {sections.map((section) => {
              const id = `builtExperience_${section.id}`;
              const hasHeading = section.heading || section.section_name;
              const hasDescription = Array.isArray(
                section.description_block
              );

              if (!hasHeading && !hasDescription) {
                return null;
              }

              return (
                <div
                  key={id}
                  id={id}
                  ref={(el) => {
                    sectionRefs.current[id] = el;
                  }}
                  className="section"
                >
                  <div className="commContent_wrap content-gap-24">
                    {hasHeading && (
                      <h3 className="title-size-36">
                        {section.heading || section.section_name}
                      </h3>
                    )}
                    {hasDescription &&
                      renderRichTextWithImages(section.description_block)}
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
};

const RatioHolder = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media screen and (max-width: 1023.98px) {
    gap: 30px;
  }
  @media screen and (max-width: 767.98px) {
    gap: 24px;
  }
`;
const Description = styled.div`
  p {
    margin-bottom: 10px;
    line-height: 28px;
  }
`;

export default BuiltExperience;
