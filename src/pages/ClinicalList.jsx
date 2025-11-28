import React from "react";
import Header from "../components/Header/Header";
import Hero from "../components/TreatmentComponent/Hero/Hero";
import TreatmentSlider from "../components/TreatmentComponent/TreatmentSlider/TreatmentSlider";
import Resources from "../components/TreatmentComponent/Resources/Resources";
import styled from "styled-components";
import Footer from "../components/Footer/Footer";
import ClinicalTrials from "../components/ClinicalTrials/ClinicalTrials";
import ClinicalPlan from "../components/ClinicalComponents/ClinicalPlan";
import ClinicalHelp from "../components/ClinicalComponents/ClinicalHelp";
import ClinicalPhases from "../components/ClinicalComponents/ClinicalPhases";
import ClinicalPartner from "../components/ClinicalComponents/ClinicalPartner";
import ClinicalCenter from "../components/ClinicalComponents/ClinicalCenter";
import ClinicalProcess from "../components/ClinicalComponents/ClinicalProcess";
import ClinicalHowWork from "../components/ClinicalComponents/ClinicalHowWork";
import ClinicalFeature from "../components/ClinicalComponents/ClinicalFeature";
import ClinicalHero from "../components/ClinicalComponents/ClinicalHero";
import GetInTouch from "../components/GetInTouch/GetInTouch";

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
  return (
    <>
      <PageWrapper>
        <Header darkText={true} />
        <ClinicalHero sectionClass="clinical__hero" />
        <TreatmentSlider sectionClass="clinical__banner" />
        <ClinicalFeature />
        <ClinicalHowWork />
        <ClinicalProcess />
        <GetInTouch sectionClass="getInTouch__clinical__sec" />
        <ClinicalCenter />
        <ClinicalPartner />
        <ClinicalPhases />
        <ClinicalHelp />
        <ClinicalPlan />
        <Resources sectionClass="treatment__resource" />
        <Footer />
      </PageWrapper>
    </>
  );
};
const PageWrapper = styled.div`
  width: 100%;
`;

export default ClinicalListPage;
