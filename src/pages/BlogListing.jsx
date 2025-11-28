import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGlobalData } from "../store/slices/globalSlice";
import { fetchPageBySlug } from "../store/slices/pageSlice";
import { getSectionData } from "../utils/strapiHelpers";
import Header from "../components/Header/Header";
import BlogHero from "../components/BlogComponent/BlogHero";
import BlogSlider from "../components/BlogComponent/BlogSlider";
import BlogKnowledgeChest from "../components/BlogComponent/BlogKnowledgeChest";
import BlogSupport from "../components/BlogComponent/BlogSupport";
import Footer from "../components/Footer/Footer";

const BlogListing = () => {
  const dispatch = useDispatch();

  const { data: globalData, loading: globalLoading} = useSelector(state => state.global);
  const { pageData, pageLoading } = useSelector(state => state.page);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchPageBySlug("resource-listing"));
  }, [dispatch]);

  if (globalLoading || pageLoading || !pageData) {
    return <div className="page_wrapper">Loading...</div>;
  } 

  const BlogHeroData = getSectionData(pageData, "blogHero");
  const BlogSliderData = getSectionData(pageData, "blogSlider");
  const BlogKnowledgeChestData = getSectionData(pageData, "blogKnowledgeChest");
  const BlogSupportData = getSectionData(pageData, "blogSubscribe");

  return (
    <div className="page_wrapper">
      <Header darkText={true} />
      <BlogHero data={BlogHeroData} loading={pageLoading}/>
      <BlogSlider data={BlogSliderData} loading={pageLoading}/>
      <BlogKnowledgeChest data={BlogKnowledgeChestData} loading={pageLoading}/>
      <BlogSupport data={BlogSupportData} loading={pageLoading}/>
      <Footer />
    </div>
  );
};

export default BlogListing;
