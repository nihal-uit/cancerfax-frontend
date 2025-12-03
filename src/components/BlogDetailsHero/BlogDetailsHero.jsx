import React, { useMemo } from 'react';
import styled from 'styled-components';
import { getMediaUrl } from '../../services/api';
import { formatDate } from '../../utils/strapiHelpers';

const BlogDetailsHero = ({ data, loading }) => {
  const defaultContent = {
    tags : [{id: 1, name: 'Tag'}],
    blogTitle: "PiggyBac Transposon System: A Revolutionary Tool in Cancer Gene Therapy",
    backgroundImage: "../images/blog-details-hero-img.jpg",
    author: { name: 'Author name goes here', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    publishedAt: 'May 27, 2024',
    readTime: '19',
  }

  const content = useMemo(() => {
    if (loading || !data) return defaultContent;

    const authorName = `${data.author?.firstName || ''} ${data.author?.lastName || ''}`.trim() || defaultContent.author.name;
    const authorAvatar = getMediaUrl(data.author?.avatar);
    const firstInitial = authorName.charAt(0).toUpperCase();

    return {
      tags: data.resource_tags ?? defaultContent.tags,
      blogTitle: data.title ?? defaultContent.blogTitle,
      backgroundImage:
        getMediaUrl(data.featuredImage) ?? defaultContent.backgroundImage,
      author: {
        name: authorName,
        avatar: authorAvatar ?? defaultContent.author.avatar,
        hasAvatar: !!authorAvatar,
        initial: firstInitial,
      },
      publishedAt: formatDate(data.publishedAt) ?? defaultContent.publishedAt,
      readTime: data.readTime ?? defaultContent.readTime,
    };
  }, [data, loading]);

  return (
    <section className='homeHero_sec'>
      <div className='home-hero-banner hospital_details_hero'>
        <div className='ratio'>
          <BackgroundImage
            src={content.backgroundImage}
            alt={content.blogTitle}
            loading="lazy"
          />
        </div>
      </div>
      <div className='heroContent_wrap'>
        <div className='containerWrapper'>
          <div className='commContent_wrap'>       
            <HeroContentGrid>
            <div style={{ display: "flex", gap: "8px", flexWrap: "nowrap" }}>
              {content?.tags?.map(tag => (
                <CategoryBadge key={tag.id}>{tag.name}</CategoryBadge>
              ))}
            </div>
            <HospitalName>{content.blogTitle}</HospitalName>
            <TopRow>
              <AuthorInfo>
                  <AuthorAvatar>
                    {content.author.hasAvatar ? (
                      <img 
                        src={content.author.avatar} 
                        alt={content.author.name || 'Author'} 
                      />
                    ) : (
                      <AvatarInitial>{content.author.initial}</AvatarInitial>
                    )}
                  </AuthorAvatar>
                  <div>
                    <AuthorName>{content.author.name}</AuthorName>
                  </div>
                </AuthorInfo>
                <PostDate>{content.publishedAt}  |  {content.readTime} min read</PostDate>
            </TopRow>
          </HeroContentGrid>          
         </div>
        </div>
      </div>
    </section>
  );
};


const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const HeroContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

const TopRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
`;

const HospitalName = styled.h3`
  color: ${props => props.theme.colors.white};
  font-size: 40px !important;
`;

const CategoryBadge = styled.div`
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

const Description = styled.p`
  color: ${props => props.theme.colors.white};
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
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AvatarInitial = styled.span`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
`;

const PostDate = styled.span`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #ffffff;
  white-space: nowrap;
`;

const AuthorName = styled.p`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  color: #ffffff;
  margin: 0;
`;

export default BlogDetailsHero;