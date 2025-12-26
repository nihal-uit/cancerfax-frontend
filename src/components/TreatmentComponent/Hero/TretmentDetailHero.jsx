import styled from "styled-components";
import { formatMedia } from "../../../utils/strapiHelpers";
import { Link } from "react-router-dom";

const TreatmentDetailHero = ({ data }) => {
  if (!data || !data?.isActive) {
    return null;
  }
  
  return (
    <section className="homeHero_sec treatment_details_hero">
      <div className="home-hero-banner hospital_details_hero">
        <div className="ratio">
          {
            data?.featuredVideo ? (
              <BackgroundVideo
                className="video"
                preload="none"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={formatMedia(data?.featuredVideo)} type="video/mp4" />
              </BackgroundVideo>
            ) : (
              <BackgroundImage
                src={formatMedia(data?.featuredImage)}
                alt=''
                loading="lazy"
              />
            )
          }
        </div>
      </div>
      <div className="heroContent_wrap">
        <div className="containerWrapper">
          <div className="commContent_wrap">
            <HeroContentGrid>
              <TopRow>
                <Label className="contentLabel">
                  {data?.heading}
                </Label>
                <DoctorTitle className="title-1">
                  {data?.subHeading}
                </DoctorTitle>
                <SubText>
                  {data?.description_text}
                </SubText>

                {
                  data?.cta && (
                    <Link
                      className="btn btn-pink-solid"
                      to={data?.cta?.URL}
                      target={data?.cta?.target}
                    >
                      {data?.cta?.text}
                    </Link>
                  )
                }
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

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export default TreatmentDetailHero;
