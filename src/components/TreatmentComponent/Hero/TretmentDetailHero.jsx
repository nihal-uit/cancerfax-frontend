import React from "react";
import styled from "styled-components";

const TreatmentDetailHero = ({
  DoctorName = "Prof. Shuhang Wang",
  DoctorText = "Associate Chief Physician & GCP center secretary , Experience: 25 Years",
  DoctorVideo = "../videos/doctors-video.mp4",
  onSubmitReports,
}) => {
  return (
    <section className="homeHero_sec treatment_details_hero">
      <div className="home-hero-banner hospital_details_hero">
        <div className="ratio">
          <BackgroundVideo
            className="video"
            preload="none"
            autoplay="true"
            loop="true"
            muted="true"
            playsinline="true"
            poster="./images/treatment-details-banner.jpg"
          >
            <source src={DoctorVideo} type="video/mp4" />
            {/* <source src="../videos/doctors-video.mov" type="video/mov" />
          <source src="../videos/doctors-video.webm" type="video/webm" />
          <source src="../videos/doctors-video.ogv" type="video/ogv" /> */}
          </BackgroundVideo>
        </div>
      </div>
      <div className="heroContent_wrap">
        <div className="containerWrapper">
          <div className="commContent_wrap">
            <HeroContentGrid>
              <TopRow>
                <Label className="contentLabel text_theme_dark">
                  CAR T-Cell Therapy
                </Label>
                <DoctorTitle className="title-1">
                  CAR-T Cell Therapy for Chronic Lymphocytic Leukemia (CLL)
                </DoctorTitle>
                <SubText>
                  CancerFax provides expert access to CAR T-Cell treatments
                  across top global centers, helping you navigate eligibility,
                  logistics, and care coordination. <br />
                  Discover how this next-generation therapy could become your
                  path forward.
                </SubText>

                <SubmitButton
                  className="btn btn-pink-solid"
                  onClick={onSubmitReports}
                >
                  Check availability & book a slot
                </SubmitButton>
              </TopRow>
            </HeroContentGrid>
          </div>
        </div>
      </div>
    </section>
  );
};

const BackgroundVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const HeroContentGrid = styled.div``;

const TopRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 40px;
  width: min(775px, 100%);
`;
const Label = styled.p`
  color: ${(props) => props.theme.colors.white};
`;
const DoctorTitle = styled.h1`
  color: ${(props) => props.theme.colors.white};
`;

const SubText = styled.p`
  color: ${(props) => props.theme.colors.white};
`;

const SubmitButton = styled.button``;

export default TreatmentDetailHero;
