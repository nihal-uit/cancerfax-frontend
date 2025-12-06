/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGlobalData } from '../store/slices/globalSlice';
import store from '../store';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HospitalDetailsHero from '../components/HospitalDetailsComponent/HospitalDetailsHero';
import HospitalDetailsInfo from '../components/HospitalDetailsComponent/HospitalDetailsInfo';
import HospitalDetailsTestimonials from '../components/HospitalDetailsComponent/HospitalDetailsTestimonials';
import HospitalDetailsInnovatioveSolutions from '../components/HospitalDetailsComponent/HospitalDetailsInnovatioveSolutions';

const HospitalDetails = () => {
  const dispatch = useDispatch();

  // Fetch global data for navbar and footer
  useEffect(() => {
    const currentState = store.getState();
    const existingData = currentState?.global?.data;
    
    if (!existingData) {
      dispatch(fetchGlobalData());
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer>
      {/* <Header/> */}
      <HospitalDetailsHero/>
      <HospitalDetailsInfo />
      <HospitalDetailsTestimonials />
      <HospitalDetailsInnovatioveSolutions />
      {/* <Footer /> */}
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

export default HospitalDetails;