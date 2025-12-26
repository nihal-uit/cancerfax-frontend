import React from "react";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";
import styled from "styled-components";

const OngoingClinicalHero = ({ data }) => {  
  return (
    <section className="clinical__safety__sec py-120 pb-0 bg-white">
      <div className="containerWrapper">
        <div className="hero_content_row">
          <div className="hero_content_left commContent_wrap">
            <ScrollAnimationComponent animationVariants={slideLeft}>
              <h1 className="title-1 text_theme_dark">{data?.heading}</h1>
              <FiltersContainer>
                <SearchInput>
                  <Input type="text" placeholder="Search with keywords" />
                  <SearchIcon>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </SearchIcon>
                </SearchInput>
              </FiltersContainer>
            </ScrollAnimationComponent>
          </div>

          <div className="hero_content_right align-self-stretch">
            <ScrollAnimationComponent animationVariants={slideRight}>
              <div className="commContent_wrap content-gap-40 h-100">
                <p className="text-16 text_theme_dark">
                  {data?.description_text}
                </p>
                
              </div>
            </ScrollAnimationComponent>
          </div>
        </div>
      </div>
    </section>
  );
};

const slideLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const FiltersContainer = styled.div`
  margin-top: 40px;
  width: min(564px, 100%);
  @media (max-width: 1023.98px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const SearchInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 20px;
  padding: 17px 20px;
  border: 1px solid #e9e9e9;
  transition: all 0.3s ease;

  &:focus-within {
    box-shadow: none;
    border: 1px solid #36454f;
  }
  &:focus {
    box-shadow: none;
    border: 1px solid #36454f;
  }

  @media (max-width: 768px) {
    padding: 14px 20px;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #36454F;
  background: transparent;
  
  &::placeholder {
    color: rgba(54, 69, 79, 0.5)
  }

  &.placeholder {
    color: rgba(54, 69, 79, 0.5)
    background-color: transparent;
  }  
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  color: rgba(54, 69, 79, 1);
  font-size: 18px;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }
`;


const FigureHolder = styled.div`
  @media (min-width: 992px) {
    margin-left: -24px;
  }
  .ratio {
    --bs-aspect-ratio: ${(372 / 611) * 100}%;
    border-radius: 30px;
    overflow: hidden;
    img {
      object-position: top;
      object-fit: cover;
    }
  }
`;

export default React.memo(OngoingClinicalHero);
