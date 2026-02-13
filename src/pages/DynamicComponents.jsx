// Core Components
import React, { Suspense, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchGlobalData } from '../store/slices/globalSlice';
import { componentMap } from "@/componentMap";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SEO from "../components/SEO/SEO";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import styled from "styled-components";

const DynamicComponents = ({ pageData, pageLoading, darkText = false, showHeader = true, showFooter = true }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const prevLoadingRef = useRef(false);
  const { data: globalData, loading: globalLoading} = useSelector(state => state.global);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll to top when data finishes loading
  useEffect(() => {
    if (prevLoadingRef.current && !pageLoading && !globalLoading && pageData) {
      window.scrollTo(0, 0);
    }
    prevLoadingRef.current = pageLoading || globalLoading;
  }, [pageLoading, globalLoading, pageData]);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  if (pageLoading || globalLoading) return <LoadingSpinner />;
  
  // Normalize dynamic zone - handle both snake_case (dynamic_zone) and camelCase (dynamicZone)
  const dynamicZone = pageData?.dynamicZone || pageData?.dynamic_zone || [];
  
  if (
    !pageData ||
    !Array.isArray(dynamicZone) ||
    dynamicZone.length === 0
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

  // Filter components where isActive is true
  const activeComponents = dynamicZone.filter((block) => {
    // Handle both boolean true and string "True"/"true" for compatibility
    return block.isActive === true || block.isActive === "True" || block.isActive === "true";
  }) || [];

  return (
    <PageWrapper>
      {showHeader && <Header darkText={darkText} />}
      <SEO />
      <Suspense fallback={<LoadingSpinner />}>
        {activeComponents.map((block, idx) => {
          const key = block.__component;
          const Component = componentMap[key];
          if (!Component) {
            console.warn("No component mapped for →", key);
            return null;
          }
          return <Component key={`${key}-${idx}`} componentData={block} data={block} />;
        })}
      </Suspense>
      {showFooter && <Footer />}
      </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

export default DynamicComponents;
