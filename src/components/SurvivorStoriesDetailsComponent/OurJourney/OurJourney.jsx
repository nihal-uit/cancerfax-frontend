import React, { useState, useEffect } from 'react';
import { Nav, Tab, Image } from 'react-bootstrap';
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import './OurJourney.css'
import styled from 'styled-components';


const OurJourney = () => {

    // ############################
    const [activeKey, setActiveKey] = useState('2022');
  
    const milestones = [
      {
        year: '2022',
        title: 'December 8, 2022',
        description: 'Infusion of gene-edited stem cells',
        image: '../images/our-journey-img-2.jpg' // Replace with actual image path
      },
      {
        year: '2023',
        title: 'Months following',
        description: 'Infusion of gene-edited stem cells',
        image: '../images/mission-vision-img.jpg'
      },
      {
        year: '2024',
        title: 'February 17, 2023',
        description: 'Infusion of gene-edited stem cells',
        image: '../images/what-we-do-03.webp'
      },
      {
        year: '2025',
        title: 'Post-treatment',
        description: 'Infusion of gene-edited stem cells',
        image: '../images/what-we-do-04.webp'
      },
    ];
  
    const selectedMilestone = milestones.find(m => m.year === activeKey) || milestones[0];

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className='OurJourney_sec py-120'>
      <div className='containerWrapper'>
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <div className="commContent_wrap content-gap-24 max-w-800">
            <span className="contentLabel">MILESTONES</span>
            <h3 className="title-3">The Breakthrough Treatment Journey</h3>
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
              <div className="milestones-image-section">
                <div className="image-wrapper">
                  <div className="background-year">{selectedMilestone.year}</div>
                  <div className="image-container h-398">
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

export default OurJourney;
