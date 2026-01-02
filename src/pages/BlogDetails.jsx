import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BlogDetailsHero from '../components/BlogDetailsHero/BlogDetailsHero';
import BlogDetailsInfo from '../components/BlogDetailsInfo/BlogDetailsInfo';
import SupportingLifeComponent from '../components/reusable/SupportingLifeComponent';
import RelatedBlogComponent from '../components/reusable/RelatedBlogComponent';
import {
  fetchBlogById,
  fetchBlogBySlug,
  fetchBlogs,
} from '../store/slices/resourcesSlice';
import { fetchGlobalData } from '../store/slices/globalSlice';
import { formatRichText, formatMedia } from '../utils/strapiHelpers';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import DynamicComponents from './DynamicComponents';
import NotFound from './NotFound';

const BlogDetails = () => {
  // category and subcategory are URL params for routing structure, but slug is the permanent identifier
  // eslint-disable-next-line no-unused-vars
  const { category, subcategory, slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { data: globalData, loading: globalLoading } = useSelector(
    (state) => state.global
  );
  const { singleBlog, loading, blogs, error } = useSelector(
    (state) => state.resources
  );
  const hasFetchedRef = useRef(false);
  const currentDocumentIdRef = useRef(null);
  const prevLoadingRef = useRef(false);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll to top when data finishes loading
  useEffect(() => {
    if (prevLoadingRef.current && !loading && !globalLoading && singleBlog) {
      window.scrollTo(0, 0);
    }
    prevLoadingRef.current = loading || globalLoading;
  }, [loading, globalLoading, singleBlog]);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    // Always fetch resource when BlogDetails component mounts or URL params change
    // Routes are now separated: /resource/* for details, /resources/* for listings
    // slug is always the last parameter and is the permanent identifier for the resource
    // category and subcategory are just for URL structure
    const fetchResource = async () => {
      try {
        // slug is always the last parameter in the URL and is the permanent identifier
        if (!slug) {
          console.error('No slug found in URL params');
          navigate('/404');
          return;
        }

        // Get documentId from location state (passed when navigating from grid)
        let documentId = location.state?.documentId;

        // If documentId not in state, try to find it from blogs list using slug
        if (!documentId && blogs && blogs.length > 0) {
          const foundBlog = blogs.find((blog) => {
            const blogSlug = blog?.attributes?.slug || blog?.slug;
            return blogSlug === slug;
          });
          documentId = foundBlog?.documentId || foundBlog?.id;
        }

        // Check if we already have the correct blog loaded for this slug
        if (singleBlog) {
          const blog = Array.isArray(singleBlog) ? singleBlog[0] : singleBlog;
          const blogData = blog?.attributes || blog;
          const blogSlug = blogData?.slug;
          const blogDocumentId = blog?.documentId || blog?.id;

          if (blogSlug === slug) {
            // We already have the correct blog loaded
            // Update the ref to prevent re-fetching
            const currentKey = `${slug}-${blogDocumentId || 'loaded'}`;
            currentDocumentIdRef.current = currentKey;
            hasFetchedRef.current = true;
            return;
          }
        }

        // If still no documentId, fetch by slug first to get documentId
        // This happens when user directly accesses the URL or refreshes the page
        if (!documentId) {
          try {
            // Fetch by slug - this already returns the full blog data
            const slugResponse = await dispatch(fetchBlogBySlug(slug)).unwrap();

            // Check if response is empty or not found
            if (
              !slugResponse ||
              (Array.isArray(slugResponse) && slugResponse.length === 0)
            ) {
              console.error('Resource not found for slug:', slug);
              navigate('/404');
              return;
            }

            const blogFromSlug = Array.isArray(slugResponse)
              ? slugResponse[0]
              : slugResponse;
            documentId = blogFromSlug?.documentId || blogFromSlug?.id;

            if (!documentId) {
              console.error('Could not find documentId after fetching by slug');
              navigate('/404');
              return;
            }

            // We already have the blog data from fetchBlogBySlug, so we don't need to fetch again
            // Just mark as fetched and return
            const currentKey = `${slug}-${documentId}`;
            currentDocumentIdRef.current = currentKey;
            hasFetchedRef.current = true;

            // Only fetch related blogs if not already loaded
            if (blogs.length === 0) {
              dispatch(fetchBlogs({ limit: 3, start: 0 }));
            }
            return;
          } catch (error) {
            console.error('Error fetching by slug:', error);
            navigate('/404');
            return;
          }
        }

        // Only fetch if documentId has changed or hasn't been fetched yet
        const currentKey = `${slug}-${documentId}`;
        if (
          currentDocumentIdRef.current === currentKey &&
          hasFetchedRef.current
        ) {
          return;
        }

        currentDocumentIdRef.current = currentKey;
        hasFetchedRef.current = true;

        // Fetch resource by documentId using the API: /api/resources/{documentId}?populate=*
        dispatch(fetchBlogById(documentId));
        // Only fetch related blogs if not already loaded (to avoid infinite loop)
        if (blogs.length === 0) {
          dispatch(fetchBlogs({ limit: 3, start: 0 }));
        }
      } catch (error) {
        console.error('Error fetching resource:', error);
        navigate('/404');
      }
    };

    // Reset fetch flag only when slug actually changes (new resource)
    const currentSlug = slug;
    const previousKey = currentDocumentIdRef.current;
    if (previousKey && !previousKey.startsWith(`${currentSlug}-`)) {
      // Slug has changed, reset flags
      hasFetchedRef.current = false;
      currentDocumentIdRef.current = null;
    }

    fetchResource();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, dispatch, location.state, navigate]);

  // Show 404 if there's an error or if loading is complete but no blog found
  if (error || (!loading && !singleBlog)) {
    return (
      <PageContainer>
        <Header darkText={true} />
        <NotFound />
        <Footer />
      </PageContainer>
    );
  }

  if (globalLoading || loading || !singleBlog) {
    return <LoadingSpinner />;
  }

  // Handle both array and object responses
  const blog = Array.isArray(singleBlog) ? singleBlog[0] : singleBlog;

  if (!blog) {
    return (
      <PageContainer>
        <Header darkText={true} />
        <NotFound />
        <Footer />
      </PageContainer>
    );
  }

  // Get blog data (handle Strapi structure)
  const blogData = blog.attributes || blog;

  const supportContent = blogData?.expert
    ? {
        label: blogData?.expert?.heading,
        title: blogData?.expert?.subHeading,
        description: formatRichText(blogData?.expert?.description_text),
        buttonText: blogData?.expert?.cta?.text,
        buttonLink: blogData?.expert?.cta?.URL,
        buttonTarget: blogData?.expert?.cta?.target,
        image: formatMedia(blogData?.expert?.media),
        darkText: blogData?.gradient_shadow ? true : false,
      }
    : null;

  return (
    <PageContainer>
      <Header darkText={blogData?.gradient_shadow} />
      <BlogDetailsHero data={blogData} loading={loading} />
      <BlogDetailsInfo data={blogData} loading={loading} />
      {blogData?.related_posts?.length > 0 && (
        <section className='relatedBlog_sec bg_light_blue py-120'>
          <div className='containerWrapper' style={{ overflow: 'hidden' }}>
            <RelatedBlogComponent data={blogData?.related_posts} />
          </div>
        </section>
      )}
      <section className='supporting_life_sec py-120'>
        <div className='containerWrapper'>
          <SupportingLifeComponent
            supportContent={supportContent}
            loading={loading}
          />
        </div>
      </section>
      <DynamicComponents
        pageData={blogData}
        pageLoading={loading}
        showFooter={false}
        showHeader={false}
      />
      <Footer />
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

export default BlogDetails;
