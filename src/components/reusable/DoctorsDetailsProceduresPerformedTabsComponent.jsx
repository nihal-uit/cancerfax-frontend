import React, { useState } from 'react';
import { Nav, Tab, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';

const DoctorsDetailsProceduresPerformedTabsComponent = () => {

  const [key, setKey] = useState('1');  // Default active tab

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
          <Nav variant="pills" className="procedures_performed_nav">
            <Nav.Item>
              <Nav.Link eventKey="1">Systemic Cancer Therapies</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="2">Clinical Trials & Novel Therapeutics</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="3">Precision Medicine & Molecular Profiling</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="4">Supportive & Palliative Care</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={12}>
          <Tab.Content>
            <Tab.Pane eventKey="1">
                <ProceduresGrid>
                  <ProceduresCol>
                    <ProceduresContent className='commContent_wrap content-gap-20'>
                      <h5>Targeted Therapies</h5>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                    </ProceduresContent>
                  </ProceduresCol>
                  <ProceduresCol>
                    <ProceduresContent className='commContent_wrap content-gap-20'>
                      <h5>Immunotherapies</h5>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                    </ProceduresContent>
                  </ProceduresCol>
                  <ProceduresCol>
                    <ProceduresContent className='commContent_wrap content-gap-20'>
                      <h5>Chemotherapy & Adjuvant Therapy</h5>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                    </ProceduresContent>
                  </ProceduresCol>                
                </ProceduresGrid>
            </Tab.Pane>
            <Tab.Pane eventKey="2">
                <ProceduresGrid>
                  <ProceduresCol>
                    <ProceduresContent className='commContent_wrap content-gap-20'>
                      <h5>Targeted Therapies</h5>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                    </ProceduresContent>
                  </ProceduresCol>
                  <ProceduresCol>
                    <ProceduresContent className='commContent_wrap content-gap-20'>
                      <h5>Immunotherapies</h5>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                    </ProceduresContent>
                  </ProceduresCol>
                  <ProceduresCol>
                    <ProceduresContent className='commContent_wrap content-gap-20'>
                      <h5>Chemotherapy & Adjuvant Therapy</h5>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                    </ProceduresContent>
                  </ProceduresCol>                
                </ProceduresGrid>            
              </Tab.Pane>
            <Tab.Pane eventKey="3">
                <ProceduresGrid>
                  <ProceduresCol>
                    <ProceduresContent className='commContent_wrap content-gap-20'>
                      <h5>Targeted Therapies</h5>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                    </ProceduresContent>
                  </ProceduresCol>
                  <ProceduresCol>
                    <ProceduresContent className='commContent_wrap content-gap-20'>
                      <h5>Immunotherapies</h5>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                    </ProceduresContent>
                  </ProceduresCol>
                  <ProceduresCol>
                    <ProceduresContent className='commContent_wrap content-gap-20'>
                      <h5>Chemotherapy & Adjuvant Therapy</h5>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                    </ProceduresContent>
                  </ProceduresCol>                
                </ProceduresGrid>            
              </Tab.Pane>
            <Tab.Pane eventKey="4">
                <ProceduresGrid>
                  <ProceduresCol>
                    <ProceduresContent className='commContent_wrap content-gap-20'>
                      <h5>Targeted Therapies</h5>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                    </ProceduresContent>
                  </ProceduresCol>
                  <ProceduresCol>
                    <ProceduresContent className='commContent_wrap content-gap-20'>
                      <h5>Immunotherapies</h5>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                    </ProceduresContent>
                  </ProceduresCol>
                  <ProceduresCol>
                    <ProceduresContent className='commContent_wrap content-gap-20'>
                      <h5>Chemotherapy & Adjuvant Therapy</h5>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                      <p>- EGFR/ALK/ROS1 inhibitors (e.g., Osimertinib, Crizotinib) for lung cancer</p>
                    </ProceduresContent>
                  </ProceduresCol>                
                </ProceduresGrid>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>  
  );
};

const ProceduresGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  border-top: 1px solid #E9E9E9;
  border-radius: 0;
  overflow: hidden;
  margin-top: 10px;

  @media (max-width: 768px) {
      .services-grid {
        grid-template-columns: repeat(1, 1fr);
      }
  }
`;

const ProceduresCol = styled.div`
  padding: 24px 16px 0 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  justify-content: space-between;
  border-right: 1px solid #E9E9E9;
  min-height: 134px;
  &:last-child {
    border-right: 1px solid transparent;
  }
`;

const ProceduresContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

export default DoctorsDetailsProceduresPerformedTabsComponent;

