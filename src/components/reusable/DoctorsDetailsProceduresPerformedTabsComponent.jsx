import React, { useState, useEffect, useMemo } from 'react';
import { Nav, Tab, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const DoctorsDetailsProceduresPerformedTabsComponent = ({ data, loading }) => {
  const [key, setKey] = useState(null);

  const proceduresCards = useMemo(() => {
    if (!data?.procedures_cards || !Array.isArray(data?.procedures_cards) || data?.procedures_cards?.length === 0) {
      return [];
    }
    return data.procedures_cards;
  }, [data?.procedures_cards]);

  // Set default active tab to first card
  useEffect(() => {
    if (proceduresCards.length > 0 && !key) {
      setKey(String(proceduresCards[0]?.id || '1'));
    }
  }, [proceduresCards, key]);

  if (loading || !data || proceduresCards.length === 0) {
    return null;
  }

  return (
    <Tab.Container id="procedures-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
      <Row className='g-4'>
        <Col sm={12}>
          <Nav variant="pills" className="procedures_performed_nav">
            {proceduresCards?.map((card, index) => (
              <Nav.Item key={card?.id || index}>
                <Nav.Link eventKey={String(card?.id || index + 1)}>
                  {card?.title || ''}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col sm={12}>
          <Tab.Content>
            {proceduresCards?.map((card, cardIndex) => {
              const procedures = card?.procedures || [];
              const proceduresPerRow = 3;
              const rows = [];
              
              for (let i = 0; i < procedures.length; i += proceduresPerRow) {
                rows.push(procedures.slice(i, i + proceduresPerRow));
              }

              return (
                <Tab.Pane key={card?.id || cardIndex} eventKey={String(card?.id || cardIndex + 1)}>
                  <ProceduresGrid>
                    {procedures?.map((procedure, procIndex) => (
                      <ProceduresCol key={procedure?.id || procIndex}>
                        <ProceduresContent className='commContent_wrap content-gap-20'>
                          {procedure?.title && <h5>{procedure?.title || ''}</h5>}
                          {procedure?.points && Array.isArray(procedure?.points) && procedure?.points?.length > 0 && (
                            <>
                              {procedure?.points?.map((point, pointIdx) => (
                                <p key={point?.id || pointIdx}>{point?.point || ''}</p>
                              ))}
                            </>
                          )}
                        </ProceduresContent>
                      </ProceduresCol>
                    ))}
                  </ProceduresGrid>
                </Tab.Pane>
              );
            })}
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
    grid-template-columns: repeat(1, 1fr);
    border-top: none;
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
    @media (max-width: 768px) {
      border-right: none;
      border-top: 1px solid #E9E9E9;
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

