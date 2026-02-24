import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VideoTestimonialComponents from '../reusable/VideoTestimonialComponent';
import { fetchPageComponentBySlug, selectPageComponentBySlug } from '@/store/slices/pageComponentSlice';

const TESTIMONIAL_QUERY_PARAMS = {
  populate: {
    dynamic_zone: {
      on: {
        "dynamic-zone.testimonials": {
          populate: {
            testimonial_card: {
              fields: [
                "heading",
                "subHeading",
                "featuredVideoExternal"
              ],
              populate: {
                cta: {
                  fields: ["text", "URL", "target", "variant"]
                },
                featuredVideo: {
                  fields: ["url", "alternativeText"]
                },
              }
            }
          }
        }
      }
    }
  }
};

const VideoTestimonials = ({ componentData, data, pageData }) => {
  const dispatch = useDispatch();
  const { data: pageComponentData, loading: pageComponentLoading } = useSelector(selectPageComponentBySlug);
  const videoTestimonialData = pageComponentData || componentData || data;

  useEffect(() => {
    if (pageData?.slug) {
      dispatch(fetchPageComponentBySlug({ slug: pageData.slug, queryParams: TESTIMONIAL_QUERY_PARAMS }));
    }
  }, [dispatch, pageData?.slug]);

  console.log('videoTestimonialData -> ',videoTestimonialData);

  if (!videoTestimonialData) {
    return null;
  }

  return (
    <section className='videoTestimonials_sec' id='video-testimonials'>
      <div className='containerWrapper'>
        <VideoTestimonialComponents data={videoTestimonialData} />
      </div>
    </section>
  );
};

export default VideoTestimonials;
