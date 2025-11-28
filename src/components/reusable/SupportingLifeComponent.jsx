import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchQuickFindsSection } from "../../store/slices/quickFindsSlice";
import ScrollAnimationComponent from "../../components/ScrollAnimation/ScrollAnimationComponent";

const SupportingLifeComponent = ({ supportContent }) => {
  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const dispatch = useDispatch();
  const { sectionContent } = useSelector((state) => state.quickFinds);

  useEffect(() => {
    dispatch(fetchQuickFindsSection());
  }, [dispatch]);

  // Fallback content
  const defaultContent = {
    label: "Lorem Ipsum",
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a est velit. In ut eros dapibus, consectetur metus nec, dictum metus.",
    buttonText: "Lorem Ipsum",
    buttonLink: "#",
    buttonTarget: "_blank",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
  };

  console.log("supportContent --> ", supportContent);

  const content = supportContent || sectionContent || defaultContent;

  return (
    <TopSection>
      <LeftContent className="commContent_wrap">
        <ScrollAnimationComponent animationVariants={slideLeft}>
          <div className="content-gap-20">
            <Label className="contentLabel text_theme_dark">
              {content.label}
            </Label>
            <Title className="title-3 text_theme_dark">{content.title}</Title>
            <Description className="text-16">{content.description}</Description>
            <CTAButton
              className="btn btn-pink-solid"
              to={content.buttonLink}
              target={content.buttonTarget}
            >
              {content.buttonText}
            </CTAButton>
          </div>
        </ScrollAnimationComponent>
      </LeftContent>

      <RightContent className="commContent_wrap">
        <ScrollAnimationComponent animationVariants={slideRight}>
          <div class="img-wrapper">
            <img src={content.image} alt="" className="img-clip" />
          </div>
        </ScrollAnimationComponent>
      </RightContent>
    </TopSection>
  );
};

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
  }

  @media (max-width: 768px) {
    gap: 32px;
  }
`;

const LeftContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 0 0 500px;
  @media (max-width: 1024px) {
    flex: 1 1 auto;
  }
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const Label = styled.div``;

const Title = styled.h3`
  max-width: 500px;
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Description = styled.p``;

const CTAButton = styled(Link)`
  background: ${(props) => props.theme.colors.pink};
  color: ${(props) => props.theme.colors.white};
  max-width: 283px;
  @media (max-width: 575px) {
    max-width: 100%;
  }
`;

export default SupportingLifeComponent;
