import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { fetchGlobalData } from "../store/slices/globalSlice";
import { fetchPageBySlug, selectPageBySlug } from "../store/slices/pageSlice";
import { getSectionData } from "../utils/strapiHelpers";
import SurvivorStoriesHero from "../components/SurvivorStoriesComponent/Hero/SurvivorStoriesHero";
import OurStory from "../components/SurvivorStoriesComponent/OurStory/OurStory";
import SupportingLifeComponent from "../components/reusable/SupportingLifeComponent";
import DynamicComponents from "./DynamicComponents";

const PageWrapper = styled.div`
  width: 100%;
`;

const SurvivorStoriesPage = () => {
  const dispatch = useDispatch();
  const { pageData, pageLoading } = useSelector((state) => selectPageBySlug(state, 'survivor-stories'));

  useEffect(() => {
    if (!pageData && !pageLoading) dispatch(fetchPageBySlug("survivor-stories"));
  }, [dispatch, pageData, pageLoading]);

  return (
    // <PageWrapper>
    //   <Header darkText={true} />
    //   <SurvivorStoriesHero sectionClass="survivorStories_sec" data={HeroData} loading={pageLoading}/>
    //   <OurStory data={OurStoryData} loading={pageLoading}/>
    //   <section className="supporting_light_sec py-120">
    //     <div className="containerWrapper">
    //       <SupportingLifeComponent data={SupportingLifeData} loading={pageLoading}/>
    //     </div>
    //   </section>
    //   <Footer />
    // </PageWrapper>
    <DynamicComponents pageData={pageData} pageLoading={pageLoading} darkText={true} />
  );
};

export default SurvivorStoriesPage;
