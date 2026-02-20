import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SEO from '../components/SEO/SEO';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import ClinicalTrialsShowcase from '../components/ClinicalTrialsShowcase/ClinicalTrialsShowcase';
import InnovativeCare from '../components/InnovativeCare/InnovativeCare';
import Testimonials from '../components/Testimonials/Testimonials';
// import ClinicalTrialsAbout from '../components/ClinicalTrialsAbout/ClinicalTrialsAbout';
import AboutSection from '../components/AboutSection/AboutSection';
import ClinicalTrials from '../components/ClinicalTrials/ClinicalTrials';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import VideoTestimonials from '../components/VideoTestimonials/VideoTestimonials';
import Resources from '../components/Resources/Resources';
import GetInTouch from '../components/GetInTouch/GetInTouch';
import LocationNetwork from '../components/LocationNetwork/LocationNetwork';
import Footer from '../components/Footer/Footer';
import { fetchPageBySlug, selectPageBySlug } from '../store/slices/pageSlice';
import { fetchGlobalData } from '../store/slices/globalSlice';
import ScrollAnimationComponent from '../components/ScrollAnimation/ScrollAnimationComponent';
import DynamicComponents from './DynamicComponents';
import NotFound from './NotFound';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const PageWrapper = styled.div`
  width: 100%;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  padding: 120px 40px 40px;
  text-align: center;
  background: #faf5f0;
`;

const ErrorImage = styled.img`
  max-width: 60%;
  height: auto;
  margin: 0 0 32px;
  display: block;

  @media (max-width: 768px) {
    max-width: 50%;
  }

  @media (max-width: 480px) {
    max-width: 45%;
  }
`;

const MainHeading = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const ErrorMessage = styled.p`
  font-size: 18px;
  color: #36454f;
  margin: 0 0 32px 0;
`;

const BackButton = styled.button`
  max-width: 221px;
  background-color: #36454f;
  color: #fff;
  font-size: 16px;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 575px) {
    max-width: 100%;
  }
  &:hover {
    background-color: #ff69b4;
    color: #fff;
  }

  &:active {
    transform: translateY(0);
  }
`;

const SupportLink = styled.a`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  color: #ff69b4;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #ff1493;
    text-decoration: underline;
  }
`;

const SubText = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #4b5563;
  max-width: 520px;
  margin: 0 0 32px;

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 22px;
  }
`;

// Reserved routes that should use their own components (not dynamic pages)
// These routes are handled by specific components in App.js
const RESERVED_ROUTES = ['home'];

const DynamicPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const { slug, category, subcategory } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const normalizedSlugForSelect = slug ? decodeURIComponent(slug.trim()) : '';
  const { pageData, pageLoading, pageError } = useSelector((state) =>
    selectPageBySlug(state, normalizedSlugForSelect)
  );
  const prevLoadingRef = useRef(false);

  // Pass category and subcategory to DynamicComponents so BlogKnowledgeChest can use them
  const urlParams = { category, subcategory };

  // Also fetch global data for navbar/footer
  const globalData = useSelector((state) => state.global?.data);
  const globalLoading = useSelector((state) => state.global?.loading);

  // Filter pageData to only include components where isActive is true
  const filteredPageData = useMemo(() => {
    if (!pageData || !pageData.dynamicZone) {
      return pageData;
    }

    // Filter components where isActive is true (handle both boolean and string values)
    const filteredDynamicZone = pageData.dynamicZone.filter((block) => {
      return (
        block.isActive === true ||
        block.isActive === 'True' ||
        block.isActive === 'true'
      );
    });

    return {
      ...pageData,
      dynamicZone: filteredDynamicZone,
    };
  }, [pageData]);

  useEffect(() => {
    // Fetch global data if not already loaded (for navbar/footer)
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [dispatch, globalData, globalLoading]);

  // Scroll to top only when the page (slug) changes, not when only category/subcategory filters change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Scroll to top when data finishes loading
  useEffect(() => {
    if (prevLoadingRef.current && !pageLoading && pageData) {
      window.scrollTo(0, 0);
    }
    prevLoadingRef.current = pageLoading;
  }, [pageLoading, pageData]);

  // Fetch page by slug only when not in cache (cache-first; no clear on unmount so cache is reused)
  useEffect(() => {
    const normalizedSlug = slug ? decodeURIComponent(slug.trim()) : null;

    if (
      normalizedSlug &&
      !RESERVED_ROUTES.includes(normalizedSlug.toLowerCase()) &&
      !pageData &&
      !pageLoading &&
      !pageError
    ) {
      dispatch(fetchPageBySlug(normalizedSlug));
    }
  }, [slug, dispatch, pageData, pageLoading, pageError]);

  // Redirect reserved routes
  if (slug && RESERVED_ROUTES.includes(slug)) {
    if (slug === 'home') {
      return <Navigate to='/' replace />;
    }
    return null;
  }

  // Loading state
  if (pageLoading) {
    return (
      <PageWrapper>
        <Header />
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
        <Footer />
      </PageWrapper>
    );
  }

  // Error state - 404 or redirect to home
  if (pageError) {
    const is404 =
      pageError.status === 404 ||
      (pageError.message && pageError.message.includes('not found'));

    if (is404) {
      return (
        <PageWrapper>
          <Header darkText={true} />
          <NotFound />
          <Footer />
        </PageWrapper>
      );
    }
    return <Navigate to='/' replace />;
  }

  // No page data available after loading completes
  // Check if page exists but has no components (empty dynamic zone is valid)
  if (!pageLoading && !pageError && (!pageData || !pageData.dynamicZone)) {
    // Page might exist but have no dynamic zone components
    // Show 404 or redirect based on preference
    return (
      <PageWrapper>
        <Header darkText={true} />

        <div className='others_hero_content comm_hero_pt'>
          <div className='containerWrapper py-88'>
            <div className='row'>
              <div className='col-md-12'>
                <ScrollAnimationComponent animationVariants={fadeIn}>
                  <div className='commContent_wrap content-gap-24 text-center'>
                    <img
                      className='error-404-img'
                      src='../images/404-img.svg'
                      alt=''
                    />
                    <h4 className='title-4 text_theme_dark'>
                      Oops! Page not found.
                    </h4>
                    <p className='text-16 text_theme_dark'>
                      Sorry, the page you're looking for doesn't exist or has
                      been moved. Check the URL.
                    </p>
                    <BackButton
                      className='btn'
                      onClick={() => (window.location.href = '/')}
                    >
                      Go to Home
                    </BackButton>

                    <span className='text-16'>
                      <a className='text-pink' href='#'>
                        Contact Support
                      </a>{' '}
                      if you need further assistance.
                    </span>
                  </div>
                </ScrollAnimationComponent>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </PageWrapper>
    );
  }

  return (
    <DynamicComponents
      pageData={filteredPageData}
      pageLoading={pageLoading}
      darkText={pageData?.dark_header}
    />
  );
};

export default DynamicPage;
