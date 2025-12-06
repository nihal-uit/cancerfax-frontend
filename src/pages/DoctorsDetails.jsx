import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import DoctorsDetailsHero from '../components/DoctorsDetailsHero/DoctorsDetailsHero';
import DoctorsDetailsInfo from '../components/DoctorDetailsInfo/DoctorDetailsInfo';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGlobalData } from '../store/slices/globalSlice';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { fetchDoctorBySlug } from '../store/slices/doctorSlice';
import DynamicComponents from './DynamicComponents';

const DoctorsDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { data: globalData, loading: globalLoading } = useSelector(
    (state) => state.global
  );
  const { doctor, loading } = useSelector((state) => state.doctor);
  console.log("doctor ->", doctor);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchDoctorBySlug(slug));
    // dispatch(fetchBlogs({ limit: 3, start: 0 }));
  }, [slug, dispatch]);

  if (globalLoading || loading || !doctor) {
    return <LoadingSpinner />
  }

  return (
    <PageContainer>
      {/* <Header/> */}
      <DoctorsDetailsHero data={doctor}/>
      <DoctorsDetailsInfo data={doctor}/>
      {/* <DynamicComponents pageData={pageData} pageLoading={pageLoading} /> */}
      {/* <Footer /> */}
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

export default DoctorsDetails;

