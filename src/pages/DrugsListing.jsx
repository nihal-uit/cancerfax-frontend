import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGlobalData } from '../store/slices/globalSlice';
import { fetchPageBySlug } from '../store/slices/pageSlice';
import { getSectionData } from '../utils/strapiHelpers';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import DrugHero from '../components/DrugsComponent/DrugHero';
import DrugSlider from '../components/DrugsComponent/DrugSlider';
import DrugSupport from '../components/DrugsComponent/DrugSupport';
import DrugKnowledgeChest from '../components/DrugsComponent/DrugsKnowledgeChest';

const DrugsListing = () => {
  const dispatch = useDispatch();

  const { data: globalData, loading: globalLoading} = useSelector(state => state.global);
  const { pageData, pageLoading } = useSelector(state => state.page);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    if (!pageData && !pageLoading) {
      dispatch(fetchPageBySlug("drug-listing"));
    }
  }, [pageData, pageLoading, dispatch]);

  if (globalLoading) {
    return <div className="page_wrapper">Loading...</div>;
  } 
  
  const DrugHeroData = getSectionData(pageData, "drugHero");
  const DrugSliderData = getSectionData(pageData, "drugSlider");
  const DrugKnowledgeChestData = getSectionData(pageData, "drugKnowledgeChest");
  const DrugSupportData = getSectionData(pageData, "drugSupport");

  return (
    <div className='page_wrapper'>
      <Header darkText={true} />
      <DrugHero data={DrugHeroData} loading={pageLoading} />
      <DrugSlider data={DrugSliderData} loading={pageLoading} />
      <DrugKnowledgeChest data={DrugKnowledgeChestData} loading={pageLoading} />
      <DrugSupport data={DrugSupportData} loading={pageLoading} />
      <Footer />
    </div>
  );
};

export default DrugsListing;

