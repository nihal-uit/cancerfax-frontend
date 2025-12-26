import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import WhyOpt from "../components/TreatmentComponent/WhyOpt/WhyOpt";
import Testimonials from "../components/Testimonials/Testimonials";
import GetInTouch from "../components/GetInTouch/GetInTouch";
import Footer from "../components/Footer/Footer";
import Resources from "../components/TreatmentComponent/Resources/Resources";
import Transcend from "../components/TreatmentComponent/Transcend";
import Research from "../components/TreatmentComponent/Research";
import TreatmentDetailHero from "../components/TreatmentComponent/Hero/TretmentDetailHero";
import Chronic from "../components/TreatmentComponent/Chronic/Chronic";
import CartCellTherapy from "../components/TreatmentComponent/CartCellTherapy/CartCellTherapy";
import FdaTherapy from "../components/TreatmentComponent/FdaTherapy";

const TreatmentDetailPage = () => {
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
    <PageWrapper>
      <Header darkText={false} />
      <TreatmentDetailHero />
      <Chronic />
      <CartCellTherapy
        fadeIn={fadeIn}
        sideLeft={sideLeft}
        sideRight={sideRight}
      />
      <WhyOpt sectionClass="theraphy__detail__sec" />
      <hr className="treatment__divider" />
      <FdaTherapy fadeIn={fadeIn} sideLeft={sideLeft} sideRight={sideRight} />
      <Testimonials />
      <GetInTouch />
      <Research />
      <Transcend />
      <Resources sectionClass="treatment__resource" />
      <Footer />
    </PageWrapper>
  );
};

const PageWrapper = styled.div``;

export default TreatmentDetailPage;
