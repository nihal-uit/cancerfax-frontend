import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import DoctorsDetailsHero from '../components/DoctorsDetailsHero/DoctorsDetailsHero';
import DoctorsDetailsInfo from '../components/DoctorDetailsInfo/DoctorDetailsInfo';

const DoctorsDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer>
      <Header/>
      <DoctorsDetailsHero/>
      <DoctorsDetailsInfo />
      <Footer />
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

export default DoctorsDetails;

