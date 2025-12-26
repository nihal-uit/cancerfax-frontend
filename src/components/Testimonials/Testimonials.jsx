import React from 'react';
import TestimonialsComponent from '../reusable/TestimonialComponent';
import { formatMedia } from '../../utils/strapiHelpers';

const Testimonials = ({ componentData, data, loading }) => {
  const testimonialData = componentData || data;
  
  if (!data || !data?.isActive || loading) {
    return null;
  }

  const backgroundImage = testimonialData?.survivor_story?.hero?.featuredImage 
    ? formatMedia(testimonialData?.survivor_story?.hero?.featuredImage)
    : testimonialData?.survivor_story?.hero?.featuredVideo?.url
    ? formatMedia(testimonialData?.survivor_story?.hero?.featuredVideo)
    : null;

  return (
    <section
      className='testimonials_single_sec py-120'
      id='testimonials'
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      <div className='containerWrapper'>
        <div className='commContent_wrap z-2 position-relative'>
          <TestimonialsComponent data={testimonialData} />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Testimonials);
