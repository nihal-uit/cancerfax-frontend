import React from 'react';
import { Suspense } from 'react';
import SuccessStories from '@/components/SuccessStories/SuccessStories';
import VideoTestimonialComponent from '@/components/reusable/VideoTestimonialComponent';

const ContactTestimonialWrapper = ({ data }) => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <SuccessStories data={data} />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <section className='videoTestimonials_sec bg_light_gray pb-120' id="video-testimonials">
                    <div className='containerWrapper'>
                        <VideoTestimonialComponent data={data} />
                    </div>
                </section>
            </Suspense>
        </>
    );
};

export default ContactTestimonialWrapper;

