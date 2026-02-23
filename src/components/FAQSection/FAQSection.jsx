import React, { useState, useEffect, useMemo, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Tab, Accordion } from 'react-bootstrap';
import styled from 'styled-components';
import { fetchFAQs } from '../../store/slices/faqSlice';

/** Normalize a single FAQ from API (Strapi shape) to { id, documentId, question, answer, category }. */
const normalizeFaq = (raw) => {
  if (!raw) return null;
  const attrs = raw.attributes || raw;
  const cat = attrs.category?.data ?? attrs.category;
  let category = null;
  if (cat) {
    if (typeof cat === 'string') {
      category = { id: null, documentId: null, slug: cat, name: cat };
    } else {
      category = {
        id: cat.id,
        documentId: cat.documentId,
        slug: cat.slug ?? cat.attributes?.slug ?? '',
        name: cat.name ?? cat.attributes?.name ?? '',
      };
    }
  }
  return {
    id: raw.id,
    documentId: raw.documentId,
    question: attrs.question ?? '',
    answer: attrs.answer ?? '',
    category,
  };
};

const FAQSection = ({ data }) => {
  const dispatch = useDispatch();
  const { faqs: apiFaqs, loading: faqLoading } = useSelector((state) => state.faq);

  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);

  const displayFAQs = useMemo(() => {
    if (apiFaqs?.length > 0) {
      return apiFaqs.map(normalizeFaq).filter(Boolean);
    }
    return data?.faqs?.length > 0 ? data.faqs : [];
  }, [apiFaqs, data?.faqs]);

  const categories = useMemo(() => {
    const seen = new Set();
    return displayFAQs.reduce((acc, faq) => {
      const category = faq?.category;
      if (!category) return acc;
      const key = category.documentId || category.slug || String(category.id);
      if (seen.has(key)) return acc;
      seen.add(key);
      acc.push({
        key,
        name: category.name,
        id: category.id,
        slug: category.slug,
      });
      return acc;
    }, []);
  }, [displayFAQs]);

  const faqsByCategory = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      faqs: displayFAQs.filter((faq) => {
        const faqKey = faq?.category?.documentId || faq?.category?.slug || String(faq?.category?.id);
        return faqKey === cat.key;
      }),
    }));
  }, [categories, displayFAQs]);

  const [key, setKey] = useState('');

  useEffect(() => {
    if (categories.length && !key) {
      setKey(categories[0].key);
    }
  }, [categories, key]);

  const handleSelect = (eventKey) => {
    setKey(eventKey);
  };


  if (faqLoading && displayFAQs.length === 0) {
    return (
      <section className='faq_sec py-120'>
        <div className='containerWrapper'>
          <HeaderSection className='commContent_wrap'>
            <span className='contentLabel'>{data?.heading}</span>
            <h3 className='title-3'>{data?.subHeading}</h3>
          </HeaderSection>
          <p className='text-16'>Loading FAQs...</p>
        </div>
      </section>
    );
  }

  return (
    <section className='faq_sec py-120'>
      <div className='containerWrapper'>
        <HeaderSection className='commContent_wrap'>
          <span className='contentLabel'>{data?.heading}</span>
          <h3 className='title-3'>{data?.subHeading}</h3>
        </HeaderSection>
        <Tab.Container id="left-tabs-example" activeKey={key} onSelect={handleSelect}>
          <MainContent>
            <Sidebar>
              <Nav variant="pills" className="faq-tab-nav">
                {categories.map((category) => (
                  <Nav.Item key={category.key}>
                    <Nav.Link eventKey={category.key}>{category.name}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Sidebar>
            <FAQContent>
              <Tab.Content>
                {faqsByCategory.map((category) => (
                  <Tab.Pane eventKey={category.key} key={category.key}>
                    <div className="comm-accodion-wrap commContent_wrap content-gap-32">
                      {category.faqs.length ? (
                        <Accordion defaultActiveKey="0">
                          {category.faqs.map((faq, index) => (
                            <Accordion.Item eventKey={String(index)} key={faq.documentId || faq.id || index}>
                              <Accordion.Header>{faq.question}</Accordion.Header>
                              <Accordion.Body>
                                {faq.answer}
                              </Accordion.Body>
                            </Accordion.Item>
                          ))}
                        </Accordion>
                      ) : (
                        <p>No FAQs available for this category.</p>
                      )}
                    </div>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </FAQContent>
          </MainContent>
        </Tab.Container>
      </div>
    </section>
  );
};

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 45px;
`;

const MainContent = styled.div`
  display: flex;
  gap: 50px;
  align-items: flex-start;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const Sidebar = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  position: sticky;
  position: -webkit-sticky;
  top: 120px;
  z-index: 9;

  @media (max-width: 1024px) {
    width: 100%;
    top: 72px;
    background-color: #f8f8f8;
    padding: 10px 0;
  }
  
  @media (max-width: 768px) {
    top: 68px;
  }

  @media (max-width: 575px) {
    top: 64px;
  }

  .faq-tab-nav {
      flex-direction: column;
      gap: 24px;
      flex-shrink: 0;
      
      @media (max-width: 1024px) {
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 12px;
      }
      @media (max-width: 768px) {
        gap: 10px;
      }
      @media (max-width: 575px) {
        gap: 8px;
      }
    .nav-link {
      width: 100%;
      padding: 12.5px 20px;
      background: rgba(55, 65, 81, 0.1);
      border-radius: 16px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: left;
      font-family: 'Be Vietnam Pro', sans-serif;
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      color: #36454F;
      @media (max-width: 768px) {
        padding: 10px 15px;
        font-size: 16px;
        line-height: 26px;
      }
      @media (max-width: 575px) {
        padding: 8px 12px;
        font-size: 14px;
        line-height: 24px;
      }
      &:hover {
        background: rgba(55, 65, 81, 0.2);
      }
      &.active {
        background: #FF69B4;
        color: #fff;
      }
    }
  }
`;

const FAQContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
  @media (max-width: 1024px) {
    width: 100%;
}
`;

export default memo(FAQSection);
