import React, { useState, useEffect } from 'react';
import { Nav, Tab, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { formatMedia } from '@/utils/strapiHelpers';

const hasContent = (facility) => {
  const hasIcon = !!facility?.icon;
  const details = (facility?.details ?? '').toString().trim();
  return hasIcon || details.length > 0;
};

const HospitalDetailsFacilitiesTabsComponent = ({ data, loading }) => {
  const [key, setKey] = useState(null);

  const categoriesWithContent = React.useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data
      .map((category) => ({
        ...category,
        facilities: (category?.facilities || []).filter(hasContent),
      }))
      .filter((category) => category.facilities.length > 0);
  }, [data]);

  useEffect(() => {
    if (categoriesWithContent.length > 0 && !key) {
      setKey(categoriesWithContent[0]?.id?.toString() || '0');
    }
  }, [categoriesWithContent, key]);

  if (loading || !data || !Array.isArray(data) || categoriesWithContent.length === 0) {
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
            {categoriesWithContent.map((category, index) => (
              <Nav.Item key={category?.id || index}>
                <Nav.Link eventKey={category?.id?.toString() || index.toString()}>
                  {(category?.category_name ?? '').trim() || `Category ${index + 1}`}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col sm={12}>
          <Tab.Content>
            {categoriesWithContent.map((category, categoryIndex) => {
              const categoryKey = category?.id?.toString() || categoryIndex.toString();
              const facilities = category.facilities;

              return (
                <Tab.Pane key={categoryKey} eventKey={categoryKey}>
                  <GridWrapper>
                    {facilities.map((facility, facilityIndex) => {
                      const details = (facility?.details ?? '').toString().trim();
                      const iconUrl = facility?.icon ? formatMedia(facility.icon) : null;
                      if (!iconUrl && !details) return null;

                      return (
                        <StepCard key={facility?.id || facilityIndex}>
                          {iconUrl && (
                            <IconWrapper>
                              <img src={iconUrl} alt={facility?.icon?.alternativeText || details || ''} loading="lazy" />
                            </IconWrapper>
                          )}
                          <StepContent>
                            {details && <StepDescription>{details}</StepDescription>}
                          </StepContent>
                        </StepCard>
                      );
                    })}
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
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid #E9E9E9;
  border-radius: 18px;
  overflow: hidden;
  background-color: #fff;
`;

const StepCard = styled.div`
  flex: 1 1 20%;
  min-width: 180px;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid #E9E9E9;
  min-height: 134px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    flex: 1 1 33.333%;
    min-width: 160px;
  }

  @media (max-width: 768px) {
    flex: 1 1 50%;
    min-width: 140px;
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
    min-width: 100%;
  }
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

