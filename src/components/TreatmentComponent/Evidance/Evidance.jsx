import React from "react";
import styled from "styled-components";
import "./Evidance.scss";
import Card from "react-bootstrap/Card";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { formatMedia, renderRichTextWithImages } from "../../../utils/strapiHelpers";

const Evidance = ({ data, loading }) => {
  if (loading || !data?.isActive) {
    return null;
  }

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
            {data?.card_1 && (
              <div className="grid__item">
                <div className="card__list">
                  <Card className="border-0 ">
                    <div className="card__header">
                      {data?.card_1?.value && (
                        <div className="card__title">{data?.card_1?.value}</div>
                      )}
                      {
                        data?.card_1?.checkIcon && (
                          <div className="card__icon">
                            <img
                              src={data?.card_1?.icon ? formatMedia(data?.card_1?.icon) : '../images/check-icon.svg'}
                              alt="Check Icon"
                              width={32}
                              height={32}
                            />
                          </div>
                        )
                      }
                    </div>
                    { data?.card_1?.description_block || data?.card_1?.description_text && (
                      <div className="card__body">
                        <p>{renderRichTextWithImages(data?.card_1?.description_block)||data?.card_1?.description_text}</p>
                      </div>
                    )}
                  </Card>
                  {data?.card_2?.backgroundImage && (
                    <Card className="border-0 p-0">
                      <div className="ratio h-100">
                        <img
                          src={formatMedia(data?.card_2?.backgroundImage)}
                          alt={data?.card_2?.backgroundImage?.alternativeText || "Evidance Image"}
                          width={100}
                          height={100}
                        />
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            )}
            {data?.card_3 && (
              <div className="grid__item">
                <div className="card__list">
                  <Card className="border-0 p-0">
                    {data?.card_3?.backgroundImage && (
                      <div className="ratio h-100">
                        <img
                          src={formatMedia(data?.card_3?.backgroundImage)}
                          alt={data?.card_3?.backgroundImage?.alternativeText || "Evidance Image"}
                          width={100}
                          height={100}
                        />
                      </div>
                    )}
                    <div className="card__overlay text-center text-white">
                      <div className="card__overlay__content">
                        <div className="card__header justify-content-center">
                          {data?.card_3?.value && (
                            <div className="card__title">
                              {data?.card_3?.value}
                            </div>
                          )}
                        </div>
                        {data?.card_3?.description_block || data?.card_3?.description_text && (
                          <div className="card__body">
                            <p>{renderRichTextWithImages(data?.card_3?.description_block) || data?.card_3?.description_text}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
            {(data?.card_4 || data?.card_5) && (
              <div className="grid__item">
                <div className="card__list">
                  {data?.card_4 && (
                    <Card className="border-0 bg-white">
                      <div className="card__header">
                        {data?.card_4?.value && (
                          <div className="card__title">{data?.card_4?.value}</div>
                        )}
                        {
                          data?.card_4?.checkIcon && (
                            <div className="card__icon">
                              <img
                                src={data?.card_4?.icon ? formatMedia(data?.card_4?.icon) : '../images/check-icon.svg'}
                                alt="Check Icon"
                                width={32}
                                height={32}
                              />
                            </div>
                          )
                        }
                      </div>
                      {data?.card_4?.description_block || data?.card_4?.description_text && (
                        <div className="card__body">
                          <p>{renderRichTextWithImages(data?.card_4?.description_block) || data?.card_4?.description_text}</p>
                        </div>
                      )}
                    </Card>
                  )}
                  {data?.card_5 && (
                    <Card className="border-0 ">
                      <div className="card__header">
                        {data?.card_5?.value && (
                          <div className="card__title">{data?.card_5?.value}</div>
                        )}
                        {
                          data?.card_5?.checkIcon && (
                            <div className="card__icon">
                              <img
                                src={data?.card_5?.icon ? formatMedia(data?.card_5?.icon) : '../images/check-icon.svg'}
                                alt="Check Icon"
                                width={32}
                                height={32}
                              />
                            </div>
                          )
                        }
                      </div>
                      {data?.card_5?.description_block || data?.card_5?.description_text && (
                        <div className="card__body">
                          <p>{renderRichTextWithImages(data?.card_5?.description_block) || data?.card_5?.description_text}</p>
                        </div>
                      )}
                    </Card>
                  )}
                </div>
              </div>
            )}
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
