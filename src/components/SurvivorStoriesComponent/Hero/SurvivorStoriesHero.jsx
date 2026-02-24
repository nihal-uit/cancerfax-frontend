import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderRichTextWithImages } from "@/utils/strapiHelpers";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import SurvivorStoriesVideo from "../SurvivorStoriesVideo/SurvivorStoriesVideo";
import { fetchPageComponentBySlug, selectPageComponentBySlug } from "@/store/slices/pageComponentSlice";

/** Populate for survivor-story-listing hero: hero.cta, hero.featuredImage. Serialized by contentService with qs. */
const HERO_QUERY_PARAMS = {
  populate: {
    dynamic_zone: {
      on: {
        "survivor-story-listing.hero-section": {
          populate: {
            survivor_story: {
              fields: ["slug","short_quote"],
              populate: {
                hero: {
                  populate: {
                    cta: true,
                    featuredImage: {
                      fields: ["url"]
                    },
                    featuredVideo: {
                      fields: ["url"]
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  } 
};

const SurvivorStoriesHero = ({ componentData, data, sectionClass, pageData, pageDocumentId }) => {
  const dispatch = useDispatch();
  const { data: pageComponentData, loading: pageComponentLoading } = useSelector(selectPageComponentBySlug);
  const heroData = pageComponentData || componentData || data;
  

  useEffect(() => {
    if (pageData?.slug) {
      dispatch(fetchPageComponentBySlug({ slug: pageData.slug, queryParams: HERO_QUERY_PARAMS }));
    }
  }, [dispatch, pageData?.slug]);
  
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
