import React, { useEffect, useMemo, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGlobalData } from "../store/slices/globalSlice";
import { getSectionData as getSectionDataRaw } from "../utils/strapiHelpers";
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
import { useParams } from "react-router-dom";
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

  const { data: globalData, loading: globalLoading } = useSelector((state) => state.global);
  const { treatment, loading: treatmentLoading } = useSelector((state) => state.treatment || {});

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchTreatmentBySlug(slug));
  }, [dispatch, slug]);

  const getSectionData = useMemo(() => getSectionDataRaw, []);

  const sections = useMemo(
    () => ({
      hero: getSectionData(treatment, "treatmentHero"),
      slider: getSectionData(treatment, "treatmentSlider"),
      howItWorks: getSectionData(treatment, "treatmentHowItWorks"),
      whyOpt: getSectionData(treatment, "treatmentWhyOpt"),
      evidance: getSectionData(treatment, "treatmentEvidance"),
      journey: getSectionData(treatment, "treatmentJourney"),
      isForYou: getSectionData(treatment, "treatmentIsForYou"),
      testimonials: getSectionData(treatment, "treatmentTestimonials"),
      innovative: getSectionData(treatment, "treatmentInnovativeCare"),
      getInTouch: getSectionData(treatment, "treatmentGetInTouch"),
      risk: getSectionData(treatment, "treatmentRisk"),
      cost: getSectionData(treatment, "treatmentCost"),
      whatWeDo: getSectionData(treatment, "treatmentWhatWeDo"),
      faq: getSectionData(treatment, "treatmentFAQ"),
      resources: getSectionData(treatment, "treatmentResources"),
    }),
    [treatment, getSectionData]
  );

  if (globalLoading || treatmentLoading || !treatment) {
    return <LoadingSpinner />
  }

  return (
    <PageWrapper>
      <Header darkText={true} />
      <TreatmentHero sectionClass="treatment__here" data={sections.hero} loading={treatmentLoading}/>
      <TreatmentSlider sectionClass="treatment__banner" data={sections.slider} loading={treatmentLoading}/>

      <Suspense fallback={<SectionSkeleton />}>
        <>
          <HowItWorks data={sections.howItWorks} loading={treatmentLoading} />
          <WhyOpt data={sections.whyOpt} loading={treatmentLoading} />
          <Evidance data={sections.evidance} loading={treatmentLoading} />
          <Journey data={sections.journey} loading={treatmentLoading} />
        </>
      </Suspense>

       <Suspense fallback={<SectionSkeleton />}>
        <>
          <IsForYou data={sections.isForYou} loading={treatmentLoading} />
          <Testimonials data={sections.testimonials} loading={treatmentLoading} />
          <InnovativeCare data={sections.innovative} loading={treatmentLoading} />
        </>
      </Suspense>

      <GetInTouch data={sections.getInTouch} loading={treatmentLoading} />
      <TreatmentRisk data={sections.risk} loading={treatmentLoading} />
      <TreatmentCost data={sections.cost} loading={treatmentLoading} />

      <Suspense fallback={<SectionSkeleton />}>
        <>
          <WhatWeDo data={sections.whatWeDo} loading={treatmentLoading} />
          <FAQ data={sections.faq} loading={treatmentLoading} />
          <Resources
            sectionClass="bg-white treatment__resource"
            data={sections.resources}
            loading={treatmentLoading}
          />
        </>
      </Suspense>

      <DynamicComponents pageData={treatment} pageLoading={treatmentLoading} darkText={true} showFooter={false} showHeader={false}/>
      <Footer />
    </PageWrapper>
  );
};

export default TreatmentPage;
