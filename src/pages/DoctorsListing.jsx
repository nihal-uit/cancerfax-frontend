import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPageBySlug } from "../store/slices/pageSlice";
import DynamicComponents from "./DynamicComponents";
import "swiper/css";
import "swiper/css/effect-fade";

const DoctorsListing = () => {
  const dispatch = useDispatch();
  const { pageData, pageLoading } = useSelector(state => state.page);

  useEffect(() => {
    dispatch(fetchPageBySlug("doctors"));
  }, [dispatch]);

  return (
    <DynamicComponents pageData={pageData} pageLoading={pageLoading} darkText={true}/>
  );
};

export default DoctorsListing;
