import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import CancerTreatmentHero from '../components/CancerTreatmentComponent/CancerTreatmentHero/CancerTreatmentHero';
import BuiltExperience from '../components/CancerTreatmentComponent/BuiltExperience/BuiltExperience';
import CancerFaxServices from '../components/CancerTreatmentComponent/CancerFaxServices/CancerFaxServices';
import TherapyInfo from '../components/CancerTreatmentComponent/TherapyInfo/TherapyInfo';
import WhyCancerTreatmentUSA from '../components/CancerTreatmentComponent/WhyCancerTreatmentUSA/WhyCancerTreatmentUSA';
import CancerTreatmentTopOncologists from '../components/CancerTreatmentComponent/CancerTreatmentTopOncologists/CancerTreatmentTopOncologists';
import CancerCenterBanner from '../components/CancerTreatmentComponent/CancerCenterBanner/CancerCenterBanner';
import CostOfCancerTreatment from '../components/CancerTreatmentComponent/CostOfCancerTreatment/CostOfCancerTreatment';
import Resources from '../components/Resources/Resources';

const CancerTreatmentInUSA = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer>
      <Header/>
      <CancerTreatmentHero/>
      <BuiltExperience/>
      <CancerFaxServices/>
      <TherapyInfo/>
      <WhyCancerTreatmentUSA/>
      <CancerTreatmentTopOncologists/>
      <CancerCenterBanner/>
      <CostOfCancerTreatment/>
      <Resources/>
      <Footer />
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

export default CancerTreatmentInUSA;

