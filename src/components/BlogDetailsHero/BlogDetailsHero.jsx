import React, { useMemo } from 'react';
import styled from 'styled-components';
import { getMediaUrl } from '../../services/api';
import { formatDate } from '../../utils/strapiHelpers';

const BlogDetailsHero = ({ data, loading }) => {
  const content = useMemo(() => {
    if (loading || !data) return {};

    const authorName = `${data.author?.firstName || ''} ${data.author?.lastName || ''}`.trim() || '';
    const authorAvatar = getMediaUrl(data.author?.profilePicture);
    const firstInitial = authorName.charAt(0).toUpperCase();

    return {
      tags: data.resource_tags ?? [],
      category: data?.resource_category?.name ?? '',
      blogTitle: data.title ?? '',
      backgroundImage:
        getMediaUrl(data.featuredImage) ?? '',
      author: {
        name: authorName,
        avatar: authorAvatar ?? '',
        hasAvatar: !!authorAvatar,
        initial: firstInitial,
      },
      publishedDate: formatDate(data.publishedDate) ?? '',
      readTime: data.readTime ?? '',
    };
  }, [data]);

  return (
    <section className='homeHero_sec blog_banner_hero'>
      <div className='home-hero-banner hospital_details_hero'>
        <div className='ratio'>
          {content.backgroundImage ? (
            <BackgroundImage
              src={content.backgroundImage}
              alt={content.blogTitle}
              loading="lazy"
            />
          ) : (
            <GreyGradientBackground />
          )}
        </div>
      </div>
      <div className='heroContent_wrap'>
        <div className='containerWrapper'>
          <div className='commContent_wrap'>       
            <HeroContentGrid>
            <div style={{ display: "flex", gap: "8px", flexWrap: "nowrap" }}>
              <CategoryBadge>{content?.category}</CategoryBadge>
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
                <PostDate>{content.publishedDate}  |  {content.readTime} min read</PostDate>
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

const GreyGradientBackground = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
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
  font-size: 24px !important;
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