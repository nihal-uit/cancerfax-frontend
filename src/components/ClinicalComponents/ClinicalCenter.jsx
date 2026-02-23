import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";
import { formatMedia, renderRichTextWithImages } from "../../utils/strapiHelpers";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const ClinicalCenter = ({ componentData, data }) => {
  const requirementData = componentData || data;

  if (!requirementData) {
    return null;
  }

  const cards = requirementData?.cards || [];

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="clinical__center__sec py-120">
      <div className="containerWrapper">
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <div className="commContent_wrap commContent_new">
            <p className="contentLabel">{requirementData?.heading || ''}</p>
            <h3 className="title-3">
              {requirementData?.subHeading || ''}
            </h3>
            <div className="content__des text_theme_dark">
              <p>{renderRichTextWithImages(requirementData?.description_block) || requirementData?.description_text || ''}</p>
            </div>
          </div>
        </ScrollAnimationComponent>
        <div className="center__list__holder">
          <div className="center__list">
            {cards.length > 0 && cards.map((card) => {
              const imageUrl = formatMedia(card?.image);
              return (
              <ScrollAnimationComponent
                  key={card?.id}
                animationVariants={fadeIn}
              >
                <div className="center__card">
                  <div className="center__card__body">
                    <div className="ratio">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={card?.image?.alternativeText || card?.title || "Center Thumb"}
                        />
                      ) : (
                        <GradientPlaceholder aria-hidden="true" />
                      )}
                    </div>

                    <div className="center__card__overlay">
                      <div className="center__card__overlay__content">
                          <h5 className="center__card__title">{card?.title || ''}</h5>
                          {card?.url && (
                        <div className="btn__holder">
                              <Link to={card.url} className="btn btn-pink-solid">
                            Explore
                          </Link>
                        </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimationComponent>
              );
            })}
          </div>
          {requirementData?.cta?.text && (
          <ScrollAnimationComponent animationVariants={fadeIn}>
            <div className="btn__holder text-center">
                <Link 
                  to={requirementData?.cta?.URL || '#'} 
                  target={requirementData?.cta?.target || '_self'}
                  className="btn btn-pink-solid"
                >
                  {requirementData.cta.text}
              </Link>
            </div>
          </ScrollAnimationComponent>
          )}
        </div>
      </div>
    </section>
  );
};

const GradientPlaceholder = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(54, 69, 79, 0.25) 0%,
    rgba(54, 69, 79, 0.08) 50%,
    rgba(54, 69, 79, 0.15) 100%
  );
  background-color: #e8eaec;
`;

export default ClinicalCenter;
