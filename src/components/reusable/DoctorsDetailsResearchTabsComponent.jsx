import React, { useState, useEffect, useMemo } from 'react';
import { Nav, Tab, Row, Col } from 'react-bootstrap';
import { formatMedia } from '../../utils/strapiHelpers';

const DoctorsDetailsResearchTabsComponent = ({ data, loading }) => {
  const [key, setKey] = useState(null);

  const cards = useMemo(() => {
    if (!data?.cards || !Array.isArray(data?.cards) || data?.cards?.length === 0) {
      return [];
    }
    return data.cards;
  }, [data?.cards]);

  // Set default active tab to first card
  useEffect(() => {
    if (cards.length > 0 && !key) {
      setKey(String(cards[0]?.id || 'first'));
    }
  }, [cards, key]);

  if (loading || !data || cards.length === 0) {
    return null;
  }

  return (
    <Tab.Container id="research-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
      <Row className='g-4'>
        <Col sm={12}>
          <Nav variant="pills" className="research-nav">
            {cards?.map((card, index) => (
              <Nav.Item key={card?.id || index}>
                <Nav.Link eventKey={String(card?.id || index)}>
                  {card?.icon && (
                    <img 
                      src={formatMedia(card?.icon)} 
                      alt={card?.icon?.alternativeText || card?.title || ''} 
                    />
                  )}
                  {card?.title || ''}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col sm={12}>
          <Tab.Content>
            {cards?.map((card, cardIndex) => (
              <Tab.Pane key={card?.id || cardIndex} eventKey={String(card?.id || cardIndex)}>
                <div className='bg_dark_gray text-white dark_gray_card content-gap-24'>
                  {card?.publications?.title && <h5>{card?.publications?.title || ''}</h5>}
                  {card?.publications?.points && Array.isArray(card?.publications?.points) && card?.publications?.points?.length > 0 && (
                    <ul className='comm_ul'>
                      {card?.publications?.points?.map((point, pointIdx) => (
                        <li key={point?.id || pointIdx}>{point?.point || ''}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>  
  );
};


export default DoctorsDetailsResearchTabsComponent;

