// Core Components
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGlobalData } from '../store/slices/globalSlice';
import { componentMap } from "@/componentMap";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SEO from "../components/SEO/SEO";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import styled from "styled-components";

const DynamicComponents = ({ pageData, pageLoading, darkText = false, showHeader = true, showFooter = true }) => {
  const dispatch = useDispatch();
  const { data: globalData, loading: globalLoading} = useSelector(state => state.global);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  if (pageLoading || globalLoading) return <LoadingSpinner />;
  if (
    !pageData ||
    !Array.isArray(pageData.dynamicZone) ||
    pageData.dynamicZone.length === 0
  ) {
    return (
      <PageWrapper>
        {showHeader && <Header darkText={true} />}
        <SEO />
        {/* <div>No components available</div> */}
        {showFooter && <Footer />}
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {showHeader && <Header darkText={darkText} />}
      <SEO />
      <Suspense fallback={<LoadingSpinner />}>
        {pageData?.dynamicZone?.map((block, idx) => {
          const key = block.__component;
          const Component = componentMap[key];
          if (!Component) {
            console.warn("No component mapped for →", key);
            return null;
          }
          return <Component key={`${key}-${idx}`} data={block} />;
        })}
      </Suspense>
      {showFooter && <Footer />}
      </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
`;

export default DynamicComponents;
