import React, { useMemo } from "react";
import styled from "styled-components";
import "./Evidance.scss";
import Card from "react-bootstrap/Card";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { getMediaUrl } from "../../../services/api";

const Evidance = ({ data, loading }) => {
  const fallbackCards = {
    card_1: { value: "10%", description: "Lorem Ipsum dolor sit amet" },
    card_2: { value: "20%", description: "Lorem Ipsum dolor sit amet" },
    card_3: { value: "30%", description: "Lorem Ipsum dolor sit amet" },
    card_4: { value: "40%", description: "Lorem Ipsum dolor sit amet" },
    card_5: { value: "50%", description: "Lorem Ipsum dolor sit amet" },
  };

  const buildCard = (apiCard, fallback) => {
    return {
      value: apiCard?.value || fallback.value,
      description: apiCard?.description || fallback.description,
      backgroundImage: apiCard?.backgroundImage
        ? getMediaUrl(apiCard.backgroundImage)
        : null,
    };
  };

  const content = useMemo(() => {
    return {
      label: data?.heading || "Lorem Ipsum",
      title: data?.subHeading || data?.subHeading || "Lorem Ipsum",
      card_1: buildCard(data?.card_1, fallbackCards.card_1),
      card_2: buildCard(data?.card_2, fallbackCards.card_2),
      card_3: buildCard(data?.card_3, fallbackCards.card_3),
      card_4: buildCard(data?.card_4, fallbackCards.card_4),
      card_5: buildCard(data?.card_5, fallbackCards.card_5),
    };
  }, [data]);

  if (loading) return null;

  return (
    <section className="evidance_sec py-120 pb-0" id="evidance">
      <div className="containerWrapper z-2 position-relative">
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <Header className="commContent_wrap">
            <Label className="contentLabel">{content.label}</Label>
            <Title className="title-3">{content.title}</Title>
          </Header>
        </ScrollAnimationComponent>
        <div className="grid__list__holder">
          <div className="grid__list">
            <div className="grid__item">
              <div className="card__list">
                <Card className="border-0 ">
                  <div className="card__header">
                    <div className="card__title">{content.card_1.value}</div>
                    <div className="card__icon">
                      <img
                        src="./images/check-icon.svg"
                        alt="Check Icon"
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>
                  <div className="card__body">
                    <p>{content.card_1.description}</p>
                  </div>
                </Card>
                <Card className="border-0 p-0">
                  <div className="ratio h-100">
                    <img
                      src={content.card_2.backgroundImage}
                      alt="Evidance Image"
                      width={100}
                      height={100}
                    />
                  </div>
                </Card>
              </div>
            </div>
            <div className="grid__item">
              <div className="card__list">
                <Card className="border-0 p-0">
                  <div className="ratio h-100">
                    <img
                      src={content.card_3.backgroundImage}
                      alt="Evidance Image"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="card__overlay text-center text-white">
                    <div className="card__overlay__content">
                      <div className="card__header justify-content-center">
                        <div className="card__title">
                          {content.card_3.value}
                        </div>
                      </div>
                      <div className="card__body">
                        <p>{content.card_3.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div className="grid__item">
              <div className="card__list">
                <Card className="border-0 bg-white">
                  <div className="card__header">
                    <div className="card__title">{content.card_4.value}</div>
                    <div className="card__icon">
                      <img
                        src="./images/check-icon.svg"
                        alt="Check Icon"
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>
                  <div className="card__body">
                    <p>{content.card_4.description}</p>
                  </div>
                </Card>
                <Card className="border-0 ">
                  <div className="card__header">
                    <div className="card__title">{content.card_5.value}</div>
                    <div className="card__icon">
                      <img
                        src="./images/check-icon.svg"
                        alt="Check Icon"
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>
                  <div className="card__body">
                    <p>{content.card_5.description}</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-bottom: 56px;
  text-align: center;
  width: 100%;
  max-width: 996px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  @media (max-width: 1024px) {
    margin-bottom: 36px;
    gap: 28px;
  }
  @media (max-width: 768px) {
    margin-bottom: 30px;
    gap: 24px;
    max-width: 100%;
  }
`;

const Label = styled.p`
  color: #36454f;
`;

const Title = styled.h3`
  color: #36454f;
`;

export default React.memo(Evidance);
