import React, { useEffect, useMemo, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGlobalData } from "../store/slices/globalSlice";
import { fetchPageBySlug } from "../store/slices/pageSlice";
import { getSectionData as getSectionDataRaw } from "../utils/strapiHelpers";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Hero from "../components/TreatmentComponent/Hero/Hero";
import TreatmentSlider from "../components/TreatmentComponent/TreatmentSlider/TreatmentSlider";
import TreatmentCost from "../components/TreatmentComponent/TreatmentCost/TreatmentCost";
import TreatmentRisk from "../components/TreatmentComponent/TreatmentRisk/TreatmentRisk";
import GetInTouch from "../components/TreatmentComponent/GetInTouch/GetInTouch";

const Journey = lazy(() =>
  import("../components/TreatmentComponent/Journey/Journey")
);
const IsForYou = lazy(() =>
  import("../components/TreatmentComponent/IsForYou/IsForYou")
);
const Testimonials = lazy(() =>
  import("../components/TreatmentComponent/Testimonials/Testimonials")
);
const InnovativeCare = lazy(() =>
  import("../components/TreatmentComponent/InnovativeCare/InnovativeCare")
);
const WhatWeDo = lazy(() =>
  import("../components/TreatmentComponent/WhatWeDo/WhatWeDo")
);
const FAQ = lazy(() => import("../components/TreatmentComponent/FAQ/FAQ"));
const Resources = lazy(() =>
  import("../components/TreatmentComponent/Resources/Resources")
);
const HowItWorks = lazy(() =>
  import("../components/TreatmentComponent/HowItWorks/HowItWorks")
);
const WhyOpt = lazy(() =>
  import("../components/TreatmentComponent/WhyOpt/WhyOpt")
);
const Evidance = lazy(() =>
  import("../components/TreatmentComponent/Evidance/Evidance")
);

const SectionSkeleton = () => <div className="section-skeleton" />;

const PageWrapper = styled.div`
  width: 100%;
`;

const TreatmentPage = () => {
  const dispatch = useDispatch();

  const { data: globalData, loading: globalLoading } = useSelector(
    (state) => state.global
  );
  const { pageData, pageLoading } = useSelector((state) => state.page);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchPageBySlug("treatment-listing"));
  }, [dispatch]);

  const getSectionData = useMemo(() => getSectionDataRaw, []);

  const sections = useMemo(
    () => ({
      hero: getSectionData(pageData, "treatmentHero"),
      slider: getSectionData(pageData, "treatmentSlider"),
      howItWorks: getSectionData(pageData, "treatmentHowItWorks"),
      whyOpt: getSectionData(pageData, "treatmentWhyOpt"),
      evidance: getSectionData(pageData, "treatmentEvidance"),
      journey: getSectionData(pageData, "treatmentJourney"),
      isForYou: getSectionData(pageData, "treatmentIsForYou"),
      testimonials: getSectionData(pageData, "treatmentTestimonials"),
      innovative: getSectionData(pageData, "treatmentInnovativeCare"),
      getInTouch: getSectionData(pageData, "treatmentGetInTouch"),
      risk: getSectionData(pageData, "treatmentRisk"),
      cost: getSectionData(pageData, "treatmentCost"),
      whatWeDo: getSectionData(pageData, "treatmentWhatWeDo"),
      faq: getSectionData(pageData, "treatmentFAQ"),
      resources: getSectionData(pageData, "treatmentResources"),
    }),
    [pageData, getSectionData]
  );

  if (globalLoading || pageLoading || !pageData) {
    return <div className="page_wrapper">Loading...</div>;
  }

  return (
    <PageWrapper>
      <Header darkText={true} />
      <Hero sectionClass="treatment__here" data={sections.hero} loading={pageLoading}/>
      <TreatmentSlider sectionClass="treatment__banner" data={sections.slider} loading={pageLoading}/>

      <Suspense fallback={<SectionSkeleton />}>
        <>
          <HowItWorks data={sections.howItWorks} loading={pageLoading} />
          <WhyOpt data={sections.whyOpt} loading={pageLoading} />
          <Evidance data={sections.evidance} loading={pageLoading} />
          <Journey data={sections.journey} loading={pageLoading} />
        </>
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <>
          <IsForYou data={sections.isForYou} loading={pageLoading} />
          <Testimonials data={sections.testimonials} loading={pageLoading} />
          <InnovativeCare data={sections.innovative} loading={pageLoading} />
        </>
      </Suspense>

      <GetInTouch data={sections.getInTouch} loading={pageLoading} />
      <TreatmentRisk data={sections.risk} loading={pageLoading} />
      <TreatmentCost data={sections.cost} loading={pageLoading} />

      <Suspense fallback={<SectionSkeleton />}>
        <>
          <WhatWeDo data={sections.whatWeDo} loading={pageLoading} />
          <FAQ data={sections.faq} loading={pageLoading} />
          <Resources
            sectionClass="bg-white treatment__resource"
            data={sections.resources}
            loading={pageLoading}
          />
        </>
      </Suspense>

      <Footer />
    </PageWrapper>
  );
};

export default TreatmentPage;
