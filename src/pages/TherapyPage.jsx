import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGlobalData } from "../store/slices/globalSlice";
import { fetchTherapiesBySlug } from "../store/slices/therapiesSlice";
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

const TherapyPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const location = useLocation();
  const prevLoadingRef = useRef(false);

  const { data: globalData, loading: globalLoading } = useSelector((state) => state.global);
  const { therapies, loading: therapiesLoading } = useSelector((state) => state.therapies || {});

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll to top when data finishes loading
  useEffect(() => {
    if (prevLoadingRef.current && !therapiesLoading && !globalLoading && therapies) {
      window.scrollTo(0, 0);
    }
    prevLoadingRef.current = therapiesLoading || globalLoading;
  }, [therapiesLoading, globalLoading, therapies]);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchTherapiesBySlug(slug));
  }, [dispatch, slug]);

  if (globalLoading || therapiesLoading || !therapies || !therapies?.[0]) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <Header darkText={false} />
      {
        therapies?.[0]?.hero?.isActive && (
          <TreatmentDetailHero data={therapies?.[0]?.hero} loading={therapiesLoading} />
        )
      }
      {
        therapies?.[0]?.overview?.isActive && (
          <Chronic data={therapies?.[0]?.overview} loading={therapiesLoading} />
        )
      }
      {
        therapies?.[0]?.understanding?.isActive && (
          <CartCellTherapy
            fadeIn={fadeIn}
            sideLeft={sideLeft}
            sideRight={sideRight}
            data={therapies?.[0]?.understanding}
            loading={therapiesLoading}
          />
        )
      }
      {
        therapies?.[0]?.why_therapy?.isActive && (
          <WhyOpt sectionClass="theraphy__detail__sec" data={therapies?.[0]?.why_therapy} loading={therapiesLoading} />
        )
      }
      {
        therapies?.[0]?.proof?.isActive && (
          <hr className="treatment__divider"/>
        )
      }
      {
        therapies?.[0]?.proof?.isActive && (
          <FdaTherapy fadeIn={fadeIn} sideLeft={sideLeft} sideRight={sideRight} data={therapies?.[0]?.proof} loading={therapiesLoading} />
        )
      }
      {
        therapies?.[0]?.testimonial?.isActive && (
          <Testimonials data={therapies?.[0]?.testimonial} loading={therapiesLoading} />
        )
      }
      {
        therapies?.[0]?.get_in_touch?.isActive && (
          <GetInTouch data={therapies?.[0]?.get_in_touch} loading={therapiesLoading} />
        )
      }
      {
        therapies?.[0]?.trials?.isActive && (
          <Research data={therapies?.[0]?.trials} loading={therapiesLoading} />
        )
      }
      {
        therapies?.[0]?.study && Array.isArray(therapies?.[0]?.study) && therapies?.[0]?.study?.length > 0 && (
          <Transcend data={therapies?.[0]?.study} loading={therapiesLoading} />
        )
      }
      {
        therapies?.[0]?.resources?.isActive && (
          <Resources sectionClass="treatment__resource" data={therapies?.[0]?.resources} loading={therapiesLoading} />
        )
      }
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

export default TherapyPage;
