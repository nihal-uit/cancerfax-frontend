import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { getMediaUrl } from "@/services/api";

const OurStory = ( { data } ) => {

  return (
    <section className='ourstory_sec py-120' style={{ backgroundImage: `url(${getMediaUrl(data?.backgroundImage)})`}}>
      <div className='containerWrapper'>
        <div className="ourstory_card">
          <div className="ourstory_grid">
            <div className="ourstory_left">
              <ScrollAnimationComponent animationVariants={slideLeft}>
                <div className="commContent_wrap content-gap-24">
                  <span className="contentLabel mb-2">{data?.heading || "Lorem Ipsum"}</span>
                  <h3 className="title-size-36">{data?.subHeading || "Lorem Ipsum Text"}</h3>
                  <p className="text-16">
                    {data?.description_text || "Lorem Ipsum dolor sit amet"}
                  </p>
                </div>
              </ScrollAnimationComponent>            
            </div>
            <div className="mission_right">
              <ScrollAnimationComponent animationVariants={slideRight}>
                <div className="ourstory_image_wrap">
                  <img
                    src={getMediaUrl(data?.featuredImage) || "../images/our-story-img.jpg"}
                    alt=""
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
