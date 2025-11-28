import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BlogDetailsHero from '../components/BlogDetailsHero/BlogDetailsHero';
import BlogDetailsInfo from '../components/BlogDetailsInfo/BlogDetailsInfo';
import SupportingLifeComponent from '../components/reusable/SupportingLifeComponent';
import RelatedBlogComponent from '../components/reusable/RelatedBlogComponent';
import { fetchBlogById, fetchBlogs } from '../store/slices/resourcesSlice';
import { fetchGlobalData } from '../store/slices/globalSlice';
import { formatRichText, formatMedia } from '../utils/strapiHelpers';

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: globalData, loading: globalLoading } = useSelector(
    (state) => state.global
  );
  const { singleBlog, loading } = useSelector((state) => state.resources);
  const blogList = useSelector((state) => state.resources.blogs);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchBlogById(id));
    dispatch(fetchBlogs({ limit: 3, start: 0 }));
  }, [id, dispatch]);

  if (globalLoading || loading || !singleBlog) {
    return <div>Loading...</div>;
  }

  const supportContent = singleBlog?.expert
    ? {
        label: singleBlog?.expert?.heading,
        title: singleBlog?.expert?.subHeading,
        description: formatRichText(singleBlog?.expert?.description),
        buttonText: singleBlog?.expert?.cta?.text,
        buttonLink: singleBlog?.expert?.cta?.URL,
        buttonTarget: singleBlog?.expert?.cta?.target,
        image: formatMedia(singleBlog?.expert?.media),
      }
    : null;

  return (
    <PageContainer>
      <Header />
      <BlogDetailsHero data={singleBlog} loading={loading} />
      <BlogDetailsInfo data={singleBlog} loading={loading} />
      <section className='relatedBlog_sec bg_light_blue py-120'>
        <div className='containerWrapper' style={{ overflow: 'hidden' }}>
          <RelatedBlogComponent data={blogList} />
        </div>
      </section>
      <section className='supporting_life_sec py-120'>
        <div className='containerWrapper'>
          <SupportingLifeComponent
            supportContent={supportContent}
            loading={loading}
          />
        </div>
      </section>
      <Footer />
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

export default BlogDetails;
