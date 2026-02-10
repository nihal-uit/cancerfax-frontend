import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { formatMedia, renderRichTextWithImages } from "@/utils/strapiHelpers";

const MissionVision = ( { data } ) => {
  return (
    <section className='mission_sec py-120'>
      <div className='containerWrapper'>
        <div className="mission_grid">
          <div className="mission_left">
            <ScrollAnimationComponent animationVariants={slideLeft}>
              <div className="mission_image_wrap">
                <img
                  src={formatMedia(data?.featuredImage)}
                  alt={data?.featuredImageAlt || ''}
                />
                <div className="mission_image_content">
                  <div className="commContent_wrap content-gap-20">
                    <span className="contentLabel mb-2">{data?.heading || ''}</span>
                    <h3>{data?.subHeading || ''}</h3>
                    <p className="text-16">
                      { renderRichTextWithImages(data?.description_block) || data?.description_text || ''}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimationComponent>
          </div>
          <div className="mission_right">
            <ScrollAnimationComponent animationVariants={slideRight}>
              <ul className="mission_vision_list">
                <li>
                  <div className="mission_vision_content">
                    <span className="mission_icon">
                      <img src={formatMedia(data?.card_1?.icon)} alt="mission icon" />
                    </span>
                    <h5>
                      {data?.card_1?.title || ''}
                    </h5>
                    <p>{ renderRichTextWithImages(data?.card_1?.description_block) || data?.card_1?.description_text || ''}</p>
                  </div>
                </li>
                <li>
                  <div className="mission_vision_content">
                    <span className="mission_icon">
                      <img src={formatMedia(data?.card_2?.icon)} alt="vision icon" />
                    </span>
                    <h5>
                      {data?.card_2?.title || ''}
                    </h5>
                    <p>{renderRichTextWithImages(data?.card_2?.description_block) ||data?.card_2?.description_text || ''}</p>
                  </div>
                </li>
              </ul>
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
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export default MissionVision;
