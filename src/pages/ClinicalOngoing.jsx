import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageBySlug, selectPageBySlug } from "../store/slices/pageSlice";
import DynamicComponents from "./DynamicComponents";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ClinicalGuidance from "../components/ClinicalComponents/ClinicalGuidance";
import ClicicalSafety from "../components/ClinicalComponents/ClinicalSafety";
import OngoingClinicalHero from "../components/ClinicalComponents/OngoingClinicalHero";
import OngoingQuickFinds from "../components/ClinicalComponents/OngoingQuickFinds";


const ClinicalOngoingPage = () => {
  const dispatch = useDispatch();
  const { pageData, pageLoading } = useSelector((state) => selectPageBySlug(state, 'ongoing-clinical-trials'));

  useEffect(() => {
    if (!pageData && !pageLoading) dispatch(fetchPageBySlug("ongoing-clinical-trials"));
  }, [dispatch, pageData, pageLoading]);

  return (
    // <>
    //   <PageWrapper>
    //     <Header darkText={true} />
    //     <OngoingClinicalHero data={pageData} loading={pageLoading}/>
    //     <OngoingQuickFinds data={pageData} loading={pageLoading}/>
    //     <ClicicalSafety data={pageData} loading={pageLoading}/>
    //     <ClinicalGuidance data={pageData} loading={pageLoading}/>
    //     <Footer />
    //   </PageWrapper>
    // </>
    <DynamicComponents pageData={pageData} pageLoading={pageLoading} darkText={true} />
  );
};
const PageWrapper = styled.div`
  width: 100%;
`;
export default ClinicalOngoingPage;
