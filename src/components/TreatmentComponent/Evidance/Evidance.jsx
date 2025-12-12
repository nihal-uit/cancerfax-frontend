import React, { useMemo } from "react";
import styled from "styled-components";
import "./Evidance.scss";
import Card from "react-bootstrap/Card";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { getMediaUrl } from "../../../services/api";

const Evidance = ({ data, loading }) => {
  if (loading) return null;

  return (
    <section className="evidance_sec py-120 pb-0" id="evidance">
      <div className="containerWrapper z-2 position-relative">
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <Header className="commContent_wrap">
            <Label className="contentLabel">{data?.heading}</Label>
            <Title className="title-3">{data?.subHeading}</Title>
          </Header>
        </ScrollAnimationComponent>
        <div className="grid__list__holder">
          <div className="grid__list">
            <div className="grid__item">
              <div className="card__list">
                <Card className="border-0 ">
                  <div className="card__header">
                    <div className="card__title">{data?.card_1?.value}</div>
                    <div className="card__icon">
                      <img
                        src={getMediaUrl(data?.card_1?.backgroundImage)}
                        alt="Check Icon"
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>
                  <div className="card__body">
                    <p>{data?.card_1?.description_text}</p>
                  </div>
                </Card>
                <Card className="border-0 p-0">
                  <div className="ratio h-100">
                    <img
                      src={getMediaUrl(data?.card_2?.backgroundImage)}
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
                      src={getMediaUrl(data?.card_3?.backgroundImage)}
                      alt="Evidance Image"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="card__overlay text-center text-white">
                    <div className="card__overlay__content">
                      <div className="card__header justify-content-center">
                        <div className="card__title">
                          {data?.card_3?.value}
                        </div>
                      </div>
                      <div className="card__body">
                        <p>{data?.card_3?.description_text}</p>
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
                    <div className="card__title">{data?.card_4?.value}</div>
                    <div className="card__icon">
                      <img
                        src={getMediaUrl(data?.card_4?.icon)}
                        alt="Check Icon"
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>
                  <div className="card__body">
                    <p>{data?.card_4?.description_text}</p>
                  </div>
                </Card>
                <Card className="border-0 ">
                  <div className="card__header">
                    <div className="card__title">{data?.card_5?.value}</div>
                    <div className="card__icon">
                      <img
                        src={getMediaUrl(data?.card_5?.icon)}
                        alt="Check Icon"
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>
                  <div className="card__body">
                    <p>{data?.card_5?.description_text}</p>
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
