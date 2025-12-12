import React from "react";
import VideoTestimonialComponents from "../../components/reusable/VideoTestimonialComponent";
import "swiper/css";
import "swiper/css/effect-fade";

const HospitalTestimonials = ( { data: hospitalTestimonialsSection, loading }) => {
  if (loading) {
    return null;
  }

  return (
    <section
      className="videoTestimonials_pagesec pb-120"
      id="video-testimonials"
    >
      <div className="containerWrapper">
        <VideoTestimonialComponents data={hospitalTestimonialsSection}/>
      </div>
    </section>
  );
};

export default HospitalTestimonials;
