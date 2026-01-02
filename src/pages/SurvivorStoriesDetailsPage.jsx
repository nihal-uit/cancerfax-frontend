import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { fetchGlobalData } from "../store/slices/globalSlice";
import store from "../store";
import Hero from "../components/SurvivorStoriesDetailsComponent/Hero/Hero";
import AboutDisease from "../components/SurvivorStoriesDetailsComponent/AboutDisease/AboutDisease";
import MyStory from "../components/SurvivorStoriesDetailsComponent/MyStory/MyStory";
import OurJourney from "../components/SurvivorStoriesDetailsComponent/OurJourney/OurJourney";
import LifeAfterTreatment from "../components/SurvivorStoriesDetailsComponent/LifeAfterTreatment/LifeAfterTreatment";
import TherapyInfo from "../components/SurvivorStoriesDetailsComponent/TherapyInfo/TherapyInfo";
import OurStory from "../components/SurvivorStoriesComponent/OurStory/OurStory";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { fetchSurvivorStoryBySlug } from "../store/slices/successStoriesSlice";
import DynamicComponents from "./DynamicComponents";
import { useParams, useLocation } from "react-router-dom";


const PageWrapper = styled.div`
  width: 100%;
`;

const SurvivorStoriesDetailsPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const location = useLocation();
  const prevLoadingRef = useRef(false);
  const { data: globalData, loading: globalLoading } = useSelector((state) => state.global);
  const { survivorStory, loading } = useSelector((state) => state.successStories);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll to top when data finishes loading
  useEffect(() => {
    if (prevLoadingRef.current && !loading && !globalLoading && survivorStory) {
      window.scrollTo(0, 0);
    }
    prevLoadingRef.current = loading || globalLoading;
  }, [loading, globalLoading, survivorStory]);

  // Fetch global data for navbar and footer
  useEffect(() => {
    const currentState = store.getState();
    const existingData = currentState?.global?.data;

    if (!existingData) {
      dispatch(fetchGlobalData());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSurvivorStoryBySlug(slug));
  }, [slug, dispatch]);

  if (globalLoading || loading || !survivorStory) {
    return <LoadingSpinner />
  }

  return (
    <PageWrapper>
      <Header />
      <Hero sectionClass="survivorStories_sec" data={survivorStory?.hero}/>
      <AboutDisease data={survivorStory} />
      <MyStory data={survivorStory} />
      <OurJourney data={survivorStory} />
      <LifeAfterTreatment data={survivorStory} />
      <TherapyInfo data={survivorStory} />
      <OurStory data={survivorStory} />
      <DynamicComponents pageData={survivorStory} pageLoading={loading} showFooter={false} showHeader={false} />
      <Footer />
      
    </PageWrapper>
  );
};

export default SurvivorStoriesDetailsPage;
