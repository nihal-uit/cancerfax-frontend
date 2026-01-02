import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import DiseaseHero from '../components/DiseaseComponent/DiseaseHero/DiseaseHero';
import DiseaseInfo from '../components/DiseaseComponent/DiseaseInfo/DiseaseInfo';
import SupportingLifeComponent from '../components/reusable/SupportingLifeComponent';
import { useDispatch, useSelector } from "react-redux";
import { fetchGlobalData } from '../store/slices/globalSlice';
import { fetchDiseaseBySlug } from '../store/slices/diseaseSlice';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import DynamicComponents from "./DynamicComponents";

const DiseasePage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const prevLoadingRef = useRef(false);
  const { data: globalData, loading: globalLoading } = useSelector(
    (state) => state.global
  );
  const { disease, loading } = useSelector((state) => state.disease);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll to top when data finishes loading
  useEffect(() => {
    if (prevLoadingRef.current && !loading && !globalLoading && disease) {
      window.scrollTo(0, 0);
    }
    prevLoadingRef.current = loading || globalLoading;
  }, [loading, globalLoading, disease]);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    if (slug) {
      dispatch(fetchDiseaseBySlug(slug));
    }
  }, [slug, dispatch]);

  if (globalLoading || loading || !disease) {
    return <LoadingSpinner />;
  }

  return (
    <PageContainer>
      <Header/>
      <DiseaseHero data={disease?.hero}/>
      <DiseaseInfo data={disease} />
      {disease?.expert_section?.isActive && (
        <section className='supporting_life_sec bg_light_blue py-120'>
          <div className='containerWrapper'>
            <SupportingLifeComponent data={disease?.expert_section} />
          </div>
        </section>
      )}
      {disease?.dynamic_zone && disease.dynamic_zone.length > 0 && (
        <DynamicComponents pageData={disease} pageLoading={loading} showHeader={false} showFooter={false}/>
      )}
      <Footer />
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

export default DiseasePage;

