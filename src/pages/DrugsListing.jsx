import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageBySlug } from "../store/slices/pageSlice";
import DynamicComponents from "./DynamicComponents";

const DrugsListing = () => {
  const dispatch = useDispatch();
  const { pageData, pageLoading } = useSelector((state) => state.page);

  useEffect(() => {
    if (!pageData && !pageLoading) {
      dispatch(fetchPageBySlug("drug-listing"));
    }
  }, [pageData, pageLoading, dispatch]);

  return <DynamicComponents pageData={pageData} pageLoading={pageLoading} darkText={true} />;
};

export default DrugsListing;
