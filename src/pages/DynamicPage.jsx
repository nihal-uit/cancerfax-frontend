import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
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
import { fetchPageBySlug, clearPageData } from '../store/slices/pageSlice';
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
  background-color: #36454F;
  color: #fff;
  font-size: 16px;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 575px) {
    max-width: 100%;
  }
  &:hover {
    background-color: #FF69B4;
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
  color: #4B5563;
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

  const { slug } = useParams();
  const dispatch = useDispatch();
  const pageData = useSelector((state) => state.page?.pageData);
  const pageLoading = useSelector((state) => state.page?.pageLoading);
  const pageError = useSelector((state) => state.page?.pageError);

  // Also fetch global data for navbar/footer
  const globalData = useSelector((state) => state.global?.data);
  const globalLoading = useSelector((state) => state.global?.loading);

  useEffect(() => {
    // Fetch global data if not already loaded (for navbar/footer)
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [dispatch, globalData, globalLoading]);

  useEffect(() => {
    // Normalize slug: trim whitespace and handle URL encoding
    const normalizedSlug = slug ? decodeURIComponent(slug.trim()) : null;

    if (
      normalizedSlug &&
      !RESERVED_ROUTES.includes(normalizedSlug.toLowerCase())
    ) {
      // Fetch page data by slug - this automatically works for ANY slug from Strapi
      console.log('DynamicPage: Fetching page for slug:', normalizedSlug);
      dispatch(fetchPageBySlug(normalizedSlug));

      // Cleanup: clear page data when component unmounts or slug changes
      return () => {
        dispatch(clearPageData());
      };
    } else if (
      normalizedSlug &&
      RESERVED_ROUTES.includes(normalizedSlug.toLowerCase())
    ) {
      console.log('DynamicPage: Slug is reserved route:', normalizedSlug);
    }
  }, [slug, dispatch]);

  // Component mapping: Supports ALL dynamic zone components from Strapi
  // Users can create pages in Strapi using any combination of these components
  const componentMap = useMemo(
    () => ({
      'dynamic-zone.hero': Hero,
      'dynamic-zone.slider-section': ClinicalTrialsShowcase,
      'dynamic-zone.about': AboutSection,
      'dynamic-zone.therapy-section': InnovativeCare,
      'dynamic-zone.testimonials': Testimonials,
      'dynamic-zone.testimonial-slider': VideoTestimonials,
      'dynamic-zone.trials-section': ClinicalTrials,
      'dynamic-zone.get-in-touch': GetInTouch,
      'dynamic-zone.location': LocationNetwork,
      'dynamic-zone.how-it-works': HowItWorks,
      'dynamic-zone.resources': Resources,
      // Alternative naming conventions
      'dynamic-zone.clinical-trials-showcase': ClinicalTrialsShowcase,
      'dynamic-zone.innovative-care': InnovativeCare,
      'dynamic-zone.video-testimonials': VideoTestimonials,
      'dynamic-zone.statistics': AboutSection,
      'dynamic-zone.testimony': Testimonials,
      'dynamic-zone.get-in-touch-section': GetInTouch,
      'dynamic-zone.location-section': LocationNetwork,
      'dynamic-zone.how-it-works-section': HowItWorks,
      'dynamic-zone.resources-section': Resources,
      'dynamic-zone.hero-section': Hero,
      'dynamic-zone.testimonials-section': Testimonials,
      'dynamic-zone.about-section': AboutSection,
      'dynamic-zone.form_next_to_section': null, // Add component if needed
      'dynamic-zone.featured': null, // Add component if needed
    }),
    []
  );

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
                      <img className='error-404-img' src="../images/404-img.svg" alt="" />
                      <h4 className='title-4 text_theme_dark'>
                        Oops! Page not found.
                      </h4>
                      <p className='text-16 text_theme_dark'>
                        Sorry, the page you're looking for doesn't exist or has been moved. Check the URL.
                      </p>
                      <BackButton className='btn' onClick={() => window.location.href = '/'}>
                       Go to Home
                      </BackButton>
                      <span className='text-16'><a className='text-pink' href="#">Contact Support</a> if you need further assistance.</span>
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

  // Render components dynamically based on Strapi dynamic zone order
  // This allows users to create pages in Strapi with any combination of components
  const renderDynamicComponents = () => {
    if (!pageData || !pageData.dynamicZone || pageLoading) {
      return null;
    }

    // Filter out null components (unmapped component types)
    const validComponents = pageData.dynamicZone.filter((item) => {
      const Component = componentMap[item.__component];
      if (!Component) {
        console.warn(
          `DynamicPage: Unknown component type "${item.__component}"`,
          {
            componentType: item.__component,
            availableTypes: Object.keys(componentMap).filter(
              (k) => componentMap[k] !== null
            ),
            slug: slug,
          }
        );
        return false;
      }
      return true;
    });

    // Render components in the order they appear in Strapi dynamic zone
    // Filter out Statistics section if needed (component type: 'dynamic-zone.statistics')
    return (
      validComponents
        // Don't filter out Statistics - let it render if user adds it
        // .filter((item) => {
        //   // Skip Statistics section - remove if you want it back
        //   if (item.__component === 'dynamic-zone.statistics') {
        //     console.log('DynamicPage: Skipping Statistics section');
        //     return false;
        //   }
        //   return true;
        // })
        .map((item, index) => {
          const Component = componentMap[item.__component];

          // Pass props based on component type
          // IMPORTANT: Pass componentData so components use page-specific data instead of global/home page data
          const props = {
            componentData: item, // Pass the actual component data from this page's dynamic zone
            pageData: pageData, // Pass full page data for context
          };

          // Debug: Log component data being passed
          console.log(
            `DynamicPage: Rendering ${item.__component} with componentData`,
            {
              componentType: item.__component,
              hasComponentData: !!item,
              componentDataKeys: item ? Object.keys(item).slice(0, 10) : [],
              heading: item?.heading || item?.subHeading || 'N/A',
            }
          );

          if (
            item.__component === 'dynamic-zone.location' ||
            item.__component === 'dynamic-zone.location-section'
          ) {
            props.showButtons = true;
          }

          return (
            <Component
              key={`${item.__component}-${index}-${item.id || index}`}
              {...props}
            />
          );
        })
    );
  };

  return (
    // <PageWrapper>
    //   <SEO />
    //   <Header />
    //   {renderDynamicComponents()}
    //   <Footer />
    // </PageWrapper>
    <DynamicComponents pageData={pageData} pageLoading={pageLoading} darkText={!pageData?.dark_header}/>
  );
};

export default DynamicPage;
