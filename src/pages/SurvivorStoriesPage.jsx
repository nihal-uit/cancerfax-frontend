import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { fetchGlobalData } from "../store/slices/globalSlice";
import store from "../store";
import Hero from "../components/SurvivorStoriesComponent/Hero/Hero";
import OurStory from "../components/SurvivorStoriesComponent/OurStory/OurStory";
import SupportingLifeComponent from "../components/reusable/SupportingLifeComponent";

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

const SurvivorStoriesPage = () => {
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

  return (
    <PageWrapper>
      <Header darkText={true} />
      <Hero sectionClass="survivorStories_sec" />
      <OurStory />
      <section className="supporting_light_sec py-120">
        <div className="containerWrapper">
          <SupportingLifeComponent />
        </div>
      </section>
      <Footer />
    </PageWrapper>
  );
};

export default SurvivorStoriesPage;
