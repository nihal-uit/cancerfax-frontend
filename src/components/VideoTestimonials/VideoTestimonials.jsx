import VideoTestimonialComponents from '../reusable/VideoTestimonialComponent';

const VideoTestimonials = ({ componentData, data }) => {
  const videoTestimonialData = componentData || data;

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
