import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ClinicalGuidance from "../components/ClinicalComponents/ClinicalGuidance";
import ClicicalSafety from "../components/ClinicalComponents/ClinicalSafety";

const ClinicalOngoingPage = () => {
  return (
    <>
      <PageWrapper>
        <Header darkText={true} />
        <ClicicalSafety />
        <ClinicalGuidance />
        <Footer />
      </PageWrapper>
    </>
  );
};
const PageWrapper = styled.div`
  width: 100%;
`;
export default ClinicalOngoingPage;
