import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import ScrollAnimationComponent from "../../components/ScrollAnimation/ScrollAnimationComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

const InnovativeSolutionsComponent = () => {
  const carouselRef = useRef(null);
  const swiperContainerRef = useRef(null);

  const InnovativeSolutionsData = [
    {
      id: 1,
      name: "Hospital name",
      description:
        "Dr Bharat Patodiya, 4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      phone: "(+91) 83741 90429",
    },
    {
      id: 2,
      name: "Hospital name",
      description:
        "Cutting-edge treatment that modifies genes to fight cancer at the molecular level, offering personalized solutions for various cancer types.",
      image:
        "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800",
      phone: "(+91) 83741 90429",
    },
    {
      id: 3,
      name: "Hospital name",
      description:
        "Harnesses the power of your immune system to target and eliminate cancer cells with precision and minimal side effects.",
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      phone: "(+91) 83741 90429",
    },
    {
      id: 4,
      name: "Hospital name",
      description:
        "Harnesses the power of your immune system to target and eliminate cancer cells with precision and minimal side effects.",
      image:
        "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600",
      phone: "(+91) 83741 90429",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Enable vertical page scrolling when hovering over Swiper
  useEffect(() => {
    const swiperElement = swiperContainerRef.current;
    if (!swiperElement) return;

    const handleWheel = (e) => {
      // Check if the scroll is primarily vertical (deltaY > deltaX)
      const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);

      if (isVerticalScroll) {
        // Allow vertical scrolling - don't prevent default
        return;
      }
      // For horizontal scroll, let Swiper handle it
    };

    swiperElement.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      swiperElement.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      <ScrollAnimationComponent animationVariants={fadeIn}>
        <div className="commContent_wrap">
          <Header>
            <Label className="contentLabel">Innovative Solutions</Label>
            <Title className="title-3">Flagship Centers of Excellence</Title>
          </Header>
          <Description className="text-16">
            These institutions represent the pinnacle of innovation, patient
            care, and research in cancer treatment.
          </Description>
        </div>
      </ScrollAnimationComponent>

      <Swiper
          ref={carouselRef}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            480: { slidesPerView: 1.2 },
            767: { slidesPerView: 1.5 },
            992: { slidesPerView: 2.1 },
            1200: { slidesPerView: 2.17 },
            1920: { slidesPerView: 2.5 },
          }}
          modules={[Autoplay]}
          style={{ overflow: "visible" }}
        >
          {InnovativeSolutionsData.map((innovativeSolutions, index) => {
          return (
            <SwiperSlide key={innovativeSolutions.id}>
              <TherapyCard>
                <CardImage image={innovativeSolutions.image}>
                  <CardOverlay className="card-overlay">
                    <CardTitle>{innovativeSolutions.name}</CardTitle>
                    <ArrowIcon>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </ArrowIcon>
                  </CardOverlay>
                  <CardHoverContent className="card-hover-content">
                    <HoverTitle>{innovativeSolutions.name}</HoverTitle>
                    <HoverDescription>
                      {innovativeSolutions.description}
                    </HoverDescription>
                    <ActionsRow>
                      <CallButton>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_361_2542)">
                            <path
                              d="M8.66698 0.666755C8.66698 0.489944 8.73722 0.320374 8.86225 0.19535C8.98727 0.070326 9.15684 8.80825e-05 9.33365 8.80825e-05C11.1012 0.00202915 12.7957 0.705031 14.0456 1.95485C15.2954 3.20468 15.9984 4.89924 16.0003 6.66675C16.0003 6.84357 15.9301 7.01313 15.8051 7.13816C15.68 7.26318 15.5105 7.33342 15.3337 7.33342C15.1568 7.33342 14.9873 7.26318 14.8622 7.13816C14.7372 7.01313 14.667 6.84357 14.667 6.66675C14.6654 5.25275 14.103 3.89712 13.1031 2.89727C12.1033 1.89742 10.7477 1.33501 9.33365 1.33342C9.15684 1.33342 8.98727 1.26318 8.86225 1.13816C8.73722 1.01313 8.66698 0.843566 8.66698 0.666755ZM9.33365 4.00009C10.0409 4.00009 10.7192 4.28104 11.2193 4.78114C11.7194 5.28123 12.0003 5.95951 12.0003 6.66675C12.0003 6.84357 12.0706 7.01313 12.1956 7.13816C12.3206 7.26318 12.4902 7.33342 12.667 7.33342C12.8438 7.33342 13.0134 7.26318 13.1384 7.13816C13.2634 7.01313 13.3337 6.84357 13.3337 6.66675C13.3326 5.60621 12.9108 4.58941 12.1609 3.8395C11.411 3.08958 10.3942 2.66781 9.33365 2.66675C9.15684 2.66675 8.98727 2.73699 8.86225 2.86202C8.73722 2.98704 8.66698 3.15661 8.66698 3.33342C8.66698 3.51023 8.73722 3.6798 8.86225 3.80483C8.98727 3.92985 9.15684 4.00009 9.33365 4.00009ZM15.3957 11.1594C15.782 11.5468 15.9989 12.0716 15.9989 12.6188C15.9989 13.1659 15.782 13.6907 15.3957 14.0781L14.789 14.7774C9.32898 20.0048 -3.95768 6.72142 1.18898 1.24409L1.95565 0.577421C2.3435 0.201873 2.8636 -0.0058792 3.40345 -0.000888689C3.9433 0.00410182 4.45948 0.221434 4.84032 0.604088C4.86098 0.624755 6.09632 2.22942 6.09632 2.22942C6.46287 2.61451 6.66692 3.12604 6.66605 3.65769C6.66518 4.18934 6.45946 4.7002 6.09165 5.08409L5.31965 6.05475C5.74688 7.09283 6.37503 8.03625 7.16799 8.83082C7.96095 9.62538 8.90311 10.2554 9.94032 10.6848L10.917 9.90809C11.3009 9.54056 11.8117 9.33508 12.3432 9.33434C12.8747 9.33359 13.386 9.53764 13.771 9.90409C13.771 9.90409 15.375 11.1388 15.3957 11.1594ZM14.4783 12.1288C14.4783 12.1288 12.883 10.9014 12.8623 10.8808C12.725 10.7446 12.5394 10.6682 12.346 10.6682C12.1526 10.6682 11.967 10.7446 11.8296 10.8808C11.8116 10.8994 10.467 11.9708 10.467 11.9708C10.3764 12.0429 10.2685 12.0902 10.1541 12.1079C10.0396 12.1257 9.92254 12.1133 9.81432 12.0721C8.47062 11.5718 7.25014 10.7886 6.23554 9.77547C5.22094 8.76237 4.43592 7.54304 3.93365 6.20009C3.88912 6.09039 3.8746 5.97081 3.89159 5.85365C3.90857 5.73648 3.95646 5.62595 4.03032 5.53342C4.03032 5.53342 5.10165 4.18809 5.11965 4.17075C5.25583 4.03341 5.33224 3.84783 5.33224 3.65442C5.33224 3.46101 5.25583 3.27543 5.11965 3.13809C5.09898 3.11809 3.87165 1.52142 3.87165 1.52142C3.73225 1.39643 3.55032 1.32948 3.36315 1.33432C3.17598 1.33915 2.99774 1.4154 2.86498 1.54742L2.09832 2.21409C-1.66302 6.73675 9.85098 17.6121 13.8143 13.8668L14.4216 13.1668C14.564 13.0349 14.6495 12.8529 14.66 12.6592C14.6706 12.4655 14.6054 12.2753 14.4783 12.1288Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_361_2542">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        {innovativeSolutions.phone}
                      </CallButton>
                      <IconButtonsGroup>
                        <DirectionsButton>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M7.19605 13.6389C7.2544 14.2621 7.80691 14.72 8.4301 14.6616C8.85375 14.622 9.21949 14.3483 9.37713 13.9531L13.2639 4.20849C13.4958 3.62711 13.2125 2.96782 12.6311 2.73592C12.3616 2.62839 12.061 2.62839 11.7914 2.73592L2.04676 6.62274C1.46538 6.85463 1.18206 7.51392 1.41396 8.09531C1.5716 8.49053 1.93734 8.76415 2.36099 8.80382L6.78209 9.21778L7.19605 13.6389ZM12.0919 3.908L8.36503 13.2515L7.88415 8.11572L2.74833 7.63484L12.0919 3.908Z"
                              fill="white"
                            />
                          </svg>
                          Get directions
                        </DirectionsButton>
                        <IconButton>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 8 7"
                            fill="none"
                          >
                            <path
                              d="M3.98451 0.109041C3.84796 0.243661 3.83516 0.456382 3.94709 0.605635L3.98071 0.644661L6.29146 2.98792L0.37875 2.98792C0.169572 2.98792 0 3.15749 0 3.36667C0 3.55975 0.144487 3.71909 0.33124 3.74247L0.37875 3.74542H6.29146L3.98071 6.08867C3.84609 6.22522 3.8363 6.4381 3.95034 6.58575L3.98451 6.62429C4.12105 6.75891 4.33393 6.7687 4.48158 6.65466L4.52013 6.62049L7.46596 3.63258C7.59923 3.4974 7.61034 3.28708 7.49928 3.13938L7.46596 3.10076L4.52013 0.112839C4.37327 -0.0361169 4.13346 -0.0378176 3.98451 0.109041Z"
                              fill="white"
                            />
                          </svg>
                        </IconButton>
                      </IconButtonsGroup>
                    </ActionsRow>
                  </CardHoverContent>
                </CardImage>
              </TherapyCard>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    margin-bottom: 28px;
  }

  @media (max-width: 768px) {
    gap: 24px;
    margin-bottom: 24px;
  }

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const Label = styled.p`
  color: ${(props) => props.theme.colors.primary};
`;

const Title = styled.h3`
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  max-width: 850px;
  margin: 0 auto 48px !important;

  @media (max-width: 1024px) {
    max-width: 700px;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    margin-bottom: 32px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    margin-bottom: 24px;
    line-height: 1.7;
  }
`;

const TherapyCard = styled.div`
  position: relative;
  width: 100%;
  height: 312px;
  background: #ffffff;
  border-radius: 40px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  flex-shrink: 0;
  scroll-snap-align: start;

  &:hover {
    transform: translateY(-4px);
  }

  &:hover .card-overlay {
    opacity: 0;
  }

  &:hover .card-hover-content {
    opacity: 1;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) =>
      props.image ? `url(${props.image})` : "rgba(182, 181, 181, 0.33)"}
    center/cover;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 24px;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CardOverlay = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: opacity 0.3s ease;

  @media (max-width: 1024px) {
    border-radius: 24px;
    padding: 16px 20px;
  }

  @media (max-width: 768px) {
    border-radius: 20px;
    padding: 14px 18px;
  }

  @media (max-width: 480px) {
    border-radius: 16px;
    padding: 12px 16px;
  }
`;

const CardHoverContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #36454f;
  padding: 40px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  ${TherapyCard}:hover & {
    opacity: 1;
    pointer-events: auto;
  }

  @media (max-width: 1024px) {
    padding: 32px 32px;
    gap: 24px;
  }

  @media (max-width: 480px) {
    padding: 24px 24px;
    gap: 20px;
  }
`;

const HoverTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  line-height: 1.3;

  @media (max-width: 1024px) {
    font-size: 22px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 1.35;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const HoverDescription = styled.p`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 16px;
  font-weight: 300;
  color: #ffffff;
  line-height: 1.6;
  margin: 0;

  @media (max-width: 575px) {
    font-size: 14px;
    line-height: 1.4;
  }
`;

const CardTitle = styled.h3`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
  line-height: 1.4;

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const ArrowIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    stroke: #36454f;
    transition: all 0.3s ease;
  }
`;

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  flex-shrink: 0;
  margin-top: auto;
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const CallButton = styled.button`
  padding: 6px 20px;
  background: #ff69b4;
  border: none;
  border-radius: 20px;
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  white-space: nowrap;
  height: 48px;

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

const DirectionsButton = styled.button`
  padding: 6px 20px;
  background: transparent;
  border: 1px solid #ffffff;
  border-radius: 20px;
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  white-space: nowrap;
  height: 48px;

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

const IconButton = styled.button`
  padding: 6px 20px;
  background: transparent;
  border: 1px solid #ffffff;
  border-radius: 20px;
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  white-space: nowrap;
  height: 48px;

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

const IconButtonsGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const NavigationContainer = styled.div`
  position: relative;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  z-index: 10;
  pointer-events: none;
  width: 100%;
  padding-top: 40px;

  > * {
    pointer-events: auto;
  }

  @media (max-width: 1024px) {
    gap: 32px;
  }

  @media (max-width: 768px) {
    gap: 24px;
    padding-top: 24px;
  }
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
    width: 46px;
    height: 32px;
    @media (max-width: 768px) {
      width: 32px;
      height: 24px;
    }
  }
`;

export default InnovativeSolutionsComponent;
