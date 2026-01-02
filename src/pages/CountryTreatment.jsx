import React, { useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const dispatch = useDispatch();
  const prevLoadingRef = useRef(false);
  const { countryTreatment, loading: countryTreatmentLoading } = useSelector(
    (state) => state.treatment
  );
  const { data: globalData, loading: globalLoading } = useSelector(
    (state) => state.global
  );

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll to top when data finishes loading
  useEffect(() => {
    if (prevLoadingRef.current && !countryTreatmentLoading && !globalLoading && countryTreatment) {
      window.scrollTo(0, 0);
    }
    prevLoadingRef.current = countryTreatmentLoading || globalLoading;
  }, [countryTreatmentLoading, globalLoading, countryTreatment]);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    if (slug) {
      dispatch(fetchCountryTreatmentBySlug(slug));
    }
  }, [dispatch, slug]);

  if (countryTreatmentLoading || globalLoading) {
    return <LoadingSpinner />;
  }

  return (
    <PageContainer>
      <Header />
      {/* Hero */}
      <CancerTreatmentHero data={countryTreatment?.hero} />

      {/* About + Content Section 1 */}
      <BuiltExperience data={countryTreatment} />

      {/* CancerFax services */}
      <CancerFaxServices data={countryTreatment?.cancerfax_services} />

      {/* Process / Therapy Info style section */}
      <TherapyInfo data={countryTreatment?.process} />

      {/* Why cancer treatment in this country */}
      <WhyCancerTreatmentUSA data={countryTreatment?.why_treatment} />

      {/* Top oncologists */}
      <CancerTreatmentTopOncologists data={countryTreatment?.top_doctors} />

      {/* Featured cancer centre(s) */}
      <CancerCenterBanner data={countryTreatment?.featured_hospital} />

      {/* Content Section 2 – Cost of treatment, etc. */}
      <CostOfCancerTreatment data={countryTreatment?.content_section2} />

      {/* Resources specific to this country treatment page */}
      <Resources data={countryTreatment?.resources} />
      <Footer />
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

export default CountryTreatment;
