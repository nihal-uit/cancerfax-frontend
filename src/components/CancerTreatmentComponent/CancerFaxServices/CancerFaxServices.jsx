import React from "react";
import styled from 'styled-components';
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import "./CancerFaxServices.scss";
import { renderRichTextWithImages } from "@/utils/strapiHelpers";
const CancerFaxServices = ({ data }) => {
  const section = data;
  const steps =
    Array.isArray(section?.details) && section?.isActive
      ? section.details
      : [];

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  if (!section?.isActive || (!section?.heading && !section?.description_block && !steps.length)) {
    return null;
  }

  return (
    <section className='cancerFax_services_sec pb-120'>
      <div className="containerWrapper">
        <div className="cancerFax_row">
          <div>
            <ScrollAnimationComponent animationVariants={fadeIn}>
              <RatioHolder>
                {section?.heading && (
                  <div className="commContent_wrap commContent_new">
                    <h3 className="title-3">
                      {section.heading}
                    </h3>
                  </div>
                )}
              </RatioHolder>
            </ScrollAnimationComponent>
          </div>
          <div>
            <ScrollAnimationComponent animationVariants={fadeIn}>
              <div className="commContent_wrap">
                {section?.description_block && (
                  <p>
                    {renderRichTextWithImages(section.description_text)}
                  </p>
                )}
              </div>
            </ScrollAnimationComponent>
          </div>
        </div>
        {steps.length > 0 && (
          <div className="services-wrap">
            <div className="steps-grid">
              {steps.map((item) => {
                const text = item?.description_text || "";
                if (!text) return null;
                return (
                  <div className="steps-grid__item" key={item.id || text}>
                    {text}
                  </div>
                );
              })}
            </div>
          </div>
        )}
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

export default CancerFaxServices;
