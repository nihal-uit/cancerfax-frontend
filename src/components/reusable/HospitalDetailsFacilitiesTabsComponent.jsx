import React, { useState } from 'react';
import { Nav, Tab, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const HospitalDetailsFacilitiesTabsComponent = () => {

  const [key, setKey] = useState('first');  // Default active tab

  const FacilitiesData = [
    {
      id: 1,
      facilities_icon: '../images/facilities_icon_1.svg',
      facilities_title: '200+ patient beds',
      order: 1
    },
    {
      id: 2,
      facilities_icon: '../images/facilities_icon_2.svg',
      facilities_title: '10+ modular operation theatres',
      order: 2
    },
    {
      id: 3,
      facilities_icon: '../images/facilities_icon_3.svg',
      facilities_title: '24×7 emergency and trauma care',
      order: 3
    },
    {
      id: 4,
      facilities_icon: '../images/facilities_icon_4.svg',
      facilities_title: 'Advanced imaging (CT, MRI, X-ray)',
      order: 4
    },
    {
      id: 5,
      facilities_icon: '../images/facilities_icon_5.svg',
      facilities_title: 'Fully equipped laboratory & blood bank',
      order: 5
    },
    {
      id: 6,
      facilities_icon: '../images/facilities_icon_6.svg',
      facilities_title: 'Private, semi-private & deluxe rooms',
      order: 6
    },
    {
      id: 7,
      facilities_icon: '../images/facilities_icon_7.svg',
      facilities_title: 'Telemedicine services',
      order: 7
    },
    {
      id: 8,
      facilities_icon: '../images/facilities_icon_8.svg',
      facilities_title: 'Day care & recovery units',
      order: 8
    },
    {
      id: 9,
      facilities_icon: '../images/facilities_icon_9.svg',
      facilities_title: 'Physiotherapy & rehab center',
      order: 9
    },
    {
      id: 10,
      facilities_icon: '../images/facilities_icon_10.svg',
      facilities_title: 'Ambulance service',
      order: 10
    }
  ];

  return (
    <Tab.Container id="left-tabs-example" activeKey={key} onSelect={(k) => setKey(k)}>
      <Row className='g-4'>
        <Col sm={12}>
          <Nav variant="pills" className="facilities-nav">
            <Nav.Item>
              <Nav.Link eventKey="first">General</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Diagnostic Services</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Special Services</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={12}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
                <GridWrapper>
                  {FacilitiesData.map((Facilities, index) => {                   
                    return (
                      <StepCard 
                        key={Facilities.id}
                      >
                        <IconWrapper>
                          <img src={Facilities.facilities_icon} alt="" />
                        </IconWrapper>
                        <StepContent>
                          <StepDescription>{Facilities.facilities_title}</StepDescription>
                        </StepContent>
                      </StepCard>
                    );
                  })}
                </GridWrapper>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <GridWrapper>
                {FacilitiesData.map((Facilities, index) => {                   
                  return (
                    <StepCard 
                      key={Facilities.id}
                    >
                      <IconWrapper>
                        <img src={Facilities.facilities_icon} alt="" />
                      </IconWrapper>
                      <StepContent>
                        <StepDescription>{Facilities.facilities_title}</StepDescription>
                      </StepContent>
                    </StepCard>
                  );
                })}
              </GridWrapper>
            </Tab.Pane>
            <Tab.Pane eventKey="third">
                <GridWrapper>
                  {FacilitiesData.map((Facilities, index) => {                   
                    return (
                      <StepCard 
                        key={Facilities.id}
                      >
                        <IconWrapper>
                          <img src={Facilities.facilities_icon} alt="" />
                        </IconWrapper>
                        <StepContent>
                          <StepDescription>{Facilities.facilities_title}</StepDescription>
                        </StepContent>
                      </StepCard>
                    );
                  })}
                </GridWrapper>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>  
  );
};

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0;
  width: 100%;
  border: 1px solid #E9E9E9;
  border-radius: 18px;
  overflow: hidden;
  background-color: #fff;
  @media (max-width: 1024px) {
      .services-grid {
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(4, auto);
      }
  }

  @media (max-width: 768px) {
      .services-grid {
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(5, auto);
      }
  }

  @media (max-width: 480px) {
      .services-grid {
          grid-template-columns: 1fr;
          grid-template-rows: repeat(10, auto);
      }
  }
`;

const StepCard = styled.div`
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid #E9E9E9;
  min-height: 134px;
`;

const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
  
  img {
    width: 36px;
    height: 36px;
    object-fit: contain;
  }
  
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const StepDescription = styled.h6`
  font-family: "Be Vietnam Pro", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #36454F;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;


export default HospitalDetailsFacilitiesTabsComponent;

