import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryTreatmentBySlug } from '../store/slices/treatmentSlice';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { fetchGlobalData } from '../store/slices/globalSlice';

const CountryTreatment = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { countryTreatment, loading: countryTreatmentLoading } = useSelector((state) => state.treatment);
  const { data: globalData, loading: globalLoading } = useSelector(
    (state) => state.global
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchCountryTreatmentBySlug(slug));
  }, [dispatch, slug]);

  if(countryTreatmentLoading || globalLoading) {
    return <LoadingSpinner />;
  }

  console.log("countryTreatment ->", countryTreatment);

  return (
    <PageContainer>
      <Header/>
      <CancerTreatmentHero data={countryTreatment}/>
      <BuiltExperience data={countryTreatment}/>
      <CancerFaxServices data={countryTreatment}/>
      <TherapyInfo data={countryTreatment}/>
      <WhyCancerTreatmentUSA data={countryTreatment}/>
      <CancerTreatmentTopOncologists data={countryTreatment}/>
      <CancerCenterBanner data={countryTreatment}/>
      <CostOfCancerTreatment data={countryTreatment}/>
      <Resources data={countryTreatment}/>
      <Footer />
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

export default CountryTreatment;

