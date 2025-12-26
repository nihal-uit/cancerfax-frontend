import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getMediaUrl } from "../../services/api";
import { getSectionData, formatRichText } from "../../utils/strapiHelpers";
import ScrollAnimationComponent from "../../components/ScrollAnimation/ScrollAnimationComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";

const Section = styled.section`
  background: ${(props) => props.theme.colors.background};
  overflow: hidden;
`;

const Container = styled.div`
  position: relative;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
    margin-bottom: 40px;
  }
`;

const CommContent = styled.div``;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 870px;
  text-align: center;
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

const NavButton = styled.button`
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 28px;
    height: 20px;
    @media (max-width: 768px) {
      width: 24px;
      height: 18px;
    }
  }
`;

const TrialCard = styled.div`
  width: 100%;
  height: 356px;
  position: relative;
  background-color: transparent;
  border: 1px solid #727b81;
  border-radius: 24px;
  padding: 40px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease,
    transform 0.3s ease;
  flex-shrink: 0;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: #36454f !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-radius: 24px;
    h5 {
      color: #ffffff !important;
    }
  }

  @media (max-width: 768px) {
    padding: 32px 32px;
    gap: 24px;
  }
`;

const TrialTitle = styled.h5`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
  line-height: 1.6;
  margin: 0;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const ExploreButton = styled(Link)`
  background: ${(props) => props.theme.colors.pink};
  color: ${(props) => props.theme.colors.white};
  align-self: flex-start;
`;

const ClinicalTrials = ({ componentData, data }) => {
  const carouselRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const trialsData = componentData || data;

  useEffect(() => {
    const swiperElement = swiperContainerRef.current;
    if (!swiperElement) return;

    const handleWheel = (e) => {
      const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      if (isVerticalScroll) {
        return;
      }
    };
    swiperElement.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      swiperElement.removeEventListener("wheel", handleWheel);
    };
  }, []);

  if (!trialsData) {
    return null;
  }

  const formattedStrapiTrials =
  trialsData?.clinical_trials?.length > 0
      ? trialsData?.clinical_trials?.map((trial, index) => ({
        id: trial?.id || trial?.documentId || index + 1,
        title: trial?.name || "",
        link: trial?.slug ? `/clinical-trials/${trial?.slug}` : "#",
        order: trial?.order || index + 1,
        target: "_self",
      }))
      : [];

  const sortedTrials = [...formattedStrapiTrials].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  if (sortedTrials.length === 0) {
    return null;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Section className="globalBreakthroughs_sec py-120" id="trials">
      <Container className="containerWrapper">
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <HeaderWrapper>
            <CommContent className="commContent_wrap">
              <Header>
                <Label className="contentLabel">
                  {trialsData?.heading || ''}
                </Label>
                <Title className="title-3">
                  {trialsData?.subHeading || ''}
                </Title>
              </Header>
            </CommContent>
          </HeaderWrapper>
          <Swiper
            ref={carouselRef}
            spaceBetween={24}
            slidesPerView={1}
            // loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              480: { slidesPerView: 1.2 },
              767: { slidesPerView: 1.5 },
              992: { slidesPerView: 2.1 },
              1200: { slidesPerView: 3.4 },
              1920: { slidesPerView: 3.5 },
            }}
            modules={[Navigation]}
            navigation={{
              nextEl: ".customNext",
              prevEl: ".customPrev",
            }}
            style={{ overflow: "visible" }}
            className="commCircle_navigation"
          >
            {sortedTrials.map((trial, index) => (
              <SwiperSlide key={trial?.id || index}>
                <TrialCard>
                  <TrialTitle>{trial?.title || ''}</TrialTitle>
                  <ExploreButton
                    className="btn btn-pink-solid"
                    to={trial?.link || '#'}
                    target={trial?.target || '_self'}
                  >
                    Explore
                  </ExploreButton>
                </TrialCard>
              </SwiperSlide>
            ))}
            <NavButton className="customPrev">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="32"
                viewBox="0 0 46 32"
                fill="none"
              >
                <path
                  d="M15.8656 31.7313L17.6493 30.01L4.75497 17.1156H45.0481V14.6156H4.70684L17.5868 1.72125L15.8656 0L-3.43323e-05 15.8656L15.8656 31.7313Z"
                  fill="#727B81"
                />
              </svg>
            </NavButton>
            <NavButton className="customNext">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="32"
                viewBox="0 0 46 32"
                fill="none"
              >
                <path
                  d="M29.1825 31.7313L27.3988 30.01L40.2931 17.1156H0V14.6156H40.3413L27.4613 1.72125L29.1825 0L45.0481 15.8656L29.1825 31.7313Z"
                  fill="#727B81"
                />
              </svg>
            </NavButton>
          </Swiper>
        </ScrollAnimationComponent>
      </Container>
    </Section>
  );
};

export default ClinicalTrials;
