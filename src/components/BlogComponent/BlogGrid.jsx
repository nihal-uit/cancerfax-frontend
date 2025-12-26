import React, { useRef, useEffect, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";
import { formatDate } from "../../utils/strapiHelpers";
import { useLoadMore } from "../../utils/useLoadMore";
import SkeletonBlogCard from "../reusable/SkeletonBlogCard";
import { getMediaUrl } from "../../services/api";


const BlogGrid = ({ data, loading }) => {
  const navigate = useNavigate();
  const { category: urlCategory, subcategory: urlSubcategory } = useParams();
  const location = useLocation();

  // Helper function to generate resource URL
  const getResourceUrl = (blog) => {
    // Extract slug - handle both Strapi v4 structure and flattened structure
    const slug = blog?.slug || blog?.attributes?.slug || '';
    
    if (!slug) {
      console.warn('Blog missing slug:', blog);
      return '/resources';
    }
    
    // Handle different Strapi data structures for category
    const category = blog?.resource_category?.data?.attributes || 
                     blog?.resource_category?.data ||
                     blog?.resource_category?.attributes || 
                     blog?.resource_category;
    
    // Handle different Strapi data structures for subcategory
    const subcategory = blog?.resource_subcategory?.data?.attributes || 
                        blog?.resource_subcategory?.data ||
                        blog?.resource_subcategory?.attributes || 
                        blog?.resource_subcategory;

    // Extract category/subcategory slugs from blog data
    const categorySlug = category?.slug || category?.attributes?.slug || '';
    const subcategorySlug = subcategory?.slug || subcategory?.attributes?.slug || '';

    // Use category from blog data, or fallback to URL params (when on dynamic page like /resources/approvals)
    // URL params take precedence when blog data doesn't have category info
    const finalCategorySlug = categorySlug || urlCategory || '';
    const finalSubcategorySlug = subcategorySlug || urlSubcategory || '';

    // Has both category and subcategory
    if (finalCategorySlug && finalSubcategorySlug) {
      return `/resource/${finalCategorySlug}/${finalSubcategorySlug}/${slug}`;
    }

    // Only category (no subcategory)
    if (finalCategorySlug) {
      return `/resource/${finalCategorySlug}/${slug}`;
    }

    // No category (uncategorized)
    return `/resource/${slug}`;
  };

  const blogContent = useMemo(() => {
    return data?.length > 0
      ? data.map((blog) => {
          // Handle both Strapi v4 structure and flattened structure
          const blogData = blog?.attributes || blog;
          
          return {
            id: blog?.documentId || blog?.id,
            slug: blogData?.slug || blog?.slug || '',
            title: blogData?.title || blog?.title || '',
            description: blogData?.description || blog?.description || '',
            author: {
              name: `${blogData?.author?.firstName || blog?.author?.firstName || ''} ${
                blogData?.author?.lastName || blog?.author?.lastName || ""
              }`.trim(),
              avatar: getMediaUrl(blogData?.author?.profilePicture || blog?.author?.profilePicture) || null,
            },
            publishedDate: formatDate(blogData?.publishedDate || blog?.publishedDate),
            readTime: blogData?.readTime || blog?.readTime,
            category: blogData?.resource_category?.name || blog?.resource_category?.name || '',
            image: blogData?.featuredImage || blog?.featuredImage || '',
            url: getResourceUrl(blog),
          };
        })
      : [];
  }, [data, urlCategory, urlSubcategory]);

  const { visibleItems, loadMore, hasMore, isLoadingMore } = useLoadMore(
    blogContent,
    6,
    3
  );

  const loaderRef = useRef(null);

  //INFINITE SCROLL
  // useEffect(() => {
  //   if (!loaderRef.current) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && hasMore) {
  //         loadMore();
  //       }
  //     },
  //     { threshold: 1.0 }
  //   );

  //   observer.observe(loaderRef.current);

  //   return () => observer.disconnect();
  // }, [hasMore]);

  if (loading) {
    return (
      <Grid>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonBlogCard key={i} />
        ))}
      </Grid>
    );
  }

  return (
    <>
      <Grid>
        {visibleItems.map((blog) => (
          <ScrollAnimationComponent key={blog.id} animationVariants={fadeIn}>
            <BlogCard as="div" onClick={() => navigate(blog.url || `/resource/${blog.slug}`)}>
              <BlogImage>
                <img src={blog.image} alt={blog.title} />
                {blog.category && (
                  <CategoryBadge className="lg-badge">
                    {blog.category}
                  </CategoryBadge>
                )}
              </BlogImage>

              <BlogMeta>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M7.23294 4.66664C7.23294 4.37669 6.99789 4.14164 6.70794 4.14164C6.41799 4.14164 6.18294 4.37669 6.18294 4.66664V7.29164C6.18294 7.51049 6.31869 7.70638 6.5236 7.78322L8.85694 8.65822C9.12843 8.76002 9.43104 8.62247 9.53285 8.35098C9.63466 8.07949 9.4971 7.77688 9.22562 7.67507L7.23294 6.92782V4.66664Z"
                    fill="#36454F"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.99961 1.22498C3.81016 1.22498 1.22461 3.81053 1.22461 6.99998C1.22461 10.1894 3.81016 12.775 6.99961 12.775C10.1891 12.775 12.7746 10.1894 12.7746 6.99998C12.7746 3.81053 10.1891 1.22498 6.99961 1.22498ZM2.27461 6.99998C2.27461 4.39043 4.39006 2.27498 6.99961 2.27498C9.60916 2.27498 11.7246 4.39043 11.7246 6.99998C11.7246 9.60952 9.60916 11.725 6.99961 11.725C4.39006 11.725 2.27461 9.60952 2.27461 6.99998Z"
                    fill="#36454F"
                  />
                </svg>
                {blog.readTime} min read
              </BlogMeta>

              <BlogContent>
                <div>
                  <BlogTitle>{blog.title}</BlogTitle>
                  <BlogDescription>{blog.description}</BlogDescription>
                </div>
                <AuthorInfo>
                  <AuthorAvatar>
                    {blog.author.avatar ? (
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name || "Author"}
                      />
                    ) : (
                      <InitialDisplay>
                        {blog.author.name && blog.author.name.trim().length > 0
                          ? blog.author.name.trim().charAt(0).toUpperCase()
                          : "?"}
                      </InitialDisplay>
                    )}
                  </AuthorAvatar>
                  <div>
                    <AuthorName>{blog.author.name}</AuthorName>
                    <PostDate>{blog.publishedDate}</PostDate>
                  </div>
                </AuthorInfo>
              </BlogContent>
            </BlogCard>
          </ScrollAnimationComponent>
        ))}
      </Grid>

      {/* Invisible div for infinite-scroll trigger */}
      <div ref={loaderRef} style={{ height: "1px" }} />

      {hasMore && (
        <LoadMoreWrapper>
          <button
            className="load-more-btn"
            onClick={loadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </button>
        </LoadMoreWrapper>
      )}
    </>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 1200px) {
    gap: 24px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const BlogCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  justify-content: space-around;
  background: #fff;
  border-radius: 20px;
  padding: 20px 16px;
`;

const BlogImage = styled.div`
  width: 100%;
  height: 220px;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 10px;
  background: rgba(255, 105, 180, 1);
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  z-index: 2;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const BlogContent = styled.div`
  background: transparent;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AuthorAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #e5e7eb;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InitialDisplay = styled.span`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #36454f;
`;

const AuthorName = styled.p`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  color: #36454f;
  margin: 0;
`;

const BlogTitle = styled.h5`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #36454f;
  line-height: 27px;
  margin: 0 0 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 25px;
  }
`;

const BlogDescription = styled.p`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #36454f;
  line-height: 22px;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const BlogMeta = styled.div`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #36454f;
  white-space: nowrap;
  opacity: 0.5;
  display: flex;
  gap: 6px;
  align-items: center;
`;
const PostDate = styled.span`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #36454f;
  white-space: nowrap;
  opacity: 0.5;
`;

const LoadMoreWrapper = styled.div`
  text-align: center;
  margin-top: 40px;

  .load-more-btn {
    background: #36454f;
    color: #fff;
    padding: 14px 30px;
    border-radius: 8px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: 0.25s ease;

    &:hover {
      background: #000;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;


const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default BlogGrid;
