import React, { useState, useEffect } from 'react';
import { Nav, Tab, Image } from 'react-bootstrap';
import './OurJourney.css'
import styled from 'styled-components';


const OurJourney = () => {

    // ############################
    const [activeKey, setActiveKey] = useState('2017');
  
    const milestones = [
      {
        year: '2017',
        title: 'Vision Begins',
        description: 'CancerFax was founded with a mission to bridge global gaps in cancer treatment access and awareness.',
        image: '../images/our-journey-img-1.jpg' // Replace with actual image path
      },
      {
        year: '2018',
        title: 'Global Network Expansion',
        description: 'Expanded our network to reach more patients worldwide, connecting them with leading cancer treatment centers.',
        image: '../images/mission-vision-img.jpg'
      },
      {
        year: '2019',
        title: 'Patient Assistance Program',
        description: 'Launched comprehensive patient assistance programs to help those in need access quality cancer care.',
        image: '../images/what-we-do-03.webp'
      },
      {
        year: '2020',
        title: 'Digital Transformation',
        description: 'Embarked on digital transformation to make cancer care information more accessible through technology.',
        image: '../images/what-we-do-04.webp'
      },
      {
        year: '2021',
        title: 'Collaboration with Research Institutions',
        description: 'Partnered with leading research institutions to advance cancer treatment and patient care.',
        image: '../images/our-journey-img-1.jpg'
      },
      {
        year: '2022',
        title: 'Recognition for Patient Advocacy',
        description: 'Received recognition for our commitment to patient advocacy and improving cancer care access.',
        image: '../images/our-journey-img-1.jpg'
      },
      {
        year: '2023',
        title: 'Expanding to Emerging Markets',
        description: 'Extended our reach to emerging markets, bringing hope and quality care to underserved communities.',
        image: '../images/our-journey-img-1.jpg'
      },
      {
        year: '2024',
        title: 'Innovation in Cancer Care Access',
        description: 'Continuing to innovate in cancer care access, leveraging technology and partnerships for better outcomes.',
        image: '../images/our-journey-img-1.jpg'
      }
    ];
  
    const selectedMilestone = milestones.find(m => m.year === activeKey) || milestones[0];

  return (
    <section className='OurJourney_sec py-120'>
      <div className='containerWrapper'>
        <div className="commContent_wrap content-gap-24 max-w-800">
          <span className="contentLabel">MILESTONES</span>
          <h3 className="title-3">Our Journey of Impact and Medical Innovation</h3>
        </div>

        <ContentWrapper className="milestones_grid">
          <ContentLeft>
            <div className="milestones-timeline">
              <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
                <Nav variant="pills" className="vertical-tabs">
                  {milestones.map((milestone) => (
                    <Nav.Item key={milestone.year} className="milestone-item">
                      <Nav.Link 
                        eventKey={milestone.year}
                        className={`milestone-link ${activeKey === milestone.year ? 'active' : ''}`}
                      >
                        <div className="milestone-content">                        
                          <span className="milestone-title"><span className="milestone-year">{milestone.year}</span>-{milestone.title}</span>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Tab.Container>
            </div>
          </ContentLeft>
          <ContentRight>
            <div className="milestones-image-section">
              <div className="image-wrapper">
                <div className="background-year">{selectedMilestone.year}</div>
                <div className="image-container">
                  <Image 
                    src={selectedMilestone.image} 
                    alt={`${selectedMilestone.year} - ${selectedMilestone.title}`}
                    className="milestone-image"
                    fluid
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x400/f0f0f0/999999?text=' + encodeURIComponent(selectedMilestone.year + ' - ' + selectedMilestone.title);
                    }}
                  />
                </div>
                <div className="image-caption">
                  {selectedMilestone.description}
                </div>
              </div>
            </div>
          </ContentRight>
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
