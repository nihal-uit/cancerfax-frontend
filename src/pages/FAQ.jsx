import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import FAQHero from '../components/FAQHero/FAQHero';
import FAQSection from '../components/FAQSection/FAQSection';
import Footer from '../components/Footer/Footer';
import DynamicComponents from './DynamicComponents';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGlobalData } from '../store/slices/globalSlice';
import { fetchPageBySlug } from '../store/slices/pageSlice';

const FAQ = () => {
  const dispatch = useDispatch();

  const { data: globalData, loading: globalLoading} = useSelector(state => state.global);
  const { pageData, pageLoading } = useSelector(state => state.page);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchPageBySlug("hospital-listing"));
  }, [dispatch]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='page_wrapper'>
      {/* <Header /> */}
      <FAQHero />
      <FAQSection />
      <DynamicComponents pageData={pageData} pageLoading={pageLoading} />
      {/* <Footer /> */}
    </div>
  );
};

export default FAQ;

