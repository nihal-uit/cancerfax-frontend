import styled from "styled-components";
import Marquee from "react-fast-marquee";
import { formatMedia } from "@/utils/strapiHelpers";
import ScrollAnimationComponent from "@/components/ScrollAnimation/ScrollAnimationComponent";

const AboutCerticication = ({ data }) => {
  return (
    <section className="hospital_slider_sec ourCertifications_sec ourCertifications_body">
      <div className="containerWrapper z-2 position-relative py-120">
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <CommContent className="commContent_wrap">
            <Label className="contentLabel">
              {data?.heading || ''}
            </Label>
            <Title className="title-3">
              {data?.subHeading || ''}
            </Title>
          </CommContent>
        </ScrollAnimationComponent>

        <div className="marquee_wrap mt-85">
          <Marquee
            pauseOnHover={true}
            speed={60}
            gradient={true}
            autoFill={true}
            direction="left"
            gradientColor="#36454F"
          >
            <div className="certificate_grid">
              {data?.badges?.map((item, index) => (
                <div key={index} className="certificate__item">
                  <img
                    src={formatMedia(item)}
                    alt="logos"
                  />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
};

const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

const CommContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  text-align: center;
  width: 894px;
  max-width: 100%;
  margin-inline: auto;
  @media (max-width: 1024px) {
    gap: 36px;
  }

  @media (max-width: 768px) {
    gap: 28px;
  }

  @media (max-width: 480px) {
    gap: 24px;
  }
`;

const Label = styled.p`
  color: ${(props) => props.theme.colors.white};
`;

const Title = styled.h3`
  color: ${(props) => props.theme.colors.white};
`;

export default AboutCerticication;
