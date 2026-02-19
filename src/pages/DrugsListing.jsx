import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageBySlug, selectPageBySlug } from "../store/slices/pageSlice";
import DynamicComponents from "./DynamicComponents";

const DrugsListing = () => {
  const dispatch = useDispatch();
  const { pageData, pageLoading } = useSelector((state) => selectPageBySlug(state, 'drugs'));

  // Fetch when not in cache (cache-first)
  useEffect(() => {
    if (!pageData && !pageLoading) dispatch(fetchPageBySlug("drugs"));
  }, [dispatch, pageData, pageLoading]);

  return <DynamicComponents pageData={pageData} pageLoading={pageLoading} darkText={true} />;
};

export default DrugsListing;
