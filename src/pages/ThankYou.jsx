import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ScrollAnimationComponent from '../components/ScrollAnimation/ScrollAnimationComponent';

const ThankYou = () => {

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };  

  return (
    <div className='page_wrapper'>
      <Header darkText={true} />
      
      <div className='others_hero_content comm_hero_pt'>
        <div className='containerWrapper py-88'>
          <div className='row'>
            <div className='col-md-12'>
              <ScrollAnimationComponent animationVariants={fadeIn}>
                <div className='commContent_wrap content-gap-24 text-center'>
                  <img className='thank-you-img' src="../images/thank-you-img.svg" alt="" />
                  <h4 className='title-4 text_theme_dark'>
                    Thank You!
                  </h4>
                  <p className='text-16 text_theme_dark'>
                    Your submission has been received successfully. We’ll get back to you shortly.
                  </p>
                  <ExploreButton className='btn' onClick={() => window.location.href = '/'}>
                    Return to Homepage
                  </ExploreButton>
                  <span className='text-16'>Need help? Visit our <a className='text-pink' href="#">Help Center</a>.</span>
                </div>
              </ScrollAnimationComponent>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const ExploreButton = styled.a`
  max-width: 221px;
  background-color: #36454F;
  color: #fff;
  font-size: 16px;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 575px) {
    max-width: 100%;
  }
  &:hover {
    background-color: #FF69B4;
    color: #fff;
  }
`;

export default ThankYou;
