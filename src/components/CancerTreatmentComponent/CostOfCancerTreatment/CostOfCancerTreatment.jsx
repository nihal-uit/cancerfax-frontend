import React, { useEffect, useRef, useState, useMemo } from "react";
import styled from 'styled-components';
import "./CostOfCancerTreatment.scss";
import { renderRichTextWithImages } from "@/utils/strapiHelpers";

const CostOfCancerTreatment = ({ data }) => {
  const section = data;
  const sections = useMemo(
    () =>
      Array.isArray(section?.content) && section?.isActive
        ? section.content
        : [],
    [section]
  );

  const [activeId, setActiveId] = useState(
    sections[0] ? `CostOfTreatment_${sections[0].id}` : null
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

    sections.forEach((sectionItem) => {
      const id = `CostOfTreatment_${sectionItem.id}`;
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (sections[0]) {
      setActiveId(`CostOfTreatment_${sections[0].id}`);
    }
  }, [sections]);

  if (!section?.isActive || sections.length === 0) {
    return null;
  }

  return (
    <section className='builtExperience_sec hospitalDetailsInfo_sec pt-120'>
      <div className="containerWrapper">
        <div className="hospitalDetailsInfo_wrap cancer_sidebar_wrap">
          <aside className="sidebar cancer-sidebar">
            <ul>
              {sections.map((item) => {
                const id = `CostOfTreatment_${item.id}`;
                const label =
                  item.section_name || item.heading || "";
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
            {sections.map((item) => {
              const id = `CostOfTreatment_${item.id}`;
              const hasHeading = item.heading || item.section_name;
              const hasDescription = Array.isArray(item.description_block);

              if (!hasHeading && !hasDescription) return null;

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
                        {item.heading || item.section_name}
                      </h3>
                    )}
                    {hasDescription &&
                      renderRichTextWithImages(item.description_block)}
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

export default CostOfCancerTreatment;
