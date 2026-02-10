import { useState } from 'react';
import { Nav, Tab, Image } from 'react-bootstrap';
import './OurJourney.css';
import styled from 'styled-components';
import { getMediaUrl } from '@/services/api';
import { renderRichTextWithImages } from '@/utils/strapiHelpers';

const OurJourney = ({ data }) => {
  const [activeKey, setActiveKey] = useState(data?.milestones[0]?.year || '');
  const selectedMilestone = data?.milestones.find((m) => m.year === activeKey);

  return (
    <section className='OurJourney_sec py-120'>
      <div className='containerWrapper'>
        <div className='commContent_wrap content-gap-24 max-w-800'>
          <span className='contentLabel'>{data?.heading || ''}</span>
          <h3 className='title-3'>{data?.subHeading || ''}</h3>
        </div>

        <ContentWrapper className='milestones_grid'>
          {activeKey ? (
            <>
              {' '}
              <ContentLeft>
                <div className='milestones-timeline'>
                  <Tab.Container
                    activeKey={activeKey}
                    onSelect={(k) => setActiveKey(k)}
                  >
                    <Nav variant='pills' className='vertical-tabs'>
                      {data?.milestones &&
                        data?.milestones?.length > 0 &&
                        data?.milestones?.map((milestone) => (
                          <Nav.Item
                            key={milestone.year}
                            className='milestone-item'
                          >
                            <Nav.Link
                              eventKey={milestone.year}
                              className={`milestone-link ${activeKey === milestone.year ? 'active' : ''}`}
                            >
                              <div className='milestone-content'>
                                <span className='milestone-title'>
                                  <span className='milestone-year'>
                                    {milestone.year}
                                  </span>
                                  -{milestone.title}
                                </span>
                              </div>
                            </Nav.Link>
                          </Nav.Item>
                        ))}
                    </Nav>
                  </Tab.Container>
                </div>
              </ContentLeft>
              <ContentRight>
                <div className='milestones-image-section'>
                  <div className='image-wrapper'>
                    <div className='background-year'>
                      {selectedMilestone?.year}
                    </div>
                    <div className='image-container'>
                      <Image
                        src={getMediaUrl(selectedMilestone?.featuredImage)}
                        alt={`${selectedMilestone.year} - ${selectedMilestone.title}`}
                        className='milestone-image'
                        fluid
                        onError={(e) => {
                          e.target.src =
                            'https://via.placeholder.com/600x400/f0f0f0/999999?text=' +
                            encodeURIComponent(
                              selectedMilestone.year +
                                ' - ' +
                                selectedMilestone.title,
                            );
                        }}
                      />
                    </div>
                    <div className='image-caption'>
                      {renderRichTextWithImages(
                        selectedMilestone.description_block,
                      ) || selectedMilestone.description_text}
                    </div>
                  </div>
                </div>
              </ContentRight>{' '}
            </>
          ) : null}
        </ContentWrapper>
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
  flex: 0 0 482px;

  @media (max-width: 1200px) {
    width: 100%;
    flex: 0 0 400px;
  }

  @media (max-width: 1024px) {
    width: 100%;
    flex: 1 1 auto;
    pointer-events: none;
  }
`;

export default OurJourney;
