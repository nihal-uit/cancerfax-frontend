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
import PageSkeleton from "../components/PageSkeleton/PageSkeleton";
import ViewportSection from "../components/ViewportSection/ViewportSection";
import styled from "styled-components";

const DynamicComponents = ({ pageData, pageLoading, darkText = false, showHeader = true, showFooter = true }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const prevLoadingRef = useRef(false);
  const { data: globalData, loading: globalLoading, error: globalError } = useSelector(state => state.global);

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

  // Only fetch when we have no data, are not loading, and have not already failed (prevents infinite loop when API is down/slow)
  useEffect(() => {
    if (!globalData && !globalLoading && !globalError) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, globalError, dispatch]);

  if (pageLoading || globalLoading) return <PageSkeleton showHeader={showHeader} showFooter={showFooter} />;
  
  // Normalize dynamic zone - handle both snake_case (dynamic_zone) and camelCase (dynamicZone)
  const dynamicZone = pageData?.dynamicZone || pageData?.dynamic_zone || [];
  
  if (
    !pageData ||
    !Array.isArray(dynamicZone) ||
    dynamicZone.length === 0
  ) {
    const isClinicalTrials = location.pathname === '/clinical-trials' || location.pathname.startsWith('/clinical-trials/');
    return (
      <PageWrapper $disableOverflowX={isClinicalTrials}>
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

  const isClinicalTrials = location.pathname === '/clinical-trials' || location.pathname.startsWith('/clinical-trials/');

  return (
    <PageWrapper $disableOverflowX={isClinicalTrials}>
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
          const componentProps = { componentData: block, data: block };
          // First section (e.g. hero) renders immediately for fast LCP; rest are viewport-gated
          if (idx === 0) {
            return <Component key={`${key}-${idx}`} {...componentProps} />;
          }
          return (
            <ViewportSection
              key={`${key}-${idx}`}
              component={Component}
              componentProps={componentProps}
              placeholderMinHeight={200}
              rootMargin="200px 0px 200px 0px"
              suspenseFallback={<SectionPlaceholder />}
            />
          );
        })}
      </Suspense>
      {showFooter && <Footer />}
      </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  overflow-x: ${(props) => (props.$disableOverflowX ? 'visible' : 'hidden')};
`;

const SectionPlaceholder = styled.div`
  min-height: 200px;
  width: 100%;
`;

export default DynamicComponents;
