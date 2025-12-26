/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGlobalData } from '../store/slices/globalSlice';
import store from '../store';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HospitalDetailsHero from '../components/HospitalDetailsComponent/HospitalDetailsHero';
import HospitalDetailsInfo from '../components/HospitalDetailsComponent/HospitalDetailsInfo';
import HospitalDetailsTestimonials from '../components/HospitalDetailsComponent/HospitalDetailsTestimonials';
import HospitalDetailsInnovatioveSolutions from '../components/HospitalDetailsComponent/HospitalDetailsInnovatioveSolutions';
import { useParams } from 'react-router-dom';
import DynamicComponents from './DynamicComponents';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { fetchHospitalBySlug } from '../store/slices/hospitalNetworkSlice';

const HospitalDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { data: globalData, loading: globalLoading } = useSelector((state) => state.global);
  const { hospital, loading } = useSelector((state) => state.hospitalNetwork)

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchHospitalBySlug(slug));
  }, [slug, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (globalLoading || loading || !hospital || !hospital?.[0]) {
    return <LoadingSpinner />
  }

  return (
    <PageContainer>
      <Header/>
      <HospitalDetailsHero data={hospital?.[0]?.hero} loading={loading} />
      <HospitalDetailsInfo data={hospital?.[0]} loading={loading} />
      {hospital?.[0]?.testimonial?.testimonial_card && (
        <HospitalDetailsTestimonials data={hospital?.[0]} loading={loading} />
      )}
      {hospital?.[0]?.related && (
        <HospitalDetailsInnovatioveSolutions data={hospital?.[0]?.related} loading={loading} />
      )}
      <DynamicComponents pageData={hospital?.[0]} pageLoading={loading} showHeader={false} showFooter={false} />
      <Footer />
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

export default HospitalDetails;