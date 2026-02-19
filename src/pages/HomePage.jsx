import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO/SEO';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import ClinicalTrialsShowcase from '../components/ClinicalTrialsShowcase/ClinicalTrialsShowcase';
import InnovativeCare from '../components/InnovativeCare/InnovativeCare';
import Testimonials from '../components/Testimonials/Testimonials';
import ClinicalTrialsAbout from '../components/ClinicalTrialsAbout/ClinicalTrialsAbout';
import AboutSection from '../components/AboutSection/AboutSection';
import ClinicalTrials from '../components/ClinicalTrials/ClinicalTrials';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import VideoTestimonials from '../components/VideoTestimonials/VideoTestimonials';
import Resources from '../components/Resources/Resources';
import GetInTouch from '../components/GetInTouch/GetInTouch';
import LocationNetwork from '../components/LocationNetwork/LocationNetwork';
import Footer from '../components/Footer/Footer';
import { fetchGlobalData } from '../store/slices/globalSlice';
import store from '../store';
import DynamicComponents from './DynamicComponents';
import { fetchPageBySlug, selectPageBySlug } from '../store/slices/pageSlice';

// Lazy load components for code splitting and better performance
const HeroLazy = lazy(() => import('../components/Hero/Hero'));
const ClinicalTrialsShowcaseLazy = lazy(() =>
  import('../components/ClinicalTrialsShowcase/ClinicalTrialsShowcase')
);
const InnovativeCareLazy = lazy(() =>
  import('../components/InnovativeCare/InnovativeCare')
);
const TestimonialsLazy = lazy(() =>
  import('../components/Testimonials/Testimonials')
);
const ClinicalTrialsAboutLazy = lazy(() =>
  import('../components/ClinicalTrialsAbout/ClinicalTrialsAbout')
);
const AboutSectionLazy = lazy(() =>
  import('../components/AboutSection/AboutSection')
);
const ClinicalTrialsLazy = lazy(() =>
  import('../components/ClinicalTrials/ClinicalTrials')
);
const HowItWorksLazy = lazy(() =>
  import('../components/HowItWorks/HowItWorks')
);
const VideoTestimonialsLazy = lazy(() =>
  import('../components/VideoTestimonials/VideoTestimonials')
);
const ResourcesLazy = lazy(() => import('../components/Resources/Resources'));
const GetInTouchLazy = lazy(() =>
  import('../components/GetInTouch/GetInTouch')
);
const LocationNetworkLazy = lazy(() =>
  import('../components/LocationNetwork/LocationNetwork')
);

const PageWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  @media (max-width: 1440px) {
    max-width: 100%;
  }
`;

const SectionWrapper = styled.section`
  width: 100%;
  position: relative;
`;

// Loading placeholder component
const ComponentLoader = styled.div`
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

// Memoized component metadata - only created once
const COMPONENT_METADATA = {
  'dynamic-zone.hero': {
    Component: HeroLazy,
    label: 'Survivor Stories',
    sectionId: 'survivor-stories',
  },
  'dynamic-zone.slider-section': {
    Component: ClinicalTrialsShowcaseLazy,
    label: 'Clinical Trials Slider',
    sectionId: 'clinical-trials-slider',
  },
  'dynamic-zone.about': {
    Component: AboutSectionLazy,
    label: 'About CancerFax',
    sectionId: 'about-cancerfax',
  },
  'dynamic-zone.therapy-section': {
    Component: InnovativeCareLazy,
    label: 'Innovative Care',
    sectionId: 'innovative-care',
  },
  'dynamic-zone.testimonial-slider': {
    Component: TestimonialsLazy,
    label: 'Testimonials',
    sectionId: 'patient-testimonials',
  },
  'dynamic-zone.statistics': {
    Component: ClinicalTrialsAboutLazy,
    label: 'Connecting You to Global Trials',
    sectionId: 'clinical-trials-about',
  },
  'dynamic-zone.trials-section': {
    Component: ClinicalTrialsLazy,
    label: 'Global Breakthroughs',
    sectionId: 'global-breakthroughs',
  },
  'dynamic-zone.get-in-touch': {
    Component: GetInTouchLazy,
    label: 'Get in Touch',
    sectionId: 'get-in-touch',
  },
  'dynamic-zone.location': {
    Component: LocationNetworkLazy,
    label: 'Location Network',
    sectionId: 'location-network',
    extraProps: { showButtons: true },
  },
  'dynamic-zone.testimonials': {
    Component: VideoTestimonialsLazy,
    label: 'Video Testimonials',
    sectionId: 'video-testimonials',
  },
  'dynamic-zone.how-it-works': {
    Component: HowItWorksLazy,
    label: 'How It Works',
    sectionId: 'how-it-works',
  },
  'dynamic-zone.resources': {
    Component: ResourcesLazy,
    label: 'Resources & Insights',
    sectionId: 'resources',
  },
  // Alternate keys for compatibility
  'dynamic-zone.video-testimonials': {
    Component: VideoTestimonialsLazy,
    label: 'Video Testimonials',
    sectionId: 'video-testimonials',
  },
  'dynamic-zone.clinical-trials-showcase': {
    Component: ClinicalTrialsShowcaseLazy,
    label: 'Clinical Trials Slider',
    sectionId: 'clinical-trials-slider',
  },
  'dynamic-zone.innovative-care': {
    Component: InnovativeCareLazy,
    label: 'Innovative Care',
    sectionId: 'innovative-care',
  },
};

// Memoized sanitize function
const sanitizeSectionId = (value) => {
  if (!value || typeof value !== 'string') {
    return undefined;
  }
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

const HomePage = () => {
  const dispatch = useDispatch();
  const globalData = useSelector((state) => state.global?.data);
  const globalLoading = useSelector((state) => state.global?.loading);

  // Fetch global Strapi data on mount - only if not already loaded
  useEffect(() => {
    const currentState = store.getState();
    const existingData = currentState?.global?.data;

    if (!existingData) {
      dispatch(fetchGlobalData());
    }
  }, [dispatch]);

  // Manual refresh mechanism (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const handleKeyPress = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
          e.preventDefault();
          dispatch(fetchGlobalData());
        }
      };

      window.refreshStrapiData = () => {
        dispatch(fetchGlobalData());
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
        delete window.refreshStrapiData;
      };
    }
  }, [dispatch]);

  const fallbackComponents = useMemo(
    () => (
      <>
        <Hero />
        <ClinicalTrialsShowcase />
        <AboutSection />
        <InnovativeCare />
        <Testimonials />
        <ClinicalTrialsAbout />
        <ClinicalTrials />
        <GetInTouch />
        <LocationNetwork showButtons={true} />
        <HowItWorks />
        <VideoTestimonials />
        <Resources />
      </>
    ),
    []
  );

  // Component mapping: Maps Strapi component types to React components
  const componentMap = {
    'dynamic-zone.hero': Hero,
    'dynamic-zone.slider-section': ClinicalTrialsShowcase,
    'dynamic-zone.about': AboutSection,
    'dynamic-zone.therapy-section': InnovativeCare,
    'dynamic-zone.testimonials': VideoTestimonials,
    'dynamic-zone.testimonial-slider': Testimonials,
    'dynamic-zone.trials-section': ClinicalTrials,
    'dynamic-zone.get-in-touch': GetInTouch,
    'dynamic-zone.location': LocationNetwork,
    'dynamic-zone.how-it-works': HowItWorks,
    'dynamic-zone.resources': Resources,
    // Additional mappings if component names differ
    'dynamic-zone.clinical-trials-showcase': ClinicalTrialsShowcase,
    'dynamic-zone.innovative-care': InnovativeCare,
    'dynamic-zone.video-testimonials': VideoTestimonials,
    'dynamic-zone.statistics': AboutSection, // Statistics might be part of AboutSection
  };
  
  // Components that don't have a Strapi mapping (render in default position if not in dynamic zone)
  const componentsWithoutStrapiMapping = [
    ClinicalTrialsAbout,
  ];

  // Render components dynamically based on Strapi dynamic zone order
  const renderDynamicComponents = useCallback(() => {
    if (!globalData || !globalData.dynamicZone || globalLoading) {
      // Fallback: render in default order if no dynamic zone data
      return (
        <>
          <Hero />
          <ClinicalTrialsShowcase />
          <AboutSection />
          <InnovativeCare />
          <Testimonials />
          <ClinicalTrialsAbout />
          <ClinicalTrials />
          <GetInTouch />
          <LocationNetwork showButtons={true} />
          <HowItWorks />
          <VideoTestimonials />
          <Resources />
        </>
      );
    }

    // Track which components from Strapi have been rendered
    const renderedComponents = new Set();
    
    // Render components in the order they appear in Strapi dynamic zone
    // Filter out Statistics section if needed (component type: 'dynamic-zone.statistics')
    const dynamicComponents = globalData.dynamicZone
      .filter((item, index) => {
        // Skip Statistics section (heading "About CancerFax") - remove if you want it back
        if (item.__component === 'dynamic-zone.statistics') {
          console.log('LandingPage: Skipping Statistics section at index', index);
          return false;
        }
        return true;
      })
      .map((item, index) => {
        const metadata = COMPONENT_METADATA[item.__component];

        if (!metadata) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Unknown component type: ${item.__component}`);
          }
          return null;
        }

        const { Component, extraProps, sectionId, label } = metadata;
        const safeSectionId = sanitizeSectionId(sectionId);

        const props = {
          componentData: item,
          pageData: globalData,
          sectionMeta: {
            id: sectionId,
            label,
          },
          ...(extraProps || {}),
        };

        return (
          <SectionWrapper
            key={`${safeSectionId || item.__component}-${item.id || index}`}
            id={safeSectionId}
            data-section-key={item.__component}
            data-section-label={label || undefined}
            className={`landing-section ${safeSectionId || ''}`.trim()}
          >
            <Suspense fallback={<ComponentLoader />}>
              <Component {...props} />
            </Suspense>
          </SectionWrapper>
        );
      })
      .filter(Boolean);

    return dynamicComponents.length > 0 ? dynamicComponents : fallbackComponents;
  }, [globalData, globalLoading, fallbackComponents]);

  // Memoize the rendered components
  const renderedComponents = useMemo(
    () => renderDynamicComponents(),
    [renderDynamicComponents]
  );

  const { pageData, pageLoading, pageError } = useSelector((state) => selectPageBySlug(state, 'home'));

  // Only fetch when not in cache and not loading/failed (cache-first; prevents loop when API is down)
  useEffect(() => {
    if (!pageData && !pageLoading && !pageError) {
      dispatch(fetchPageBySlug("home"));
    }
  }, [pageData, pageLoading, pageError, dispatch]);

  return (
    // <PageWrapper>
    //   <SEO />
    //   <Header />
    //   {renderedComponents}
    //   <Footer />
    // </PageWrapper>
    <DynamicComponents pageData={pageData} pageLoading={pageLoading} />
  );
};

export default HomePage;
