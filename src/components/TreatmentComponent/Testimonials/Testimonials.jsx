import React from 'react';
import { getMediaUrl } from '../../../services/api';
import { formatRichText } from '../../../utils/strapiHelpers';
import TestimonialsComponent from '../../reusable/TestimonialComponent';

const Testimonials = ({ data, loading }) => {
  if (loading) {
    return null;
  }

  const testimonialsSection = data ? {
    heading: data.heading || 'Lorem Ipsum',
    subHeading: formatRichText(data?.survivor_story?.story) || 'Lorem Ipsum dolor sit amet',
    image: getMediaUrl(data?.survivor_story?.featuredImage),
    author: data.survivor_story?.name || 'Lorem Ipsum',
  } : null;

  return (
    <section
      className='testimonials_single_sec py-120'
      id='testimonials'
      style={{ backgroundImage: `url(${testimonialsSection.image})` }}
    >
      <div className='containerWrapper'>
        <div className='commContent_wrap z-2 position-relative'>
          <TestimonialsComponent componentData={testimonialsSection} loading={loading} />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Testimonials);
