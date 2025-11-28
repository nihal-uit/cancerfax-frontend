import React, { useEffect, Suspense, lazy } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import DedicatedSupport from '../components/DedicatedSupport/DedicatedSupport';
import PartnerHospitals from '../components/PartnerHospitals/PartnerHospitals';
import LocationNetwork from '../components/LocationNetwork/LocationNetwork';
import SuccessStories from '../components/SuccessStories/SuccessStories';
import Footer from '../components/Footer/Footer';
import VideoTestimonialComponents from '../components/reusable/VideoTestimonialComponent';
// Lazy load only the heavy form component
const ContactFormSection = lazy(() => import('../components/ContactFormSection/ContactFormSection'));

// Loading placeholder component
const LoadingSection = styled.div`
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FAF5F0;
`;

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='page_wrapper'>

      <Header darkText={true} />
      <section className='contact_hero_sec comm_hero_pt'>
        <div className='containerWrapper py-60'>
            <ContentWrapper className='commContent_wrap'>
              <span className='contentLabel'>Contact us</span>
              <h1 className='title-1'>Get in touch with our team</h1>
            </ContentWrapper>
            <Suspense fallback={<LoadingSection>Loading...</LoadingSection>}>
              <ContactFormSection />
            </Suspense>
        </div>
      </section>    
      <PartnerHospitals />
      <DedicatedSupport />
      <LocationNetwork showButtons={false} />
      <SuccessStories />
      <section className='videoTestimonials_sec bg_light_gray pb-120' id="video-testimonials">
        <div className='containerWrapper'>
          <VideoTestimonialComponents/>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  margin-bottom: 30px;
`;

export default Contact;
