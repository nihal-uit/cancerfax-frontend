
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SuccessStories from '@/components/SuccessStories/SuccessStories';
import VideoTestimonialComponent from '@/components/reusable/VideoTestimonialComponent';
import { fetchPageComponentBySlug, selectPageComponentBySlug } from '@/store/slices/pageComponentSlice';

const CONTACT_TESTIMONIAL_QUERY_PARAMS = {
    populate: {
      dynamic_zone: {
        on: {
          "contact.testimonial-section": {
            fields: ["heading", "subHeading", "description_block"],
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
                //   featuredImage: {
                //     fields: ["url", "alternativeText"]
                //   }
                }
              }
            }
          }
        }
      }
    }
  };

const ContactTestimonialWrapper = ({ data, pageData }) => {
    const dispatch = useDispatch();
    const { data: pageComponentData, loading: pageComponentLoading } = useSelector(selectPageComponentBySlug);
    const testimonialSection = pageComponentData || data;

    useEffect(() => {
        if (pageData?.slug) {
            dispatch(fetchPageComponentBySlug({ slug: pageData.slug, queryParams: CONTACT_TESTIMONIAL_QUERY_PARAMS }));
        }
    }, [dispatch, pageData?.slug]);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <SuccessStories data={testimonialSection} />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <section className='videoTestimonials_sec bg_light_gray pb-120' id="video-testimonials">
                    <div className='containerWrapper'>
                        <VideoTestimonialComponent data={testimonialSection} />
                    </div>
                </section>
            </Suspense>
        </>
    );
};

export default ContactTestimonialWrapper;

