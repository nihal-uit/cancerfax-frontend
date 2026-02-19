import React, { useState, useEffect } from 'react';
import { Nav, Tab, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { formatMedia } from '@/utils/strapiHelpers';

const HospitalDetailsFacilitiesTabsComponent = ({ data, loading }) => {
  const [key, setKey] = useState(null);

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0 && !key) {
      setKey(data[0]?.id?.toString() || '0');
    }
  }, [data, key]);

  if (loading || !data || !Array.isArray(data) || data.length === 0) {
    return null;
  }

  if (!key) {
    return null;
  }

  return (
    <Tab.Container id="left-tabs-example" activeKey={key} onSelect={(k) => setKey(k)}>
      <Row className='g-4'>
        <Col sm={12}>
          <Nav variant="pills" className="facilities-nav">
            {data.map((category, index) => (
              <Nav.Item key={category?.id || index}>
                <Nav.Link eventKey={category?.id?.toString() || index.toString()}>
                  {category?.category_name || `Category ${index + 1}`}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col sm={12}>
          <Tab.Content>
            {data.map((category, categoryIndex) => {
              const categoryKey = category?.id?.toString() || categoryIndex.toString();
              const facilities = category?.facilities || [];
              
              return (
                <Tab.Pane key={categoryKey} eventKey={categoryKey}>
                  <GridWrapper>
                    {facilities.map((facility, facilityIndex) => (
                      <StepCard key={facility?.id || facilityIndex}>
                        {facility?.icon && (
                          <IconWrapper>
                            <img src={formatMedia(facility.icon)} alt={facility?.icon?.alternativeText || facility?.details || ''} loading="lazy" />
                          </IconWrapper>
                        )}
                        <StepContent>
                          {facility?.details && <StepDescription>{facility.details}</StepDescription>}
                        </StepContent>
                      </StepCard>
                    ))}
                  </GridWrapper>
                </Tab.Pane>
              );
            })}
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

