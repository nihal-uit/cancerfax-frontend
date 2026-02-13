import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGlobalData } from "../store/slices/globalSlice";
import { fetchClinicalTrialsBySlug } from "../store/slices/clinicalTrialsSlice";
import { useParams, useLocation } from "react-router-dom";
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
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import DynamicComponents from "./DynamicComponents";

const ClinicalTrialsDetailsPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const location = useLocation();
  const prevLoadingRef = useRef(false);

  const { data: globalData, loading: globalLoading } = useSelector((state) => state.global);
  const { clinicalTrials, loading: clinicalTrialsLoading } = useSelector((state) => state.clinicalTrials || {});

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll to top when data finishes loading
  useEffect(() => {
    if (prevLoadingRef.current && !clinicalTrialsLoading && !globalLoading && clinicalTrials) {
      window.scrollTo(0, 0);
    }
    prevLoadingRef.current = clinicalTrialsLoading || globalLoading;
  }, [clinicalTrialsLoading, globalLoading, clinicalTrials]);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchClinicalTrialsBySlug(slug));
  }, [dispatch, slug]);

  if (globalLoading || clinicalTrialsLoading || !clinicalTrials) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <Header darkText={false} />
      <TreatmentDetailHero data={clinicalTrials?.[0]} loading={clinicalTrialsLoading} />
      <Chronic data={clinicalTrials?.[0]} loading={clinicalTrialsLoading} />
      <CartCellTherapy
        fadeIn={fadeIn}
        sideLeft={sideLeft}
        sideRight={sideRight}
        data={clinicalTrials?.[0]}
        loading={clinicalTrialsLoading}
      />
      <WhyOpt sectionClass="theraphy__detail__sec" data={clinicalTrials?.[0]} loading={clinicalTrialsLoading} />
      <hr className="treatment__divider" />
      <FdaTherapy fadeIn={fadeIn} sideLeft={sideLeft} sideRight={sideRight} data={clinicalTrials?.[0]} loading={clinicalTrialsLoading} />
      <Testimonials data={clinicalTrials?.[0]} loading={clinicalTrialsLoading} />
      <GetInTouch data={clinicalTrials?.[0]} loading={clinicalTrialsLoading} />
      <Research data={clinicalTrials?.[0]} loading={clinicalTrialsLoading} />
      <Transcend data={clinicalTrials?.[0]} loading={clinicalTrialsLoading} />
      <Resources sectionClass="treatment__resource" data={clinicalTrials?.[0]} loading={clinicalTrialsLoading} />
      <DynamicComponents pageData={clinicalTrials?.[0]} pageLoading={clinicalTrialsLoading} showHeader={false} showFooter={false} />
      <Footer />
    </div>
  );
};

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

export default ClinicalTrialsDetailsPage;
