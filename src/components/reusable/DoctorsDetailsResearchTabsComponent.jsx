import React, { useState } from 'react';
import { Nav, Tab, Row, Col } from 'react-bootstrap';

const DoctorsDetailsResearchTabsComponent = () => {

  const [key, setKey] = useState('first');  // Default active tab

  return (
    <Tab.Container id="left-tabs-example" activeKey={key} onSelect={(k) => setKey(k)}>
      <Row className='g-4'>
        <Col sm={12}>
          <Nav variant="pills" className="research-nav">
            <Nav.Item>
              <Nav.Link eventKey="first">
                <img src={'../images/research-icon.svg'} alt="" />
                Research Focus
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">
                <img src={'../images/publications-icons.svg'} alt="" />
                Selected Publications
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">
                <img src={'../images/education-icon.svg'} alt="" />
                Academic Contributions
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={12}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div className='bg_dark_gray text-white dark_gray_card content-gap-24'>
                  <h5>Dr. Zhang’s research encompasses several key areas:</h5>
                  <ul className='comm_ul'>
                    <li>Mechanisms of DMG Malignancy: Investigating the molecular and epigenetic factors contributing to the aggressive nature of DMG.</li>
                    <li>Epigenetic Agent-Based Immunotherapy: Developing novel treatments that combine epigenetic modifiers with immunotherapeutic approaches to target DMG cells.</li>
                    <li>Liquid Biopsy and Molecular Imaging: Creating non-invasive diagnostic tools for early detection and monitoring of DMG progression.</li>
                    <li>Biomarker Discovery: Identifying markers for early screening, tumor progression, and prognosis of DMG.</li>
                  </ul>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div className='bg_dark_gray text-white dark_gray_card content-gap-24'>
                  <h5>Dr. Zhang’s research encompasses several key areas:</h5>
                  <ul className='comm_ul'>
                    <li>Mechanisms of DMG Malignancy: Investigating the molecular and epigenetic factors contributing to the aggressive nature of DMG.</li>
                    <li>Epigenetic Agent-Based Immunotherapy: Developing novel treatments that combine epigenetic modifiers with immunotherapeutic approaches to target DMG cells.</li>
                    <li>Liquid Biopsy and Molecular Imaging: Creating non-invasive diagnostic tools for early detection and monitoring of DMG progression.</li>
                    <li>Biomarker Discovery: Identifying markers for early screening, tumor progression, and prognosis of DMG.</li>
                  </ul>
              </div>            
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <div className='bg_dark_gray text-white dark_gray_card content-gap-24'>
                  <h5>Dr. Zhang’s research encompasses several key areas:</h5>
                  <ul className='comm_ul'>
                    <li>Mechanisms of DMG Malignancy: Investigating the molecular and epigenetic factors contributing to the aggressive nature of DMG.</li>
                    <li>Epigenetic Agent-Based Immunotherapy: Developing novel treatments that combine epigenetic modifiers with immunotherapeutic approaches to target DMG cells.</li>
                    <li>Liquid Biopsy and Molecular Imaging: Creating non-invasive diagnostic tools for early detection and monitoring of DMG progression.</li>
                    <li>Biomarker Discovery: Identifying markers for early screening, tumor progression, and prognosis of DMG.</li>
                  </ul>
              </div>            
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>  
  );
};


export default DoctorsDetailsResearchTabsComponent;

