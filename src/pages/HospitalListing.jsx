import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGlobalData } from '../store/slices/globalSlice';
import { fetchPageBySlug } from '../store/slices/pageSlice';
import { getSectionData } from '../utils/strapiHelpers';
import Header from '../components/Header/Header';
import HospitalHero from '../components/HospitalComponents/HospitalHero';
import HospitalSlider from '../components/HospitalComponents/HospitalSlider';
import HospitalTestimonials from '../components/HospitalComponents/HospitalTestimonials';
import Footer from '../components/Footer/Footer';
import HospitalQuickFinds from '../components/HospitalComponents/HospitalQuickFinds';
import HospitalInnovationInsights from '../components/HospitalComponents/HospitalInnovationInsights';
import HospitalKeyFactors from '../components/HospitalComponents/HospitalKeyFactors';
import 'swiper/css';
import 'swiper/css/effect-fade';

const HospitalListing = () => {
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

  if (globalLoading || pageLoading || !pageData) {
    return <div className="page_wrapper">Loading...</div>;
  } 

  const HospitalHeroData = getSectionData(pageData, "hospitalHero");
  const HospitalSliderData = getSectionData(pageData, "hospitalSlider");
  const HospitalQuickFindsData = getSectionData(pageData, "hospitalQuickFinds");
  const HospitalInnovationInsightsData = getSectionData(pageData, "hospitalInnovationInsights");
  const HospitalKeyFactorsData = getSectionData(pageData, "hospitalKeyFactors");
  const HospitalTestimonialsData = getSectionData(pageData, "hospitalTestimonials");

  return (
    <div className='page_wrapper'>
      <Header darkText={true} />
      <HospitalHero data={HospitalHeroData} loading={pageLoading} />
      <HospitalSlider data={HospitalSliderData} loading={pageLoading} />
      <HospitalQuickFinds data={HospitalQuickFindsData} loading={pageLoading} />
      <HospitalInnovationInsights data={HospitalInnovationInsightsData} loading={pageLoading} />
      <HospitalKeyFactors data={HospitalKeyFactorsData} loading={pageLoading} />
      <HospitalTestimonials data={HospitalTestimonialsData} loading={pageLoading} />
      <Footer />
    </div>
  );
};

export default HospitalListing;
