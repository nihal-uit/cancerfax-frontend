import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import DrugsDetailsHero from '../components/DrugsDetailsHero/DrugsDetailsHero';
import DrugsDetailsInfo from '../components/DrugsDetailsInfo/DrugsDetailsInfo';
import SupportingLifeComponent from '../components/reusable/SupportingLifeComponent';
import PopularFaqComponent from '../components/reusable/PopularFaqComponent';

const DrugsDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer>
      <Header/>
      <DrugsDetailsHero/>
      <DrugsDetailsInfo/>
      <section className='popularFaq_sec pb-120'>
        <div className='containerWrapper'>
            <PopularFaqComponent />
        </div>
      </section>
      <section className='supporting_life_sec bg_light_blue py-120'>
        <div className='containerWrapper'>
            <SupportingLifeComponent />
        </div>
      </section>
      <Footer />
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

export default DrugsDetails;

