import React, { memo, useMemo } from "react";
import { Accordion } from "react-bootstrap";
import styled from "styled-components";
import "./faq.scss";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const FAQAccordion = ({ data, loading }) => {
  const displayFAQs = useMemo(() => {
    if (loading) return [];

    if (data?.faqs && Array.isArray(data.faqs) && data.faqs.length > 0) {
      return data.faqs;
    }
    return [];
  }, [data, loading]);

  if (loading) return null;

  return (
    <SectionContainer className="py-120 pt-0 treatment__faq__sec">
      <div className="containerWrapper z-2 position-relative">
        <ContentWrapper>
          <ScrollAnimationComponent animationVariants={fadeIn}>
            <Header className="commContent_wrap mx-auto text-center">
              <p className="contentLabel">{data?.heading || ''}</p>
              <h3 className="title-3">
                {data?.subHeading || ''}
              </h3>
            </Header>
          </ScrollAnimationComponent>
          <ScrollAnimationComponent animationVariants={fadeIn}>
            <Accordion defaultActiveKey={0} flush>
              {displayFAQs.map((faq, index) => {
                const faqItem = faq.attributes || faq;
                return (
                  <Accordion.Item eventKey={String(index)} key={faq.id || index}>
                    <Accordion.Header>
                      {faqItem.question || ''}
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>{faqItem.answer || ''}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </ScrollAnimationComponent>
          {displayFAQs.length === 0 && (
            <EmptyState>
              <p>No questions found in this category.</p>
            </EmptyState>
          )}
        </ContentWrapper>
      </div>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  width: 100%;
  background: #f8f8f8;
`;

const ContentWrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0;
  }
`;
const Header = styled.div`
  width: 802px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 48px;
  @media (max-width: 767.98px) {
    gap: 30px;
  }
`;
const CategoryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 40px;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 8px;
    margin-bottom: 30px;
  }
`;

const CategoryButton = styled.button`
  padding: 10px 24px;
  background: ${(props) =>
    props.isActive
      ? "linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)"
      : "#F7F8FA"};
  color: ${(props) => (props.isActive ? "#FFFFFF" : "#64748b")};
  border: none;
  border-radius: 50px;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${(props) =>
    props.isActive
      ? "linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)"
      : "#E5E7EB"};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
  }
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FAQItem = styled.div`
  background: #f7f8fa;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 24px 28px;
  background: transparent;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 105, 180, 0.05);
  }

  @media (max-width: 768px) {
    padding: 20px;
    gap: 16px;
  }
`;

const QuestionText = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff69b4;
  transition: transform 0.3s ease;

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const FAQAnswer = styled.div`
  overflow: hidden;
  transition: all 0.3s ease;
`;

const AnswerText = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.7;
  color: #64748b;
  margin: 0;
  padding: 0 28px 24px 28px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0 20px 20px 20px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;

  p {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    color: #64748b;
    margin: 0;
  }
`;

export default memo(FAQAccordion);
