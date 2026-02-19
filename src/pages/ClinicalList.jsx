import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TreatmentSlider from "../components/TreatmentComponent/TreatmentSlider/TreatmentSlider";
import GetInTouch from "../components/GetInTouch/GetInTouch";
import ClinicalPhases from "../components/ClinicalComponents/ClinicalPhases";
import ClinicalPlan from "../components/ClinicalComponents/ClinicalPlan";

import Resources from "../components/TreatmentComponent/Resources/Resources";
import ClinicalHelp from "../components/ClinicalComponents/ClinicalHelp";
import ClinicalPartner from "../components/ClinicalComponents/ClinicalPartner";
import ClinicalCenter from "../components/ClinicalComponents/ClinicalCenter";
import ClinicalProcess from "../components/ClinicalComponents/ClinicalProcess";
import ClinicalHowWork from "../components/ClinicalComponents/ClinicalHowWork";
import ClinicalFeature from "../components/ClinicalComponents/ClinicalFeature";


import { useDispatch, useSelector } from "react-redux";
import { fetchPageBySlug, selectPageBySlug } from "../store/slices/pageSlice";
import DynamicComponents from "./DynamicComponents";

const ClinicalListPage = () => {
  const dispatch = useDispatch();
  const { pageData, pageLoading } = useSelector((state) => selectPageBySlug(state, 'clinical-trials'));

  useEffect(() => {
    if (!pageData && !pageLoading) dispatch(fetchPageBySlug("clinical-trials"));
  }, [dispatch, pageData, pageLoading]);

  return (
    // <>
    //   <PageWrapper>
    //     <Header darkText={true} />
    //     <ClinicalHero sectionClass="clinical__hero" />
    //     <TreatmentSlider sectionClass="clinical__banner" />
    //     <ClinicalFeature />
    //     <ClinicalHowWork />
    //     <ClinicalProcess />
    //     <GetInTouch sectionClass="getInTouch__clinical__sec" />
    //     <ClinicalCenter />
    //     <ClinicalPartner />
    //     <ClinicalPhases />
    //     <ClinicalHelp />
    //     <ClinicalPlan />
    //     <Resources sectionClass="treatment__resource" />
    //     <Footer />
    //   </PageWrapper>
    // </>
    <DynamicComponents pageData={pageData} pageLoading={pageLoading} darkText={true} />
  );
};
const PageWrapper = styled.div`
  width: 100%;
`;

export default ClinicalListPage;
