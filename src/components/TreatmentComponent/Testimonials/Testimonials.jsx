import React from 'react';
import TestimonialsComponent from '../../reusable/TestimonialComponent';

const Testimonials = ({ data, loading }) => {
  if (loading || !data?.isActive) {
    return null;
  }

  return (
    <section
      className='testimonials_single_sec py-120'
      id='testimonials'
      style={{ backgroundImage: `url(${data?.image})` }}
    >
      <div className='containerWrapper'>
        <div className='commContent_wrap z-2 position-relative'>
          <TestimonialsComponent data={data} loading={loading} />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Testimonials);
