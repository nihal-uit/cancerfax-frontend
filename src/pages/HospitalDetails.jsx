/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
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
import { useParams, useLocation } from 'react-router-dom';
import DynamicComponents from './DynamicComponents';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { fetchHospitalBySlug } from '../store/slices/hospitalNetworkSlice';

const HospitalDetails = () => {
  const { slug } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const prevLoadingRef = useRef(false);

  const { data: globalData, loading: globalLoading } = useSelector((state) => state.global);
  const { hospital, loading } = useSelector((state) => state.hospitalNetwork)

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll to top when data finishes loading
  useEffect(() => {
    if (prevLoadingRef.current && !loading && !globalLoading && hospital) {
      window.scrollTo(0, 0);
    }
    prevLoadingRef.current = loading || globalLoading;
  }, [loading, globalLoading, hospital]);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchHospitalBySlug(slug));
  }, [slug, dispatch]);

  if (globalLoading || loading || !hospital || !hospital?.[0] || !hospital?.[0]?.isActive) {
    return <LoadingSpinner />
  }

  return (
    <PageContainer>
      <Header/>
      <HospitalDetailsHero data={hospital?.[0]?.hero} loading={loading} hospitalImage={hospital?.[0]?.hospitalImage}/>
      <HospitalDetailsInfo data={hospital?.[0]} loading={loading} />
      {(hospital?.[0]?.testimonial?.testimonial_card || hospital?.[0]?.testimonial?.testimonial) && (
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