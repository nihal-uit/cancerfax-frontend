import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import FAQHero from '../components/FAQHero/FAQHero';
import FAQSection from '../components/FAQSection/FAQSection';
import Footer from '../components/Footer/Footer';

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='page_wrapper'>
      <Header />
      <FAQHero />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default FAQ;

