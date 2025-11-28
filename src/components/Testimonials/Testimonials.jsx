import TestimonialsComponent from '../reusable/TestimonialComponent';

const Testimonials = () => {
  return (
    <section
      className='testimonials_single_sec py-120'
      id='testimonials'
      style={{ backgroundImage: `url(${'../images/testimonial-img.jpg'})` }}
    >
      <div className='containerWrapper'>
        <div className='commContent_wrap z-2 position-relative'>
          <TestimonialsComponent />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
