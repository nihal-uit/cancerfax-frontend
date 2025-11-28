import { formatRichText } from "../../utils/strapiHelpers";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";

const BlogHero = ({ data, loading }) => {
  const defaultHeroContent = {
    title: "Lorem Ipsum",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  };

  const heroContent = data ? {
    title: data.heading || defaultHeroContent.title,
    description: formatRichText(data.description) || data.description || defaultHeroContent.description,
  } : defaultHeroContent;

  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  if (loading) {
    return null;
  }

  return (
    <div className="others_hero_content comm_hero_pt">
      <div className="containerWrapper py-88">
        <div className="hero_content_row align-items-center">
          <div className="hero_content_left commContent_wrap">
            <ScrollAnimationComponent animationVariants={slideLeft}>
              <h1 className="title-1 text_theme_dark">{heroContent.title}</h1>
            </ScrollAnimationComponent>
          </div>

          <div className="hero_content_right">
            <ScrollAnimationComponent animationVariants={slideRight}>
              <div className="commContent_wrap content-gap-40">
                <p className="text-16 text_theme_dark">
                  {heroContent.description}
                </p>
              </div>
            </ScrollAnimationComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
