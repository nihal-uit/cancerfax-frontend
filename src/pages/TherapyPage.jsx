import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGlobalData } from "../store/slices/globalSlice";
import { fetchTherapiesBySlug } from "../store/slices/therapiesSlice";
import { useParams } from "react-router-dom";
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

const TreatmentDetailPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const { data: globalData, loading: globalLoading } = useSelector((state) => state.global);
  const { therapies, loading: therapiesLoading } = useSelector((state) => state.therapies || {});

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchTherapiesBySlug(slug));
  }, [dispatch, slug]);

  if (globalLoading || therapiesLoading || !therapies) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <Header darkText={false} />
      <TreatmentDetailHero data={therapies} loading={therapiesLoading} />
      <Chronic data={therapies} loading={therapiesLoading} />
      <CartCellTherapy
        fadeIn={fadeIn}
        sideLeft={sideLeft}
        sideRight={sideRight}
        data={therapies}
        loading={therapiesLoading}
      />
      <WhyOpt sectionClass="theraphy__detail__sec" data={therapies} loading={therapiesLoading} />
      <hr className="treatment__divider" />
      <FdaTherapy fadeIn={fadeIn} sideLeft={sideLeft} sideRight={sideRight} data={therapies} loading={therapiesLoading} />
      <Testimonials data={therapies} loading={therapiesLoading} />
      <GetInTouch data={therapies} loading={therapiesLoading} />
      <Research data={therapies} loading={therapiesLoading} />
      <Transcend data={therapies} loading={therapiesLoading} />
      <Resources sectionClass="treatment__resource" data={therapies} loading={therapiesLoading} />
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

export default TreatmentDetailPage;
