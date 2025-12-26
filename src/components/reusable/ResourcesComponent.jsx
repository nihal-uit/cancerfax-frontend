import styled from 'styled-components';
import { formatDate, formatMedia } from '../../utils/strapiHelpers';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';
import { Link, useNavigate } from 'react-router-dom';
import NameAvatar from './NameAvatar';

// ---- Blog Small Card ---- //
const BlogSmallCard = ({ blog, getMediaUrl, onNavigate }) => {
  return (
    <ScrollAnimationComponent animationVariants={fadeIn}>
      <SmallCard key={blog.id} onClick={onNavigate}>
        <SmallImage>
          <img src={getMediaUrl} alt={blog.title} />
          {
            blog.resource_category && (
              <CategoryBadge>
                {blog.resource_category?.name}
              </CategoryBadge>
            )
          }
        </SmallImage>

        <SmallCardContent>
          <AuthorInfo>
            <AuthorAvatar>
              <NameAvatar src={formatMedia(blog.author?.profilePicture)} name={blog?.author?.firstName} size={24} />
              {/* <img src={formatMedia(blog.author?.profilePicture)} alt={blog?.author?.firstName} /> */}
            </AuthorAvatar>
            <AuthorName>{blog?.author?.firstName || ''} {blog?.author?.lastName || ''}</AuthorName>
          </AuthorInfo>

          <SmallCardTitle>{blog.title}</SmallCardTitle>

          <BlogMeta>
            {formatDate(blog.publishedDate)}
            {blog.readTime && ` | ${blog.readTime} min read`}
          </BlogMeta>
        </SmallCardContent>
      </SmallCard>
    </ScrollAnimationComponent>
  );
};

// ---- Featured Blog Card ---- //
const FeaturedBlogCard = ({ blog, getMediaUrl, onNavigate }) => {
  return (
    <FeaturedCard onClick={onNavigate}>
      <FeaturedImage>
        <img src={getMediaUrl} alt='blog image' />
        {
          blog.resource_category && (
            <CategoryBadge className='lg-badge'>
              {blog.resource_category?.name}
            </CategoryBadge>
          )
        }
      </FeaturedImage>

      <FeaturedContentCard>
        <AuthorInfo>
          <AuthorAvatar>
            <NameAvatar src={formatMedia(blog.author?.profilePicture)} name={blog?.author?.firstName} size={24} />
            {/* <img src={formatMedia(blog.author?.profilePicture)} alt={blog?.author?.firstName} /> */}
          </AuthorAvatar>
          <AuthorName>{blog?.author?.firstName || ''} {blog?.author?.lastName || ''}</AuthorName>
        </AuthorInfo>

        <BlogTitle>{blog.title}</BlogTitle>

        <BlogMeta>
          {formatDate(blog.publishedDate)}
          {blog.readTime && ` | ${blog.readTime} min read`}
        </BlogMeta>
      </FeaturedContentCard>
    </FeaturedCard>
  );
};

const ResourcesComponent = ({ data }) => {
  const navigate = useNavigate();
    
  const resources = data?.resources || [];
  const featuredBlog = resources[0] || null;
  const smallBlogs = resources.slice(1) || [];

  const handleNavigate = (blog) => {
    if (!blog || !blog.slug) return;
    // Generate proper URL with category/subcategory if available
    const categorySlug = blog?.resource_category?.slug || blog?.resource_category?.attributes?.slug || '';
    const slug = blog.slug;
    if (categorySlug) {
      navigate(`/resource/${categorySlug}/${slug}`);
    } else {
      navigate(`/resource/${slug}`);
    }
  };

  return (
    <ScrollAnimationComponent animationVariants={fadeIn}>
      <HeaderSection className='commContent_wrap'>
        <HeaderContent>
          <Label className='contentLabel'>
            {data?.heading || ''}
          </Label>

          <Title className='title-3'>
            {data?.subHeading || ''}
          </Title>
        </HeaderContent>

        <Link
          className='btn btn-pink-solid'
          to={data?.cta?.URL || '#'}
          target={data?.cta?.target || '_blank'}
        >
          {data?.cta?.text || ''}
        </Link>
      </HeaderSection>

      <BlogsGrid>
        {/* Featured Large Card */}
        {featuredBlog && (
          <FeaturedBlogCard
            blog={featuredBlog}
            getMediaUrl={formatMedia(featuredBlog?.featuredImage)}
            onNavigate={() => handleNavigate(featuredBlog)}
          />
        )}

        {/* Small Cards */}
        <SmallCardsColumn $hasManyItems={smallBlogs.length > 5}>
          {smallBlogs.length > 0
            ? smallBlogs.map((blog) => (
                <BlogSmallCard
                  key={blog?.id || blog.slug || blog.title}
                  blog={blog}
                  getMediaUrl={formatMedia(blog?.featuredImage)}
                  onNavigate={() => handleNavigate(blog)}
                />
              ))
            : null}
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
  max-height: ${(props) => (props.$hasManyItems ? '800px' : 'auto')};
  overflow-y: ${(props) => (props.$hasManyItems ? 'auto' : 'visible')};

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
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #36454f;
  margin: 0;
`;

const BlogTitle = styled.h5`
  font-family: 'Be Vietnam Pro', sans-serif;
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
  font-family: 'Be Vietnam Pro', sans-serif;
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
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #8c8282;
  margin: 0;
  white-space: nowrap;
`;

export default ResourcesComponent;
