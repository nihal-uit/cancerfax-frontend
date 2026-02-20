import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import DrugsDetailsHero from '../components/DrugsDetailsHero/DrugsDetailsHero';
import DrugsDetailsInfo from '../components/DrugsDetailsInfo/DrugsDetailsInfo';
import SupportingLifeComponent from '../components/reusable/SupportingLifeComponent';
import PopularFaqComponent from '../components/reusable/PopularFaqComponent';
import { fetchGlobalData } from '../store/slices/globalSlice';
import { fetchDrugBySlug } from '../store/slices/drugSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { useParams, useLocation } from 'react-router-dom';
import DynamicComponents from './DynamicComponents';

const DrugsDetails = () => {
  const { slug } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const prevLoadingRef = useRef(false);
  const { data: globalData, loading: globalLoading } = useSelector(state => state.global);
  const { drug, loading: drugLoading } = useSelector((state) => state.drug);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll to top when data finishes loading
  useEffect(() => {
    if (prevLoadingRef.current && !drugLoading && !globalLoading && drug) {
      window.scrollTo(0, 0);
    }
    prevLoadingRef.current = drugLoading || globalLoading;
  }, [drugLoading, globalLoading, drug]);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);
  
  useEffect(() => {
    dispatch(fetchDrugBySlug(slug));
  }, [slug, dispatch]);
  
  if (globalLoading || drugLoading || !drug) {
    return <LoadingSpinner />
  }

  return (
    <PageContainer>
      <Header darkText={false}/>
      <DrugsDetailsHero data={drug[0]?.hero}/>
      <DrugsDetailsInfo data={drug[0]}/>
      <section className='popularFaq_sec pb-120'>
        <div className='containerWrapper'>
            <PopularFaqComponent data={drug[0]?.faq}/>
        </div>
      </section>
      <section className='supporting_life_sec bg_light_blue py-120'>
        <div className='containerWrapper'>
            <SupportingLifeComponent data={drug[0]?.supporting_section}/>
        </div>
      </section>
      <DynamicComponents pageData={drug[0]} pageLoading={drugLoading} showHeader={false} showFooter={false} />
      <Footer />
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

export default DrugsDetails;

