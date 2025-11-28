import React, { useMemo } from "react";
import styled from "styled-components";
import { getMediaUrl } from "../../services/api";
import { formatDate } from "../../utils/strapiHelpers";
import ScrollAnimationComponent from "../../components/ScrollAnimation/ScrollAnimationComponent";

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100";

const fallbackBlogs = [
  {
    id: 1,
    title:
      "Atezolizumab Plus Chemotherapy Improves Survival in Advanced-Stage Small-Cell Lung Cancer: Insights from the IMpower133 Study",
    author: { name: "Author name goes here", avatar: null },
    publishedAt: "May 27, 2024",
    readTime: "7",
    category: "Research",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    featured: true,
  },
  {
    id: 2,
    title:
      "Darolutamide is approved by the USFDA for metastatic castration-sensitive prostate cancer",
    author: { name: "Author name goes here", avatar: null },
    publishedAt: "May 27, 2024",
    readTime: "7",
    category: "Research",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400",
  },
  {
    id: 3,
    title:
      "Taletrectinib is approved by the USFDA for ROS1-positive non-small cell lung cancer",
    author: { name: "Author name goes here", avatar: null },
    publishedAt: "May 27, 2024",
    readTime: "7",
    category: "Research",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400",
  },
  {
    id: 4,
    title:
      "Neoadjuvant and adjuvant pembrolizumab is approved by the USFDA for resectable locally adv...",
    author: { name: "Author name goes here", avatar: null },
    publishedAt: "May 27, 2024",
    readTime: "7",
    category: "Research",
    image:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400",
  },
];

const fallbackSection = {
  label: "RESOURCES",
  title: "Explore the Latest Insights in Cancer Research",
  viewAllButtonText: "View all Insights",
  viewAllButtonUrl: "/blog",
};

const buildAuthorName = (author) => {
  if (!author) return "Author";
  return [author.firstName, author.lastName].filter(Boolean).join(" ");
};

const buildImageUrl = (img, getMediaUrl) => {
  if (!img) return null;
  return img?.url ? getMediaUrl(img) : img;
};

// ---- Blog Small Card ---- //
const BlogSmallCard = ({ blog, getMediaUrl }) => {
  const img = buildImageUrl(blog.image, getMediaUrl);
  const avatar = buildImageUrl(blog.author?.avatar, getMediaUrl);
  const authorName = buildAuthorName(blog.author);

  return (
    <ScrollAnimationComponent animationVariants={fadeIn}>
      <SmallCard key={blog.id}>
        <SmallImage>
          <img src={img} alt={blog.title} />
          <CategoryBadge>{blog.category ? blog.category : 'Research'}</CategoryBadge>
        </SmallImage>

        <SmallCardContent>
          <AuthorInfo>
            <AuthorAvatar>
              <img src={avatar || DEFAULT_AVATAR} alt={authorName} />
            </AuthorAvatar>
            <AuthorName>{authorName ? authorName : 'Author'}</AuthorName>
          </AuthorInfo>

          <SmallCardTitle>{blog.title}</SmallCardTitle>

          <BlogMeta>
            {formatDate(blog.publishedAt)}
            {blog.readTime && ` | ${blog.readTime} min read`}
          </BlogMeta>
        </SmallCardContent>
      </SmallCard>
    </ScrollAnimationComponent>
  );
};

// ---- Featured Blog Card ---- //
const FeaturedBlogCard = ({ blog, getMediaUrl }) => {
  const img = buildImageUrl(blog.image, getMediaUrl);
  const avatar = buildImageUrl(blog.author?.avatar, getMediaUrl);
  const authorName = buildAuthorName(blog.author);

  return (
    <FeaturedCard>
      <FeaturedImage>
        <img src={img ? img : fallbackBlogs[0].image} alt='blog image' />
          <CategoryBadge className="lg-badge">{blog.category ? blog.category : 'Research'}</CategoryBadge>
      </FeaturedImage>

      <FeaturedContentCard>
        <AuthorInfo>
          <AuthorAvatar>
            <img src={avatar || DEFAULT_AVATAR} alt={authorName} />
          </AuthorAvatar>
          <AuthorName>{authorName}</AuthorName>
        </AuthorInfo>

        <BlogTitle>{blog.title}</BlogTitle>

        <BlogMeta>
          {formatDate(blog.publishedAt)}
          {blog.readTime && ` | ${blog.readTime} min read`}
        </BlogMeta>
      </FeaturedContentCard>
    </FeaturedCard>
  );
};

const ResourcesComponent = ({ componentData, loading }) => {
  const section = useMemo(() => {
    const data = componentData || {};
    return {
      label: data.heading || fallbackSection.label,
      title: data.subHeading || fallbackSection.title,

      viewAllButtonText:
        data.cta?.text || fallbackSection.viewAllButtonText,
      viewAllButtonUrl:
        data.cta?.URL || fallbackSection.viewAllButtonUrl,
      viewAllButtonTarget:
        data.cta?.target || "_self",

      resources:
        (Array.isArray(data.resources) && data.resources.length > 0)
          ? data.resources
          : fallbackBlogs,
    };
  }, [componentData]);


  // Always guaranteed to have at least fallback data
  const resources = section.resources;
  const featuredBlog = resources[0] || fallbackBlogs[0];
  const smallBlogs = resources.slice(1);


  return (
    <ScrollAnimationComponent animationVariants={fadeIn}>
      <HeaderSection className="commContent_wrap">
        <HeaderContent>
          <Label className="contentLabel">
            {section.label || fallbackSection.label}
          </Label>

          <Title className="title-3">
            {section.title || fallbackSection.title}
          </Title>
        </HeaderContent>

        <ViewAllButton
          className="btn btn-pink-solid"
          href={section.viewAllButtonUrl || fallbackSection.viewAllButtonUrl}
          target={section.viewAllButtonTarget || "_self"}
        >
          {section.viewAllButtonText || fallbackSection.viewAllButtonText}
        </ViewAllButton>
      </HeaderSection>


      <BlogsGrid>
        {/* Featured Large Card */}
        {featuredBlog && (
          <FeaturedBlogCard blog={featuredBlog} getMediaUrl={getMediaUrl} />
        )}

        {/* Small Cards */}
        <SmallCardsColumn $hasManyItems={smallBlogs.length > 5}>
          {smallBlogs.length > 0
            ? smallBlogs.map((blog) => (
                <BlogSmallCard
                  key={blog?.id || blog.title}  
                  blog={blog}
                  getMediaUrl={getMediaUrl}
                />
              ))
            : fallbackBlogs.slice(1).map((blog) => (
                <BlogSmallCard
                  key={blog.id}
                  blog={blog}
                  getMediaUrl={getMediaUrl}
                />
              ))}
        </SmallCardsColumn>
      </BlogsGrid>
    </ScrollAnimationComponent>
  );
};


const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 60px;
  gap: 40px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 40px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 600px;

  @media (max-width: 768px) {
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 16px;
    max-width: 100%;
  }
`;

const Label = styled.p`
  color: #36454f;
`;

const Title = styled.h3`
  color: #36454f;
`;

const ViewAllButton = styled.a``;

const BlogsGrid = styled.div`
  display: grid;
  grid-template-columns: 523px 1fr;
  gap: 38px;
  width: 100%;

  /* Dynamic: Works with any number of items, preserves all styles */
  grid-auto-rows: min-content;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: 420px 1fr;
    gap: 24px;
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FeaturedCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 42px;
  transition: all 0.3s ease;
  cursor: pointer;
  height: fit-content;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  @media (max-width: 768px) {
    gap: 32px;
  }

  @media (max-width: 480px) {
    gap: 24px;
  }
`;

const FeaturedImage = styled.div`
  width: 100%;
  height: 328px;
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

const SmallCardsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;

  /* Dynamic: Scrollable if many items, preserves all styles */
  max-height: ${(props) => (props.$hasManyItems ? "800px" : "auto")};
  overflow-y: ${(props) => (props.$hasManyItems ? "auto" : "visible")};

  /* Preserve scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;

    &:hover {
      background: #555;
    }
  }
  
  @media (max-width: 1024px) {
    gap: 24px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const SmallCard = styled.article`
  display: grid;
  grid-template-columns: 272px 1fr;
  gap: 28px;
  border-radius: 20px;
  padding: 0;
  transition: all 0.3s ease;
  cursor: pointer;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  @media (max-width: 1200px) {
    grid-template-columns: 222px 1fr;
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 180px 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
    align-items: flex-start;
  }
`;

const SmallImage = styled.div`
  width: 100%;
  height: 164px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  @media (hover: hover) {
    ${SmallCard}:hover & img {
      transform: scale(1.05);
    }
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
  &.lg-badge {
    font-size: 16px;
    height: 28px;
    padding: 4px 14px;
    line-height: 16px;
  }

  @media (max-width: 768px) {
    padding: 6px 14px;
    font-size: 11px;
    top: 10px;
    right: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px 12px;
    font-size: 10px;
    top: 8px;
    right: 8px;
    border-radius: 16px;
  }
`;

const FeaturedContentCard = styled.div`
  background: transparent;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const SmallCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 768px) {
    gap: 14px;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AuthorAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #e5e7eb;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorName = styled.p`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #36454f;
  margin: 0;
`;

const BlogTitle = styled.h5`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 24px;
  font-weight: 400;
  color: #36454f;
  line-height: 35px;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 1.3;
  }
`;

const SmallCardTitle = styled.h3`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #36454f;
  line-height: 29px;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 16px;
    -webkit-line-clamp: 2;
    line-height: 1.3;
  }
`;

const BlogMeta = styled.p`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #8c8282;
  margin: 0;
  white-space: nowrap;
`;

export default ResourcesComponent;
