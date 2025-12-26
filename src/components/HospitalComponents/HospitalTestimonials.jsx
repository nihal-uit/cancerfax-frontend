import React from 'react';
import VideoTestimonialComponents from '../../components/reusable/VideoTestimonialComponent';
import 'swiper/css';
import 'swiper/css/effect-fade';

const HospitalTestimonials = ({ componentData, data }) => {
  const testimonialData = componentData || data;

  if (!testimonialData) {
    return null;
  }

  return (
    <section
      className='videoTestimonials_pagesec pb-120'
      id='video-testimonials'
    >
      <div className='containerWrapper'>
        <VideoTestimonialComponents data={testimonialData} />
      </div>
    </section>
  );
};

export default HospitalTestimonials;
