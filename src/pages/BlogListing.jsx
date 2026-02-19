import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageBySlug, selectPageBySlug } from "../store/slices/pageSlice";
import DynamicComponents from "./DynamicComponents";

const BlogListing = () => {
  const dispatch = useDispatch();

  const { pageData, pageLoading } = useSelector((state) => selectPageBySlug(state, 'resource'));

  useEffect(() => {
    if (!pageData && !pageLoading) dispatch(fetchPageBySlug("resource"));
  }, [dispatch, pageData, pageLoading]);

  return (
      <DynamicComponents pageData={pageData} pageLoading={pageLoading} darkText={true} />
  );
};

export default BlogListing;
