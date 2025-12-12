import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import { formatMedia } from "@/utils/strapiHelpers";
import ScrollAnimationComponent from "@/components/ScrollAnimation/ScrollAnimationComponent";
import "swiper/css";
import "swiper/css/effect-fade";

const AboutSlider = ({ data }) => {
  return (
    <section className="hospital_slider_sec ourCertifications_sec ourCertifications_slider">
      <div className="containerWrapper one_side_full_container ms-0 me-auto ps-0">
        <div className="hospital_slider_wrapper">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[EffectFade]}
            effect="fade"
          >
            <SwiperSlide>
              <ScrollAnimationComponent animationVariants={fadeIn}>
                <div className="hospital_info_slider">
                  <img
                    src={formatMedia(data?.image)}
                    alt={data?.imageAlt || ''}
                  />
                </div>
              </ScrollAnimationComponent>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

export default AboutSlider;
