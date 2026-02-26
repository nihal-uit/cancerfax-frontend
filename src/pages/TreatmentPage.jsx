import React, { useEffect, useMemo, lazy, Suspense, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGlobalData } from "../store/slices/globalSlice";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TreatmentHero from "../components/TreatmentComponent/Hero/TreatmentHero";
import TreatmentSlider from "../components/TreatmentComponent/TreatmentSlider/TreatmentSlider";
import TreatmentCost from "../components/TreatmentComponent/TreatmentCost/TreatmentCost";
import TreatmentRisk from "../components/TreatmentComponent/TreatmentRisk/TreatmentRisk";
import GetInTouch from "../components/TreatmentComponent/GetInTouch/GetInTouch";
import DynamicComponents from "./DynamicComponents";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { useParams, useLocation } from "react-router-dom";
import { fetchTreatmentBySlug } from "@/store/slices/treatmentSlice";

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
  const { slug } = useParams();
  const location = useLocation();
  const prevLoadingRef = useRef(false);

  const { data: globalData, loading: globalLoading } = useSelector((state) => state.global);
  const { treatment, loading: treatmentLoading } = useSelector((state) => state.treatment || {});

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll to top when data finishes loading
  useEffect(() => {
    if (prevLoadingRef.current && !treatmentLoading && !globalLoading && treatment) {
      window.scrollTo(0, 0);
    }
    prevLoadingRef.current = treatmentLoading || globalLoading;
  }, [treatmentLoading, globalLoading, treatment]);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchTreatmentBySlug(slug));
  }, [dispatch, slug]);

  const treatmentData = Array.isArray(treatment) ? treatment?.[0] : treatment;

  const sections = useMemo(
    () => ({
      hero: treatmentData?.hero,
      slider: treatmentData?.slider,
      howItWorks: treatmentData?.how_it_works,
      whyOpt: treatmentData?.why_section,
      evidance: treatmentData?.evidence,
      journey: treatmentData?.journey,
      isForYou: treatmentData?.is_for_you,
      testimonials: treatmentData?.testimonials,
      innovative: treatmentData?.different_section,
      getInTouch: treatmentData?.get_in_touch,
      risk: treatmentData?.risk_section,
      cost: treatmentData?.cost_section,
      whatWeDo: treatmentData?.we_do_therapy,
      faq: treatmentData?.faq,
      resources: treatmentData?.resources,
    }),
    [treatmentData]
  );
  

  if (globalLoading || treatmentLoading || !treatment) {
    return <LoadingSpinner />
  }

  // Helper function to check if section is active
  const isSectionActive = (section) => {
    if (!section) return false;
    return section.isActive === true || section.isActive === "True" || section.isActive === "true";
  };

  return (
    <PageWrapper>
      <Header darkText={true} />
      {isSectionActive(sections.hero) && (
        <TreatmentHero sectionClass="treatment__here" data={sections.hero} loading={treatmentLoading}/>
      )}
      {isSectionActive(sections.slider) && (
        <TreatmentSlider sectionClass="treatment__banner pb-120" data={sections.slider} loading={treatmentLoading}/>
      )}

      <Suspense fallback={<SectionSkeleton />}>
        <>
          {isSectionActive(sections.howItWorks) && (
            <HowItWorks data={sections.howItWorks} loading={treatmentLoading} />
          )}
          {isSectionActive(sections.whyOpt) && (
            <WhyOpt data={sections.whyOpt} loading={treatmentLoading} />
          )}
          {isSectionActive(sections.evidance) && (
            <Evidance data={sections.evidance} loading={treatmentLoading} />
          )}
          {isSectionActive(sections.journey) && (
            <Journey data={sections.journey} loading={treatmentLoading} />
          )}
        </>
      </Suspense>

       <Suspense fallback={<SectionSkeleton />}>
        <>
          {isSectionActive(sections.isForYou) && (
            <IsForYou data={sections.isForYou} loading={treatmentLoading} />
          )}
          {isSectionActive(sections.testimonials) && (
            <Testimonials data={sections.testimonials} loading={treatmentLoading} />
          )}
          {isSectionActive(sections.innovative) && (
            <InnovativeCare data={sections.innovative} loading={treatmentLoading} />
          )}
        </>
      </Suspense>

      {isSectionActive(sections.getInTouch) && (
        <GetInTouch data={sections.getInTouch} loading={treatmentLoading} />
      )}
      {isSectionActive(sections.risk) && (
        <TreatmentRisk data={sections.risk} loading={treatmentLoading} />
      )}
      {isSectionActive(sections.cost) && (
        <TreatmentCost data={sections.cost} loading={treatmentLoading} />
      )}

      <Suspense fallback={<SectionSkeleton />}>
        <>
          {isSectionActive(sections.whatWeDo) && (
            <WhatWeDo data={sections.whatWeDo} loading={treatmentLoading} />
          )}
          {isSectionActive(sections.faq) && (
            <FAQ data={sections.faq} loading={treatmentLoading} />
          )}
          {isSectionActive(sections.resources) && (
            <Resources
              sectionClass="bg-white treatment__resource"
              data={sections.resources}
              loading={treatmentLoading}
            />
          )}
        </>
      </Suspense>

      <DynamicComponents pageData={sections} pageLoading={treatmentLoading} darkText={true} showFooter={false} showHeader={false}/>
      <Footer />
    </PageWrapper>
  );
};

export default TreatmentPage;
