import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchPageBySlug } from '../store/slices/pageSlice';
import DynamicComponents from './DynamicComponents';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import ContactHero from '../components/ContactComponent/ContactHero';
import PartnerHospitals from '../components/PartnerHospitals/PartnerHospitals';
import DedicatedSupport from '../components/DedicatedSupport/DedicatedSupport';
import LocationNetwork from '../components/LocationNetwork/LocationNetwork';
import SuccessStories from '../components/SuccessStories/SuccessStories';
import VideoTestimonialComponents from '../components/reusable/VideoTestimonialComponent';
import Footer from '../components/Footer/Footer';


// Lazy load only the heavy form component
const ContactFormSection = lazy(() => import('../components/ContactFormSection/ContactFormSection'));

// Loading placeholder component


const Contact = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pageData, pageLoading } = useSelector(state => state.page);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    dispatch(fetchPageBySlug("contact-us"));
  }, [dispatch]);

  return (
    // <div className='page_wrapper'>
    //   <Header darkText={true} />
    //   <ContactHero />    
    //   <PartnerHospitals />
    //   <DedicatedSupport />
    //   <LocationNetwork showButtons={false} />
    //   <SuccessStories />
    //   <section className='videoTestimonials_sec bg_light_gray pb-120' id="video-testimonials">
    //     <div className='containerWrapper'>
    //       <VideoTestimonialComponents/>
    //     </div>
    //   </section>
    //   <Footer />
    // </div>
    <DynamicComponents pageData={pageData} pageLoading={pageLoading} darkText={true} />
  );
};



export default Contact;
