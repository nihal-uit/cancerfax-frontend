import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import DiseaseHero from '../components/DiseaseComponent/DiseaseHero/DiseaseHero';
import DiseaseInfo from '../components/DiseaseComponent/DiseaseInfo/DiseaseInfo';
import SupportingLifeComponent from '../components/reusable/SupportingLifeComponent';

const DiseasePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer>
      <Header/>
      <DiseaseHero/>
      <DiseaseInfo/>
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

export default DiseasePage;

