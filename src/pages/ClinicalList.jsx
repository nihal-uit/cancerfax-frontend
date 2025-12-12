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
import { fetchPageBySlug } from "../store/slices/pageSlice";
import DynamicComponents from "./DynamicComponents";

const ClinicalListPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  const sideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  const sideRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  const dispatch = useDispatch();
  const { pageData, pageLoading } = useSelector(state => state.page);

  useEffect(() => {
    dispatch(fetchPageBySlug("clinical-trials"));
  }, [dispatch]);

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
