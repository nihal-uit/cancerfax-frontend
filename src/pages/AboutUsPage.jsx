import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchPageBySlug } from "../store/slices/pageSlice";
import DynamicComponents from "./DynamicComponents";

const AboutUsPage = () => {
  const dispatch = useDispatch();

  const { pageData, pageLoading } = useSelector(state => state.page);

  useEffect(() => {
    dispatch(fetchPageBySlug("about-us"));
  }, [dispatch]);

  return (
    // <PageWrapper>
    //   <Header darkText={true} />
    //   <Hero sectionClass="about_sec" />
    //   <AboutHeroBanner sectionClass="treatment__banner" />
    //   <MissionVision />
    //   <OurStory />
    //   <OurJourney />
    //   <OurValues />
    //   <WhatWeDo />
    //   <GetInTouch />
    //   <section className="py-120">
    //     <InnovativeGalleryMarqueComponent/>
    //   </section>
    //   <section className="about_video_sec pt-120">
    //     <div className='containerWrapper'>
    //       <VideoTestimonialComponents />
    //     </div>
    //   </section>
    //   <Resources sectionClass="treatment__resource" />
    //   <Footer />
    // </PageWrapper>

    <DynamicComponents pageData={pageData} pageLoading={pageLoading} />

  );
};

const PageWrapper = styled.div`
  width: 100%;
`;

export default AboutUsPage;
