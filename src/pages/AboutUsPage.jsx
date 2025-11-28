import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { fetchGlobalData } from "../store/slices/globalSlice";
import { fetchPageBySlug } from "../store/slices/pageSlice";
import Hero from "../components/aboutComponent/Hero/Hero";
import AboutHeroBanner from "../components/aboutComponent/AboutHeroBanner/AboutHeroBanner";
import MissionVision from "../components/aboutComponent/MissionVision/MissionVision";
import OurStory from "../components/aboutComponent/OurStory/OurStory";
import OurJourney from "../components/aboutComponent/OurJourney/OurJourney";
import OurValues from "../components/aboutComponent/OurValues/OurValues";
import Resources from "../components/aboutComponent/Resources/Resources";
import WhatWeDo from "../components/aboutComponent/WhatWeDo/WhatWeDo";
import GetInTouch from "../components/aboutComponent/GetInTouch/GetInTouch";
import InnovativeGalleryMarqueComponent from '../components/reusable/InnovativeGalleryMarqueComponent';
import VideoTestimonialComponents from '../components/reusable/VideoTestimonialComponent';

const AboutUsPage = () => {
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
      dispatch(fetchPageBySlug("resource-listing"));
    }
  }, [pageData, pageLoading, dispatch]);

  if (globalLoading) {
    return <div className="page_wrapper">Loading...</div>;
  } 

  return (
    <PageWrapper>
      <Header darkText={true} />
      <Hero sectionClass="about_sec" />
      <AboutHeroBanner sectionClass="treatment__banner" />
      <MissionVision />
      <OurStory />
      <OurJourney />
      <OurValues />
      <WhatWeDo />
      <GetInTouch />
      <section className="py-120">
        <InnovativeGalleryMarqueComponent/>
      </section>
      <section className="about_video_sec pt-120">
        <div className='containerWrapper'>
          <VideoTestimonialComponents />
        </div>
      </section>
      <Resources sectionClass="treatment__resource" />
      <Footer />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
`;

export default AboutUsPage;
