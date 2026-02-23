import React, { useMemo, useState } from 'react';
import { Nav, Tab, Image } from 'react-bootstrap';
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import './OurJourney.css';
import styled from 'styled-components';
import { formatMedia, renderRichTextWithImages } from '../../../utils/strapiHelpers';

const OurJourney = ({ data }) => {
  const journey = data?.journey_timeline;
  const milestones = journey?.milestones || [];

  const extractYear = (milestone) => {
    const dateStr = milestone?.date || milestone?.year || milestone?.title || '';
    const fourDigitYear = String(dateStr).match(/\b(19|20)\d{2}\b/);
    return fourDigitYear ? fourDigitYear[0] : null;
  };

  const tabItems = useMemo(() => {
    return milestones
      .map((m, idx) => ({
        key: m?.id?.toString() || `milestone-${idx}`,
        title: m?.title || '',
        description: renderRichTextWithImages(m?.description_block) || m?.description_text || '',
        image: formatMedia(m?.image),
        year: extractYear(m),
      }))
      .filter((m) => m.title || m.description || m.image);
  }, [milestones]);

  const [activeKey, setActiveKey] = useState(
    tabItems.length > 0 ? tabItems[0].key : null
  );

  const selectedMilestone =
    tabItems.find((m) => m.key === activeKey) || tabItems[0];

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  if (!journey || !journey?.isActive || tabItems.length === 0) return null;

  return (
    <section className='OurJourney_sec py-120'>
      <div className='containerWrapper'>
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <div className="commContent_wrap content-gap-24 max-w-800">
            {journey?.heading && <span className="contentLabel">{journey.heading}</span>}
            {journey?.subHeading && <h3 className="title-3">{journey.subHeading}</h3>}
          </div>

          <ContentWrapper className="milestones_grid">
            <ContentLeft>
              <div className="milestones-timeline">
                <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
                  <Nav variant="pills" className="vertical-tabs">
                    {tabItems.map((milestone) => (
                      <Nav.Item key={milestone.key} className="milestone-item">
                        <Nav.Link 
                          eventKey={milestone.key}
                          className={`milestone-link ${activeKey === milestone.key ? 'active' : ''}`}
                        >
                          <div className="milestone-content">                        
                            <span className="milestone-title">{milestone.title}</span>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </Tab.Container>
              </div>
            </ContentLeft>
            <ContentRight>
              {selectedMilestone && (
                <div className="milestones-image-section">
                  <ImageSectionWrapper>
                    {selectedMilestone.year && (
                      <BackgroundYear aria-hidden="true">{selectedMilestone.year}</BackgroundYear>
                    )}
                    <div className="image-wrapper">
                      <div className="image-container h-398">
                        {selectedMilestone.image && (
                          <Image 
                            src={selectedMilestone.image} 
                            alt={selectedMilestone.title || 'milestone image'}
                            className="milestone-image"
                            fluid
                          />
                        )}
                      </div>
                    </div>
                  </ImageSectionWrapper>
                  <div className="content-gap-12">
                    {selectedMilestone.title && (
                      <h4 className="title-4">{selectedMilestone.title}</h4>
                    )}
                    {selectedMilestone.description && (
                      <p className="text-16">{selectedMilestone.description}</p>
                    )}
                  </div>
                </div>
              )}
            </ContentRight>
          </ContentWrapper>
        </ScrollAnimationComponent>
      </div>
    </section>
  );
};


const ContentWrapper = styled.div`
  display: flex;
  gap: 120px;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  margin-top: 70px;
  @media (max-width: 1200px) {
    gap: 60px;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    margin-top: 30px;
  }
`;

const ContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 100%;
  flex: 1 1 auto;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    width: 100%;
    max-width: 100%;
    margin-bottom: 40px;
  }
`;

const ContentRight = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: 200px;
  flex: 0 0 660px;
  
  @media (max-width: 1200px) {
    width: 100%;
    flex: 0 0 520px;
  }
  
  @media (max-width: 1024px) {
    width: 100%;
    flex: 1 1 auto;
    pointer-events: none;
  }
  .milestones-image-section .image-container.h-398 {
    height: 398px;
  }
  .milestones-image-section .image-caption {
    color: #008080;
    font-size: 18px;
    text-align: center;
    padding-top: 20px;
  }
`;

const ImageSectionWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const BackgroundYear = styled.span`
  position: absolute;
  top: -80px;
  left: auto;
  right: -160px;
  font-size: 170px;
  font-weight: 300;
  color: #36454F;
  z-index: 0;
  line-height: 1;
  pointer-events: none;
  opacity: 0.11;
  font-family: 'Be Vietnam Pro', 'Arial', sans-serif;

  @media (max-width: 1200px) {
    top: -100px;
    right: -20px;
    font-size: 150px;
  }

  @media (max-width: 1024px) {
    right: -20px;
    font-size: 150px;
  }

  @media (max-width: 576px) {
    font-size: 100px;
    top: -60px;
  }
`;

export default OurJourney;
