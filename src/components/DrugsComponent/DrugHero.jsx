import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";

const DrugHero = ({ data }) => {
  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <div className='others_hero_content comm_hero_pt'>
        <div className='containerWrapper py-88'>
          <div className='hero_content_row align-items-center'>
            <div className='hero_content_left commContent_wrap'>
              <ScrollAnimationComponent animationVariants={slideLeft}>
              <h1 className='title-1 text_theme_dark'>
                {data?.heading}
              </h1>
              </ScrollAnimationComponent>
            </div>
            
            <div className='hero_content_right'>
              <ScrollAnimationComponent animationVariants={slideRight}>
              <div className='commContent_wrap content-gap-40'>
                <p className='text-16 text_theme_dark'>
                  {data?.description_text}
                </p>
              </div>
              </ScrollAnimationComponent>
            </div>
          </div>
        </div>
      </div>
  );
};

export default DrugHero;