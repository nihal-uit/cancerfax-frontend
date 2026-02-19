import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPageBySlug, selectPageBySlug } from "../store/slices/pageSlice";
import DynamicComponents from "./DynamicComponents";
import "swiper/css";
import "swiper/css/effect-fade";

const DoctorsListing = () => {
  const dispatch = useDispatch();
  const { pageData, pageLoading } = useSelector((state) => selectPageBySlug(state, 'doctors'));

  useEffect(() => {
    if (!pageData && !pageLoading) dispatch(fetchPageBySlug("doctors"));
  }, [dispatch, pageData, pageLoading]);

  return (
    <DynamicComponents pageData={pageData} pageLoading={pageLoading} darkText={true}/>
  );
};

export default DoctorsListing;
