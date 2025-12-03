import React, { useEffect } from "react";
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

const PageWrapper = styled.div`
  width: 100%;
`;

const FooterWrapper = styled.div`
  order: 2;
  width: 100%;
  margin-top: auto;
  position: relative;
  z-index: 0;
`;

const SurvivorStoriesDetailsPage = () => {
  const dispatch = useDispatch();
  const globalData = useSelector((state) => state.global?.data);
  const globalLoading = useSelector((state) => state.global?.loading);

  // Fetch global data for navbar and footer
  useEffect(() => {
    const currentState = store.getState();
    const existingData = currentState?.global?.data;

    if (!existingData) {
      dispatch(fetchGlobalData());
    }
  }, [dispatch]);

  // Only render footer when data is ready
  const shouldShowFooter = !globalLoading && globalData;

  return (
    <PageWrapper>
      <Header />
      <Hero sectionClass="survivorStories_sec" />

      <AboutDisease />

      <MyStory />

      <OurJourney />

      <LifeAfterTreatment />

      <TherapyInfo />

      <OurStory />

      <Footer />
      {/* {shouldShowFooter && (
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )} */}
    </PageWrapper>
  );
};

export default SurvivorStoriesDetailsPage;
