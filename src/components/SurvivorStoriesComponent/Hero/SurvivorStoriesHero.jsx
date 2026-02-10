import { renderRichTextWithImages } from "@/utils/strapiHelpers";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import SurvivorStoriesVideo from "../SurvivorStoriesVideo/SurvivorStoriesVideo";

const SurvivorStoriesHero = ({ componentData, data, sectionClass }) => {
  const heroData = componentData || data;

  if (!heroData) {
    return null;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={`others_hero_content comm_hero_pt ${sectionClass || ''}`}>
      <div className="containerWrapper pt-60 pb-120">
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <div className="hero_content_row">
            <div className="text-center commContent_wrap content-gap-32">
              <h1 className="title-1 text_theme_dark">
                {heroData?.heading || ''}
              </h1>
              <p className="text-16 text_theme_dark">
                {renderRichTextWithImages(heroData?.description_block)||heroData?.description_text || ''}
              </p>
            </div>
          </div>
        </ScrollAnimationComponent>
        {heroData?.survivor_story && (
          <SurvivorStoriesVideo story={heroData.survivor_story} />
        )}
      </div>
    </div>
  );
};

export default SurvivorStoriesHero;
