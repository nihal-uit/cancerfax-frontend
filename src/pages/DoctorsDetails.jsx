import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import DoctorsDetailsHero from '../components/DoctorsDetailsHero/DoctorsDetailsHero';
import DoctorsDetailsInfo from '../components/DoctorDetailsInfo/DoctorDetailsInfo';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGlobalData } from '../store/slices/globalSlice';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { fetchDoctorBySlug } from '../store/slices/doctorSlice';
import DynamicComponents from './DynamicComponents';

const DoctorsDetails = () => {
  const { slug } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const prevLoadingRef = useRef(false);
  const { data: globalData, loading: globalLoading } = useSelector(
    (state) => state.global
  );
  const { doctor, loading } = useSelector((state) => state.doctor);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll to top when data finishes loading
  useEffect(() => {
    if (prevLoadingRef.current && !loading && !globalLoading && doctor) {
      window.scrollTo(0, 0);
    }
    prevLoadingRef.current = loading || globalLoading;
  }, [loading, globalLoading, doctor]);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchDoctorBySlug(slug));
  }, [slug, dispatch]);

  if (globalLoading || loading || !doctor || !doctor?.[0]) {
    return <LoadingSpinner />
  }

  return (
    <PageContainer>
      <Header/>
      <DoctorsDetailsHero data={doctor?.[0]?.hero} loading={loading} />
      <DoctorsDetailsInfo data={doctor?.[0]} loading={loading} />
      <DynamicComponents pageData={doctor} pageLoading={loading} showHeader={false} showFooter={false} />
      <Footer />
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

export default DoctorsDetails;


