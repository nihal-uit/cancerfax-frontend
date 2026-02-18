import React, { useMemo } from "react";
import "./Journey.scss";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { getMediaUrl } from "../../../services/api";
import { renderRichTextWithImages } from "@/utils/strapiHelpers";

const Journey = ({ data, loading }) => {
  if (loading || !data?.isActive) {
    return null;
  }

  const steps = data?.steps || [];
  
  if (steps.length === 0) {
    return null;
  }

  return (
    <div className="journey_sec py-120" id="journey">
      <Container className="containerWrapper z-2 position-relative">
        <Header className="commContent_wrap">
          {data?.heading && (
            <Label className="contentLabel">{data?.heading}</Label>
          )}
          {data?.subHeading && (
            <Title className="title-3">{data?.subHeading}</Title>
          )}
          {data?.description_block && (
            <Description>{renderRichTextWithImages(data?.description_block)}</Description>
          )}
        </Header>
        
        <div className="card__list__holder mx-auto">
          <div className="card__list">
            {steps.map((step) => (
            <div className="card" key={step?.id}>
              {step?.title && (
                <p className="card__title">{step?.title}</p>
              )}
              <div className="ratio__holder position-relative">
                <div className="ratio h-100">
                  {step?.image && (
                    <img
                      src={getMediaUrl(step?.image)}
                      alt={step?.image?.alternativeText || step?.title || "Journey Step"}
                      width={810}
                      height={238}
                    />
                  )}
                </div>
                {step?.heading && (
                  <div className="card__overlay text-center text-white">
                    <div className="card__overlay__content">
                      <p>{step?.heading}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-bottom: 70px;
  text-align: center;
  width: 100%;
  max-width: 656px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-bottom: 40px;
    gap: 24px;
    max-width: 100%;
  }
`;

const Label = styled.p`
  color: #36454f;
`;

const Title = styled.h3`
  color: #36454f;
`;

const Description = styled.p`
  color: #36454f;
`;

export default React.memo(Journey);
