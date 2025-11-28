import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ScrollAnimationComponent from '../ScrollAnimation/ScrollAnimationComponent';
import { formatDate } from '../../utils/strapiHelpers';

const BlogGrid = ({ data, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return null;
  }


  const defaultBlog = [
    {
      id: 1,
      title: 'Atezolizumab Plus Chemotherapy Improves Survival in Advanced-Stage Small-Cell Lung Cancer: Insights from the IMpower133 Study',
      description: 'At CancerFax, we’re transforming the way patients discover and receive life-saving therapies...',
      author: { name: 'Author name goes here', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
      publishedAt: 'May 27, 2024',
      readTime: '7 min read',
      category: 'Research',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
      featured: true
    },
    {
      id: 2,
      title: 'Darolutamide is approved by the USFDA for metastatic castration-sensitive prostate cancer',
      description: 'At CancerFax, we’re transforming the way patients discover and receive life-saving therapies...',
      author: { name: 'Author name goes here', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
      publishedAt: 'May 27, 2024',
      readTime: '7 min read',
      category: 'Research',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400'
    },
    {
      id: 3,
      title: 'Taletrectinib is approved by the USFDA for ROS1-positive non-small cell lung cancer',
      description: 'At CancerFax, we’re transforming the way patients discover and receive life-saving therapies...',
      author: { name: 'Author name goes here', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
      publishedAt: 'May 27, 2024',
      readTime: '7 min read',
      category: 'Research',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400'
    },
    {
      id: 4,
      title: 'Neoadjuvant and adjuvant pembrolizumab is approved by the USFDA for resectable locally adv...',
      description: 'At CancerFax, we’re transforming the way patients discover and receive life-saving therapies...',
      author: { name: 'Author name goes here', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
      publishedAt: 'May 27, 2024',
      readTime: '27',
      category: 'Research',
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400'
    },
    {
      id: 5,
      title: 'Neoadjuvant and adjuvant pembrolizumab is approved by the USFDA for resectable locally adv...',
      description: 'At CancerFax, we’re transforming the way patients discover and receive life-saving therapies...',
      author: { name: 'Author name goes here', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
      publishedAt: 'May 27, 2024',
      readTime: '17',
      category: 'Research',
      image: 'https://picsum.photos/300/400?random=1'
    },
    {
      id: 6,
      title: 'Neoadjuvant and adjuvant pembrolizumab is approved by the USFDA for resectable locally adv...',
      description: 'At CancerFax, we’re transforming the way patients discover and receive life-saving therapies...',
      author: { name: 'Author name goes here', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
      publishedAt: 'May 27, 2024',
      readTime: '5',
      category: 'Research',
      image: 'https://picsum.photos/300/400?random=2'
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const blogContent = data?.length > 0 ? data.map((blog, index) => ({
    id: blog?.documentId,
    title: blog?.title || defaultBlog[index % 3].title,
    description: defaultBlog[index % 3].description,
    author: { 
      name: `${blog?.author?.firstName} ${blog?.author?.lastName ? blog?.author?.lastName : ''}` || defaultBlog[index % 3].author.name, 
      avatar: defaultBlog[index % 3].author.avatar,
    },
    publishedAt: formatDate(blog?.publishedAt),
    readTime: blog?.readTime,
    category: blog?.category ? blog?.category : defaultBlog[index % 3].category,
    image: defaultBlog[index % 3].image,
  })) : defaultBlog;

  return (
    <>
      <Grid>
      {blogContent.map((blog) => (
        <ScrollAnimationComponent animationVariants={fadeIn}>
            <BlogCard key={blog.id} onClick={() => navigate(`/resources/${blog.id}`)}>
              <BlogImage>
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                />
                {blog.category && <CategoryBadge className='lg-badge'>{blog.category}</CategoryBadge>}
              </BlogImage>

              <BlogMeta>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7.23294 4.66664C7.23294 4.37669 6.99789 4.14164 6.70794 4.14164C6.41799 4.14164 6.18294 4.37669 6.18294 4.66664V7.29164C6.18294 7.51049 6.31869 7.70638 6.5236 7.78322L8.85694 8.65822C9.12843 8.76002 9.43104 8.62247 9.53285 8.35098C9.63466 8.07949 9.4971 7.77688 9.22562 7.67507L7.23294 6.92782V4.66664Z" fill="#36454F"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.99961 1.22498C3.81016 1.22498 1.22461 3.81053 1.22461 6.99998C1.22461 10.1894 3.81016 12.775 6.99961 12.775C10.1891 12.775 12.7746 10.1894 12.7746 6.99998C12.7746 3.81053 10.1891 1.22498 6.99961 1.22498ZM2.27461 6.99998C2.27461 4.39043 4.39006 2.27498 6.99961 2.27498C9.60916 2.27498 11.7246 4.39043 11.7246 6.99998C11.7246 9.60952 9.60916 11.725 6.99961 11.725C4.39006 11.725 2.27461 9.60952 2.27461 6.99998Z" fill="#36454F"/>
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
                    <img 
                      src={blog.author.avatar} 
                      alt={blog.author.name || 'Author'} 
                    />
                  </AuthorAvatar>
                  <div>
                    <AuthorName>{blog.author.name}</AuthorName>
                    <PostDate>{blog.publishedAt}</PostDate>
                  </div>
                </AuthorInfo>
              </BlogContent>
            </BlogCard>
          </ScrollAnimationComponent>  
      ))}
      </Grid>
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
  background: #E5E7EB;
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
  line-height: 16px;
  font-weight: 500;
  color: #36454F;
  margin: 0;
`;

const BlogTitle = styled.h5`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #36454F;
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
  color: #36454F;
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
  color: #36454F;
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
  color: #36454F;
  white-space: nowrap;
  opacity: 0.5;
`;

export default BlogGrid;

