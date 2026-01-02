import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { formatMedia } from "@/utils/strapiHelpers";

const OurStory = ( { data } ) => {

  return (
    <section className='ourstory_sec py-120' style={{ '--bg-image': `url(${formatMedia(data?.backgroundImage)})` }}>
      <div className='containerWrapper'>
        <div className="ourstory_card">
          <div className="ourstory_grid">
            <div className="ourstory_left">
              <ScrollAnimationComponent animationVariants={slideLeft}>
                <div className="commContent_wrap content-gap-24">
                  <span className="contentLabel mb-2">{data?.heading || ''}</span>
                  <h3 className="title-size-36">{data?.subHeading || ''}</h3>
                  <p className="text-16">
                    {data?.description_text || ''}
                  </p>
                </div>
              </ScrollAnimationComponent>            
            </div>
            <div className="mission_right">
              <ScrollAnimationComponent animationVariants={slideRight}>
                <div className="ourstory_image_wrap">
                  <img
                    src={formatMedia(data?.featuredImage)}
                    alt={data?.featuredImageAlt || ''}
                  />
                </div>
              </ScrollAnimationComponent>
            </div>
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

export default OurStory;
