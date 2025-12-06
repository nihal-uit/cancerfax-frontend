import React, { useState } from "react";
import styled from "styled-components";
import ScrollAnimationComponent from "../../components/ScrollAnimation/ScrollAnimationComponent";
import { formatRichText, formatMedia } from "../../utils/strapiHelpers";

const BlogSupport = ({ data, loading }) => {
  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (loading) {
    return null;
  }

  const defaultContent = {
    label: "Supporting life, syncing happiness",
    title: "When Every Decision Matters, Start with the Right Guidance",
    description:
      "Our experts review your case, connect you to breakthrough therapies, and support you at every stage of your treatment journey.",
    buttonText: "Connect with our experts",
    image: "../images/supporting_life_img.png",
  };

  const content = data ? {
    label: data?.heading || defaultContent.label,
    title: data?.subHeading || defaultContent.title,
    description: formatRichText(data?.description_block) || defaultContent.description,
    image: formatMedia(data?.media) || defaultContent.image,
  } : defaultContent;

  const validateEmail = (value) => /^\S+@\S+\.\S+$/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSuccess("Successfully subscribed!");

    setEmail("");
  };

  return (
    <section className="supporting_life_sec bg_light_blue py-120">
      <div className="containerWrapper">
        <TopSection>
          <LeftContent className="commContent_wrap">
            <ScrollAnimationComponent animationVariants={slideLeft}>
              <div className="content-gap-20">
                <div className="contentLabel text_theme_dark">
                  {content.label}
                </div>
                <Title className="title-3 text_theme_dark">
                  {content.title}
                </Title>
                <div className="text-16">{content.description}</div>
                <form className="w-100" onSubmit={handleSubmit}>
                  <div className="subscribe_wrap">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Subscribe"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <button className="btn-subscribe" type="submit">
                      Subscribe
                    </button>
                  </div>

                  {error && <p className="text-danger mt-2">{error}</p>}
                  {success && <p className="text-success mt-2">{success}</p>}
                </form>
              </div>
            </ScrollAnimationComponent>
          </LeftContent>

          <RightContent className="commContent_wrap">
            <ScrollAnimationComponent animationVariants={slideRight}>
              <div className="img-wrapper">
                <img src={content.image} alt="" className="img-clip" />
              </div>
            </ScrollAnimationComponent>
          </RightContent>
        </TopSection>
      </div>
    </section>
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

const Title = styled.h3`
  max-width: 500px;
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default BlogSupport;
