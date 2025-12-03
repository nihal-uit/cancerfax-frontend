import React, { useState } from "react";
import styled from "styled-components";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { motion, AnimatePresence } from "framer-motion";
import "./WhyCancerTreatmentUSA.scss";

const Section = styled.section`
  overflow: hidden;
`;

const Container = styled.div`
  position: relative;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 48px;
  margin-bottom: 56px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
    margin-bottom: 30px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const Label = styled.p`
  color: ${(props) => props.theme.colors.primary};
`;

const Title = styled.h3`
  color: ${(props) => props.theme.colors.primary};
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.primary};
`;

const WhyCancerTreatmentUSA = ({ sectionClass }) => {
  const content = {
    title: "Why cancer treatment in the USA?",
    description: "At CancerFax, we’re transforming the way patients discover and receive life-saving therapies, simplifying global care with science, technology, and trust.",
  };

  const whyOptContent = [
    {
      id: 1,
      title: "Advanced medical technologies and treatment",
      description: "The United States is renowned for its advanced cancer treatment technology and strong medical infrastructure. Patients now have access to cutting-edge therapies that can increase outcomes and survival rates, such as targeted therapies, immunotherapies, and precision medicine. Patients in the USA can take advantage of the most recent advancements in cancer treatment thanks to the availability of cutting-edge medical technologies and clinical trials. Drugs in the USA are launched 4-5 years earlier than any country in Asia or Africa.",
      image: "../images/therapy-thumb-01.webp",
      link: "#",
      order: 1,
    },
    {
      id: 2,
      title: "Highly skilled medical professionals",
      description: "The United States is renowned for its advanced cancer treatment technology and strong medical infrastructure. Patients now have access to cutting-edge therapies that can increase outcomes and survival rates, such as targeted therapies, immunotherapies, and precision medicine. Patients in the USA can take advantage of the most recent advancements in cancer treatment thanks to the availability of cutting-edge medical technologies and clinical trials.",
      image: "../images/therapy-thumb-01.webp",
      link: "#",
      order: 2,
    },
    {
      id: 3,
      title: "Comprehensive cancer research and innovation",
      description: "The United States is renowned for its advanced cancer treatment technology and strong medical infrastructure. Patients now have access to cutting-edge therapies that can increase outcomes and survival rates, such as targeted therapies, immunotherapies, and precision medicine. Patients in the USA can take advantage of the most recent advancements in cancer treatment thanks to the availability of cutting-edge medical technologies and clinical trials.",
      image: "../images/therapy-thumb-01.webp",
      link: "#",
      order: 3,
    },
    {
      id: 4,
      title: "Multidisciplinary approach to cancer treatment",
      description: "The United States is renowned for its advanced cancer treatment technology and strong medical infrastructure. Patients now have access to cutting-edge therapies that can increase outcomes and survival rates, such as targeted therapies, immunotherapies, and precision medicine. Patients in the USA can take advantage of the most recent advancements in cancer treatment thanks to the availability of cutting-edge medical technologies and clinical trials.",
      image: "../images/therapy-thumb-01.webp",
      link: "#",
      order: 4,
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  const [activeCard, setActiveCard] = useState(whyOptContent?.[0]?.id);

  const toggleCard = (id) => {
    setActiveCard((prev) => (prev === id ? null : id));
  };
  const getCardClass = (itemId, index, activeCard, cards) => {
    const activeIndex = cards.findIndex((c) => c.id === activeCard);

    if (itemId === activeCard) {
      return "card__active";
    }

    if (index < activeIndex) {
      return "card__prev";
    }

    return "card__next";
  };

  return (
    <Section className={`theraphy__sec py-120 ${sectionClass}`} id="trials">
      <Container className="containerWrapper">
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <HeaderWrapper>
            <Header className="commContent_wrap">
              <Title className="title-3">
                {content.title || "Why Opt for CAR T-Cell Therapy"}
              </Title>
              <Description className="text-16">
                {content.description ||
                  `CAR T-Cell Therapy offers personalized, targeted treatment, delivering powerful, long-lasting results for patients with certain blood cancers.`}
              </Description>
            </Header>
          </HeaderWrapper>
        </ScrollAnimationComponent>
        <div className="card__list">
          {whyOptContent.map((item, index) => (
            <motion.div
              key={item.id}
              className={`card__item ${getCardClass(
                item.id,
                index,
                activeCard,
                whyOptContent
              )}`}
              onClick={() => toggleCard(item.id)}
              animate={{
                flexGrow: activeCard === item?.id ? 2.5 : 1,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="card ">
                <AnimatePresence>
                  {activeCard !== item.id && (
                    <motion.div className="h-100">
                      <div className="card__content">
                        <div className="icon">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.9999 0C8.97195 0 0 8.97195 0 19.9999C0 31.0279 8.97195 39.9998 19.9999 39.9998C31.0279 39.9998 39.9998 31.028 39.9998 19.9999C39.9998 8.97187 31.0279 0 19.9999 0ZM19.9999 37.4998C10.3505 37.4998 2.5 29.6494 2.5 19.9999C2.5 10.3505 10.3505 2.5 19.9999 2.5C29.6494 2.5 37.4998 10.3504 37.4998 19.9999C37.4998 29.6494 29.6494 37.4998 19.9999 37.4998ZM31.0937 19.9999C31.0937 20.6903 30.534 21.2499 29.8437 21.2499H21.2499V29.8437C21.2499 30.5341 20.6902 31.0937 19.9999 31.0937C19.3096 31.0937 18.7499 30.5341 18.7499 29.8437V21.2499H10.1562C9.46586 21.2499 8.90617 20.6903 8.90617 19.9999C8.90617 19.3095 9.46586 18.7499 10.1562 18.7499H18.7499V10.1562C18.7499 9.46578 19.3096 8.90617 19.9999 8.90617C20.6902 8.90617 21.2499 9.46578 21.2499 10.1562V18.7499H29.8437C30.534 18.7499 31.0937 19.3096 31.0937 19.9999Z"
                              fill="#36454F"
                            />
                          </svg>
                        </div>
                        <h4 className="card__content__title">{item.title}</h4>
                      </div>
                    </motion.div>
                  )}
                  {activeCard === item.id && (
                    <motion.div className="h-100">
                      <div className="ratio__holder position-relative">
                        <div className="ratio h-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                      <div className="card__overlay">
                        <div className="card__overlay__content">
                          <h4 className="card__title">{item.title}</h4>
                          <p className="card__description">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default WhyCancerTreatmentUSA;
