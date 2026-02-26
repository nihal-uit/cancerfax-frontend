import React from 'react';
import TestimonialsComponent from '../../reusable/TestimonialComponent';
import { formatMedia } from '../../../utils/strapiHelpers';
import { useEnrichSurvivorStory } from '@/hooks/useEnrichSurvivorStory';

const Testimonials = ({ data, loading }) => {
  const [testimonialData, enrichLoading] = useEnrichSurvivorStory(data);

  if (loading || !data?.isActive) {
    return null;
  }

  const backgroundImage =
    testimonialData?.image ||
    (testimonialData?.survivor_story?.hero?.featuredImage
      ? formatMedia(testimonialData.survivor_story.hero.featuredImage)
      : testimonialData?.survivor_story?.hero?.featuredVideo?.url
        ? formatMedia(testimonialData.survivor_story.hero.featuredVideo)
        : undefined);

  return (
    <section
      className='testimonials_single_sec py-120'
      id='testimonials'
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className='containerWrapper'>
        <div className='commContent_wrap z-2 position-relative'>
          <TestimonialsComponent data={testimonialData} loading={loading || enrichLoading} />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Testimonials);
