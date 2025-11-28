import styled from "styled-components";
import { formatDate, formatRichText } from "../../utils/strapiHelpers";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";
import "swiper/css";
import "swiper/css/effect-fade";

const BlogSlider = ({ data, loading }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return null;
  }

  const defaultBlogSliderContent = [
    {
    id: 1,
    title: "Lorem Ipsum",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "../images/blog-hero-slider-img-1.jpg",
    tag: "Tag",
    author: {
      name: "Author Name",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    },
    publishedAt: "May 27, 2024",
    readTime: "17 min read",
    buttonLink: "#",
    buttonText: "Know more",
  },
  {
    id: 2,
    title: "Lorem Ipsum 2",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "../images/blog-hero-slider-img-2.jpg",
    tag: "Tag 2",
    author: {
      name: "Author Name 2",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    },
    publishedAt: "May 27, 2024",
    readTime: "4 min read",
    buttonLink: "#",
    buttonText: "Know more",
  },
  ];

  const blogSliderContent = data?.resources?.length > 0 ? data?.resources?.map((resource, index) => ({
    title: resource?.title || defaultBlogSliderContent[index % 2]?.title,
    publishedAt: formatDate(resource?.publishedAt) || defaultBlogSliderContent[index % 2]?.publishedAt,
    readTime: resource?.readTime || defaultBlogSliderContent[index % 2]?.readTime,
    author: {
      name: `${resource?.author?.firstName} ${resource?.author?.lastName ? resource?.author?.lastName : ''}` || defaultBlogSliderContent.author,
      avatar: defaultBlogSliderContent[index % 2]?.author?.avatar,
    },
    image: resource?.slug || defaultBlogSliderContent[index % 2]?.image,
    tag: defaultBlogSliderContent[index % 2]?.tag,
    buttonText: defaultBlogSliderContent[index % 2]?.buttonText,
    buttonLink: defaultBlogSliderContent[index % 2]?.buttonLink,
  })) : defaultBlogSliderContent;

  return (
    <section className="hospital_slider_sec">
      <div className="containerWrapper one_side_full_container ms-0 me-auto ps-0">
        <div className="hospital_slider_wrapper">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            // loop={true}
            modules={[Navigation, EffectFade]}
            effect="fade"
            navigation={{
              nextEl: ".customNext",
              prevEl: ".customPrev",
            }}
          >
            {blogSliderContent.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="hospital_info_slider">
                <img src={slide.image} alt="" />
                <div className="hospital_info_slider_content">
                  <div className="inner_container">
                    <ScrollAnimationComponent animationVariants={fadeIn}>
                      <div className="commContent_wrap">
                        <SmallCardContent>
                          <Tag>{slide.tag}</Tag>
                          <AuthorInfo>
                            <AuthorAvatar>
                              <img src={slide.author.avatar} alt={slide.author.name}/>
                            </AuthorAvatar>
                            <AuthorName>{slide.author.name}</AuthorName>
                          </AuthorInfo>
                        </SmallCardContent>
                        <h3 className="line-2-text mb-2">
                          {slide.title}
                        </h3>
                        <BlogMeta>{slide.publishedAt} | {slide.readTime} min read</BlogMeta>
                        <a href={slide.buttonLink} className="btn btn-pink-solid">
                          {slide.buttonText}
                        </a>
                      </div>
                    </ScrollAnimationComponent>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            ))}
            <NavigationContainer className="customNavigation">
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
                    fill="#ffffff"
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
                    fill="#ffffff"
                  />
                </svg>
              </NavButton>
            </NavigationContainer>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

const NavigationContainer = styled.div`
  position: absolute;
  left: auto;
  right: 50px;
  bottom: 93px;
  display: flex;
  justify-content: flex-end;
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
    bottom: 52px;
    right: 20px;
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

const SmallCardContent = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 10px;
  width: 100%;
`;

const Tag = styled.span`
  font-family: "Be Vietnam Pro", sans-serif;
  background: #36454f;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  height: 28px;
  margin: 0;
  display: flex;
  align-items: center;
  padding: 0 14px;
  border-radius: 12px;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AuthorAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #e5e7eb;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorName = styled.span`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0;
`;

const BlogMeta = styled.span`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #f8f8f8;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0 0 10px;
  display: block;
  width: 100%;
  white-space: nowrap;
`;

export default BlogSlider;
