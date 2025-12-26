import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BlogDetailsHero from '../components/BlogDetailsHero/BlogDetailsHero';
import BlogDetailsInfo from '../components/BlogDetailsInfo/BlogDetailsInfo';
import SupportingLifeComponent from '../components/reusable/SupportingLifeComponent';
import RelatedBlogComponent from '../components/reusable/RelatedBlogComponent';
import { fetchBlogBySlug, fetchBlogs } from '../store/slices/resourcesSlice';
import { fetchGlobalData } from '../store/slices/globalSlice';
import { formatRichText, formatMedia } from '../utils/strapiHelpers';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import DynamicComponents from './DynamicComponents';
import NotFound from './NotFound';

// Helper function to generate resource URL
// Pattern: /resource/:category/:subcategory?/:slug
function getResourceUrl(resource) {
  if (!resource || !resource.attributes) return null;
  
  const slug = resource.attributes.slug;
  const category = resource.attributes.resource_category?.data;
  const subcategory = resource.attributes.resource_subcategory?.data;

  // Has both category and subcategory
  // Pattern: /resource/:category/:subcategory/:slug
  if (category && subcategory) {
    const categorySlug = category.attributes?.slug || category.slug;
    const subcategorySlug = subcategory.attributes?.slug || subcategory.slug;
    if (categorySlug && subcategorySlug) {
      return `/resource/${categorySlug}/${subcategorySlug}/${slug}`;
    }
  }

  // Only category (no subcategory)
  // Pattern: /resource/:category/:slug
  if (category) {
    const categorySlug = category.attributes?.slug || category.slug;
    if (categorySlug) {
      return `/resource/${categorySlug}/${slug}`;
    }
  }

  // No category (uncategorized)
  // Pattern: /resource/:slug
  return `/resource/${slug}`;
}

const BlogDetails = () => {
  const { category, subcategory, slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: globalData, loading: globalLoading } = useSelector(
    (state) => state.global
  );
  const { singleBlog, loading } = useSelector((state) => state.resources);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    // Always fetch resource when BlogDetails component mounts
    // Routes are now separated: /resource/* for details, /resources/* for listings
    fetchResource();
  }, [category, subcategory, slug, dispatch]);

  const fetchResource = async () => {
    try {
      // Determine actual resource slug from URL params
      // URL patterns:
      // /resource/:slug (uncategorized)
      // /resource/:category/:slug (category only)
      // /resource/:category/:subcategory/:slug (category + subcategory)
      const resourceSlug = slug || subcategory || category;

      if (!resourceSlug) {
        navigate('/404');
        return;
      }
      
      // Fetch resource by slug
      dispatch(fetchBlogBySlug(resourceSlug));
      dispatch(fetchBlogs({ limit: 3, start: 0 }));
    } catch (error) {
      console.error('Error fetching resource:', error);
      navigate('/404');
    }
  };

  // Check if URL needs to be corrected after resource is loaded
  useEffect(() => {
    if (singleBlog) {
      // Handle both array and object responses
      const blog = Array.isArray(singleBlog) ? singleBlog[0] : singleBlog;
      
      if (!blog) {
        navigate('/404');
        return;
      }

      // Check if blog has attributes (Strapi structure)
      const blogData = blog.attributes || blog;
      const correctUrl = getResourceUrl({ attributes: blogData });
      const currentUrl = window.location.pathname;

      if (correctUrl && correctUrl !== currentUrl) {
        navigate(correctUrl, { replace: true });
        return;
      }
    }
  }, [singleBlog, navigate]);

  if (globalLoading || loading || !singleBlog) {
    return <LoadingSpinner />
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
      }
    : null;

  return (
    <PageContainer>
      <Header darkText={true}/>
      <BlogDetailsHero data={blogData} loading={loading} />
      <BlogDetailsInfo data={blogData} loading={loading} />
      { blogData?.related_posts?.length > 0 &&
        <section className='relatedBlog_sec bg_light_blue py-120'>
        <div className='containerWrapper' style={{overflow: 'hidden'}}>
            <RelatedBlogComponent data={blogData?.related_posts} />
        </div>
      </section>
      }
      <section className='supporting_life_sec py-120'>
        <div className='containerWrapper'>
          <SupportingLifeComponent
            supportContent={supportContent}
            loading={loading}
          />
        </div>
      </section>
      <DynamicComponents pageData={blogData} pageLoading={loading} showFooter={false} showHeader={false} />
      <Footer />
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

export default BlogDetails;
