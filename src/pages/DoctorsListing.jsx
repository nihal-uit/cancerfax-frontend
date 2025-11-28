import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGlobalData } from '../store/slices/globalSlice';
import { fetchPageBySlug } from "../store/slices/pageSlice";
import { getSectionData } from "../utils/strapiHelpers";
import Header from "../components/Header/Header";
import Hero from "../components/DoctorsComponent/Hero";
import DoctorsSlider from "../components/DoctorsComponent/DoctorsSlider";
import DoctorsQuickFinds from "../components/DoctorsComponent/DoctorsQuickFinds";
import DoctorsInnovationInsights from "../components/DoctorsComponent/DoctorsInnovationInsights";
import Footer from "../components/Footer/Footer";
import "swiper/css";
import "swiper/css/effect-fade";

const DoctorsListing = () => {
  const dispatch = useDispatch();

  const { data: globalData, loading: globalLoading} = useSelector(state => state.global);
  const { pageData, pageLoading } = useSelector(state => state.page);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchPageBySlug("doctor-listing"));
  }, [dispatch]);

  if (globalLoading || pageLoading || !pageData) {
    return <div className="page_wrapper">Loading...</div>;
  }  

  const HeroData = getSectionData(pageData, "doctorsHero");
  const DoctorsSliderData = getSectionData(pageData, "doctorsSlider");
  const DoctorsQuickFindsData = getSectionData(pageData, "doctorsQuickFinds");
  const DoctorsInnovationInsightsData = getSectionData(pageData, "doctorsInnovationInsights");

  return (
    <div className="page_wrapper">
      <Header darkText={true} />
      <Hero data={HeroData} loading={pageLoading} />
      <DoctorsSlider data={DoctorsSliderData} loading={pageLoading} />
      <DoctorsQuickFinds data={DoctorsQuickFindsData} loading={pageLoading} />
      <DoctorsInnovationInsights data={DoctorsInnovationInsightsData} loading={pageLoading} />
      <Footer />
    </div>
  );
};

export default DoctorsListing;
